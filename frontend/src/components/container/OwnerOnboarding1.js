import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import List from "../list/List";
import { listingOptions } from "../static/ListingOptions";
import { useEffect } from "react";
import Postdata from "../hooks/postdata";
const OwnerOnboarding1 = ({ navigation }) => {
  const selectedItems = (value, type) => {
    navigation.navigate("owner_onboarding2", { placeType: value });
  };
  var [isPress, setIsPress] = useState(false);
  var touchProps = {
    activeOpacity: 1,
    underlayColor: "#f56e51", // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    // onPress: () => console.log("HELLO"), // <-- "onPress" is apparently required
  };
  // Postdata();
  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          What kind of place do you want to list?
        </Text>
      </View>
      <View style={styles.listContainer}>
        <List
          numColumns={listingOptions.placeType.length / 3}
          items={listingOptions.placeType}
          selectedItems={selectedItems}
          type="place_type"
          touchProps={touchProps}
          customStyle={styles.customStyle}
        />
      </View>
      <View style={styles.progressBar}>
        <View style={styles.progressBarGreen}></View>
      </View>
    </View>
  );
};

export default OwnerOnboarding1;

var styles = StyleSheet.create({
  progressBar: {
    borderColor: "#B1D4D2",
    height: 10,
    width: "70%",
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "#B1D4D2",
    marginTop: 45,
    marginLeft: 55,
  },
  progressBarGreen: {
    backgroundColor: "#36827F",
    height: 10,
    width: 20,
    borderRadius: 20,
  },
  customStyle: {
    color: "#413855",
    fontSize: 15,
  },
  btnNormal: {
    borderColor: "#f56e51",
    // borderWidth: 1,
    backgroundColor: "#FBEDEA",
    height: "50",
    width: "80%",
    marginLeft: 40,
    marginTop: 20,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 25,
  },
  btnPress: {
    borderColor: "#f56e51",
    height: "50",
    width: "80%",
    marginLeft: 40,
    marginTop: 20,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 25,
  },
  textContainer: {
    margin: 30,
    height: "20%",
    justifyContent: "center",
    // backgroundColor: "pink",
  },
  listContainer: {
    // marginTop: ,
  },
  title: {
    fontWeight: 300,
    fontSize: 15,
    marginLeft: 10,
    fontSize: 20,
    textAlign: "center",
  },
});
