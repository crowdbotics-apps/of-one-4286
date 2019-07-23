import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Platform
} from "react-native";
import {
  Container,
  Text,
  Card,
  CardItem,
  DeckSwiper,
  Grid,
  Row,
  Icon,
  Button,
  Right,
  Body,
  Spinner
} from "native-base";
import commonColor from "../../theme/variables/commonColor";
import styles from "./styles";

import * as API from "../../services/Api";
import { connect } from "react-redux";
import * as Actions from "../../redux/action";
import { Constants, Location, Permissions } from "expo";
import Swiper from "react-native-swiper";
var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: null,
      opac: 0,
      users: [],
      loading: false,
      expand: true
    };
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log('location',   //longitude)

    this.props.updateUser(this.props.user.uid, {
      lat: location.coords.latitude,
      long: location.coords.longitude
    });

    return location;
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const location = await this._getLocationAsync();
    const { latitude, longitude } = location.coords;

    const { unlikes, user } = this.props;
    const resUsers = await API.getUsersNearby_API(
      { long: longitude, lat: latitude },
      user.distance
    );

    let users = [];
    if (resUsers.status) {
      users = resUsers.data;

      users = users.filter(
        item => unlikes.filter(unlike => unlike.uid == item.uid).length == 0
      );

      if (!user.showMeWomen)
        users = users.filter(item => item.gender != "female");

      if (!user.showMeMen) users = users.filter(item => item.gender != "male");

      // console.log('users ',users)

      const { getPerson } = this.props;
      await getPerson(users[0].uid);

      this.setState({ users, loading: false, longitude, latitude });
    }
  }

  onRefresh = async () => {
    // const resUsers = await API.getUsers_API();
    const { unlikes, user } = this.props;
    const resUsers = await API.getUsersNearby_API(
      { long: this.state.longitude, lat: this.state.latitude },
      user.distance
    );

    let users = [];
    if (resUsers.status) {
      users = resUsers.data;

      users = users.filter(
        item =>
          this.props.unlikes.filter(unlike => unlike.uid == item.uid).length ==
          0
      );

      if (!user.showMeWomen)
        users = users.filter(item => item.gender != "female");

      if (!user.showMeMen) users = users.filter(item => item.gender != "male");

      console.log("users", users, this.props.unlikes);
      if (Array.isArray(users) && users.length > 0) {
        this._deckSwiper._root.setState({
          lastCard: false,
          card1Top: true,
          card2Top: true,
          disabled: false,
          selectedItem: users[0]
          //selectedItem2: users[1]
        });

        this.setState({ users });
      }
    }
  };

  onLike = async person => {
    const { user, like, checkMatch } = this.props;
    const { selectedItem } = this._deckSwiper._root.state;

    await like(user.uid, selectedItem, false);
    checkMatch(user.uid, selectedItem);
    this._deckSwiper._root.swipeRight();
  };

  onUnLike = async person => {
    const { user, unlike } = this.props;
    const { selectedItem } = this._deckSwiper._root.state;

    unlike(user.uid, selectedItem);
    this._deckSwiper._root.swipeLeft();
  };

  onSuperLike = async () => {
    const { user, like, checkMatch } = this.props;
    const { selectedItem } = this._deckSwiper._root.state;

    await like(user.uid, selectedItem, true);
    checkMatch(user.uid, selectedItem);
    this._deckSwiper._root.swipeRight();

    // const navigation = this.props.navigation;
    // navigation.navigate("PhotoCardDetails")
  };

  onSwiping = async (dir, opa) => {
    // const { user, unlike, like } = this.props;
    // const { selectedItem2 } = this._deckSwiper._root.state;

    // console.log('user', user)

    this.setState({ direction: dir, opac: opa });

    // if (dir == "left") {
    //   unlike(user.uid, selectedItem2);
    // } else {
    //   like(user.uid, selectedItem2, false);
    // }
  };

  onSwipeRight = async () => {
    const { user, like, checkMatch } = this.props;
    const { selectedItem } = this._deckSwiper._root.state;

    await like(user.uid, selectedItem, false);
    checkMatch(user.uid, selectedItem);
  };

  onSwipeLeft = async () => {
    const { user, unlike } = this.props;
    const { selectedItem } = this._deckSwiper._root.state;

    unlike(user.uid, selectedItem);
  };

  changeStage = () => {
    console.log("expand", this.state.expand);
    this.setState({
      expand: !this.state.expand
    });

    console.log("expand", this.state.expand);
  };

  renderNoUser = () => {
    return (
      <Container style={styles.wrapp}>
        <View style={styles.bodyNoUser}>
          <Image
            style={styles.warningIcon}
            source={require("../../../assets/warning.png")}
            ResizeMode="contain"
          />
          <Text style={styles.textNoUser}>We ran into a problem loading people, sorry about that.</Text>
          <Button block rounded style={styles.buttonTryAgain} onPress={this.onPrevious}>
            <Text style={styles.buttonText}>TRY AGAIN</Text>
          </Button>
        </View>
      </Container>
    );
  };

  render() {
    //return this.renderNoUser();

    const { users } = this.state;
    const { person, user } = this.props;
    //const data1 = users.filter(item => item.uid != null);

    const navigation = this.props.navigation;
    if (this.state.loading) return <Spinner />;

    // if (users.length < 2) return <Text>No user found.</Text>;

    if (!person) return <Spinner />;

    return (
      <Container style={styles.wrapper}>
        <View style={styles.instagramPhotosCarousel}>
          <Swiper
            width={width}
            height={height}
            dot={
              <View
                style={[
                  styles.dot,
                  { backgroundColor: "rgba(255,255,255,0.5)" }
                ]}
              />
            }
            activeDot={
              <View
                style={[
                  styles.dot,
                  { backgroundColor: commonColor.brandPrimary }
                ]}
              />
            }
            loop={false}
          >
            <View style={styles.slideView}>
              <Image
                style={styles.image}
                source={
                  user.image == ""
                    ? require("../../../assets/launchscreen.png")
                    : { uri: user.image }
                }
              />
            </View>
            {/* <View style={styles.slideView}>
                <Image
                  style={styles.image}
                  source={require("../../../assets/r5.jpg")}
                />
              </View>
              <View style={styles.slideView}>
                <Image
                  style={styles.image}
                  source={require("../../../assets/r1.jpeg")}
                />
              </View> */}
          </Swiper>
        </View>

        {this.state.expand ? (
          <TouchableOpacity onPress={this.changeStage}>
            <View style={styles.body}>
              <Text style={styles.nameText}>{user.name} 23</Text>
              <Text style={styles.address}>Manhattan, New York</Text>
              <Text style={styles.church}>St. Mary & St. Mark Church</Text>
              <Text style={styles.desc}>
                This is a concept of a dating app specifically targeting the
                Coptic Orthodox community. I’m not sure what else to type here,
                trying to fill this up as much as I can.
              </Text>

              <View>
                <Text style={styles.photo}>Photos</Text>
              </View>
              <View>
                <Swiper
                  width={width}
                  height={
                    Platform.OS === "ios"
                      ? (width / 3 - 5) * 2
                      : (width / 3 + 14) * 2
                  }
                  paginationStyle={styles.swiperPaginationStyle}
                  dot={
                    <View
                      style={[
                        styles.thumbnailDot,
                        {
                          backgroundColor: "rgba(0,0,0,0.3)"
                        }
                      ]}
                    />
                  }
                  activeDot={
                    <View
                      style={[
                        styles.thumbnailDot,
                        { backgroundColor: commonColor.brandPrimary }
                      ]}
                    />
                  }
                  loop={false}
                >
                  <View style={styles.instagramCarouselView}>
                    {Array.isArray(this.state.images) ? (
                      this.state.images.map(image => {
                        return (
                          <Image
                            style={styles.thumbnail}
                            source={{ uri: image.uri }}
                            resizeMode="contain"
                          />
                        );
                      })
                    ) : (
                      <React.Fragment />
                    )}
                  </View>
                </Swiper>
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                  <Image
                    source={require("../../../assets/setting.png")}
                    style={styles.close}
                  />
                </TouchableOpacity>
                <Button
                  block
                  rounded
                  style={styles.button}
                  onPress={() => navigation.navigate("EditProfile")}
                >
                  <Text style={styles.buttonText}>EDIT</Text>
                </Button>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.changeStage}>
            <View style={[styles.body, { height: 220 }]}>
              <Text style={styles.nameText}>{user.name} 23</Text>
              <Text style={styles.address}>Manhattan, New York</Text>
              <Text style={styles.church}>St. Mary & St. Mark Church</Text>

              <View style={styles.buttons}>
                <TouchableOpacity>
                  <Image
                    source={require("../../../assets/setting.png")}
                    style={styles.close}
                  />
                </TouchableOpacity>
                <Button
                  block
                  rounded
                  style={styles.button}
                  onPress={this.onPrevious}
                >
                  <Text style={styles.buttonText}>LIKE</Text>
                </Button>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </Container>
    );
  }
}

export default connect(
  state => ({
    user: state.global.user,
    unlikes: state.global.unlikes,
    person: state.global.person
  }),
  {
    like: Actions.like,
    unlike: Actions.unlike,
    checkMatch: Actions.checkMatch,
    updateUser: Actions.updateUser,
    getPerson: Actions.getPerson
  }
)(Profile);
