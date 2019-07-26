import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput
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
      loading: false,

      imageMain: "",
      images: []
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { user } = this.props;
    let images = null;
    if (user) {
      const res = await API.getImages_API(user.uid);
      if (res.status) {
        images = res.data.filter(image => image.uri != "");
      }
    }

    this.setState({ images, loading: false, aboutMe: user.aboutMe, imageMain: user.image });
  }

  refresh = async () => {
    const { user } = this.props;
    let images = null;
    if (user) {
      const res = await API.getImages_API(user.uid);
      if (res.status) {
        images = res.data.filter(image => image.uri != "");
      }
    }
    this.setState({ images, imageMain: user.image });

   
  }

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
    this.setState({ loading: true });
    const { user } = this.props;

    const res = await API.deleteImage(user.uid, name);

    if (name == "main.png")
      await this.props.updateUser(user.uid, { image: "" });
    else {
      await this.props.updateUserImages(user.uid, name, "");
    }
    this.refresh();
    // console.log(res);
    this.setState({ loading: false });
  };

  onSave = async () => {
    const { aboutMe } = this.state;
    const { updateUser, user } = this.props;

    const updObj = {
      aboutMe
    };

    res = await updateUser(user.uid, updObj);

    //success('Settings has been saved')

    if (res.type == ActionType.UPDATE_USER_OK) {
      success("Profile has been saved");
      this.props.navigation.navigate("Profile");
    } else alert("There is an unexpected error, please try again!");
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

          <View style={styles.textView}>
            <Text style={styles.tapText}>TAP TO TYPE</Text>
            <View style={{ marginLeft: 0 }}>
              <TextInput
                multiline={true}
                placeholder="About you . . ."
                onChangeText={aboutMe => this.setState({ aboutMe })}
                maxLength={500}
                numberOfLines={6}
                style={[
                  {
                    height: 40,
                    textAlignVertical: "top"
                  },
                  styles.desc
                ]}
                underlineColorAndroid={"transparent"}
                value={this.state.aboutMe}
              />
            </View>
          </View>

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
                onPress={() => this.props.navigation.navigate("Profile")}
              >
                <Image
                  source={require("../../../assets/Pass_Button.png")}
                  style={styles.close}
                />
              </TouchableOpacity>
              <Button block rounded style={styles.button} onPress={this.onSave}>
                <Text style={styles.buttonText}>SAVE</Text>
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

  render() {
    const { person, user } = this.props;

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

        {this.renderExpand(user, false, this.state.images)}
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
