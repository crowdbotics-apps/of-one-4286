import { Platform } from "react-native";

var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

export default {
  imageView: {
    alignItems: "center",
    padding: 10,
    paddingBottom: 0
  },
  image: {
    height: height / 1.5,
    width: width
  },
  subText: {
    backgroundColor: "white",
    width: width,
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10,
    borderBottomColor: "darkgrey",
    borderBottomWidth: 0.8
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: "rgba(0,0,0,0.75)"
  },
  distanceAwayText: {
    fontSize: 12,
    color: "rgba(0,0,0,0.3)",
    fontWeight: "600"
  },
  workingText: {
    fontSize: 16,
    color: "rgba(0,0,0,0.85)"
  },
  quote: {
    padding: 15,
    backgroundColor: "white",
    borderBottomColor: "darkgrey",
    borderBottomWidth: 0.8
  },
  instagramPhotoCount: {
    backgroundColor: "white",
    padding: 15
  },
  instagramPhotosCarousel: {
    justifyContent: "space-between",
    borderBottomColor: "rgba(0,0,0,0.3)",
    borderBottomWidth: 0.8,
    backgroundColor: "white"
  },
  sixThumbnailsInCarousel: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 5
  },
  interestTextHeading: {
    padding: 15,
    paddingBottom: 5,
    backgroundColor: "white"
  },
  interestsView: {
    flexDirection: "row",
    backgroundColor: "white",
    flexWrap: "wrap",
    padding: 13
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
    paddingVertical: 4
  },
  interestText: {
    color: "#F7524C",
    margin: 10
  },
  thumbnail: {
    width: width / 3 - 15,
    height: width / 3 - 15,
    borderRadius: 5,
    marginVertical: 5
  },
  grid: {
    backgroundColor: "blue"
  },
  row: {
    height: 100,
    backgroundColor: "white",
    justifyContent: "space-between",
    padding: 10
  },
  wrapper: {
    height: height / 1.7
  },
  dot: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 6,
    height: 6,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  activeDot: {
    backgroundColor: "#F7524C",
    width: 6,
    height: 6,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  paginationStyle: {
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
    backgroundColor: "rgba(0,0,0,0.3)",
    width: 6,
    height: 6,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  activeThumbnailDot: {
    backgroundColor: "#F7524C",
    width: 6,
    height: 6,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  createBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F7524C",
    position: "absolute",
    right: 10,
    top: Platform.OS === "ios" ? -25 : height / 1.6
  }
};
