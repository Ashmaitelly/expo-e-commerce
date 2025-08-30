import { Button, Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";

export function Search() {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
      <Button screen="AdDetails">Go to AdDetails</Button>
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
