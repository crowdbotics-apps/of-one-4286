var React = require("react-native");
var { Dimensions } = React;

import commonColor from "../../theme/variables/commonColor";
var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export default {
  swiperDot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 20
  },
  swiperActiveDot: {
    backgroundColor: commonColor.brandPrimary,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 20
  },
  swiperSlidesView: {
    flex: 1,
    marginHorizontal: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  loginText: {
    fontSize: 18,
    color: commonColor.contentTextColor,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10
  },
  swiperImageView: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden"
  },
  image1: {
    height: deviceHeight / 2.5,
    width: deviceWidth / 1.7,
    marginBottom: 30
  },
  image: {
    height: deviceHeight / 2,
    width: deviceWidth / 1.7
  },
  img1: {
    height: deviceHeight / 4,
    width: deviceWidth / 1.7
  },
  img2: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FFF"
  },
  loginBtn: {
    width: deviceWidth - 60,
    alignSelf: "center",
    backgroundColor: "#3B5998",
    marginTop: 150
  },
  loginBtnText: {
    fontSize: 15,
    fontWeight: "500"
  },
  noteView: {
    marginHorizontal: 30,
    bottom: 10
  },
  noteText: {
    color: commonColor.lightTextColor,
    fontSize: 12,
    textAlign: "center"
  },
  brand: {
    height: 71,
    color: "#ffffff",
    fontFamily: "Lato",
    fontSize: 17,
    fontStyle: "italic",
    // Text style for "Of One"
    fontFamily: "Lato_Bold",
    fontSize: 48,
    fontWeight: "700",
    textAlign: "center"
  },
  subBrand: {
    height: 71,
    color: "#ffffff",
    fontFamily: "Lato",
    fontSize: 17,
    fontStyle: "italic"
  },
  note: {
    height: 15,
    color: "#bdbfbf",
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: "400",
    letterSpacing: 0.05,
    width: deviceWidth - 70
  }
};
