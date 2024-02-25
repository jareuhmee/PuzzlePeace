import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 36,
    fontFamily: "DMSans",
    color: "#3a644b"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    marginVertical: 4,
    height: 50,
    width: 250,
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
    height: 50,
    width: 200,
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
    backgroundColor: Colors.primary,
    borderColor: "white",
    borderRadius: 25
  },
  btnText: {
    fontSize: 16,
    fontFamily: "DMSans",
    color: "#FAF9F6"
  },
  loginText: {
      fontSize: 16,
      fontFamily: "DMSans",
      color: "#3a644b",
      marginRight: 8,
      marginTop: 18
  },
  loginTextBold: {
    fontSize: 16,
    fontFamily: "DMSans",
    color: "#3a644b",
    marginRight: 8,
    marginTop: 18,
},
  btnContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
});
