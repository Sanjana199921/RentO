import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import ButtonUI from "../UI/button/ButtonUI";
import { InputUI } from "../UI/input/InputUI";
import { rentorCredentials } from "../static/constants";
const WelcomeScreen = ({ navigation }) => {
  const showListView = () => {
    navigation.navigate("rentor");
  };
  const logo = require("../../../assets/login-screen-logo.png");
  // remove back button
  var [isSubmitPress, setIsSubmitPress] = useState(false);

  var touchPropsSubmit = {
    underlayColor: "#B1D4D2",
    style: isSubmitPress ? styles.submitButtonClicked : styles.submitButton,
    onHideUnderlay: () => setIsSubmitPress(false),
    onShowUnderlay: () => setIsSubmitPress(true),
  };
  const saveCity = (value, type) => {};
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.image} resizeMode="contain"></Image>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>What’s your address?</Text>
      </View>
      <InputUI
        style={styles.input}
        placeholder="  Search by location  "
        coustomStyle={styles}
        selectedItems={saveCity}
      />
      <ButtonUI
        item={{ value: "Show" }}
        customStyle={styles.customStyle}
        selectedItems={showListView}
        touchProps={touchPropsSubmit}
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  imageContainer: {
    // marginTop: "5%",
    alignItems: "center",
    // backgroundColor: "pink",
    height: "25%",
  },
  image: {
    marginTop: 3,
    width: "30%",
    height: "90%",
  },
  container: {
    height: "100%",
    justifyContent: "center",
    // margin: 10,
    padding: 0,
    backgroundColor: "white",
  },
  subContainer: {
    alignItems: "center",
  },
  textInput: {
    fontSize: 20,
    height: 30,
    width: "90%",
    borderRadius: 30,
    textAlign: "justify",
    height: 50,
    paddingLeft: 20,
  },
  button: {
    borderWidth: 1.5,
    borderRadius: 15,
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
    height: 35,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "20",
  },
  textContainer: {
    // margin: 30,
    height: "20%",
    justifyContent: "center",
  },
  title: {
    fontWeight: 300,
    fontSize: 25,
    marginLeft: 10,
    fontSize: 20,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#36827F",
    // borderWidth: 1,
    borderColor: "#36827F",
    height: "10%",
    width: "80%",
    marginLeft: 40,
    marginTop: "30%",
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 40,
  },
  submitButtonClicked: {
    borderColor: "#B1D4D2",
    height: "10%",
    width: "80%",
    marginLeft: 40,
    marginTop: "30%",
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 40,
  },
  buttonContainer: {
    marginTop: 50,
  },
  customStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    borderColor: "#5C5D8D",
  },
});
