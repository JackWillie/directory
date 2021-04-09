# React Native Directory

React Native Directory is a website where you can see all the libraries that are compatible with React Native.

### Website: https://reactnative.directory/

## How do I know I'm at the right place?

- You made a repository on GitHub and you want the world to know it works with React Native.
- You want to submit a pull request to improve React Native Directory.
- You want to report a bug or make a suggestion.

## I don't like your website, can I hit an API instead and build my own better stuff?

Sure, go for it!

`https://reactnative.directory/api/libraries`

- Returns a list of all libraries in `JSON` format.

`https://reactnative.directory/api/libraries?search=webgl`

- Returns a list of all libraries in `JSON` format that have the keyword `webgl`.

`https://reactnative.directory/api/libraries?search=webgl&expo=true`

- Returns a list of all libraries in `JSON` format that have the keyword `webgl` and work with Expo managed.

`https://reactnative.directory/api/libraries?search=webgl&expo=true&android=true`

- Returns a list of all libraries in `JSON` format that have the keyword `webgl` and work with Expo managed and Android.

`https://reactnative.directory/api/libraries?search=webgl&expo=true&android=true&isPopular=true`

- Returns a list of all libraries in `JSON` format that have the keyword `webgl`, work with Expo managed and Android and are popular based on the scoring criterion.

## I don't like how you calculate health scores.

- Submit a PR with changes to `scripts/calculate-score.js`.
- You have all the power! Tell us what you want.

## How do I add a library?

- Add it at the end of `react-native-libraries.json` file.
- Submit a PR.

Please follow this format, fields order and indentation:

```json
{
  "githubUrl": "<GITHUB REPOSITORY URL>",
  "npmPkg": "<NPM PACKAGE NAME>",
  "nameOverride": "<PACKAGE DISPLAY NAME>",
  "examples": ["<THE URL TO REPO>", "<THE URL TO A SNACK>"],
  "images": ["<PUBLIC URL TO RELATED IMAGE>"],
  "ios": false,
  "android": false,
  "web": false,
  "expo": false,
  "windows": false,
  "macos": false,
  "unmaintained": false,
  "dev": false,
  "template": false
}
```

Please skip the `false` values and do not fill optional fields, unless it's necessary.

### Field descriptions

- `githubUrl` - (**required** string) - URL to the GitHub repository (currently other git hosts are not supported).
- `npmPkg` - (_optional_ string) - npm package name (fill only when the GitHub repository name is different from the name of package published to npm).
- `nameOverride` - (_optional_ string) - display name override (fill only when it is different from the GitHub repository name and npm package name).
- `examples` - (_optional_ array of strings) - URLs to example projects (Snacks preferred) or with demonstrations of the library.
- `images` - (_optional_ array of strings) - URLs to images that will show up in the listing to preview the library functionality.
- `ios` - (_optional_ boolean) - works on iOS device.
- `android` - (_optional_ boolean) - works on Android device.
- `web` - (_optional_ boolean) - can be used with [`react-native-web`](https://github.com/necolas/react-native-web).
- `expo` - (_optional_ boolean) - can be used in managed workflow, without ejecting an [Expo](https://github.com/expo/expo) application (any library can be used if you eject).
- `windows` - (_optional_ boolean) - can be used with [`react-native-windows`](https://github.com/microsoft/react-native-windows).
- `macos` - (_optional_ boolean) - can be used with [`react-native-macos`](https://github.com/microsoft/react-native-macos).
- `unmaintained` - (_optional_ boolean) - signify that a library is not maintained.
- `dev` - (_optional_ boolean) - signify that a library is a development tool.
- `template` - (_optional_ boolean) - signify that a library is a project template.

> _Note:_ If your package is within a monorepo on GitHub, eg: https://github.com/expo/expo/tree/master/packages/expo-web-browser, then the name, description, homepage, and topics (keywords) will be extracted from package.json for that subrepo. GitHub stats will be based on the monorepo, because there isn't really another option.

## How do I run my own version locally?

Prerequisites

- Node LTS

Commands

##### With npm

```sh
npm install
npm start
```

##### With yarn

```sh
yarn
yarn start
```

You should be able to visit `localhost:3000` in your browser.

## How do I run `npm run data:update` with keys?

- Visit https://github.com/settings/developers to get your keys (don't worry about the callback URL, put whatever you want).
- Load the GITHUB_TOKEN environment variable into your shell.

This command creates site data in `./assets/data.json`

```sh
GITHUB_TOKEN=<*> npm run data:update
```

## How do I deploy my own version of this?

- Site is hosted on Now, and this is the easiest way to do it.
- You can deploy your own with your own Now account
- You will need to provide GITHUB_TOKEN environment variable in your Vercel configuration.

```sh
# once environment variables are configured, install vercel and deploy
npm i -g vercel
vercel
```

## How do I deploy to production?

Get a commit on `master` and it will be automatically deployed.
