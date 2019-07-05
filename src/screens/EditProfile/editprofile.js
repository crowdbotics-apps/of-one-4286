import React, { Component } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Content,
  Icon,
  Radio,
  Button,
  Header,
  Title,
  Card,
  CardItem,
  Switch,
  Left,
  Right,
  Body
} from "native-base";
import ImageContainer from "./image-container";
import MainImage from "./main-image";
import commonColor from "../../theme/variables/commonColor";
import * as API from "../../services/Api";
import { connect } from "react-redux";
import * as Actions from "../../redux/action";
import { success, info, alert } from "../../services/Alert";
import * as ActionType from "../../redux/actionType";
import { Constants, Permissions, ImagePicker } from "expo";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      radioToggleMale: true,
      radioToggleFemale: false,
      aboutMe: "",
      age: 0,
      school: "",
      height: 0,
      ageSwitch: true,
      disSwitch: true,

      imageMain: "",
      images: [],

      loading: false
    };
  }

  toggleMale() {
    this.setState({
      radioToggleMale: true,
      radioToggleFemale: false
    });
  }
  toggleFemale() {
    this.setState({
      radioToggleMale: false,
      radioToggleFemale: true
    });
  }

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

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

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

  async componentDidMount() {
    this.getPermissionAsync();
    await this.props.getImages(this.props.user.uid);

    this.refresh();
  }

  render() {
    console.log("images", this.state.images);
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
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="md-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Edit Profile</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.onSave}>
              <Icon name="md-save" />
            </Button>
          </Right>
        </Header>
        <Content style={{ marginTop: 2 }}>
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

            <View>
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
            </View>

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

          <View
            style={{
              borderTopColor: "white",
              borderTopWidth: 10
            }}
          >
            <View style={styles.headingView}>
              <Text style={styles.headingText}>About You</Text>
            </View>
            <View style={styles.textView}>
              <View style={{ marginLeft: 8 }}>
                <TextInput
                  multiline={true}
                  placeholder="About you . . ."
                  onChangeText={aboutMe => this.setState({ aboutMe })}
                  maxLength={500}
                  numberOfLines={6}
                  style={[
                    styles.textArea,
                    {
                      height: Math.max(40, this.state.height),
                      textAlignVertical: "top"
                    }
                  ]}
                  underlineColorAndroid={"transparent"}
                  value={this.state.aboutMe}
                />
              </View>
            </View>
          </View>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Age</Text>
          </View>
          <View style={styles.textView}>
            <View style={{ marginLeft: 8 }}>
              <TextInput
                placeholder="your age . . ."
                onChangeText={age => this.setState({ age })}
                style={[
                  styles.textArea,
                  {
                    height: Math.max(40, this.state.height),
                    textAlignVertical: "top"
                  }
                ]}
                underlineColorAndroid={"transparent"}
                value={this.state.age}
              />
            </View>
          </View>

          <View style={styles.headingView}>
            <Text style={styles.headingText}>School</Text>
          </View>
          <View style={styles.textView}>
            <View style={{ marginLeft: 8 }}>
              <TextInput
                multiline={true}
                placeholder="Your school ..."
                onChangeText={school => this.setState({ school })}
                maxLength={500}
                style={[
                  styles.textArea,
                  {
                    height: Math.max(40, this.state.height),
                    textAlignVertical: "top"
                  }
                ]}
                underlineColorAndroid={"transparent"}
                value={this.state.school}
              />
            </View>
          </View>
          {/* <TouchableOpacity onPress={() => navigation.navigate("School")}>
            <View style={styles.textView}>
              <Text
                style={{
                  color: commonColor.contentTextColor,
                  marginHorizontal: 7
                }}
              >
                JCE, Bangalore
              </Text>
            </View>
          </TouchableOpacity> */}
          <View style={{ marginVertical: 5 }}>
            <View style={styles.headingView}>
              <Text style={styles.headingText}>Gender</Text>
            </View>
            <TouchableWithoutFeedback
              style={styles.radiobuttonView}
              onPress={() => this.toggleMale()}
            >
              <View style={styles.radiobuttonView}>
                <Text
                  style={{
                    lineHeight: 24,
                    marginTop: Platform.OS === "ios" ? 3 : undefined,
                    color: commonColor.contentTextColor
                  }}
                >
                  Male
                </Text>
                <Radio
                  selected={this.state.radioToggleMale}
                  style={{ left: -20 }}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={styles.radiobuttonView}
              onPress={() => this.toggleFemale()}
            >
              <View style={styles.radiobuttonView}>
                <Text
                  style={{
                    lineHeight: 24,
                    marginTop: Platform.OS === "ios" ? 3 : undefined,
                    marginBottom: 5,
                    color: commonColor.contentTextColor
                  }}
                >
                  Female
                </Text>
                <Radio
                  selected={this.state.radioToggleFemale}
                  style={{ left: -20 }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/* <View style={styles.headingView}>
            <Text style={styles.headingText}>Control Your Profile</Text>
          </View>
          <Card
            style={{ borderRadius: 0, borderColor: "transparent", margin: 0 }}
          >
            <CardItem style={{ borderRadius: 0, borderColor: "transparent" }}>
              <Left>
                <Text style={styles.switchBlockHeader}>Dont Show My Age</Text>
              </Left>
              <Right>
                <Switch
                  onValueChange={value => this.setState({ ageSwitch: value })}
                  onTintColor={commonColor.brandPrimary}
                  thumbTintColor={
                    Platform.OS === "android" ? "#ededed" : undefined
                  }
                  value={this.state.ageSwitch}
                />
              </Right>
            </CardItem>
            <CardItem style={{ borderRadius: 0, borderColor: "transparent" }}>
              <Left>
                <Text style={styles.switchBlockHeader}>
                  Make My Distance Invisible
                </Text>
              </Left>
              <Right>
                <Switch
                  onValueChange={value => this.setState({ disSwitch: value })}
                  onTintColor={commonColor.brandPrimary}
                  thumbTintColor={
                    Platform.OS === "android" ? "#ededed" : undefined
                  }
                  value={this.state.disSwitch}
                />
              </Right>
            </CardItem>
          </Card>*/}
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  imagesSectionView: {
    marginTop: 15,
    marginHorizontal: 15
  },
  rowOneView: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  headingView: {
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 5,
    paddingVertical: 3
  },
  headingText: {
    fontWeight: "bold",
    color: commonColor.lightTextColor
  },
  textView: {
    backgroundColor: "white",
    padding: 10
  },
  radiobuttonView: {
    paddingVertical: 5,
    backgroundColor: "white",
    flexDirection: "row",
    paddingLeft: 15,
    justifyContent: "space-between"
  },
  switchBlockHeader: {
    color: commonColor.contentTextColor
  }
};

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
