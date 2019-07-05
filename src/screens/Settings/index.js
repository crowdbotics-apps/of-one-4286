import React, { Component } from "react";
import { Image, View, Text, Slider, Platform, Linking } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import {
  Container,
  Content,
  Icon,
  Switch,
  Button,
  Header,
  Title,
  Card,
  CardItem,
  Left,
  Body,
  Right
} from "native-base";
import styles from "./styles";
import commonColor from "../../theme/variables/commonColor";
import * as API from "../../services/Api";
import { connect } from "react-redux";
import * as Actions from "../../redux/action";
import { success, info, alert } from "../../services/Alert";
import * as ActionType from "../../redux/actionType";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});

class Settings extends Component {
  state = {
    // trueSwitchIsOn: true,
    // trueSwitchIsOn2: true,
    // trueSwitchIsOn3: true,
    // falseSwitchIsOn: false,
    // notSwitch1: true,
    // notSwitch2: true,
    // notSwitch3: true,
    // notSwitch4: true,

    // leftValue: 25,
    // rightValue: 35,
    // disKM: true,

    sliderValue: 0,
    showMeMen: true,
    showMeWomen: true,
    showMeOnApp: true
  };

  changeDisType(val) {
    if (val === 1) {
      this.setState({ disKM: true });
    } else {
      this.setState({ disKM: false });
    }
  }

