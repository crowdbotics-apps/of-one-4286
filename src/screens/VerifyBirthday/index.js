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
import * as ActionType from "../../redux/actionType";

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

    this.setState({
      dob: Number(moment(newDate).format("X")),
      age: num,
      date: newDate
    });
  };

  onContinue = async () => {
    //save data
    // console.log(this.state) 
    const { updateUser, user } = this.props;
    const {
      dob,
      age,
    } = this.state;
   

    const updObj = {
      
      age,
      dob,
    };

    if(dob == null || dob == ''){
      alert('Please add your birthday!')
      return 
    }

    res = await updateUser(user.uid, updObj);

    //success('Settings has been saved')

    if (res.type == ActionType.UPDATE_USER_OK)
      this.props.navigation.navigate('VerifyGender')
    else 
      alert("There is an unexpected error, please try again!");

    
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
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
          <Text style={styles.requiredText}>Required</Text>

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
    updateUser: Actions.updateUser,
  }
)(VerifyBirthday);