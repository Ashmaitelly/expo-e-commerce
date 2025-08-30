import { Button, Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export function Home() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>

      <Button screen="Settings">Go to Settings</Button>
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
});
