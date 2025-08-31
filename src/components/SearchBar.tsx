import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  disabled?: boolean; // behaves like a button if true
  placeholder?: string;
  value?: string;
  onInput?: (query: string) => void;
  navigateTo?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  disabled = false,

  value = "",

  onInput = () => {},
  navigateTo = "Search",
}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const handlePress = () => {
    if (disabled) navigation.navigate(navigateTo as never);
  };

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 0.7 : 1}
      onPress={handlePress}
      style={[styles.container, { backgroundColor: colors.border }]}
      disabled={!disabled}
    >
      <Ionicons
        name="search"
        size={20}
        color={colors.text}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={t("search")}
        placeholderTextColor="#666"
        value={value}
        onChangeText={(value) => {
          onInput(value);
        }}
        editable={!disabled}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
});

export default SearchBar;
