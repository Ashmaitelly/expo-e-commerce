import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import { getListings } from "../../services/listings";
import AdListing from "../../components/AdLIsting";
import { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";

export function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setLoading(true);

      new Promise((resolve) => {
        const results = getListings(query); // assume getListings can accept a query
        setTimeout(() => resolve(results), 2000);
      }).then((results: any) => {
        setData(results);
        setLoading(false);
      });
    }, 500); // debounce

    return () => clearTimeout(handler); // cleanup if query changes
  }, [query]);

  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <SearchBar value={query} onInput={setQuery} placeholder="Search ads..." />
      {loading ? (
        <KeyboardAvoidingView style={{ flex: 1, alignItems: "center" }}>
          <ActivityIndicator
            size="large"
            style={{ marginTop: 20 }}
            color={colors.primary}
          />
        </KeyboardAvoidingView>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AdListing ad={item} lang="en" />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: "100%" }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
});
