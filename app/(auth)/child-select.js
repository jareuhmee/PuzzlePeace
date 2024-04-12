import { useState, useEffect } from "react";
import { router } from "expo-router";
import { Link } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";
import { defaultStyles } from "../../constants/Styles.js";

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

  const renderChildButton = ({ childID, childName }) => {
    return (
      <View
        key={childID}
        style={{
          flexDirection: "row-reverse",
          alignItems: "center",
          marginBottom: 5,
          width: 250,
          marginLeft: 30,
        }}
      >
        <TouchableOpacity
          style={[defaultStyles.btn, { flex: 1 }]}
          onPress={() => {
            router.replace(`(tabs)/${childID}/home`);
          }}
        >
          <Text style={defaultStyles.btnText}>{childName}</Text>
        </TouchableOpacity>
        <View style={styles.profilePicCircle}>
          {/* profile picture content here */}
        </View>
      </View>
    );
  };

  const styles = {
    profilePicCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: "#3a644b",
      marginRight: 5,
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>Child Select</Text>
      <View style={defaultStyles.separator3} />

      {children.map(renderChildButton)}
      
      <Link href="/(auth)/child-add" asChild>
      <TouchableOpacity
        style={defaultStyles.addChildBtn}
      >
        <Text style={defaultStyles.btnText}>Add Child</Text>
      </TouchableOpacity>
      </Link>
    </View>
  );
}

// Mock Data: List of children
const mockChildren = {
  0: "Alice",
  1: "Bryan",
  2: "Cole",
  3: "Jemar",
  4: "John",
  5: "Maddy",
};
