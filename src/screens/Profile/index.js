import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { Container, Content, Icon, Button, Text } from "native-base";
import commonColor from "../../theme/variables/commonColor";
import styles from "./styles";
import { connect } from "react-redux";
import * as Actions from "../../redux/action";

class Profile extends Component {
  render() {
    const navigation = this.props.navigation;
    const { user } = this.props;
    return (
      <Container style={styles.container}>
        <Content scrollEnabled={false}>
          <View style={styles.profileImageView}>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserDetails")}
            >
              <Image
                source={
                  user.image == ""
                    ? require("../../../assets/avatar.png")
                    : { uri: item.image }
                }
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editIconView}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Icon active name="create" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileDescriptionView}>
            <Text style={styles.nameAndAgeText}>
              {user.name}, {user.age}
            </Text>
            {/* <View style={{ padding: 5 }}>
              <Text style={styles.workplaceText}>
                World Class Tennis Player
              </Text>
            </View> */}
            <Text style={styles.workplaceText}>{user.college}</Text>

            <Button
              transparent
              onPress={() => navigation.navigate("Settings")}
              style={styles.settingsBtn}
            >
              <Icon
                name="md-settings"
                style={{ color: commonColor.brandPrimary }}
              />
              <Text style={styles.settingsBtnText}>SETTINGS</Text>
            </Button>
          </View>
        </Content>
        {/* <View style={styles.goingOutView}>
          <View style={styles.goingOutTextView}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              Going Out Tonight?
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: commonColor.contentTextColor,
                fontSize: 13,
                marginVertical: 10
              }}
            >
              Invite your friends to swipe & match with groups of friends going
              out tonight
            </Text>
            <Button block rounded style={styles.goingOutBtn}>
              <Text style={styles.goingOutBtnText}>I'M GOING OUT</Text>
            </Button>
          </View>
        </View> */}
      </Container>
    );
  }
}

export default connect(
  state => ({
    user: state.global.user
  }),
  {}
)(Profile);
