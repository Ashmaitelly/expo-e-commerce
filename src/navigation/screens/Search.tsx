import { StyleSheet, View } from "react-native";
import SearchBar from "../../components/SearchBar";

export function Search() {
  return (
    <View style={styles.container}>
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
});
