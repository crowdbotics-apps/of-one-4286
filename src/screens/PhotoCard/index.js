import React, { Component } from "react";
import { Image, ImageBackground, View } from "react-native";
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

class PhotoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: null,
      opac: 0,
      users: []
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
    //console.log(location);
  };

  async componentDidMount() {
    await this._getLocationAsync();

    const resUsers = await API.getUsers_API();
    let users = [];
    if (resUsers.status) {
      users = resUsers.data;

      this.setState({ users });
    }
  }

  onRefresh = async () => {
    const resUsers = await API.getUsers_API();


    let users = [];
    if (resUsers.status) {
      users = resUsers.data;
      if (Array.isArray(users) && users.length > 1) {
        this._deckSwiper._root.setState({
          lastCard: false,
          card1Top: true,
          card2Top: true,
          disabled: false,
          selectedItem: users[0],
          selectedItem2: users[1]
        });

        this.setState({ users });
      }

    }
  };

  onLike = async person => {
    const { user, like } = this.props;
    const { selectedItem2 } = this._deckSwiper._root.state;

    await like(user.uid, selectedItem2, false);
    checkMatch(user.uid, selectedItem2);
    this._deckSwiper._root.swipeRight();
  };

  onUnLike = async person => {
    const { user, unlike } = this.props;
    const { selectedItem2 } = this._deckSwiper._root.state;

    unlike(user.uid, selectedItem2);
    this._deckSwiper._root.swipeLeft();
  };

  onSuperLike = async () => {
    const { user, like } = this.props;
    const { selectedItem2 } = this._deckSwiper._root.state;

    like(user.uid, selectedItem2, true);
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

  onSwipeRight = () => {
    const { user, like } = this.props;
    const { selectedItem2 } = this._deckSwiper._root.state;

    like(user.uid, selectedItem2, false);
  };

  onSwipeLeft = () => {
    const { user, unlike } = this.props;
    const { selectedItem2 } = this._deckSwiper._root.state;

    unlike(user.uid, selectedItem2);
  };

  render() {
    const { users } = this.state;
    //const data1 = users.filter(item => item.uid != null);

    const navigation = this.props.navigation;
    if (users.length == 0) return <Spinner />;

  // if (users.length < 2) return <Text>No user found.</Text>;

    return (
      <Container style={styles.wrapper}>
        <View style={styles.deckswiperView}>
          <DeckSwiper
            looping={false}
            activeOpacity={1}
            dataSource={users}
            ref={mr => (this._deckSwiper = mr)}
            onSwiping={this.onSwiping}
            onSwipeRight={this.onSwipeRight}
            onSwipeLeft={this.onSwipeLeft}
            renderItem={item => (
              <Card activeOpacity={1} style={{ borderRadius: 10 }}>
                <CardItem
                  button
                  style={styles.deckswiperImageCarditem}
                  activeOpacity={1}
                  cardBody
                  onPress={() => navigation.navigate("PhotoCardDetails")}
                >
                  <ImageBackground
                    style={styles.cardMain}
                    source={
                      item.uid == null
                        ? item.image
                        : item.image != ""
                          ? { uri: item.image }
                          : require("../../../assets/launchscreen.png")
                    }
                  >
                    {this.state.direction === "left" && (
                      <View
                        style={{
                          //opacity: -this.state.opac / 150,
                          position: "absolute",
                          right: 30,
                          top: 40,
                          borderWidth: 2,
                          borderRadius: 5,
                          borderColor: commonColor.brandPrimary,
                          width: 100,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                          transform: [{ rotate: "20deg" }]
                        }}
                      >
                        <Text
                          style={{
                            backgroundColor: "transparent",
                            fontSize: 30,
                            color: commonColor.brandPrimary,
                            fontWeight: "900",
                            textAlign: "center",
                            lineHeight: 35
                          }}
                        >
                          NOPE
                        </Text>
                      </View>
                    )}
                    {this.state.direction === "right" && (
                      <View
                        style={{
                          //opacity: this.state.opac / 150,
                          position: "absolute",
                          left: 30,
                          top: 40,
                          borderWidth: 2,
                          borderRadius: 5,
                          borderColor: commonColor.brandSuccess,
                          width: 100,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                          transform: [{ rotate: "-20deg" }]
                        }}
                      >
                        <Text
                          style={{
                            backgroundColor: "transparent",
                            fontSize: 30,
                            color: commonColor.brandSuccess,
                            fontWeight: "900",
                            textAlign: "center",
                            lineHeight: 35
                          }}
                        >
                          Like
                        </Text>
                      </View>
                    )}
                  </ImageBackground>
                </CardItem>
                <CardItem
                  button
                  activeOpacity={1}
                  onPress={() => navigation.navigate("PhotoCardDetails")}
                  style={styles.deckswiperDetailsCarditem}
                >
                  <Body>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.subtextLeft}>{item.college}</Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Icon name="md-book" style={styles.iconRight} />
                      <Text style={styles.subtextRight}>{item.num}</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            )}
            renderEmpty={() => (
              <Text style={{ textAlign: "center" }}>No user found nearby!</Text>
            )}
          />
        </View>
        <Grid style={styles.bottomGrid}>
          <Row style={styles.bottomRowStyle}>
            <Button
              style={styles.bottomRoundedSmallPills}
              onPress={this.onRefresh}
            >
              <Icon
                name="md-refresh"
                style={{
                  color: commonColor.brandWarning,
                  fontSize: 34
                }}
              />
            </Button>
            <Button style={styles.bottomRoundedPills} onPress={this.onUnLike}>
              <Icon
                name="md-close"
                style={{
                  color: commonColor.brandDanger,
                  fontSize: 40,
                  lineHeight: 40
                }}
              />
            </Button>
            <Button style={styles.bottomRoundedPills} onPress={this.onLike}>
              <Icon
                name="md-heart"
                style={{
                  color: commonColor.brandSuccess,
                  fontSize: 35,
                  lineHeight: 40,
                  marginLeft: 2,
                  marginRight: 2
                }}
              />
            </Button>
            <Button
              style={styles.bottomRoundedSmallPills}
              onPress={this.onSuperLike}
            >
              <Icon
                name="md-star"
                style={{
                  color: commonColor.brandInfo,
                  fontSize: 34,
                  marginLeft: 3,
                  marginRight: 3
                }}
              />
            </Button>
          </Row>
        </Grid>
      </Container>
    );
  }
}

export default connect(
  state => ({
    user: state.global.user
  }),
  {
    like: Actions.like,
    unlike: Actions.unlike,
    checkMatch: Actions.checkMatch,
  }
)(PhotoCard);
