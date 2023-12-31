import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import List from "../list/List";
import { listingOptions } from "../static/ListingOptions";
import RentoBack from "../../../assets/rentoBack.svg";
const OwnerOnboarding1 = ({ navigation, route }) => {
  console.log("Back:" + JSON.stringify(route.params));
  var [isPress, setIsPress] = useState(false);
  const selectedItems = (value, type) => {
    navigation.navigate("owner_onboarding2", { placeType: value });
  };
  var touchProps = {
    activeOpacity: 1,
    underlayColor: "#ED7861", // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
  };

  return (
    <View style={styles.container}>
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
      <RentoBack
        style={{
          zIndex: -1,
        }}
        width={840}
        height={910}
        marginTop={-490}
        marginLeft={-280}
        opacity={0.7}
      />
    </View>
  );
};

export default OwnerOnboarding1;

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
    marginTop: 210,
    marginLeft: 55,
    marginBottom: 60,
  },
  progressBarGreen: {
    borderWidth: 2,
    borderColor: "#3B6665",
    backgroundColor: "#B1D4D2",
    height: 10,
    width: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  customStyle: {
    color: "#413855",
    fontSize: 16,
    fontFamily: "Mulish_700Bold",
  },
  btnNormal: {
    borderColor: "#ED7861",
    // borderWidth: 1,
    backgroundColor: "#F6D6CF",
    height: "50",
    width: "80%",
    marginLeft: 40,
    marginTop: 20,
    padding: 10,
    borderWidth: 0.7,
    borderRadius: 35,
  },
  btnPress: {
    borderColor: "#ED7861",
    backgroundColor: "#F6D6CF",
    height: "50",
    width: "80%",
    marginLeft: 40,
    marginTop: 20,
    padding: 10,
    borderWidth: 0.7,
    borderRadius: 35,
    color: "#413855",
  },
  textContainer: {
    margin: 30,
    marginLeft: 60,
    height: "18%",
    width: "70%",
    justifyContent: "center",
    fontWeight: "bold",
    fontFamily: "Mulish_400Regular",
    color: "#413855",
  },
  listContainer: {
    // marginTop: ,
  },
  title: {
    fontWeight: "300",
    fontSize: 15,
    marginLeft: 10,
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Mulish_700Bold",
    color: "#413855",
  },
});
