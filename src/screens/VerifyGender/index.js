import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Content,
  Button,
  View,
  CheckBox,
  Icon,
  Text,
  Body
} from "native-base";
import Swiper from "react-native-swiper";
import styles from "./styles";
import commonColor from "../../theme/variables/commonColor";
import { alert } from "../../services/Alert";
import { connect } from "react-redux";
import * as Actions from "../../redux/action";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import * as ActionType from "../../redux/actionType";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

class VerifyGender extends Component {
  state = {
    gender: "male"
  };

  onChangeGender = gender => {
    this.setState({
      gender: gender
    });
  };


  onContinue = async () => {
    const { updateUser, user } = this.props;
    const {
      gender
    } = this.state;
   

    const updObj = {
      gender
    };


    res = await updateUser(user.uid, updObj);


    if (res.type == ActionType.UPDATE_USER_OK)
      this.props.navigation.navigate('VerifyChurch')
    else 
      alert("There is an unexpected error, please try again!");


  };

  onPrevious = () => {
    this.props.navigation.navigate("VerifyBirthday");
  };

  render() {
    return (
      <Container style={{ backgroundColor: "#f2f2f2" }}>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
          <View style={styles.headerWrap}>
            <Text style={styles.header}>Verify your gender</Text>
            <Image
              source={require("../../../assets/line2.png")}
              style={{ marginTop: -2 }}
            />
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Image
              source={require("../../../assets/close.png")}
              style={styles.close}
            />
          </TouchableOpacity>

          <Gender gender={this.state.gender} onChange={this.onChangeGender} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 30
            }}
          >
            <Button
              block
              rounded
              style={styles.buttonPrev}
              onPress={this.onPrevious}
            >
              <Text style={styles.buttonTextPrev}>PREVIOUS</Text>
            </Button>

            <Button
              block
              rounded
              style={styles.button}
              onPress={this.onContinue}
            >
              <Text style={styles.buttonText}>CONTINUE</Text>
            </Button>
          </View>
        </Content>
        {/* <View style={styles.noteView}>
          <Text style={styles.noteText}>
            By signing in, you agree with our terms of services and privacy
            settings
          </Text>
        </View> */}
      </Container>
    );
  }
}

const Gender = props => {
  const { gender, onChange, other, style } = props;
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-around",
          marginHorizontal: 30
        },
        { ...style }
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        <CheckBox
          color="#d9a91a"
          checked={gender === "female"}
          onPress={() => onChange("female")}
        />
        <Text style={{ marginLeft: 15 }}>Female</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <CheckBox
          color="#d9a91a"
          checked={gender === "male"}
          onPress={() => onChange("male")}
        />
        <Text style={{ marginLeft: 15 }}>Male</Text>
      </View>
    </View>
  );
};

export default connect(
  state => ({
    user: state.global.user
  }),
  {
    updateUser: Actions.updateUser,
  }
)(VerifyGender);