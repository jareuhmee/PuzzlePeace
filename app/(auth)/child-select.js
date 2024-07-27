import { useState, useEffect } from "react";
import { router } from "expo-router";
import { TouchableOpacity, Text, View, Image, ScrollView } from "react-native";
import { defaultStyles } from "../../constants/Styles.js";
import * as Haptics from "expo-haptics";

import { getChild, getUser } from "../../firebase/requests.js";
import { auth } from "../../firebase/firebase.js";

export default function ChildSelect() {
  const userID = auth.currentUser.uid;
  const [children, setChildren] = useState([]);

  useEffect(() => {
    getUser(userID)
      .then((userData) => {
        const childrenArray = Object.entries(userData.children || []);
        // Fetch child data for each child ID
        const promises = childrenArray.map(([childID]) =>
          getChild(childID).then((childData) => ({ childID, ...childData }))
        );
        Promise.all(promises)
          .then((childDataArray) => {
            // Set the array with both childID and childData
            setChildren(childDataArray);
          })
          .catch((error) => {
            console.error("Error fetching child data:", error);
          });
      })
      .catch((error) => {
        console.error("Error getting user:", error);
      });
  }, [userID]);

  const renderChildButton = ({ childID, childName, profilePicture }) => {
    return (
      <View
        key={childID}
        style={styles.childButtonContainer}
      >
        <TouchableOpacity
          style={[defaultStyles.btn, { flex: 1 }]}
          onPress={() => {
            router.replace(`(tabs)/${childID}/home`);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }}
        >
          <Text style={defaultStyles.btnText}>{childName}</Text>
        </TouchableOpacity>

        <View style={styles.profilePicCircle}>
          {profilePicture ? (
            <Image
              source={{ uri: profilePicture }}
              style={{ width: 41, height: 41, borderRadius: 23 }}
            />
          ) : (
            <Text>No Pic!</Text>
          )}
        </View>
      </View>
    );
  };

  const styles = {
    profilePicCircle: {
      width: 45,
      height: 45,
      borderRadius: 25,
      borderWidth: 2.5,
      borderColor: "#faf9f6",
      marginRight: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    scrollView: {
      maxHeight: 300, 
      paddingRight: 15
    },
    scrollViewContent: {
      paddingVertical: 10,
    },
    childButtonContainer: {
      flexDirection: "row-reverse",
      alignItems: "center",
      marginLeft: 15,
      marginBottom: 16,
      paddingHorizontal: 10,
      width: 280,
      backgroundColor: "#e4f0e7", // light background color
      borderRadius: 10, 
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>Child Select</Text>
      <View style={defaultStyles.separator3} />

      {children.length > 4 ? (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          {children.map(renderChildButton)}
        </ScrollView>
      ) : (
        <View>
          {children.map(renderChildButton)}
        </View>
      )}

      <TouchableOpacity
        style={defaultStyles.addChildBtn}
        onPress={() => {
          router.navigate("/(auth)/child-add");
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
      >
        <Text style={defaultStyles.btnText}>Add Child</Text>
      </TouchableOpacity>
    </View>
  );
}
