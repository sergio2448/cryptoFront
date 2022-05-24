import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    height: 600,
    marginBottom: 50,
    backgroundColor: "#5856D6",
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  label: {
    marginTop: 25,
    color: "white",
    fontWeight: "bold",
  },
  inputField: {
    color: "white",
    fontSize: 20,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    borderWidth: 2,
    borderColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
    marginTop: 12,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  buttonReturn: {
    position: "absolute",
    top: 50,
    left: 20,
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
});

export default loginStyles;
