import jsonfile from 'jsonfile';
import _ from 'lodash';
import path from 'path';

import libraries from '../react-native-libraries.json';

const LIBRARIES_JSON_PATH = path.join('react-native-libraries.json');

const processedLibraries = libraries
  // Remove redundant `npmPkg` for libraries with correct GitHub repository name
  .map(lib => (lib.githubUrl.endsWith(`/${lib.npmPkg}`) ? _.omit(lib, 'npmPkg') : lib))
  // Remove all properties with `false` value
  .map(lib => _.pickBy(lib, _.identity));

jsonfile.writeFile(
  LIBRARIES_JSON_PATH,
  processedLibraries,
  {
    spaces: 2,
  },
  err => {
    if (err) {
      console.error(err);
    }
  }
);
