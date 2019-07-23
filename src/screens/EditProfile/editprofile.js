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
  Spinner,
  Content
} from "native-base";
import commonColor from "../../theme/variables/commonColor";
import styles from "./styles";

import * as API from "../../services/Api";
import { connect } from "react-redux";
import * as Actions from "../../redux/action";
import { Constants, Location, Permissions, ImagePicker } from "expo";
import Swiper from "react-native-swiper";
var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

import ImageContainer from "./image-container";
import MainImage from "./main-image";

import { success, info, alert } from "../../services/Alert";
import * as ActionType from "../../redux/actionType";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: null,
      opac: 0,
      users: [],
      loading: false,
      expand: true,

      imageMain: "",
      images: []
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
    //this.setState({ loading: true });

    this.getPermissionAsync();
    await this.props.getImages(this.props.user.uid);

    this.refresh();
  }

  refresh = () => {
    const { user, images } = this.props;
    this.setState({
      radioToggleMale: user.gender == "male",
      radioToggleFemale: user.gender == "female",
      aboutMe: user.aboutMe,
      age: user.age,
      school: user.college,
      images: images,
      imageMain: user.image
    });
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  onChooseImagePress = async name => {
    //let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync();

    const { user } = this.props;

    if (!result.cancelled) {
      this.setState({ loading: true });
      console.log(result);
      const uri = await API.uploadImage(user.uid, result.uri, name);
      //const uri = "image path";
      console.log(uri);

      if (name == "main.png")
        await this.props.updateUser(user.uid, { image: uri });
      else {
        await this.props.updateUserImages(user.uid, name, uri);
      }

      this.refresh();
      this.setState({ loading: false });
    }
  };

  onDeleteImage = async name => {
    const { user } = this.props;

    const res = await API.deleteImage(user.uid, name);

    if (name == "main.png")
      await this.props.updateUser(user.uid, { image: "" });
    else {
      await this.props.updateUserImages(user.uid, name, "");
    }
    this.refresh();
    console.log(res);
  };

  onSave = async () => {
    const {
      radioToggleMale,
      radioToggleFemale,
      aboutMe,
      age,
      school
    } = this.state;
    const { updateUser, user } = this.props;

    const updObj = {
      gender: radioToggleMale ? "male" : "female",
      aboutMe,
      age,
      college: school
    };

    res = await updateUser(user.uid, updObj);

    //success('Settings has been saved')

    if (res.type == ActionType.UPDATE_USER_OK)
      success("Profile has been saved");
    else alert("There is an unexpected error, please try again!");
  };

  changeStage = () => {
    console.log("expand", this.state.expand);
    this.setState({
      expand: !this.state.expand
    });

    console.log("expand", this.state.expand);
  };

  render() {
    //return this.renderNoUser();

    const { users } = this.state;
    const { person, user } = this.props;
    //const data1 = users.filter(item => item.uid != null);

    if (this.state.loading) return <Spinner />;

    let image0 = "",
      image1 = "",
      image2 = "",
      image3 = "",
      image4 = "",
      image5 = "",
      image6 = "";
    this.state.images &&
      this.state.images.forEach(item => {
        switch (item.id) {
          case "images_0.png":
            image0 = item.uri;
            break;
          case "images_1.png":
            image1 = item.uri;
            break;
          case "images_2.png":
            image2 = item.uri;
            break;
          case "images_3.png":
            image3 = item.uri;
            break;
          case "images_4.png":
            image4 = item.uri;
            break;
          case "images_5.png":
            image5 = item.uri;
            break;
          case "images_6.png":
            image6 = item.uri;
            break;
        }
      });
    if (this.state.loading)
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            size="large"
            color="#F7524C"
            style={{ backgroundColor: "transparent" }}
          />
        </View>
      );
    const navigation = this.props.navigation;

    return (
      <Container style={styles.wrapper}>
        <Content>
          <View style={styles.imagesSectionView}>
            <View style={styles.rowOneView}>
              <MainImage
                source={
                  this.state.imageMain != ""
                    ? { uri: this.state.imageMain }
                    : null
                }
                onAdd={this.onChooseImagePress.bind(this, "main.png")}
                onDel={this.onDeleteImage.bind(this, "main.png")}
              />
              <View style={{ flex: 1 }}>
                <ImageContainer
                  marginLeft={10}
                  source={image0 != "" ? { uri: image0 } : null}
                  onAdd={this.onChooseImagePress.bind(this, "images_0.png")}
                  onDel={this.onDeleteImage.bind(this, "images_0.png")}
                />
                <ImageContainer
                  marginLeft={10}
                  source={image1 != "" ? { uri: image1 } : null}
                  onAdd={this.onChooseImagePress.bind(this, `images_1.png`)}
                  onDel={this.onDeleteImage.bind(this, "images_1.png")}
                />
              </View>
            </View>

            {/* <View>
              <View style={{ flexDirection: "row" }}>
                <ImageContainer
                source={image2 != "" ? { uri: image2 } : null}
                  onAdd={this.onChooseImagePress.bind(this, `images_2.png`)}
                  onDel={this.onDeleteImage.bind(this, "images_2.png")}
                />
                <ImageContainer
                  marginLeft={20}
                  source={image3 != "" ? { uri: image3 } : null}
                  onAdd={this.onChooseImagePress.bind(this, `images_3.png`)}
                  onDel={this.onDeleteImage.bind(this, "images_3.png")}
                />
                <ImageContainer
                  marginLeft={20}
                  source={image4 != "" ? { uri: image4 } : null}
                  onAdd={this.onChooseImagePress.bind(this, `images_4.png`)}
                  onDel={this.onDeleteImage.bind(this, "images_4.png")}
                />
              </View>
            </View> */}

            {/* <View>
              <View style={{ flexDirection: "row" }}>
                <ImageContainer
                  source={require("../../../assets/federer.jpg")}
                />
                <ImageContainer marginLeft={20} />
                <ImageContainer marginLeft={20} />
              </View>
            </View> */}
          </View>
          </Content>
          <View>
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
                <TouchableOpacity
                  onPress={() => navigation.navigate("Settings")}
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
                  onPress={() => navigation.navigate("EditProfile")}
                >
                  <Text style={styles.buttonText}>EDIT</Text>
                </Button>
              </View>
            </View>
          </View>
        
      </Container>
    );
  }
}

export default connect(
  state => ({
    user: state.global.user,
    images: state.global.images
  }),
  {
    updateUser: Actions.updateUser,
    updateUserImages: Actions.updateUserImages,
    getImages: Actions.getImages
  }
)(EditProfile);
