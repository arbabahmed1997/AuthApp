## User Authentication App

This React Native app implements a clean, scalable authentication flow using **React Context API**, **React Navigation**, and **AsyncStorage**. It supports multi-user signup, login, and logout with a polished, responsive UI and custom typography.

### Features

- **AuthContext with Context API**
  - `login`, `signup`, and `logout` functions
  - `user` and `isLoading` state
  - Multi-user support backed by AsyncStorage
  - Persists the currently logged-in user across app restarts
- **Screens**
  - `Login` – email/password login with validation and error messages
  - `Signup` – name/email/password signup with validation and unique email enforcement
  - `Home` – shows the logged-in user’s name + email and provides a logout action
- **Navigation**
  - `@react-navigation/native` + `@react-navigation/native-stack`
  - Auth-aware root navigator:
    - Shows `Login` / `Signup` when logged out
    - Shows `Home` when logged in
- **UI / UX**
  - Centralized `theme` with colors, spacing, typography, radius, and shadows
  - Reusable components (`Typography`, `PrimaryButton`, `TextField`, `ScreenContainer`)
  - Password visibility toggle (eye icon) on password fields
  - Responsive layouts that behave well across common device sizes
  - No hard-coded magic values: configuration is centralized in `theme` and `constants`

### Project Structure

```text
src/
  components/
    PrimaryButton.tsx
    ScreenContainer.tsx
    TextField.tsx
    Typography.tsx
  constants/
    validation.ts
  context/
    AuthContext.tsx
  navigation/
    RootNavigator.tsx
  theme/
    colors.ts
    index.ts
    spacing.ts
    typography.ts
App.tsx
react-native.config.js
```

### Dependencies

Core runtime dependencies added:

- `@react-native-async-storage/async-storage`
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `react-native-safe-area-context`
- `react-native-screens`
- `react-native-vector-icons`

Dev tooling is based on the default React Native 0.80 template (Babel, TypeScript, ESLint, Jest).

### Setup & Installation

1. **Install dependencies**

```bash
pnpm install
# or
npm install
```

2. **iOS specific: install pods**

```bash
cd ios
pod install
cd ..
```

3. **Link custom fonts (if you add actual font files)**

- Place your font files under `assets/fonts` (for example `AuthAppPrimary-Regular.ttf`, etc.).
- Ensure `react-native.config.js` includes:

```js
module.exports = {
  assets: ['./assets/fonts'],
};
```

Then run:

```bash
npx react-native-asset
```

4. **Run the app**

```bash
npm run ios
# or
npm run android
```

### How Authentication Works

- **User storage**
  - All registered users are stored in AsyncStorage under the `@auth_app_users` key.
  - Passwords are kept in plain text **only for this assessment** (no backend). In a real app, passwords must be hashed and never stored in plain text.
- **Current user**
  - The currently authenticated user (without password) is stored under `@auth_app_current_user`.
  - On app startup, `AuthProvider` reads this key and restores the session if present.
- **Signup flow**
  - Validates name, email format, and password length (min from `validationRules`).
  - Enforces unique email (case-insensitive) and shows a friendly “email already exists” message.
  - On success, the new user is saved and set as the current authenticated user, navigating to `Home`.
- **Login flow**
  - Validates email format and non-empty password.
  - Checks credentials against stored users.
  - On incorrect credentials, shows a specific error message.

### Validation Rules

Validation-related values and messages are centralized in `src/constants/validation.ts`:

- `validationRules.password.minLength`
- `validationMessages.email.invalid`
- `validationMessages.password.*`
- `validationMessages.name.required`
- `validationMessages.auth.*`

### Extending the App

- Replace in-memory / AsyncStorage-only auth with real backend APIs.
- Add password reset, profile editing, or multi-factor authentication.
- Add analytics or error monitoring around the auth flows.
- Localize validation and UI strings for multiple languages.

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
