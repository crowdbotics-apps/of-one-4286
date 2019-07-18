import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  Platform,
  ImageBackground
} from "react-native";
import { Container, Content, Text, Button, View } from "native-base";
import Swiper from "react-native-swiper";
import styles from "./styles";
import commonColor from "../../theme/variables/commonColor";
import { alert } from "../../services/Alert";
import { connect } from "react-redux";
import * as Actions from "../../redux/action";

var deviceHeight = Dimensions.get("window").height;

class Login extends Component {
  onLoginWithFB = async () => {
    const { loginFB, user } = this.props;

    const res = await loginFB();

    console.log("res, user", res, user);

    if (res.type == "LOGIN_OK")
      this.props.navigation.navigate("VerifyBirthday");
    else alert("Login failed!");

    // const res = await signInWithFacebook()

    // if(res.type == 'success')
    //   this.props.navigation.navigate("HomeTabNavigation");
    // else
    //   alert('Login failed!')
  };

  render() {
    return (
      <ImageBackground
        source={require("../../../assets/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <Container style={{ backgroundColor: "#00000099" }}>
          <Content scrollEnabled={false} contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {/* <Swiper
            height={deviceHeight / 1.3}
            loop={false}
            dot={<View style={styles.swiperDot} />}
            activeDot={<View style={styles.swiperActiveDot} />}
          >
            <View style={styles.swiperSlidesView}>
              <Text style={styles.loginText}>
                Discover interesting people around you
              </Text>
              <View style={styles.swiperImageView}>
                <Image
                  source={require("../../../assets/e1.jpg")}
                  style={styles.image1}
                />
              </View>
            </View>

            <View style={styles.swiperSlidesView}>
              <Text style={styles.loginText}>
                Anonymously like or pass on each person
              </Text>
              <Image
                source={require("../../../assets/likeSquare.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <View style={styles.swiperSlidesView}>
              <Text style={styles.loginText}>
                When someone likes you back...
              </Text>
              <View style={styles.image}>
                <Image
                  source={require("../../../assets/1.png")}
                  style={styles.img1}
                  resizeMode="contain"
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: 10
                  }}
                >
                  <Image
                    source={require("../../../assets/rf1.jpg")}
                    style={[styles.img2, { left: 10 }]}
                  />
                  <Image
                    source={require("../../../assets/m4.jpg")}
                    style={[styles.img2, { right: 10 }]}
                  />
                </View>
              </View>
            </View>

            <View style={styles.swiperSlidesView}>
              <Text style={styles.loginText}>
                Chat and get to know your matches
              </Text>
              <Image
                source={require("../../../assets/2.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </Swiper>*/}

            <View >
              <Text style={styles.brand}>Of One</Text>
              <Text style={styles.subBrand}>A dating app for Coptics, by Coptics</Text>
            </View>
            <Button
              block
              rounded
              style={styles.loginBtn}
              onPress={this.onLoginWithFB}
            >
              <Text style={styles.loginBtnText}>CONTINUE WITH FACEBOOK</Text>
            </Button>
            <Text style={styles.note}>We’ll never post anything</Text>
          </Content>
          {/* <View style={styles.noteView}>
          <Text style={styles.noteText}>
            By signing in, you agree with our terms of services and privacy
            settings
          </Text>
        </View> */}
        </Container>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({
    user: state.global.user
  }),
  {
    loginFB: Actions.loginFB
  }
)(Login);
