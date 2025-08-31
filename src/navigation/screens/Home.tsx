import { HeaderTitle } from "@react-navigation/elements";
import { StyleSheet, View, ActivityIndicator, Dimensions } from "react-native";
import SearchBar from "../../components/SearchBar";
import AdListing from "../../components/AdLIsting";
import { getListings } from "../../services/listings";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

export function Home() {
  const { t } = useTranslation();

  // states for data and loading
  const [loading, setLoading] = useState(true);
  const [phones, setPhones] = useState([]);
  const [cars, setCars] = useState([]);
  const [apartments, setApartments] = useState([]);

  // simulate fetching data on first navigation
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      // simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setPhones(getListings("phones"));
      setCars(getListings("cars"));
      setApartments(getListings("apartments"));
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderCategory = (title: string, data: Array<any>) => (
    <View style={styles.categoryContainer}>
      <HeaderTitle children={t(title)} style={styles.categoryHeader} />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AdListing ad={item} lang="en" />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          style={styles.flatList}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar disabled />

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderCategory("categories.phones", phones)}
        {renderCategory("categories.cars", cars)}
        {renderCategory("categories.apartments", apartments)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: "center",
  },

  categoryContainer: {
    width: Dimensions.get("screen").width,
    marginBottom: 20,
  },

  categoryHeader: {
    textAlign: "left",
    width: "100%",
    paddingHorizontal: 30,
    marginBottom: 10,
  },

  flatList: {},

  flatListContent: {
    paddingHorizontal: 10,
    alignItems: "flex-start",
  },

  loaderContainer: {
    height: 150, // approximate height of the FlatList
    justifyContent: "center",
    alignItems: "center",
  },
});
