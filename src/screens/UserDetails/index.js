import React, { Component } from "react";

import { View, Image, TouchableOpacity, Platform } from "react-native";
import { Container, Content, Text, Icon, Button } from "native-base";
import Swiper from "react-native-swiper";
import styles from "./styles";

var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");
import * as API from "../../services/Api";
import { connect } from "react-redux";
import * as Actions from "../../redux/action";

class UserDetails extends Component {
  render() {
    const {user} = this.props
    const navigation = this.props.navigation;
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Content style={{ marginTop: Platform.OS === "ios" ? 20 : 0 }}>
          {Platform.OS === "android" &&
            <Button
              style={styles.createBtn}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Icon name="md-create" style={{ width: 20, left: -5 }} />
            </Button>}
          <View style={styles.instagramPhotosCarousel}>
            <Swiper
              style={styles.wrapper}
              width={width}
              height={height / 1.5}
              dot={<View style={styles.dot} />}
              activeDot={<View style={styles.activeDot} />}
              loop={false}
            >
              <View style={styles.slide}>
                <Image
                  style={styles.image}
                  source={
                    user.image == ""
                      ? require("../../../assets/launchscreen.png")
                      : { uri: user.image }
                  }
                />
              </View>
              {/* <View style={styles.slide}>
                <Image
                  style={styles.image}
                  source={require("../../../assets/federerOne.jpg")}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  style={styles.image}
                  source={require("../../../assets/rf2.jpg")}
                />
              </View> */}
            </Swiper>
            {Platform.OS === "android" &&
              <Button
                style={styles.createBtn}
                onPress={() => navigation.navigate("EditProfile")}
              >
                <Icon name="md-create" />
              </Button>}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.1)",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Icon
                name="md-arrow-back"
                style={{
                  fontSize: 30,
                  marginTop: Platform.OS === "ios" ? 5 : undefined,
                  marginLeft: Platform.OS === "ios" ? -3 : undefined,
                  color: "#F7524C"
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.subText}>
            <Text style={styles.name}>{user.name}, {user.age}</Text>
            <Text style={styles.workingText}>{user.college}</Text>
            <Button
              style={styles.createBtn}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Icon name="md-create" style={{ width: 18, left: -5 }} />
            </Button>
          </View>
          <View style={styles.quote}>
            <Text>
              {user.aboutMe}
            </Text>
          </View>
          <View style={styles.instagramPhotoCount}>
            <Text>Photos</Text>
          </View>
          <View style={styles.thumbnailView}>
            {/* <Swiper
              style={styles.wrapper2}
              width={width}
              height={
                Platform.OS === "ios"
                  ? (width / 3 - 5) * 2
                  : (width / 3 + 14) * 2
              }
              paginationStyle={styles.paginationStyle}
              dot={<View style={styles.thumbnailDot} />}
              activeDot={<View style={styles.activeThumbnailDot} />}
              loop={false}
            >
              <View style={styles.sixThumbnailsInCarousel}>
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/federer.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/federerOne.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/federer.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/federerOne.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/federer.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/federerOne.jpg")}
                />
              </View>
              <View style={styles.sixThumbnailsInCarousel}>
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/federerOne.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/federer.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/federerOne.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/federer.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/federerOne.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/federer.jpg")}
                />
              </View>
            </Swiper>
           */}
          </View>
          {/* <View style={styles.interestTextHeading}>
            <Text>3 interests</Text>
          </View> */}
          {/* <View style={styles.interestsView}>
            <View style={styles.interestTextView}>
              <Text style={styles.interestText}> Deepika Padukone</Text>
            </View>
            <View style={styles.interestTextView}>
              <Text style={styles.interestText}> Kapil Sharma</Text>
            </View>
            <View style={styles.interestTextView}>
              <Text style={styles.interestText}> Game of Thrones</Text>
            </View>
          </View> */}
        </Content>
      </Container>
    );
  }
}


export default connect(
  state => ({
    user: state.global.user
  }),
  {
    // getPerson: Actions.getPerson
    // unlike: Actions.unlike,
    // checkMatch: Actions.checkMatch,
  }
)(UserDetails);