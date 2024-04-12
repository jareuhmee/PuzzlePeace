import React, { useState } from "react";
import { TextInput, TouchableOpacity, Text, View, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { defaultStyles } from "../../constants/Styles.js";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import { createChild } from "../../firebase/requests.js";
import { auth } from "../../firebase/firebase.js";

export default function ChildAdd() {
  const userID = auth.currentUser.uid;

  const [childName, setChildName] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [profilePicture] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDoneButton, setShowDoneButton] = useState(false);

  const handleInputChange = (text) => {
    setChildName(text);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setBirthday(currentDate);
    setShowDoneButton(true); // shows the "Done" button only when a date is selected
  };

  const handleProfilePictureSelect = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      profilePicture(pickerResult.uri);
    }
  };

  const handleSubmit = () => {
    // for now just logging to console
    console.log("Child's Name:", childName);
    console.log("Birthday:", birthday);
    console.log("Profile Picture:", profilePicture);
    router.replace("/(auth)/child-select");

    createChild(childName, birthday, "", "", "", [], [userID]);
  };

  const handleDonePress = () => {
    setShowDatePicker(false); // Hides the date picker only when "Done" is pressed
    setShowDoneButton(false); // Hide the "Done" button once user is finished picking date
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>Add Child</Text>
      <View style={defaultStyles.separator} />

      <View
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          marginBottom: 20,
          width: "80%",
        }}
      >
        <TextInput
          style={{ padding: 15, color: "#3a644b" }}
          value={childName}
          onChangeText={handleInputChange}
          placeholder="Enter Child's Name"
          placeholderTextColor="#3a644b"
          returnKeyType="done"
        />
        <View
          style={{
            backgroundColor: "#e9e9ea",
            borderRadius: 100,
            height: 1,
            width: "100%",
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          setShowDatePicker(true);
          setShowDoneButton(true);
        }}
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          marginBottom: 20,
          width: "80%",
        }}
      >
        <Text style={{ padding: 15, color: "#3a644b" }}>
          Birthdate: {birthday.toLocaleDateString()}
        </Text>
        {showDoneButton && showDatePicker && (
          <Text
            style={{
              position: "absolute",
              right: 10,
              top: 15,
              color: "#3a644b",
            }}
            onPress={handleDonePress}
          >
            Done
          </Text>
        )}
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display="inline"
          onChange={handleDateChange}
        />
      )}

      <View
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          marginBottom: 25,
          width: "80%",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
          onPress={handleProfilePictureSelect}
        >
          <Text
            style={{
              marginRight: 10,
              marginLeft: 17,
              color: "#3a644b",
              marginBottom: 10,
            }}
          >
            Profile Picture:
          </Text>
          {profilePicture ? (
            <Image
              source={{ uri: profilePicture }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlusCircle}
              size={24}
              color="#3a644b"
              style={{ marginBottom: 10 }}
            />
          )}
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#e9e9ea",
            borderRadius: 100,
            height: 1,
            width: "100%",
          }}
        />
      </View>

      
      <TouchableOpacity
        style={defaultStyles.btn}
        onPress={handleSubmit}
      >
        <Text style={defaultStyles.btnText}>Customize Triggers</Text>
      </TouchableOpacity>

      <View style={defaultStyles.separator2} />

      <TouchableOpacity
        style={defaultStyles.addChildBtn}
        onPress={handleSubmit}
      >
        <Text style={defaultStyles.btnText}>Submit</Text>
      </TouchableOpacity>

    </View>
  );
}
