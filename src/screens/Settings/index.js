import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Platform,
  Linking,
  Slider
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
import MultiSlider from "react-native-multi-slider";

import * as API from "../../services/Api";
import { connect } from "react-redux";
import * as Actions from "../../redux/action";
import { Constants, Location, Permissions } from "expo";
import Swiper from "react-native-swiper";
import { ScrollView } from "react-native-gesture-handler";
var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: null,
      opac: 0,
      users: [],
      loading: false,
      expand: true,

      multiSliderValue: [21, 50]
    };
  }


  async componentDidMount() {
    this.setState({ loading: false });


    
  }


  multiSliderValuesChange = values => {
    this.setState({
      multiSliderValue: values
    });
  };

  changeStage = () => {
    console.log("expand", this.state.expand);
    this.setState({
      expand: !this.state.expand
    });

    console.log("expand", this.state.expand);
  };


  render() {
 
    const { user } = this.props;
   

    const navigation = this.props.navigation;
    if (this.state.loading) return <Spinner />;




    return (
      <ImageBackground

        source={
          user.image == ""
            ? require("../../../assets/launchscreen.png")
            : { uri: user.image }
        }
        style={{ width: "100%", height: "100%" }}
      >
        <Container style={styles.wrapper}>
          <View style={styles.body}>
            <ScrollView style={{ flex: 1 }}>
              <Text style={styles.nameText}>{user.name} 22</Text>
              <Text style={styles.address}>Manhattan, New York</Text>
              <Text style={styles.church}>St. Mary & St. Mark Church</Text>

              <Text style={styles.headerText}>Settings</Text>

              <View style={styles.group}>
                <Text style={styles.label}>Radius</Text>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Slider
                    //style={{ marginBottom: 10 }}
                    onValueChange={value =>
                      this.setState({ sliderValue: value })
                    }
                    maximumValue={50}
                    minimumValue={1}
                    minimumTrackTintColor={"#d9a91a"}
                    step={1}
                    value={this.state.sliderValue}
                    
                  />
                </View>
              </View>

              <View >
                <Text style={[styles.label, { marginBottom: 15 }]}>Age Range</Text>

                <MultiSlider
                  values={[
                    this.state.multiSliderValue[0],
                    this.state.multiSliderValue[1]
                  ]}
                  sliderLength={width - 40}
                  onValuesChangeFinish={this.multiSliderValuesChange}
                  min={0}
                  max={100}
                  step={1}
                  allowOverlap
                  snapped
                  selectedStyle={{ backgroundColor: "#d9a91a" }}
                  trackStyle={{height: 2, marginTop: 4 }}
                  unselectedStyle={{ backgroundColor: "#bdbfbf" }}
                  markerContainerStyle={{ color: "white" }}
                />
              </View>

              <TouchableOpacity style={styles.group}>
                <Text style={styles.label}>Church</Text>
                <Text style={styles.text}>Change</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.group}>
                <Text style={styles.label}>Visibility</Text>
                <Text style={styles.text}>Visible</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.group} >
                <Text style={styles.label}>Instagram</Text>
                <Text style={styles.text}>Connected</Text>
              </TouchableOpacity>

              <Image
                style={{ marginBottom: 15 }}
                source={require("../../../assets/line_setting.png")}
              />

              <TouchableOpacity
                style={styles.group}
                onPress={() => {
                  Linking.openURL("mailto://support@ofone.org");
                }}
              >
                <Text style={styles.label}>Help Support</Text>
                <Text style={styles.text}>Email</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.group}
                onPress={() => {
                  Linking.openURL(
                    "https://app.termly.io/document/privacy-policy/67185285-f602-4e03-8812-192c45653a06"
                  );
                }}
              >
                <Text style={styles.label}>Privacy Policy & Guidelines</Text>
                <Text style={styles.text}>Learn more</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.group}
                onPress={() => {
                  Linking.openURL(
                    "https://app.termly.io/document/terms-of-use-for-website/f6f7062f-2bf7-4cf2-ab99-0e7c72e5dfe4"
                  );
                }}
              >
                <Text style={styles.label}>Terms of Service</Text>
                <Text style={styles.text}>Learn more</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.group}>
                <Text style={styles.label}>Delete Account</Text>
                <Text style={styles.textDel}>Permanently</Text>
              </TouchableOpacity>

              <View style={styles.buttons}>
                <Button
                  block
                  rounded
                  style={styles.button}
                  onPress={() => navigation.navigate("Profile")}
                >
                  <Text style={styles.buttonText}>DONE</Text>
                </Button>
              </View>
            </ScrollView>
          </View>
        </Container>
      </ImageBackground>
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
)(Settings);
