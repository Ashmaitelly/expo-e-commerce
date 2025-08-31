import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import SearchBar from "../../components/SearchBar";
import { getListings } from "../../services/listings";
import AdListing from "../../components/AdLIsting";
import { useState, useEffect } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Search() {
  const [query, setQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { colors } = useTheme();
  const nav = useNavigation();
  const { i18n, t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  const categories = ["apartments", "cars", "phones"];

  // Fetch and filter listings
  useEffect(() => {
    const handler = setTimeout(() => {
      setLoading(true);

      new Promise((resolve) => {
        const results = getListings(
          query,
          categoryFilter,
          priceFilter,
          locationFilter
        );

        setTimeout(() => resolve(results), 500);
      }).then((results: any) => {
        setData(results);
        setLoading(false);
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [query, priceFilter, locationFilter, categoryFilter]);

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <SearchBar value={query} onInput={setQuery} />

      {/* Category picker */}
      <View
        style={{
          width: "100%",
          marginBottom: 5,
          height: 50,
          borderColor: colors.border,
          borderWidth: 1,
          justifyContent: "center",
          borderRadius: 8,
          marginHorizontal: 2,
        }}
      >
        <Picker
          selectedValue={categoryFilter}
          onValueChange={(itemValue) => setCategoryFilter(itemValue)}
          style={{
            color: categoryFilter ? colors.text : "grey",
          }}
        >
          <Picker.Item label={t("filters.category")} value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat} label={t(`categories.${cat}`)} value={cat} />
          ))}
        </Picker>
      </View>

      {/* Price and location inputs row */}
      <View style={styles.filtersRow}>
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text, borderWidth: 1 },
          ]}
          placeholder={t("filters.price")}
          placeholderTextColor={"grey"}
          keyboardType="numeric"
          value={priceFilter}
          onChangeText={setPriceFilter}
        />
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text, borderWidth: 1 },
          ]}
          placeholder={t("filters.location")}
          placeholderTextColor={"grey"}
          value={locationFilter}
          onChangeText={setLocationFilter}
        />
      </View>

      {loading ? (
        <KeyboardAvoidingView style={{ flex: 1, alignItems: "center" }}>
          <ActivityIndicator
            size="large"
            style={{ marginTop: 20 }}
            color={colors.primary}
          />
        </KeyboardAvoidingView>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AdListing
              ad={item}
              lang={i18n.language}
              layout="horizontal"
              onPress={() => nav.navigate("AdDetails", { id: item.id })}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: "100%" }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
  },
  filtersRow: {
    flexDirection: "row",
    width: "100%",
    gap: 5,
  },
  input: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
