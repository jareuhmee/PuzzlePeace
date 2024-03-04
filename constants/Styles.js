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
    color: "#3a644b",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    marginVertical: 4,
    height: 55,
    width: 315,
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#ffffff",
    fontFamily: "DMMono",
    fontSize: 18,
    borderBottomColor: "#F2F2F2",
    borderLeftColor: "white",
    borderRightColor: "white",
    borderTopColor: "white",
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
    borderRadius: 25,
  },
  btnText: {
    fontSize: 16,
    fontFamily: "DMSans",
    color: "#FAF9F6",
  },
  loginText: {
    fontSize: 16,
    fontFamily: "DMSans",
    color: "#3a644b",
    marginRight: 8,
    marginTop: 18,
  },
  loginTextBold: {
    fontSize: 16,
    fontFamily: "DMSansExtraBold",
    color: "#3a644b",
    marginRight: 8,
    marginTop: 18,
    textDecorationLine: "underline",
  },
  btnContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  loginPageLogIn: {
    fontSize: 36,
    fontFamily: "DMMono",
    color: "#3a644b",
  },
  loginPageLoginBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
    height: 56,
    width: 328,
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
    backgroundColor: Colors.primary,
    borderColor: "white",
    borderRadius: 25,
    marginBottom: 170,
  },
  iconOnLogin: {
    color: "#3a644b",
    marginBottom: 22,
  },
  loginPageForgotBtn: {
    fontSize: 16,
    fontFamily: "DMSans",
    color: "#3a644b",
    position: "absolute",
    bottom: 120,
    left: -60,
  },
});
