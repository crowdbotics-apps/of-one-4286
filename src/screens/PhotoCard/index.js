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
import data from "./data";
import * as API from "../../services/Api";
import { connect } from "react-redux";
import * as Actions from "../../redux/action";
import { Constants, Location, Permissions } from "expo";
import Swiper from "react-native-swiper";
import { ScrollView } from "react-native-gesture-handler";
var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

class PhotoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: null,
      opac: 0,
      users: [],
      loading: false,
      expand: true,
      matched: ""
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
    let addArr = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });

    let addObj = addArr && addArr.length > 0 && addArr[0];
    let address = addObj.city + ", " + addObj.region;

    this.props.updateUser(this.props.user.uid, {
      lat: location.coords.latitude,
      long: location.coords.longitude,
      address
    });

    return location;
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const location = await this._getLocationAsync();
    const { latitude, longitude } = location.coords;

    this.setState({ longitude, latitude }, this.onRefresh);
  }

  onRefresh = async () => {
    // const resUsers = await API.getUsers_API();
    const { unlikes, user, likes } = this.props;
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

      users = users.filter(
        item =>
          this.props.likes.filter(like => like.uid == item.uid).length == 0
      );

      users = users.filter(item => item.gender != user.gender);

      let min = Number(user.minAge);
      if (isNaN(min)) min = user.age - 10;
      let max = Number(user.maxAge);
      if (isNaN(max)) max = user.age + 10;
      users = users.filter(item => item.age > min && item.age < max);

      let person = Array.isArray(users) && users[0];
      let images = null;
      if (person) {
        const res = await API.getImages_API(person.uid);
        if (res.status) {
          //const images = res.data;
          images = res.data.filter(image => image.uri != "");
        }
      }

      console.log('images', images)

      //list person
      this.setState({ users, images, loading: false });
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

  changeStage = () => {
    console.log("expand", this.state.expand);
    this.setState({
      expand: !this.state.expand
    });

    console.log("expand", this.state.expand);
  };

  onTryAgain = () => {
    this.setState({ loading: true });

    this.onRefresh();
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
          <Text style={styles.textNoUser}>
            We ran into a problem loading people, sorry about that.
          </Text>
          <Button
            block
            rounded
            style={styles.buttonTryAgain}
            onPress={this.onTryAgain}
          >
            <Text style={styles.buttonText}>TRY AGAIN</Text>
          </Button>
        </View>
      </Container>
    );
  };

  render() {
    const { users } = this.state;

    const navigation = this.props.navigation;
    if (this.state.loading) return <Spinner />;

    if (users.length == 0) return this.renderNoUser();

    let person = users[0];
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
                  person.image == ""
                    ? require("../../../assets/launchscreen.png")
                    : { uri: person.image }
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
          <View style={styles.body} onPress={this.changeStage}>
            <ScrollView style={{flex: 1}} >
              <Text style={styles.nameText}>
                {person.name} {person.age}
              </Text>
              <Text style={styles.address}>{person.address}</Text>
              <Text style={styles.church}>{person.church}</Text>
              <Text style={styles.desc}>{person.aboutMe}</Text>

              <View>
                <Text style={styles.photo}>Photos</Text>
              </View>
              
              <View style={{marginBottom: 100}}>
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
                      this.state.images.map((image,i ) => {
                        return (
                          <Image
                            key={i}
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
                <TouchableOpacity>
                  <Image
                    source={require("../../../assets/Pass_Button.png")}
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
            </ScrollView>
          </View>
        ) : (
          <TouchableOpacity onPress={this.changeStage}>
            <View style={[styles.body, { height: 220 }]}>
              <Text style={styles.nameText}>
                {person.name} {person.age}
              </Text>
              <Text style={styles.address}>{person.address}</Text>
              <Text style={styles.church}>{person.church}</Text>

              <View style={styles.buttons}>
                <TouchableOpacity>
                  <Image
                    source={require("../../../assets/Pass_Button.png")}
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
    person: state.global.person,
    likes: state.global.likes
  }),
  {
    like: Actions.like,
    unlike: Actions.unlike,
    checkMatch: Actions.checkMatch,
    updateUser: Actions.updateUser,
    getPerson: Actions.getPerson
  }
)(PhotoCard);
