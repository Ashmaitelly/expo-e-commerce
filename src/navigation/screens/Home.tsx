import MaterialIcons from "@react-native-vector-icons/material-icons";
import { Button, Text } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SearchBar from "../../components/SearchBar";
import AdListing, { Ad } from "../../components/AdLIsting";
import Samsung from "../../assets/SamsungA56.png";
import { getListings } from "../../services/listings";

export function Home() {
  const sampleAd = getListings()[0];
  return (
    <View style={styles.container}>
      <SearchBar disabled />
      <AdListing ad={sampleAd} lang="en" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
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
});
