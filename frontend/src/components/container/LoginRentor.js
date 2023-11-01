import { Image } from "@rneui/themed";
import React, { useReducer, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { InputUI } from "../UI/input/InputUI";
import ButtonUI from "../UI/button/ButtonUI";
import { rentorCredentials } from "../static/constants";
import LoginRentorReducer from "../reducers/LoginRentorReducer";
import login from "../hooks/login";
const LoginRentor = ({ navigation }) => {
  const [credentials, dispatch] = useReducer(LoginRentorReducer, {
    email: "madhu@gmail.com",
    password: "madhu123",
  });
  login(credentials.email, credentials.password);

  const callLoginApi = () => {
    console.log("credentials:" + JSON.stringify(credentials));
    navigation.navigate("login");
  };

  const saveCredentials = (value, type) => {
    // dispatch({value:value,type:type})
  };
  var [isSubmitPress, setIsSubmitPress] = useState(false);

  var touchPropsSubmit = {
    underlayColor: "#B1D4D2",
    style: isSubmitPress ? styles.submitButtonClicked : styles.submitButton,
    onHideUnderlay: () => setIsSubmitPress(false),
    onShowUnderlay: () => setIsSubmitPress(true),
  };
  const logo = require("../../../assets/favicon.png");
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.image}></Image>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Glad to see you back!</Text>
      </View>
      {/* <Image source={{ uri:}}></Image> */}

      <InputUI
        //   placeholder='Type your email'
        selectedItems={saveCredentials}
        type={rentorCredentials.email}
        coustomStyle={styles}
        value="madhu@gmail.com"
      />
      <InputUI
        placeholder=" Password"
        selectedItems={saveCredentials}
        type={rentorCredentials.password}
        coustomStyle={styles}
        value="madhu123"
        secureTextEntry={true}
      />
      <View style={styles.buttonContainer}>
        <ButtonUI
          item={{ value: "Sign in" }}
          selectedItems={callLoginApi}
          customStyle={styles.customStyle}
          touchProps={touchPropsSubmit}
        />
      </View>
    </View>
  );
};

export default LoginRentor;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: "20%",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  container: {
    height: "70%",
    justifyContent: "center",
    margin: 10,
    padding: 5,
  },
  subContainer: {
    alignItems: "center",
    height: 60,
  },
  textInput: {
    fontSize: 20,
    height: 30,
    width: "90%",
    borderRadius: 15,
    textAlign: "justify",
    height: 50,
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
    fontWeight: "light",
    fontSize: "20",
  },
  textContainer: {
    margin: 30,
    height: "10%",
    justifyContent: "center",
  },
  title: {
    fontWeight: "300",
    fontSize: 25,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#36827F",
    borderColor: "#36827F",
    height: "30",
    width: "80%",
    marginLeft: 40,
    marginTop: 20,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 40,
  },
  submitButtonClicked: {
    borderColor: "#B1D4D2",
    height: "30",
    width: "80%",
    marginLeft: 40,
    marginTop: 20,
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
  },
});
