import cheerio from 'cheerio';
import fetch from 'isomorphic-fetch';

const isLikelyUsefulImage = (image, githubUrl) => {
  let parentHref = image.parent().attr('href');
  let imageSrc = image.attr('src');
  let isInHeader = image.parents('h1').length > 0;
  let isFromRepo = imageSrc.includes(githubUrl);

  if (
    (isFromRepo && !isInHeader) ||
    (parentHref && imageSrc && parentHref === imageSrc && !isInHeader)
  ) {
    return true;
  } else {
    return false;
  }
};

const scrapeImagesAsync = async githubUrl => {
  let response = await fetch(githubUrl);
  let html = await response.text();
  let $ = cheerio.load(html);
  let images = $('#readme').find('img');

  let usefulImages = [];
  if (images) {
    for (let i = 0; i <= images.length - 1; i++) {
      let image = images[i];
      if (isLikelyUsefulImage($(image), githubUrl)) {
        usefulImages.push(image);
      }
    }
  }

  let result = usefulImages.map(image => {
    return $(image).attr('src');
  });

  return result;
};

const fetchReadmeImages = async (data, githubUrl) => {
  /**
   * @DEV
   * if images been set, we skip scraping images
   */
  if (data.images) {
    return data;
  }

  try {
    let images = await scrapeImagesAsync(githubUrl);

    return {
      ...data,
      images,
    };
  } catch (e) {
    console.log(`retrying image scrape for ${githubUrl}`);
    return await fetchReadmeImages(data, githubUrl);
  }
};

export default fetchReadmeImages;
