import { Text, View } from "react-native";
import List from "../list/List";
import { listingOptions } from "../static/ListingOptions";
import { useEffect } from "react";
import Postdata from "../hooks/postdata";
const OwnerOnboarding1 = ({ navigation }) => {
  const selectedItems = (value, type) => {
    navigation.navigate("owner_onboarding2", { placeType: value });
  };

  // Postdata();
  return (
    <View>
      <Text>What kind of place do you want to list?</Text>
      <View>
        <List
          numColumns={listingOptions.placeType.length / 3}
          items={listingOptions.placeType}
          selectedItems={selectedItems}
          type="place_type"
        />
      </View>
    </View>
  );
};

export default OwnerOnboarding1;
