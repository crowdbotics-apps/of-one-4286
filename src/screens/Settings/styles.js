import { Platform } from "react-native";
import commonColor from "../../theme/variables/commonColor";
var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

export default {
  wrapper: {
    flex: 1,
    backgroundColor: "#00000099",
    marginTop: 1
  },
  deckswiperView: {
    marginHorizontal: 15,
    marginTop: 15,
    flex: 1
  },
  deckswiperImageCarditem: {
    borderTopLeftRadius: 10,
    overflow: "hidden",
    borderTopRightRadius: 10
  },
  cardMain: {
    height:
      width < 330
        ? Platform.OS === "ios"
          ? height / 1.8
          : height / 1.9
        : Platform.OS === "ios"
          ? height / 1.6
          : height / 1.75,
    flex: 1,
    width: null
  },
  deckswiperDetailsCarditem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: Platform.OS === "ios" ? 15 : 10,
    paddingBottom: 5
  },

  subtextLeft: {
    fontSize: 12,
    color: commonColor.contentTextColor,
    fontWeight: "600",
    opacity: 0.879,
    fontFamily: "arial"
  },
  iconRight: {
    color: Platform.OS === "ios" ? "#a3a3a3" : commonColor.contentTextColor,
    paddingRight: 4
  },
  subtextRight: {
    color: commonColor.contentTextColor,
    fontWeight: "600",
    opacity: 0.879,
    fontFamily: "arial",
    paddingBottom: 4
  },
  bottomGrid: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0
  },
  bottomRowStyle: {
    marginTop: Platform.OS === "android" ? 5 : 10,
    justifyContent: "space-around"
  },
  bottomRoundedSmallPills: {
    borderRadius: 25,
    marginTop: 8,
    height: 50,
    width: 50,
    backgroundColor: "white",
    alignItems: "center",
    // paddingTop: 10,
    paddingLeft: 8,
    paddingRight: 8,
    elevation: 3,
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: "#aaa",
    borderWidth: Platform.OS === "ios" ? undefined : 0.2,
    shadowOffset: {
      height: 2,
      width: 1
    }
  },
  bottomRoundedPills: {
    borderRadius: 33,
    height: 65,
    width: 65,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 6,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: "#aaa",
    borderWidth: Platform.OS === "ios" ? undefined : 0.2,
    shadowOffset: {
      height: 2,
      width: 1
    }
  },
  instagramPhotosCarousel: {
    height: height,
    justifyContent: "space-between",
    borderBottomColor: "rgba(0,0,0,0.3)",
    borderBottomWidth: 0.8,
    backgroundColor: "white",
    backgroundColor: "#00000099"
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  slideView: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: height,
    width: width
  },
  backBtn: {
    position: "absolute",
    top: 10,
    left: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center"
  },
  backBtnIcon: {
    color: commonColor.brandPrimary,
    alignSelf: "center",
    width: 10
  },
  subTextView: {
    backgroundColor: "white",
    width: width,
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  nameText: {
    height: 22,
    color: "#0d0d0d",
    fontFamily: "Lato_Bold",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10
  },
  address: {
    height: 15,
    color: "#404040",
    fontFamily: "Lato",
    fontSize: 12,
    fontWeight: "400"
  },
  church: {
    height: 15,
    color: "#404040",
    fontFamily: "Lato",
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 20
  },
  workingText: {
    color: "rgba(0,0,0,0.75)"
  },
  distanceAwayText: {
    fontSize: 12,
    color: commonColor.lightTextColor,
    fontWeight: "bold",
    paddingTop: 3
  },
  quoteView: {
    padding: 15,
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  quoteText: {
    color: "#444"
  },
  instagramPhotoCountView: {
    backgroundColor: "white",
    padding: 15
  },
  swiperPaginationStyle: {
    position: "absolute",
    width: Platform.OS === "android" ? width : width - 30,
    justifyContent: Platform.OS === "android" ? "center" : "flex-end",
    alignSelf: Platform.OS === "android" ? "center" : "flex-end",
    height: 30,
    top: Platform.OS === "android" ? undefined : -39,
    bottom: Platform.OS === "android" ? 10 : undefined,
    right: Platform.OS === "android" ? 0 : 20
  },
  thumbnailDot: {
    width: Platform.OS === "android" ? 10 : 6,
    height: Platform.OS === "android" ? 10 : 6,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  instagramCarouselView: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 5
  },
  thumbnail: {
    width: width / 3 - 15,
    height: width / 3 - 15,
    borderRadius: 5,
    marginVertical: 5
  },
  interestTextHeadingView: {
    padding: 15,
    paddingBottom: 0,
    backgroundColor: "white"
  },
  interestsView: {
    flexDirection: "row",
    backgroundColor: "white",
    flexWrap: "wrap",
    padding: 13,
    paddingBottom: 80
  },
  interestTextView: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FC432F",
    height: 50,
    marginRight: 5,
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2
  },
  interestText: {
    color: "#F7524C",
    margin: 10
  },
  bottomPillsView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    position: "absolute",
    bottom: 0
  },
  bottomRowStyle: {
    justifyContent: "space-around",
    padding: 18,
    paddingVertical: 10
  },
  bottomRoundedPillsBtn: {
    borderRadius: 27.5,
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomRoundedPillsCloseIcon: {
    fontSize: 30,
    marginLeft: -1,
    marginRight: -1
  },
  bottomRoundedPillsStarIcon: {
    fontSize: 30,
    marginLeft: -1,
    marginRight: -1
  },
  bottomRoundedPillsHeartIcon: {
    fontSize: 30,
    marginLeft: -1,
    marginRight: -2,
    top: 1
  },
  body: {
    width: width,
    height: (height * 3) / 4,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 16,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#f2f2f2",
    position: "absolute",
    bottom: 0,
    padding: 15
  },
  buttons: {
    flexDirection: "row",
    position: "absolute",
    top: 10,
    right: 10
  },
  button: {
    width: 100,
    height: 36,
    borderRadius: 24,
    borderColor: "#d9a91a",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "#f2f2f2"
    //marginLeft: deviceWidth - 175,
  },
  buttonText: {
    color: "#d9a91a",
    fontFamily: "Lato",
    fontSize: 12,
    fontWeight: "400"
  },
  close: {
    marginRight: 10,
    width: 40,
    height: 40
  },
  photo: {
    height: 20,
    color: "#0d0d0d",
    fontFamily: "Lato_Bold",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20
  },
  warningIcon: {
    height: 75,
    width: 75
  },
  bodyNoUser: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textNoUser: {
    width: 200,
    height: 30,
    color: "#bdbfbf",
    fontFamily: "Lato",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.06,
    marginTop: 32,
    marginBottom: 15
  },
  buttonTryAgain: {
    height: 36,
    borderRadius: 24,
    borderColor: "#d9a91a",
    borderStyle: "solid",
    borderWidth: 2,
    width: 146,
    backgroundColor: "#f2f2f2",
    alignSelf: "center"
  },
  group: {
    marginBottom: 15
  },
  label: {
    height: 16,
    color: "#404040",
    fontFamily: "Lato",
    fontSize: 12,
    fontWeight: "400"
  },
  text: {
    height: 12,
    color: "#bdbfbf",
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: "400",
    letterSpacing: 0.5
  },
  textDel: {
    height: 13,
    color: "#d80808",
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: "400",
    letterSpacing: 0.5
  },
  headerText: {
    height: 20,
    color: "#d9a91a",
    fontFamily: "Lato_Bold",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15
  }
};
