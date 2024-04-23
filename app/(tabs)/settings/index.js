import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import Colors from "../../../constants/Colors.js";
import { defaultStyles } from "../../../constants/Styles.js";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { getChild, getUser } from "../../../firebase/requests.js";
import { auth } from "../../../firebase/firebase.js";

export default function Settings() {
  const userID = auth.currentUser.uid;
  const [children, setChildren] = useState([]);

  useEffect(() => {
    getUser(userID)
      .then((userData) => {
        const childrenArray = Object.entries(userData.children || []);
        const promises = childrenArray.map(([childID]) =>
          getChild(childID).then((childData) => ({ childID, ...childData }))
        );
        Promise.all(promises)
          .then((childDataArray) => {
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

  const sendResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      setResetSent(true);
    } catch (error) {
      console.log(error);
      alert("Password reset failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Account Settings */}
        <Text style={styles.header}>Account Settings</Text>
        <View style={styles.block}>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.text}>Name</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity style={styles.item}>
            <Text style={styles.text}>Picture</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
          <View style={styles.separator} />

          {/* <TouchableOpacity style={styles.item}>
            <Text style={styles.text}>Email</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
          <View style={styles.separator} /> */}

          <TouchableOpacity style={styles.item}>
            <Text style={[styles.text, { color: Colors.primary }]}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>

        {/* Children Settings */}
        <Text style={styles.header}>Children Settings</Text>
        <View style={styles.block}>
          <FlatList
            data={children}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => router.navigate(`settings/${item.childID}`)}
              >
                <Text style={styles.text}>{item.childName}</Text>
                <Ionicons name="chevron-forward" size={20} color="gray" />
              </TouchableOpacity>
            )}
          />
          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              router.navigate("/(auth)/child-add");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          >
            <Text style={styles.text}>Add Child +</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={defaultStyles.btnContainer}>
          <TouchableOpacity
            style={defaultStyles.btn}
            onPress={() => {
              auth.signOut();
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          >
            <Text style={defaultStyles.btnText}>Logout</Text>
          </TouchableOpacity>
        </View>
        {/* Logout */}
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  block: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 14,
    marginTop: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "lightgray",
    marginLeft: 10,
  },
  header: {
    fontSize: 22,
    fontFamily: "DMSans",
    color: Colors.primary,
    marginHorizontal: 24,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    flex: 1,
    fontFamily: "DMSans",
  },
});
