import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Platform,
  ScrollView
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
    
      loading: false,
      expand: true,
    };
  }


  async componentDidMount() {
    this.setState({ loading: true });
    
    const { user } = this.props
    let images = null;
    if (user) {
      const res = await API.getImages_API(user.uid);
      if (res.status) {
        //const images = res.data;
        images = res.data.filter(image => image.uri != "");
      }
    }


    this.setState({  images, loading: false });
  }


  
  changeStage = () => {
    console.log("expand", this.state.expand);
    this.setState({
      expand: !this.state.expand
    });

    console.log("expand", this.state.expand);
  };


  renderExpand = (person, isPerson, images) => {
    return (
      <View style={styles.body}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.nameText}>
            {person.name} {person.age}
          </Text>
          <Text style={styles.address}>{person.address}</Text>
          <Text style={styles.church}>{person.church}</Text>
          <Text style={styles.desc}>{person.aboutMe}</Text>

          <View>
            <Text style={styles.photo}>Photos</Text>
          </View>

          <View style={{ marginBottom: 25 }}>
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
                {Array.isArray(images) ? (
                  images.map((image, i) => {
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
            <React.Fragment>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Settings")}
              >
                <Image
                  source={require("../../../assets/setting.png")}
                  style={styles.close}
                />
              </TouchableOpacity>
              <Button
                block
                rounded
                style={styles.button}
                onPress={() => this.props.navigation.navigate("EditProfile")}
              >
                <Text style={styles.buttonText}>EDIT</Text>
              </Button>
            </React.Fragment>
          </View>

          <View style={styles.collapse}>
            <TouchableOpacity onPress={this.changeStage}>
              <Icon
                name="arrow-collapse-down"
                type="MaterialCommunityIcons"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  renderCollapse = (person, isPerson) => {
    return (
      <View>
        <View style={[styles.body, { height: 220 }]}>
          <Text style={styles.nameText}>
            {person.name} {person.age}
          </Text>
          <Text style={styles.address}>{person.address}</Text>
          <Text style={styles.church}>{person.church}</Text>

          <View style={styles.buttons}>
            <React.Fragment>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Settings")}
              >
                <Image
                  source={require("../../../assets/setting.png")}
                  style={styles.close}
                />
              </TouchableOpacity>
              <Button
                block
                rounded
                style={styles.button}
                onPress={() => this.props.navigation.navigate("EditProfile")}
              >
                <Text style={styles.buttonText}>EDIT</Text>
              </Button>
            </React.Fragment>
          </View>
          <View style={styles.collapse}>
            <TouchableOpacity onPress={this.changeStage}>
              <Icon
                name="arrow-collapse-down"
                type="MaterialCommunityIcons"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {



    const { user } = this.props;
  

    const navigation = this.props.navigation;
    if (this.state.loading) return <Spinner />;

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
                resizeMode="cover"
              />
            </View>
          </Swiper>
        </View>

        {this.state.expand
          ? this.renderExpand(user, false, this.state.images)
          : this.renderCollapse(user, false)}
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
