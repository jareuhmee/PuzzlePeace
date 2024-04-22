import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { defaultStyles } from "../../../constants/Styles.js";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
//import * as Haptics from "expo-haptics";
import Colors from "../../../constants/Colors.js";
import { getChild } from "../../../firebase/requests.js";

export default function Customize() {
  const { child } = useLocalSearchParams();

  const [commonTriggers, setCommonTriggers] = useState([]);
  const [commonBehaviors, setCommonBehaviors] = useState([]);
  const [commonResolutions, setCommonResolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChild(child)
      .then((childData) => {
        setCommonTriggers(childData.commonTriggers || []);
        setCommonBehaviors(childData.commonBehaviors || []);
        setCommonResolutions(childData.commonResolutions || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching entry:", error);
      });
  }, [child]);

  const handleDone = () => {
    router.back();
  };

  return (
    <View style={defaultStyles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View style={styles.box}>
            <Text style={defaultStyles.h1}>Triggers</Text>
            <View style={styles.behaviorContainer}>
              {commonTriggers.map((trigger) => (
                <View key={trigger} style={styles.behavior}>
                  <Text key={trigger} style={styles.behaviorText}>
                    {trigger}
                  </Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => router.navigate("./add-triggers")}
            >
              <Text style={defaultStyles.btnText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
            <Text style={defaultStyles.h1}>Behaviors</Text>
            <View style={styles.behaviorContainer}>
              {commonBehaviors.map((behavior) => (
                <View key={behavior} style={styles.behavior}>
                  <Text key={behavior} style={styles.behaviorText}>
                    {behavior}
                  </Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => router.navigate("./add-behaviors")}
            >
              <Text style={defaultStyles.btnText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
            <Text style={defaultStyles.h1}>Resolutions</Text>
            <View style={styles.behaviorContainer}>
              {commonResolutions.map((resolution) => (
                <View key={resolution} style={styles.behavior}>
                  <Text key={resolution} style={styles.behaviorText}>
                    {resolution}
                  </Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => router.navigate("./add-resolutions")}
            >
              <Text style={defaultStyles.btnText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              defaultStyles.signUpPageCABtn,
              { alignSelf: "center", marginBottom: 20 },
            ]}
            onPress={handleDone}
          >
            <Text style={defaultStyles.btnText}>Done</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 2,
    width: "90%",
  },
  addBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.tint,
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  behaviorContainer: {
    paddingTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  behavior: {
    padding: 5,
    borderRadius: 2,
    backgroundColor: "#eee",
  },
  behaviorText: {
    fontSize: 11,
    fontFamily: "DMMono",
    color: "black",
  },
});
