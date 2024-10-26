# Project Structure:

- This project uses the new [expo router](https://docs.expo.dev/router/introduction/) for navigation.
- The `app` folder contains the routes for the app.
  - Each file within `app` should contain as little logic as possible, and return the main screen container defined in `components/Screens`.
- The `components` folder contains the main UI components for the app.
  - When there are shared components throughout the app, place it under the root `components` directory.
  - When there are components that belong to a specific screen, place it under the screen name in `components/Screens`.
- the `hooks` folder contains custom hooks for the app, as well as zustand stores.
- the `providers` folder contains `<Provider>` wrappers for the app, such as `SessionProvider` for authentication.
- The `services` folder contains services for the app, such as API calls, database operations, and other shared functionalities. It can also be a specific action, i.e. `submit-workout-service`, that contains all the logic for a specific feature.
- The `types` folder contains the types for the app. Also `types/guards` contains type guard functions for validating data.
- The `utils` folder contains the utility functions for the app.
