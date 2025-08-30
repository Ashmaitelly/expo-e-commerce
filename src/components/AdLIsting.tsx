import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
}

const AdListing: React.FC<AdListingProps> = ({ ad, lang = "en" }) => {
  return (
    <View style={styles.card}>
      {/* Image */}
      <Image source={ad.image} style={styles.image} resizeMode="contain" />

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.title}>{ad.title}</Text>
        {ad.description && (
          <Text style={styles.description}>{ad.description}</Text>
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
    </View>
  );
};

export default AdListing;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    fontSize: 13,
    color: "#666",
    marginVertical: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2c7",
  },
  sellerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  sellerName: {
    marginRight: 6,
    fontSize: 13,
    color: "#333",
  },
  location: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});
