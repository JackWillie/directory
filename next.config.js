const { withExpo } = require('@expo/next-adapter');
const withImages = require('next-images');
const withFonts = require('next-fonts');

module.exports = withExpo(
  withImages(
    withFonts({
      projectRoot: __dirname,
      productionBrowserSourceMaps: true,
      async headers() {
        return [
          {
            source: '/api/libraries',
            headers: [
              { key: 'Access-Control-Allow-Origin', value: '*' },
              { key: 'Access-Control-Allow-Methods', value: 'GET,HEAD' },
            ],
          },
        ];
      },
    })
  )
);
