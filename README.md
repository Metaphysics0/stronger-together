# Stronger Together

## Development

Getting Started:

- Download [Expo](https://docs.expo.dev) and go their Getting Started docs. This will install most of the dependencies needed to run this app.

Also install:

- [XCode](https://apps.apple.com/us/app/xcode/id497799835) (for running the iOS app)
- [Android Studio](https://developer.android.com/studio) (for running the Android app)
- Firebase credentials (ask project admin)

### Install dependencies

```bash
$ nvm use
$ npm install
```

### Start the Expo development server

```bash
$ npx expo start
```

If the above fails, try building the app locally:

```bash
$ npx expo prebuild --clean
$ npx expo run:ios # or npx expo run:android
```

## Project Structure:

See [Project Structure](docs/project-structure.md)

## Creating and submitting a Release

- How to create and submit a release locally. (save $ on the 30 max build per month from EAS)
- Note, you will need to update the `eas.json` file to include the `ascAppId` for the app you are building.
- Add the `--non-interactive` flag, as of this issue: https://github.com/expo/eas-cli/issues/2639

```bash
$ eas build --non-interactive --platform ios --local
$ eas submit -p ios
# > select build from local binary file
```
