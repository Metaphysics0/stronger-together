# Stronger Together

## Development

- How to create a development build locally

prerequisites:

```bash
npx expo install expo-dev-client

```

For building on an iOS simulator:

update `eas.json` to have:

```json
{
  "build": {
    "development-simulator": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    }
  }
}
```

then, run the following command:

```bash
eas build --profile development-simulator --platform ios
```
