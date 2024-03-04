import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { auth } from "../../../firebase/firebase.js";
import { router } from "expo-router";
import Colors from "../../../constants/Colors.js";
import { defaultStyles } from "../../../constants/Styles.js";
import { Ionicons } from "@expo/vector-icons";

export default function Settings() {
  const account = [
    {
      name: "Change Name",
    },
    {
      name: "Change Picture",
    },
    {
      name: "Change Email",
    },
    {
      name: "Change Password",
    },
  ];

  // Mock Data: List of children
  const mockChildren = [
    {
      name: "Alice",
    },
    {
      name: "Bryan",
    },
    {
      name: "Cole",
    },
    {
      name: "Jemar",
    },
    {
      name: "John",
    },
    {
      name: "Maddy",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Children Settings */}
        <View style={styles.block}>
          <FlatList
            data={mockChildren}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => router.navigate(`settings/${item.name}`)}
              >
                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color="gray" />
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Account Settings */}
        <View style={styles.block}>
          <FlatList
            data={account}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item}>
                {/* <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                /> */}

                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color="gray" />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={defaultStyles.btnContainer}>
          <TouchableOpacity
            style={defaultStyles.btn}
            onPress={() => auth.signOut()}
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
    marginTop: 20,
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
});
