# react-native-autocomplete-search

Geographics Autocomplete Search for React Native

## Installation

```sh
npm install react-native-autocomplete-search
```

## Usage


```js
import {
  AutocompleteSearchInput,
  AutocompleteSearchResults,
  AutocompleteSearchRoot,
} from 'react-native-autocomplete-search';
import { View, StyleSheet } from 'react-native';
import { Configuration } from '@stadiamaps/api';

export default function App() {
  return (
    <View style={styles.container}>
      <AutocompleteSearchRoot
        config={
          new Configuration({
            apiKey: process.env.EXPO_PUBLIC_STADIA_MAPS_API_KEY ?? '',
          })
        }
        userLocation={{ lat: -43.53437, lon: 172.657258 }}
      >
        <AutocompleteSearchInput />
        <AutocompleteSearchResults />
      </AutocompleteSearchRoot>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
});
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
