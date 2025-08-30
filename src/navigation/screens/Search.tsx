import { Button, Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";
import SearchBar from "../../components/SearchBar";

export function Search() {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
      <SearchBar disabled />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
});
