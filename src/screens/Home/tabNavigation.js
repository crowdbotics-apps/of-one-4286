import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { Icon, Header, FooterTab, Button, Thumbnail, Footer } from "native-base";
import Profile from "../Profile";
import PhotoCard from "../PhotoCard";
import Chat from "../Chat";
import ChatList from "../ChatList";
import styles from "./styles";

const HomeTabNavigation = createBottomTabNavigator(
  {
    Profile: { screen: Profile },
    PhotoCard: { screen: PhotoCard },
    Chat: { screen: ChatList }
  },
  {
    tabBarPosition: "top",
    initialRouteName: "PhotoCard",
    lazy: true,
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab style={styles.bottomTab}>
            <Button onPress={() => props.navigation.navigate("Profile")}>
              <Thumbnail
                small
                source={
                  props.navigation.state.index === 0
                    ? require("../../../assets/profile.png")
                    : require("../../../assets/profile1.png")
                }
                resizeMode='contain'
              />
            </Button>

            <Button onPress={() => props.navigation.navigate("PhotoCard")}>
              <Thumbnail
                small
                source={
                  props.navigation.state.index === 1
                    ? require("../../../assets/logo.png")
                    : require("../../../assets/logo1.png")
                }
              />
            </Button>

            <Button onPress={() => props.navigation.navigate("Chat")}>
              <Thumbnail
                small
                source={
                  props.navigation.state.index === 2
                    ? require("../../../assets/logo.png")
                    : require("../../../assets/chat1.png")
                }
                resizeMode='contain'
              />
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

export default HomeTabNavigation;
