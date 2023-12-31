import React, { useEffect, useReducer, useState } from "react";
import { firebaseConfig } from "../hooks/firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import LottieView from "lottie-react-native";
import CameraColor from "../../../assets/CameraColor.svg";
import RentoBack from "../../../assets/rentoBack.svg";

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
  const [images, dispatch] = useReducer(CoverImageReducer, []);
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

    // console.log("images seleted:" + JSON.stringify(result.assets[0]));

    if (!result.canceled) {
      dispatch({ type: imageNumber, value: result.assets[0].uri });
    }
  };
  useEffect(() => {
    setOwnerData({ ...ownerGivenData, coverimages: images });
    // console.log("images:::" + JSON.stringify(images));
  }, [images]);
  const uploadImages = () => {
    // console.log("upload coverImage", JSON.stringify(ownerData));
    navigation.navigate("post_ready", ownerData);
  };
  const saveImages = async () => {
    setFirebaseImage(true);
    // console.log("WE ARE INSIDE", ownerData.images);
    //if (ownerData.images) {
    for (let i = 0; i < 4; i++) {
      const imageUri = ownerData.coverimages[i];

      if (imageUri) {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };

          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", imageUri, true);
          xhr.send(null);
        });
        //console.log("line 60");

        const fileRef = ref(getStorage(), `RentO/${imageUri}`);
        const result1 = await uploadBytes(fileRef, blob);
        // console.log("line 64");
        // We're done with the blob, close and release it
        blob.close();
        //console.log("line 67");
        const h = await getDownloadURL(fileRef);
        console.log(h);
        ownerData.coverimages[i] = h;
      }
    }
    // }
    setFirebaseImage(false);
  };
  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>
          Start by clicking on each area to capture or upload a picture
        </Text>
        <View>
          <View style={styles.firstContainer}>
            <TouchableWithoutFeedback onPress={() => selectImage("image1")}>
              <View>
                <View style={styles.imageContainer1}>
                  {!images[0] ? (
                    <CameraColor width={60} height={60} />
                  ) : (
                    <Image source={{ uri: images[0] }} style={styles.image} />
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
                    {!images[1] ? (
                      <CameraColor width={60} height={30} />
                    ) : (
                      <Image source={{ uri: images[1] }} style={styles.image} />
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View>
              <TouchableWithoutFeedback onPress={() => selectImage("image3")}>
                <View>
                  <View style={styles.imageContainer}>
                    {!images[2] ? (
                      <CameraColor width={60} height={30} />
                    ) : (
                      <Image source={{ uri: images[2] }} style={styles.image} />
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View>
              <TouchableWithoutFeedback onPress={() => selectImage("image4")}>
                <View>
                  <View style={styles.imageContainer}>
                    {!images[3] ? (
                      <CameraColor width={60} height={30} />
                    ) : (
                      <Image source={{ uri: images[3] }} style={styles.image} />
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>

        {images[3] && firebaseImages == null && (
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
              height: "55%",
              backgroundColor: "white",
              marginLeft: 35,
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
      <RentoBack
        style={{
          zIndex: -1,
          position: "absolute",
          top: 630,
          left: -290,
          opacity: 0.8,
        }}
        width={990}
        height={270}
      />
    </>
  );
};
const styles = StyleSheet.create({
  firstContainer: {
    marginLeft: "18%",
  },

  title: {
    color: "#413855",
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
    backgroundColor: "#F6D6CF",
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
    backgroundColor: "#F6D6CF",
    borderColor: "#ED7861",
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
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
    backgroundColor: "#3B6665",
    borderColor: "#3B6665",
    height: "50",
    width: "80%",
    marginLeft: 40,
    marginTop: 70,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 40,
    marginLeft: 5,
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
    marginLeft: 5,
  },
  customStyle: {
    color: "white",
    fontSize: 20,
    fontFamily: "Mulish_700Bold",
  },
  CameraButton: {
    backgroundColor: "#3B6665",
    borderColor: "#3B6665",
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
    borderColor: "#ED7861",
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
