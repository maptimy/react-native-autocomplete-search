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
