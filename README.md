# Stronger Together

**Stronger Together** is a collaborative fitness app designed to foster motivation and accountability through social connections. The app's standout feature allows users to log their exercises, which then sends real-time notifications to friends, creating a supportive community of fitness enthusiasts.

## Key Features

- **Social Workout Logging**: Record your exercises with details like reps and sets
- **Real-time Friend Notifications**: When you complete a workout, friends receive motivational push notifications
- **Activity Feed**: View a chronological feed of friends' workouts and achievements
- **Workout Likes and Reactions**: Engage with friends' activities through likes
- **User Profiles**: Track your progress and workout history

## Technology Stack

- **Frontend**: React Native with Expo framework
- **UI Libraries**: React Native UI Lib, React Native Reanimated, React Native Gesture Handler
- **State Management**: Zustand and React Query (TanStack Query)
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Push Notifications**: Expo Notifications
- **Navigation**: Expo Router
- **Authentication**: Firebase Authentication with Google Sign-in integration
- **TypeScript**: Used throughout for type safety and improved developer experience
- **Deployment**: EAS (Expo Application Services)

This project demonstrates expertise in mobile app development, real-time notifications, social features implementation, and cloud integration. It showcases the ability to create a polished, feature-rich application that combines fitness tracking with social engagement to enhance user motivation.

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