  onSave = async () => {
    const { sliderValue, showMeMen, showMeWomen, showMeOnApp } = this.state;
    const { updateUser, user } = this.props;

    const updObj = {
      distance: sliderValue,
      showMeMen,
      showMeWomen,
      showMeOnApp
    };

    res = await updateUser(user.uid, updObj);

    //success('Settings has been saved')

    if (res.type == ActionType.UPDATE_USER_OK)
      success("Settings has been saved");
    else alert("There is an unexpected error, please try again!");
  };

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      sliderValue: user.distance,
      showMeMen: user.showMeMen,
      showMeWomen: user.showMeWomen,
      showMeOnApp: user.showMeOnApp
    });
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="md-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Settings</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.onSave}>
              <Icon name="md-save" />
            </Button>
          </Right>
        </Header>
        <Content style={styles.container}>
          <View style={{ paddingTop: 15, paddingHorizontal: 10 }}>
            {/* <View style={{ marginBottom: 10 }}>
              <Text style={styles.text}>Discovery Settings</Text>
            </View>
            <Card>
              <CardItem style={styles.locationSwipperCarditem}>
                <Text style={styles.cardItemText}>Swiping in </Text>
                <Text style={styles.textBlue}> My Current Location</Text>
              </CardItem>
            </Card>
            <View>
              <Text style={styles.someText}>
                Change your swipe location to see Tinder members in other cities
              </Text>
            </View> */}
            <Card style={styles.card}>
              <CardItem style={styles.cardItemHeaderView}>
                <Text style={styles.redText}>Show Me</Text>
              </CardItem>
              <CardItem>
                <Left>
                  <Text style={styles.cardItemText}>Men</Text>
                </Left>
                <Right>
                  <Switch
                    onValueChange={value => this.setState({ showMeMen: value })}
                    onTintColor={commonColor.brandPrimary}
                    thumbTintColor={
                      Platform.OS === "android" ? "#ededed" : undefined
                    }
                    value={this.state.showMeMen}
                  />
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text style={styles.cardItemText}>Women</Text>
                </Left>
                <Right>
                  <Switch
                    onValueChange={value =>
                      this.setState({ showMeWomen: value })
                    }
                    onTintColor={commonColor.brandPrimary}
                    thumbTintColor={
                      Platform.OS === "android" ? "#ededed" : undefined
                    }
                    value={this.state.showMeWomen}
                  />
                </Right>
              </CardItem>
            </Card>
            <Card style={styles.card}>
              <CardItem style={styles.cardItemHeaderView}>
                <Left>
                  <Text style={styles.redText}>Search Distance</Text>
                </Left>
                <Right>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {this.state.sliderValue} mi.
                  </Text>
                </Right>
              </CardItem>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Slider
                  style={{ margin: 10 }}
                  onValueChange={value => this.setState({ sliderValue: value })}
                  maximumValue={50}
                  minimumValue={1}
                  minimumTrackTintColor={commonColor.brandPrimary}
                  step={1}
                  value={this.state.sliderValue}
                />
              </View>
            </Card>
            <CardItem style={styles.switchBlock}>
              <Left>
                <Text style={styles.swipText}>Show me on OfOne App</Text>
              </Left>
              <Right>
                <Switch
                  onValueChange={value => this.setState({ showMeOnApp: value })}
                  onTintColor={commonColor.brandPrimary}
                  thumbTintColor={
                    Platform.OS === "android" ? "#ededed" : undefined
                  }
                  value={this.state.showMeOnApp}
                />
              </Right>
            </CardItem>
            <View>
              <Text style={styles.someText}>
                OfOne app uses these preferences to suggest matches.Some match
                suggestions may not fall within your desired parameters.
              </Text>
            </View>

            {/* <Card style={styles.card}>
              <CardItem style={styles.cardItemHeaderView}>
                <Left>
                  <Text style={styles.redText}>Web Profile</Text>
                </Left>
              </CardItem>
              <CardItem>
                <Left>
                  <Text style={{ color: commonColor.contentTextColor }}>
                    Username
                  </Text>
                </Left>
                <Right>
                  <Text style={{ color: commonColor.contentTextColor }}>
                    Claim Yours
                  </Text>
                </Right>
              </CardItem>
              <CardItem style={styles.cardItemHeaderView}>
                <Text
                  style={{
                    color: commonColor.lightTextColor,
                    fontSize: 12
                  }}
                >
                  Create a username. Share your username. Have people all over
                  the world swipe you right on DatingApp
                </Text>
              </CardItem>
            </Card> */}
            {/* <View style={{ marginVertical: 10 }}>
              <Text style={styles.text}>App Settings</Text>
            </View> */}
            {/* <View>
              <Card style={{ borderRadius: 5 }}>
                <CardItem style={{ borderRadius: 5 }}>
                  <Text style={styles.redText}>Notifications</Text>
                </CardItem>
                <CardItem>
                  <Left>
                    <Text style={styles.cardItemText}>New Matches</Text>
                  </Left>
                  <Right>
                    <Switch
                      onValueChange={value =>
                        this.setState({ notSwitch1: value })}
                      onTintColor={commonColor.brandPrimary}
                      thumbTintColor={
                        Platform.OS === "android" ? "#ededed" : undefined
                      }
                      value={this.state.notSwitch1}
                    />
                  </Right>
                </CardItem>
                <CardItem>
                  <Left>
                    <Text style={styles.cardItemText}>Messages</Text>
                  </Left>
                  <Right>
                    <Switch
                      onValueChange={value =>
                        this.setState({ notSwitch2: value })}
                      onTintColor={commonColor.brandPrimary}
                      thumbTintColor={
                        Platform.OS === "android" ? "#ededed" : undefined
                      }
                      value={this.state.notSwitch2}
                    />
                  </Right>
                </CardItem>
                <CardItem>
                  <Left>
                    <Text style={styles.cardItemText}>Message Likes</Text>
                  </Left>
                  <Right>
                    <Switch
                      onValueChange={value =>
                        this.setState({ notSwitch3: value })}
                      onTintColor={commonColor.brandPrimary}
                      thumbTintColor={
                        Platform.OS === "android" ? "#ededed" : undefined
                      }
                      value={this.state.notSwitch3}
                    />
                  </Right>
                </CardItem>
                <CardItem>
                  <Left>
                    <Text style={styles.cardItemText}>Super Likes</Text>
                  </Left>
                  <Right>
                    <Switch
                      onValueChange={value =>
                        this.setState({ notSwitch4: value })}
                      onTintColor={commonColor.brandPrimary}
                      thumbTintColor={
                        Platform.OS === "android" ? "#ededed" : undefined
                      }
                      value={this.state.notSwitch4}
                    />
                  </Right>
                </CardItem>
              </Card>
            </View> */}

            {/* <View style={{ marginVertical: 10 }}>
              <Card style={styles.card}>
                <CardItem style={styles.cardItemHeaderView}>
                  <Left>
                    <Text style={styles.redText}>Show Distance in</Text>
                  </Left>
                  <Right>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {this.state.disKM ? "Km." : "Mi."}
                    </Text>
                  </Right>
                </CardItem>
                <CardItem>
                  <Button
                    block
                    transparent
                    style={{
                      flex: 2,
                      backgroundColor: this.state.disKM
                        ? commonColor.brandPrimary
                        : "transparent"
                    }}
                    onPress={() => this.changeDisType(1)}
                  >
                    <Text
                      style={{
                        color: this.state.disKM
                          ? "#FFF"
                          : commonColor.contentTextColor,
                        fontSize: 16,
                        fontWeight: "700"
                      }}
                    >
                      Km.
                    </Text>
                  </Button>
                  <Button
                    block
                    transparent
                    style={{
                      flex: 2,
                      backgroundColor: !this.state.disKM
                        ? commonColor.brandPrimary
                        : "transparent"
                    }}
                    onPress={() => this.changeDisType(2)}
                  >
                    <Text
                      style={{
                        color: !this.state.disKM
                          ? "#FFF"
                          : commonColor.contentTextColor,
                        fontSize: 16,
                        fontWeight: "700"
                      }}
                    >
                      Mi.
                    </Text>
                  </Button>
                </CardItem>
              </Card>
            </View> */}

            <View style={{ marginVertical: 10 }}>
              <Text style={styles.text}>Contact Us</Text>
            </View>
            <Button
              block
              style={styles.helpBtn}
              onPress={() => {
                Linking.openURL("mailto://support@ofone.org");
              }}
            >
              <Text style={styles.helpBtnText}>Help & Support</Text>
            </Button>

            <View style={{ marginVertical: 10 }}>
              <Card style={{ borderRadius: 5 }}>
                <View style={{ paddingLeft: 3, marginVertical: 10 }}>
                  <Button
                    transparent
                    small
                    onPress={() => {
                      Linking.openURL(
                        "https://app.termly.io/document/privacy-policy/67185285-f602-4e03-8812-192c45653a06"
                      );
                    }}
                  >
                    <Text style={styles.cardItemText}>Privacy Policy</Text>
                  </Button>
                  <Button
                    transparent
                    small
                    onPress={() => {
                      Linking.openURL(
                        "https://app.termly.io/document/terms-of-use-for-website/f6f7062f-2bf7-4cf2-ab99-0e7c72e5dfe4"
                      );
                    }}
                  >
                    <Text style={styles.cardItemText}>Terms of Service</Text>
                  </Button>
                </View>
              </Card>
            </View>

            <Button
              block
              style={styles.helpBtn}
              onPress={() => navigation.dispatch(resetAction)}
            >
              <Text style={styles.helpBtnText}>Logout</Text>
            </Button>
            <View style={{ alignItems: "center", marginVertical: 20 }}>
              <Image
                source={require("../../../assets/logo.png")}
                style={{ width: 40, height: 40 }}
              />
            </View>
          </View>
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
    updateUser: Actions.updateUser
  }
)(Settings);
