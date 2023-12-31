import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import data from "../hooks/data";
import DataList from "../list/DataList";
import { StatusBar } from "expo-status-bar";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
const Listings = ({ navigation }) => {
  const LOCAL = "http://127.0.0.1:5500/map_list_view/index.html";
  const navigation1 = useNavigation();
  const handleWebViewMessage = (event) => {
    const message = event.nativeEvent.data;
    // console.log("Received message from WebView:", event.nativeEvent.data);
    // console.log("clicked");
    // console.log(message);
    navigation1.navigate("Screen2", { message });
  };
  showFilter = () => {
    navigation.navigate("rentor");
  };
  function onMessage(data) {
    // console.log("data:" + data.nativeEvent.data);
    // alert(data.nativeEvent.data);
    showlistingDets(data.nativeEvent.data);
  }
  //trr
  showlistingDets = (id) => {
    navigation.navigate("listing_details", id);
  };

  const [listData, setListData] = useState();
  data(setListData);
  return (
    <>
      <WebView
        style={{ flex: 1 }}
        source={{ uri: LOCAL }}
        scrollEnabled={false}
        bounces={false}
        javaScriptEnabled={true} // Enable JavaScript execution
        allowsWebContentsDebugging={true}
        onMessage={onMessage}
        mixedContentMode="compatibility"
      />
    </>
  );
};
export default Listings;
