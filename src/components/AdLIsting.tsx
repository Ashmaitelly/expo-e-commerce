import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

interface Seller {
  name: string;
  verified: boolean;
}

interface Location {
  en: string;
  ar: string;
}

export interface Ad {
  id: string;
  title: string;
  image: ImageSourcePropType;
  description?: string;
  price: number;
  seller: Seller;
  location: Location;
  category?: string;
}

interface AdListingProps {
  ad: Ad;
  lang?: "en" | "ar";
  onPress?: () => void;
}

const AdListing: React.FC<AdListingProps> = ({
  ad,
  lang = "en",
  onPress = () => {},
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      {/* Image */}
      <Image source={ad.image} style={styles.image} resizeMode="cover" />

      {/* Info */}
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {ad.title}
        </Text>
        {ad.description && (
          <Text
            style={styles.description}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {ad.description}
          </Text>
        )}

        {/* Price */}
        <Text style={styles.price}>${ad.price}</Text>

        {/* Seller */}
        <View style={styles.sellerRow}>
          <Text style={styles.sellerName}>{ad.seller.name}</Text>
          {ad.seller.verified && (
            <MaterialIcons name="verified" size={16} color="green" />
          )}
        </View>

        {/* Location */}
        <Text style={styles.location}>{ad.location[lang]}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AdListing;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    margin: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    width: 240,
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  info: {
    width: "100%",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2c7",
    marginBottom: 4,
  },
  sellerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  sellerName: {
    marginRight: 6,
    fontSize: 13,
    color: "#333",
  },
  location: {
    fontSize: 12,
    color: "#999",
  },
});
