import React, { useEffect, useReducer, useState } from "react";
import { firebaseConfig } from "../hooks/firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import LottieView from "lottie-react-native";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ImageReducer from "../reducers/ImageReducer";
import ButtonUI from "../UI/button/ButtonUI";
import CoverImageReducer from "../reducers/CoverImageReducer";
const CoverImagePicker = ({ navigation, route }) => {
  const ownerGivenData = route.params;
  console.log("data in coverImage::" + JSON.stringify(ownerGivenData));
  const [images, dispatch] = useReducer(CoverImageReducer, {});
  const [ownerData, setOwnerData] = useState();
  const [firebaseImages, setFirebaseImage] = useState(null);
  const cameraPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("Need Gallery Access Permission");
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  useEffect(() => {
    cameraPermission();
  }, []);

  var [isSubmitPress, setIsSubmitPress] = useState(false);
  var [isCameraPress, setIsCamerasPress] = useState(false);

  var touchPropsSubmit = {
    underlayColor: "#B1D4D2",
    style: isSubmitPress ? styles.submitButtonClicked : styles.submitButton,
    onHideUnderlay: () => setIsSubmitPress(false),
    onShowUnderlay: () => setIsSubmitPress(true),
  };
  var touchPropsCamera = {
    underlayColor: "#FBEDEA",
    style: isCameraPress ? styles.CameraButtonClicked : styles.CameraButton,
    onHideUnderlay: () => setIsCamerasPress(false),
    onShowUnderlay: () => setIsCamerasPress(true),
  };

  const selectImage = async (imageNumber) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 0,
    });

    console.log("images seleted:" + JSON.stringify(result.assets[0]));

    if (!result.canceled) {
      dispatch({ type: imageNumber, value: result.assets[0].uri });
    }
  };
  useEffect(() => {
    setOwnerData({ ...ownerGivenData, coverimages: images });
    console.log("images:::" + JSON.stringify(images));
  }, [images]);
  const uploadImages = () => {
    console.log("upload coverImage", JSON.stringify(ownerData));
    navigation.navigate("post_ready", ownerData);
  };
  const saveImages = async () => {
    setFirebaseImage(true);
    //     console.log("WE ARE INSIDE", ownerData.images);
    //     if (ownerData.images) {
    //       for (const imageKey in ownerData.images) {
    //         const imageUri = ownerData.images[imageKey];

    //         if (imageUri) {
    //           const blob = await new Promise((resolve, reject) => {
    //             const xhr = new XMLHttpRequest();
    //             xhr.onload = function () {
    //               resolve(xhr.response);
    //             };

    //             xhr.onerror = function (e) {
    //               console.log(e);
    //               reject(new TypeError("Network request failed"));
    //             };
    //             xhr.responseType = "blob";
    //             xhr.open("GET", imageUri, true);
    //             xhr.send(null);
    //           });
    //           //console.log("line 60");

    //           const fileRef = ref(getStorage(), `RentO/${imageUri}`);
    //           const result1 = await uploadBytes(fileRef, blob);
    //           // console.log("line 64");
    //           // We're done with the blob, close and release it
    //           blob.close();
    //           //console.log("line 67");
    //           const h = await getDownloadURL(fileRef);
    //           console.log(h);
    //           ownerData.images[imageKey] = h;
    //         }
    //       }
    //     }
    setFirebaseImage(false);
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>
        Start by clicking on each area to capture or upload a picture
      </Text>
      <View>
        <View style={styles.firstContainer}>
          <TouchableWithoutFeedback onPress={() => selectImage("image1")}>
            <View>
              <View style={styles.imageContainer1}>
                {!images?.image1 ? (
                  <MaterialCommunityIcons name="camera" size="40" />
                ) : (
                  <Image source={{ uri: images.image1 }} style={styles.image} />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.container}>
          <View style={styles.image2Container}>
            <TouchableWithoutFeedback onPress={() => selectImage("image2")}>
              <View>
                <View style={styles.imageContainer}>
                  {!images?.image2 ? (
                    <MaterialCommunityIcons name="camera" size="40" />
                  ) : (
                    <Image
                      source={{ uri: images.image2 }}
                      style={styles.image}
                    />
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <TouchableWithoutFeedback onPress={() => selectImage("image3")}>
              <View>
                <View style={styles.imageContainer}>
                  {!images?.image3 ? (
                    <MaterialCommunityIcons name="camera" size="40" />
                  ) : (
                    <Image
                      source={{ uri: images.image3 }}
                      style={styles.image}
                    />
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>

      {images.image3 && firebaseImages == null && (
        <ButtonUI
          item={{ value: "Upload Images" }}
          selectedItems={saveImages}
          customStyle={styles.customStyleCamera}
          touchProps={touchPropsCamera}
        />
      )}
      {firebaseImages && (
        <LottieView
          autoPlay
          style={{
            width: "100%",
            height: "45%",
            backgroundColor: "white",
            marginLeft: 30,
            marginBottom: 100,
          }}
          source={require("../../../assets/RentoO - Loading Animation.json")}
          // source={{
          //   uri: "https://lottie.host/fde45e7c-36a5-493d-ae49-80631ac15f5f/avgoduAK0g.json",
          // }}
        />
      )}
      {!firebaseImages && firebaseImages != null && (
        <ButtonUI
          item={{ value: "Continue" }}
          selectedItems={uploadImages}
          customStyle={styles.customStyle}
          touchProps={touchPropsSubmit}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  firstContainer: {
    marginLeft: "18%",
  },

  title: {
    fontFamily: "Mulish_700Bold",
    fontSize: 20,
    marginTop: "15%",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 70,
    textAlign: "center",
  },
  mainContainer: {
    alignItems: "center",
    marginTop: "5%",
    padding: "3px",
  },
  container: {
    flexDirection: "row",
    margin: 10,
    // alignItems: 'center',
    justifyContent: "space-around",
    // height: "100%",
    // backgroundColor: "pink",
    width: "100%",
  },
  customStyleCamera: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  imageContainer1: {
    backgroundColor: "#FBEDEA",
    borderColor: "#ED7861",
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 200,
    overflow: "hidden",
    marginBottom: 10,
  },
  imageContainer: {
    backgroundColor: "#FBEDEA",
    borderColor: "#ED7861",
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    overflow: "hidden",
    marginBottom: 10,
  },
  image2Container: {
    marginLeft: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    marginTop: 5,
    fontWeight: 400,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#36827F",
    borderColor: "#36827F",
    height: "50",
    width: "80%",
    marginLeft: 40,
    marginTop: 70,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 40,
    marginLeft: 20,
  },
  submitButtonClicked: {
    backgroundColor: "#B1D4D2",
    borderColor: "#B1D4D2",
    height: "50",
    width: "80%",
    marginLeft: 40,
    marginTop: 70,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 40,
    marginLeft: 20,
  },
  customStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  CameraButton: {
    backgroundColor: "#36827F",
    borderColor: "#36827F",
    height: "50",
    width: "80%",
    marginLeft: 40,
    marginTop: 70,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 40,
    marginLeft: 20,
  },
  CameraButtonClicked: {
    backgroundColor: "#B1D4D2",
    borderColor: "#B1D4D2",
    height: "50",
    width: "80%",
    marginLeft: 40,
    marginTop: 70,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 40,
    marginLeft: 20,
  },
});
export default CoverImagePicker;