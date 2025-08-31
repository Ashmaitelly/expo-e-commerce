import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  I18nManager,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { getListingById } from "../../services/listings";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AdDetailsRouteProp = RouteProp<{ params: { id: string } }, "params">;

export function AdDetails() {
  const { colors } = useTheme();
  const route = useRoute<AdDetailsRouteProp>();
  const { id } = route.params;
  const { i18n, t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  const [listing, setListing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    new Promise((resolve) => {
      const result = getListingById(id);
      setTimeout(() => resolve(result), 800);
    }).then((result) => {
      setListing(result as any);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary || "#2c7"} />
      </View>
    );
  }

  if (!listing) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <Text style={{ color: colors.text }}>Listing not found</Text>
      </View>
    );
  }

  const handleCall = () => {
    if (listing.seller?.phone) {
      Linking.openURL(`tel:${listing.seller.phone}`);
    }
  };

  const handleEmail = () => {
    if (listing.seller?.email) {
      Linking.openURL(`mailto:${listing.seller.email}`);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background, paddingBottom: bottom },
      ]}
    >
      {/* Image */}
      <View style={[styles.imageContainer, { shadowColor: colors.text }]}>
        <Image source={listing.image} style={styles.image} resizeMode="cover" />
      </View>

      {/* Title */}
      <Text style={[styles.title, { color: colors.text }]}>
        {listing.title}
      </Text>

      {/* Price */}
      <Text style={[styles.price, { color: "#2c7" }]}>{listing.price}$</Text>

      {/* Seller & Location Row */}
      <View style={styles.infoRow}>
        {/* Seller */}
        <View style={styles.subRow}>
          <Text style={[styles.label, { color: colors.text }]}>
            {t("details.seller")}
          </Text>
          <Text style={[styles.infoText, { color: colors.text }]}>
            {listing.seller.name}
          </Text>
          {listing.seller.verified && (
            <MaterialIcons name="verified" size={16} color={"green"} />
          )}
        </View>

        {/* Location */}
        <View style={styles.subRow}>
          <MaterialIcons
            name="location-on"
            size={16}
            color={colors.primary || "#2c7"}
          />
          <Text
            style={[
              styles.infoText,
              { color: colors.textSecondary || colors.text },
            ]}
          >
            {listing.location[i18n.language]}
          </Text>
        </View>
      </View>

      {/* Contact Buttons */}
      <View style={styles.contactRow}>
        {listing.seller.phone && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleCall}
          >
            <MaterialIcons name="call" size={18} color="#fff" />
            <Text style={styles.buttonText}>{listing.seller.phone}</Text>
          </TouchableOpacity>
        )}
        {listing.seller.email && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#2c7" }]}
            onPress={handleEmail}
          >
            <MaterialIcons name="email" size={18} color="#fff" />
            <Text style={styles.buttonText}>{listing.seller.email}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Description Subtitle */}
      {listing.description && (
        <Text style={[styles.descriptionTitle, { color: colors.text }]}>
          {t("details.description")}
        </Text>
      )}

      {/* Description */}
      {listing.description && (
        <Text
          style={[
            styles.description,
            {
              color: colors.text,
              textAlign: I18nManager.isRTL ? "left" : "right",
            },
          ]}
        >
          {listing.description}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 16,
    gap: 16,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 280,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  subRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  infoText: {
    fontSize: 14,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  contactRow: {
    flexDirection: "column",
    gap: 10,
    marginVertical: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
});
