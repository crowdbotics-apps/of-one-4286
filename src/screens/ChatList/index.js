import React, { Component } from "react";

import { Text, FlatList, ListView } from "react-native";
import {
  Container,
  Content,
  Button,
  Icon,
  Header,
  Title,
  ListItem,
  Thumbnail,
  Left,
  Right,
  Body
} from "native-base";


import { NavigationActions } from "react-navigation";
import styles from "./styles";
// import data from "./data";
import * as API from "../../services/Api";
import { connect } from "react-redux";
import * as Actions from "../../redux/action";

const navigateAction = person =>
  NavigationActions.navigate({
    routeName: "ChatScreen",
    params: { person: person }
  });

class ChatList extends Component {
  async componentDidMount() {
    await this.props.getMatchings(this.props.user.uid);

    // if (!(this.props.matchings.length > 0))
    //   this.props.navigation.navigate("Chat");
  }

  render() {
    const navigation = this.props.navigation;
    const { matchings } = this.props;

    const data = matchings.map(item => {
      return {
       
        name: item.name,
        distance: "",
        thumbnail: !item.image
          ? require("../../../assets/avatar.png")
          : { uri: item.image } ,
        uid: item.uid,
      };
    });

    // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });


    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Header>
          <Left>
            <Title style={styles.navTitle}>Messages</Title>
          </Left>
          <Body>
            <React.Fragment/>
          </Body>
          <Right />
        </Header>
        <Content>
          <FlatList
            removeClippedSubviews={false}
            style={{ marginTop: 7 }}
            data={data}
            renderItem={({ item }) => (
              <ListItem
                avatar
                button
                style={{ marginLeft: 15 }}
                onPress={() => navigation.dispatch(navigateAction(item))}
              >
                <Left>
                  <Thumbnail round source={item.thumbnail} />
                </Left>
                <Body>
                  <Text style={styles.userNameText}>{item.name}</Text>
                  <Text style={styles.newMatch}>New Match</Text>
                </Body>
              </ListItem>
            )}
            
          />


        </Content>
      </Container>
    );
  }
}

export default connect(
  state => ({
    matchings: state.global.matchings,
    user: state.global.user
  }),
  {
    getMatchings: Actions.getMatchings
  }
)(ChatList);
