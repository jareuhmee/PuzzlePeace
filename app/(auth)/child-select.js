import { useState, useEffect } from "react";
import { router } from "expo-router";
import { TouchableOpacity, Text, View, Image } from "react-native";
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

  const renderChildButton = ({ childID, childName, profilePicture }) => {
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
                  {profilePicture ? (
                    <Image
                      source={{ uri: profilePicture }}
                      style={{ width: 36, height: 36, borderRadius: 18 }}
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
      <View style={defaultStyles.separator} />

      {children.map(renderChildButton)}

      <TouchableOpacity
        style={defaultStyles.addChildBtn}
        onPress={() => router.replace("/(auth)/child-add")}
      >
        <Text style={defaultStyles.btnText}>Add Child</Text>
      </TouchableOpacity>
    </View>
  );
}



