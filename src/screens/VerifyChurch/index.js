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
  Body,
  Item,
  Input,
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

class VerifyChurch extends Component {
  state = {
    church: ""
  };



  onContinue = async () => {
    const { updateUser, user } = this.props;
    const {
      church
    } = this.state;
   

    const updObj = {
      church
    };
    
    if(church == null || church == ''){
      alert('Please add your church!')
      return 
    }

    res = await updateUser(user.uid, updObj);


    if (res.type == ActionType.UPDATE_USER_OK)
      this.props.navigation.navigate('HomeTabNavigation')
    else 
      alert("There is an unexpected error, please try again!");


  }

  onPrevious = () => {
    
    this.props.navigation.navigate("VerifyGender");
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#f2f2f2" }}>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
          <View style={styles.headerWrap}>
            <Text style={styles.header}>Verify your Coptic church</Text>
            <Image
              source={require("../../../assets/line3.png")}
              style={{ marginTop: -2 }}
            />
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Image
              source={require("../../../assets/close.png")}
              style={styles.close}
            />
          </TouchableOpacity>
          <Item style={styles.item} regular last>
            
            <Input
              style={styles.input}
              placeholder="Add your church here"
              placeholderTextColor="grey"
              autoCapitalize="none"
              onChangeText={church => this.setState({ church })}
              value={this.state.church}
            />
          </Item>
          <Text style={styles.requiredText}>Required</Text>
         

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
              <Text style={styles.buttonText}>DONE</Text>
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
          checked={gender === "female"}
          onPress={() => onChange("female")}
        />
        <Text style={{ marginLeft: 15 }}>Female</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <CheckBox
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
)(VerifyChurch);
