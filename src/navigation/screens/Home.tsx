import { HeaderTitle } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";
import SearchBar from "../../components/SearchBar";
import AdListing from "../../components/AdLIsting";
import { getListings } from "../../services/listings";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView } from "react-native-gesture-handler";

export function Home() {
  const phones = getListings("phones");
  const cars = getListings("cars");
  const apartments = getListings("apartments");
  const { t } = useTranslation();

  const renderCategory = (title: string, data: Array<any>) => (
    <>
      <HeaderTitle children={t(title)} style={styles.categoryHeader} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AdListing ad={item} lang="en" />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        style={styles.flatList}
      />
    </>
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

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 10,
  },

  placeholder: {
    color: "#666",
    fontSize: 16,
  },

  categoryHeader: {
    textAlign: "left",
    width: "100%",
    paddingHorizontal: 30,
  },

  flatList: {},

  flatListContent: {
    paddingHorizontal: 10,
    alignItems: "flex-start",
  },
});
