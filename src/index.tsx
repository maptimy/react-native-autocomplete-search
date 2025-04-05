import {
  Configuration,
  GeocodingApi,
  GeocodingLayer,
  type GeocodingGeoJSONFeature,
} from '@stadiamaps/api';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { distanceSubtitle, icon } from './_utils';
import { useDebounce } from './useDebounce';

type AutocompleteSearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  result: GeocodingGeoJSONFeature | null;
  setResult: (result: GeocodingGeoJSONFeature | null) => void;
  results: GeocodingGeoJSONFeature[];
  isLoading: boolean;
  config: Configuration;
  userLocation: { lat: number; lon: number };
  limitLayers?: GeocodingLayer[];
  maxResults?: number;
  onResultSelected?: (result: any) => void;
};

const AutocompleteSearchContext = createContext<AutocompleteSearchContextType>({
  searchQuery: '',
  setSearchQuery: () => {},
  result: null,
  setResult: () => {},
  results: [],
  isLoading: false,
  config: new Configuration(),
  userLocation: { lat: 0, lon: 0 },
  limitLayers: undefined,
  maxResults: undefined,
  onResultSelected: () => {},
});

type AutocompleteSearchRootProps = {
  config: Configuration;
  userLocation: { lat: number; lon: number };
  limitLayers?: GeocodingLayer[];
  minimumSearchLength?: number;
  onResultSelected?: (result: GeocodingGeoJSONFeature | null) => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const search = async (
  api: GeocodingApi,
  searchQuery: string,
  userLocation: { lat: number; lon: number },
  limitLayers?: GeocodingLayer[],
  maxResults?: number
) => {
  const { features } = await api.autocomplete({
    text: searchQuery,
    focusPointLat: userLocation.lat,
    focusPointLon: userLocation.lon,
    layers: limitLayers,
    size: maxResults,
  });

  return features;
};

const AutocompleteSearchRootBase = (props: AutocompleteSearchRootProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState<GeocodingGeoJSONFeature | null>(null);
  const { userLocation, limitLayers, config, minimumSearchLength, children } =
    props;

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const api = new GeocodingApi(config);

  const { data: features, isLoading } = useQuery({
    queryKey: ['autocomplete', debouncedSearchQuery],
    queryFn: () =>
      search(
        api,
        debouncedSearchQuery,
        userLocation,
        limitLayers,
        minimumSearchLength
      ),
    placeholderData: (prevData) => prevData || [],
  });

  const handleResultSelected = (feature: GeocodingGeoJSONFeature | null) => {
    setResult(feature);
    props.onResultSelected?.(feature);
  };

  return (
    <AutocompleteSearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        result,
        setResult: handleResultSelected,
        results: features ?? [],
        isLoading,
        userLocation,
        limitLayers,
        config,
      }}
    >
      <View
        style={[
          {
            flexDirection: 'column',
            width: '100%',
            gap: 4,
          },
          props.style,
        ]}
      >
        {children}
      </View>
    </AutocompleteSearchContext.Provider>
  );
};

type AutocompleteSearchInputProps = {
  style?: StyleProp<ViewStyle>;
};

export const AutocompleteSearchInput = ({
  style,
}: AutocompleteSearchInputProps) => {
  const { searchQuery, setSearchQuery, result, setResult, isLoading } =
    useContext(AutocompleteSearchContext);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (result != null) {
      setResult(null);
    }
  };

  return (
    <View style={searchBarStyle.container}>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        style={[searchBarStyle.search, style]}
        onChangeText={(text) => handleSearch(text)}
      />
      {isLoading && (
        <ActivityIndicator size={'small'} style={{ marginLeft: 'auto' }} />
      )}
    </View>
  );
};

const searchBarStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  search: {
    flexGrow: 1,
  },
});

type AutocompleteSearchResultsProps = {
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
};

export const AutocompleteSearchResults = ({
  style,
  itemStyle,
}: AutocompleteSearchResultsProps) => {
  const { setSearchQuery, result, setResult, userLocation, results } =
    useContext(AutocompleteSearchContext);

  const handleResultSelection = (newResult: GeocodingGeoJSONFeature) => {
    setResult(newResult);
    if (newResult.properties?.name) {
      setSearchQuery(newResult.properties.name);
    }
  };

  if (result != null || results?.length === 0) {
    return null;
  }

  return (
    <View style={[searchResultStyle.container, style]}>
      {results.map((feature) => (
        <Pressable
          onPress={() => handleResultSelection(feature)}
          key={feature.properties?.sourceId}
          style={[searchResultStyle.item, itemStyle]}
        >
          {icon(feature.properties)}
          <Text numberOfLines={1} style={{ flexShrink: 1 }}>
            {feature.properties?.name ?? '<No info>'}
          </Text>
          <Text style={{ marginLeft: 'auto' }}>
            {distanceSubtitle(feature, userLocation)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const searchResultStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 4,
    gap: 4,
    alignItems: 'center',
  },
});

export const AutocompleteSearchRoot = (props: AutocompleteSearchRootProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AutocompleteSearchRootBase {...props} />
    </QueryClientProvider>
  );
};
