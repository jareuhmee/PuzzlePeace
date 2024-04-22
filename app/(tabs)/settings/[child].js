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
import { useLocalSearchParams } from "expo-router";

import { auth } from "../../../firebase/firebase.js";
import { getChild } from "../../../firebase/requests.js";

export default function ChildSettings() {
  const { child } = useLocalSearchParams();
  const [currChild, setCurrChild] = useState({});

  useEffect(() => {
    getChild(child)
      .then((childData) => {
        setCurrChild(childData || {});
      })
      .catch((error) => {
        console.error("Error fetching child:", error);
      });
  }, [child]);

  const account = [
    {
      name: "Name",
    },
    {
      name: "Birthday",
    },
    {
      name: "Picture",
    },
  ];

  const access = [
    {
      name: "Share Child Access",
    },
  ];

  const customize = [
    // {
    //   name: "Relation to Child",
    //   link: `settings/${child}`,
    // },
    {
      name: "Triggers, Behaviors, & Resolutions",
      link: `/(customize)/${child}/customize`,
    },
  ];

  const primary = [
    {
      name: "Remove Child Access",
    },
    {
      name: "Change Primary Caregiver",
    },
    {
      name: "Delete Child Profile",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Profile Settings */}
        <Text style={styles.header}>{currChild.childName}'s Profile</Text>
        <View style={styles.block}>
          <FlatList
            data={account}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item}>
                <Text style={styles.text}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color="gray" />
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Customize */}
        <Text style={styles.header}>Customization</Text>
        <View style={styles.block}>
          <FlatList
            data={customize}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => router.navigate(item.link)}
              >
                <Text style={styles.text}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color="gray" />
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Child Access */}
        {/* <View style={styles.block}>
          <FlatList
            data={access}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item}>
                <Text style={styles.text}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color="gray" />
              </TouchableOpacity>
            )}
          />
        </View> */}

        {/* Primary Caregiver Settings */}
        {/* <View style={styles.block}>
          <FlatList
            data={primary}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item}>
                <Text style={styles.text}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color="gray" />
              </TouchableOpacity>
            )}
          />
        </View> */}
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  block: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 14,
    marginVertical: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  header: {
    fontSize: 22,
    fontFamily: "DMSans",
    color: Colors.primary,
    marginHorizontal: 24,
    marginTop: 20,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "lightgray",
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    flex: 1,
    fontFamily: "DMSans",
  },
});
