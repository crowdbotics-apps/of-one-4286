import React, { Component } from "react";
import { Image, View, Text } from "react-native";
import { Container, Content, Button } from "native-base";
import styles from "./styles";
import * as API from "../../services/Api";
import { connect } from "react-redux";
import * as Actions from "../../redux/action";

class Chat extends Component {
  async componentDidMount(){
    if(this.props.matchings.length > 0)
      this.props.navigation.navigate('ChatList')
    else{
       this.props.getMatchings(this.props.user.uid)
    }
  }

  render() {
    const navigation = this.props.navigation;

    if(this.props.matchings.length > 0)
      this.props.navigation.navigate('ChatList')

    return (
      <Container style={styles.container}>
        <Content scrollEnabled={false}>
          <View style={styles.imageView}>
            <Image
              source={require("../../../assets/likeSquare.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.matchesTextView}>
              <Text style={styles.matchesText}>You have no matches yet</Text>
            </View>
          </View>
          <Button
            block
            large
            onPress={() => navigation.navigate("PhotoCard")}
            style={styles.discoverBtn}
          >
            <Text style={styles.discoverBtnText}>Discover New People</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}



export default connect(
  state => ({
    matchings: state.global.matchings,
    user: state.global.user,
  }),
  {
    getMatchings: Actions.getMatchings
  }
)(Chat);