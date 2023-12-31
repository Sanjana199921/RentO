import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Postdata from "../hooks/postdata";
import ButtonUI from "../UI/button/ButtonUI";
import { Button } from "react-native-paper";
import RentoBack from "../../../assets/rentoBack.svg";

const PostIsReady = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const data = route.params;
  Postdata(data, setResponse, setLoading);
  showPost = () => {
    // console.log("is ready data:" + JSON.stringify(data));
    navigation.navigate("ower_new_post", response);
  };
  showListings = () => {
    navigation.navigate("owner_welcome");
  };
  var touchPropsSubmit = {
    underlayColor: "#3B6665",
    style: isSubmitPress ? styles.submitButtonClicked : styles.submitButton,
    onHideUnderlay: () => setIsSubmitPress(false),
    onShowUnderlay: () => setIsSubmitPress(true),
  };
  var [isSubmitPress, setIsSubmitPress] = useState(false);
  // console.log("Finally::: last page" + JSON.stringify(data));
  return (
    <View style={styles.descView}>
      <Text style={styles.descText}> Your listing has been posted!</Text>
      <View style={styles.ButtonContainer}>
        <ButtonUI
          item={{ value: "View Post" }}
          selectedItems={showPost}
          customStyle={
            isSubmitPress
              ? { ...styles.customStyle, color: "white" }
              : styles.customStyle
          }
          touchProps={touchPropsSubmit}
        >
        </ButtonUI>
        <ButtonUI
          item={{ value: "My Listings" }}
          selectedItems={showListings}
          customStyle={styles.customStyle}
          touchProps={touchPropsSubmit}
        ></ButtonUI>
      </View>
      <RentoBack
        style={{ zIndex: 1 }}
        width={840}
        height={990}
        marginTop={-70}
        marginLeft={-160}
        opacity={0.7}
      />
    </View>
  );
};

export default PostIsReady;
const styles = StyleSheet.create({
  ButtonContainer: {
    flexDirection: "column",
    height: "35%",
    width:"150%"
  },
  customStyle: {
    color: "#413855",
    fontSize: 20,
    fontFamily: "Mulish_700Bold",
  },
  descView: {
    alignItems: "center",
    // justifyContent: "center",
    marginTop: "30%",
    // marginBottom: 10,
    marginLeft: 20,
    height: "36%",
    width: "90%",
    borderWidth: 1,
    borderRadius: 20,
    // alignItems: "center",
    // flex: 1,
    // backgroundColor: "white",
    backgroundColor: "#413855",
    borderColor: "#413855",
  },
  descText: {
    marginTop: 40,
    fontFamily: "Mulish_700Bold",
    fontSize: 25,
    color: "white",
  },
  // submitButton: {
  //   backgroundColor: "#E9E7EE",
  //   borderColor: "#3B6665",
  //   height: "25%",
  //   width: "40%",
  //   color: "white",
  //   fontSize: 24,
  // },
  submitButton: {
    backgroundColor: "#E9E7EE",
    borderColor: "#413855",
    height: "65%",
    width: "46%",
    marginLeft: 155,
    marginTop: 30,
    padding: 5,
    color: "#413855",
    borderWidth: 1,
    borderRadius: 40,
  },
  submitButtonClicked: {
    // color: "white",
    // backgroundColor: "#3B6665",
    borderColor: "#3B6665",
    height: "65%",
    width: "46%",
    marginLeft: 155,
    marginTop: 30,
    padding: 5,
    borderWidth: 1,
    borderRadius: 40,
    color: "#413855",
  },
});
