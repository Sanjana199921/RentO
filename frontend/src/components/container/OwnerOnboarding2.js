import { Text, View, StyleSheet } from "react-native";
import { listingOptions } from "../static/ListingOptions";
import List from "../list/List";
import React, { useState } from "react";
import RentoBack from "../../../assets/rentoBack.svg";

const OwnerOnboarding2 = ({ navigation, route }) => {
  var [isPress, setIsPress] = useState(false);
  var touchProps = {
    activeOpacity: 1,
    underlayColor: "#ED7861", // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    // onPress: () => console.log("HELLO"), // <-- "onPress" is apparently required
  };
  const selectedItems = (value, type) => {
    let onBoardData = {
      placeType: route.params.placeType,
      propertyType: value,
    };
    navigation.navigate("owner_onboarding6", onBoardData);
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>What is your property type?</Text>
      </View>
      <View style={styles.listContainer}>
        <List
          numColumns={listingOptions.propertyType.length / 5}
          items={listingOptions.propertyType}
          selectedItems={selectedItems}
          type="property_type"
          touchProps={touchProps}
          customStyle={styles.customStyle}
        />
      </View>
      <View style={styles.progressBar}>
        <View style={styles.progressBarGreen}></View>
      </View>
      <RentoBack
        style={{ zIndex: -1 }}
        width={840}
        height={810}
        marginTop={-230}
        marginLeft={-280}
        opacity={0.7}
      />
    </View>
  );
};

export default OwnerOnboarding2;

var styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: -50,
  },
  progressBar: {
    borderColor: "#3B6665",
    height: 10,
    width: "75%",
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "#3B6665",
    marginTop: 75,
    marginLeft: 55,
    marginBottom: -100,
  },
  progressBarGreen: {
    borderWidth: 2,
    borderColor: "#3B6665",
    backgroundColor: "#B1D4D2",
    height: 10,
    width: 20,
    borderRadius: 20,
    marginBottom: 20,
    zIndex: 1,
  },
  customStyle: {
    color: "#413855",
    fontSize: 16,
    fontFamily: "Mulish_700Bold",
  },
  btnNormal: {
    borderColor: "#ED7861",
    backgroundColor: "#F6D6CF",
    height: "60",
    width: "80%",
    marginLeft: 40,
    marginBottom: 20,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 35,
  },
  btnPress: {
    borderColor: "#ED7861",
    backgroundColor: "#F6D6CF",
    height: "60",
    width: "80%",
    marginLeft: 40,
    //marginTop: 18,
    marginBottom: 20,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 35,
  },
  textContainer: {
    margin: 10,
    height: "20%",
    color: "#413855",
    justifyContent: "center",
    fontWeight: "bold",
    fontFamily: "Mulish_400Regular",
    // backgroundColor: "pink",
  },
  listContainer: {
    // marginTop: ,
  },
  title: {
    fontWeight: "300",
    fontWeight: "bold",
    fontSize: 22,
    marginLeft: 10,
    color: "#413855",
    textAlign: "center",
    fontFamily: "Mulish_700Bold",
  },
});
