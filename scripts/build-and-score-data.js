import 'isomorphic-fetch';
import path from 'path';
import fs from 'fs';
import jsonfile from 'jsonfile';
import _ from 'lodash';
import fetchGithubData from './fetch-github-data';
import calculateScore from './calculate-score';
import fetchLicense from './fetch-license';
import fetchReadmeImages from './fetch-readme-images';
import fetchNpmData from './fetch-npm-data';

import githubRepos from '../react-native-libraries.json';
import debugGithubRepos from '../debug-github-repos.json';

import * as Strings from '../common/strings';
import * as Sorting from '../common/sorting';

// Uses debug-github-repos.json instead, so we have less repositories to crunch
// each time we run the script
const USE_DEBUG_REPOS = false;

// Loads the Github API results from disk rather than hitting the API each time.
// The first run will hit the API if raw-github-results.json doesn't exist yet.
const LOAD_GITHUB_RESULTS_FROM_DISK = false;
const GITHUB_RESULTS_PATH = path.join('scripts', 'raw-github-results.json');

const JSON_OPTIONS = {
  spaces: 2,
};

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

const buildAndScoreData = async () => {
  console.log('** Loading data from Github');
  await sleep(1000);
  let data;
  try {
    data = await loadRepositoryDataAsync();
  } catch(e) {
    console.log(e);
  }

  console.log('** Fetching license type');
  await sleep(1000);
  data = await Promise.all(data.map(d => fetchLicense(d, d.github.fullName)));

  console.log('\n** Scraping images from README');
  await sleep(1000);
  data = await Promise.all(data.map(d => fetchReadmeImages(d, d.githubUrl)));

  console.log('\n** Loading download stats from npm');
  await sleep(1000);
  data = await Promise.all(
    data.map(d => fetchNpmData(d, d.npmPkg, d.githubUrl))
  );

  // Calculate score
  console.log('\n** Calculating scores');
  data = data.map(calculateScore);

  data = data.filter(project => {
    return !Strings.isEmptyOrNull(project.github.name);
  });

  // Process topic counts
  const topicCounts = {};
  data.forEach((project, index, projectList) => {
    let topicSearchString = '';

    if (project.github.topics) {
      project.github.topics.forEach(topic => {
        topicSearchString = `${topicSearchString} ${topic}`;

        if (!topicCounts[topic]) {
          topicCounts[topic] = 1;
          return;
        }

        topicCounts[topic] += 1;
        return;
      });
    }

    projectList[index].topicSearchString = topicSearchString;
  });

  const libraries = Sorting.updated(data);

  return jsonfile.writeFile(
    path.resolve('build', 'data.json'),
    {
      libraries,
      topics: topicCounts,
      topicsList: Object.keys(topicCounts).sort(),
    },
    JSON_OPTIONS,
    err => {
      if (err) {
        console.log(err);
      } else {
        console.log('');
        console.log('** Done!');
      }
    }
  );
};

async function loadRepositoryDataAsync() {
  let data = USE_DEBUG_REPOS ? debugGithubRepos : githubRepos;
  let githubResultsFileExists = false;
  try {
    fs.statSync(GITHUB_RESULTS_PATH);
    githubResultsFileExists = true;
  } catch (e) {}

  let result;
  if (LOAD_GITHUB_RESULTS_FROM_DISK && githubResultsFileExists) {
    result = jsonfile.readFileSync(GITHUB_RESULTS_PATH);
    console.log('Loaded Github results from disk, skipped API calls');
  } else {
    result = await Promise.all(data.map(fetchGithubData));

    if (LOAD_GITHUB_RESULTS_FROM_DISK) {
      await new Promise((resolve, reject) => {
        jsonfile.writeFile(GITHUB_RESULTS_PATH, result, JSON_OPTIONS, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      console.log('Saved Github results from disk');
    }
  }

  return result;
}

buildAndScoreData();
