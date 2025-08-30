import { Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";

export function AdDetails() {
  return (
    <View style={styles.container}>
      <Text>Ad Details Screen</Text>
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
