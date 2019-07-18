import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { Container, Content, Text, Button, View, CheckBox } from "native-base";
import Swiper from "react-native-swiper";
import styles from "./styles";
import commonColor from "../../theme/variables/commonColor";
import { alert } from "../../services/Alert";
import { connect } from "react-redux";
import * as Actions from "../../redux/action";
import DatePicker from "react-native-datepicker";
import moment from "moment";
var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

class VerifyBirthday extends Component {
  state = {
    dob: "",
    date: ""
  };

  setDate = newDate => {
    console.log(newDate);
    const num = parseInt(moment(newDate).fromNow());
    const min = num - 3 < 21 ? 21 : num - 3;
    const max = num + 3 > 100 ? 100 : num + 3;
    this.setState({
      dob: moment(newDate).format("X"),
      age: num,
      min,
      max,
      date: newDate
    });
  };

  onContinue = () => {
    this.props.navigation.navigate('VerifyGender')
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#f2f2f2" }}>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
          <View style={styles.headerWrap}>
            <Text style={styles.header}>Verify your birthday</Text>
            <Image
              source={require("../../../assets/line1.png")}
              style={{ marginTop: -2 }}
            />
          </View>
          <TouchableOpacity>
            <Image
              source={require("../../../assets/close.png")}
              style={styles.close}
            />
          </TouchableOpacity>

          <DatePicker
            style={{
              width: deviceWidth - 60,
              alignSelf: "center"
            }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate={moment()
              .subtract(70, "years")
              .toDate()}
            maxDate={moment()
              .subtract(21, "years")
              .toDate()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            placeholder="Add your birthday here"
            format="MM/DD/YYYY"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 5,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              },
              dateText: {
                fontFamily: "Lato",
                fontSize: 18
              },
              placeholderText: {
                fontFamily: "Lato",
                fontSize: 18
              },
              dateInput: {
                width: deviceWidth - 60,
                height: 45,
                borderRadius: 10,
                borderColor: "#bdbfbf",
                borderStyle: "solid",
                borderWidth: 2,
                paddingLeft: 15
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={this.setDate}
          />

          <Button
            block
            rounded
            style={styles.button}
            onPress={this.onContinue}
          >
            <Text style={styles.buttonText}>CONTINUE</Text>
          </Button>
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

export default connect(
  state => ({
    user: state.global.user
  }),
  {
    loginFB: Actions.loginFB
  }
)(VerifyBirthday);
