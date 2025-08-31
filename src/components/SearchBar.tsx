import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import MaterialIcons from "@react-native-vector-icons/material-icons";

interface SearchBarProps {
  disabled?: boolean; // if true → behaves like a button
  placeholder?: string;
  initialValue?: string;
  onSearch?: (query: string) => void;
  navigateTo?: string; // screen to open when disabled
}

const SearchBar: React.FC<SearchBarProps> = ({
  disabled = false,
  placeholder = "Search",
  initialValue = "",
  onSearch,
  navigateTo = "Search",
}) => {
  const [query, setQuery] = useState(initialValue);
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleSearch = () => {
    if (disabled) {
      navigation.navigate(navigateTo as never);
    } else {
      onSearch?.(query);
    }
  };

  if (disabled) {
    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: colors.border }]}
        activeOpacity={0.7}
        onPress={handleSearch}
      >
        <Ionicons
          name="search"
          size={20}
          color={colors.text}
          style={styles.icon}
        />
        <Text style={styles.placeholder}>{placeholder}</Text>
      </TouchableOpacity>
    );
  }

  // 🔹 Real input mode
  return (
    <View style={[styles.container, { backgroundColor: colors.border }]}>
      <MaterialIcons
        name="search"
        size={20}
        color={colors.text}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  placeholder: {
    color: "#666",
    fontSize: 16,
  },
});

export default SearchBar;
