import React, { Component } from "react";

import { Text, FlatList } from "react-native";
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

const navigateAction = name =>
  NavigationActions.navigate({
    routeName: "ChatScreen",
    params: { name: name }
  });

class ChatList extends Component {
  async componentDidMount() {
    await this.props.getMatchings(this.props.user.uid);

    if (!(this.props.matchings.length > 0))
      this.props.navigation.navigate("Chat");
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
          : { uri: item.image } 
      };
    });

    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="md-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Matches</Title>
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
                onPress={() => navigation.dispatch(navigateAction(item.name))}
              >
                <Left>
                  <Thumbnail round source={item.thumbnail} />
                </Left>
                <Body>
                  <Text style={styles.userNameText}>{item.name}</Text>
                  {/* <Text style={styles.distanceText}>
                    {dataRow.distance}
                  </Text> */}
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
