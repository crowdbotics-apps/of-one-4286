var React = require("react-native");
var { Dimensions } = React;

import commonColor from "../../theme/variables/commonColor";
var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export default {
  header: {
    height: 33,
    color: "#d9a91a",
    fontFamily: "Lato",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 99,
    marginBottom: 18,
    marginLeft: 30,
  },
  headerWrap: {
    height: 150,
    borderColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 6,
    borderWidth: '1',
    backgroundColor: "#f2f2f2",

  },
  button: {
    width: 146,
    height: 36,
    borderRadius: 24,
    borderColor: "#d9a91a",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "#f2f2f2",
    //marginLeft: deviceWidth - 175,
    marginTop: 50,
  },
  buttonText: {
    color: "#d9a91a",
    fontFamily: "Lato",
    fontSize: 12,
    fontWeight: "400"
  },
  close: {
    marginTop: 30,
    marginLeft: 30,
    marginBottom: 30
  },
  dateInput: {
    width: deviceWidth - 60,
                height: 45,
                borderRadius: 10,
                borderColor: "#bdbfbf",
                borderStyle: "solid",
                borderWidth: 2,
                paddingLeft: 15
  }

};
