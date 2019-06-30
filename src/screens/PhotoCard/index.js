import React, { Component } from "react";
import { Image,ImageBackground, View } from "react-native";
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
import data from "./data";
import * as API from "../../services/Api";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import { Constants, Location, Permissions } from "expo";


class PhotoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: null,
      opac: 0,
      users: [],
    };
  }

  _getLocationAsync = async () => {
    
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
  }

  async componentDidMount(){
    await this._getLocationAsync()

    const resUsers = await API.getUsers_API();
    let users = [];
    if (resUsers.status) {
      users = resUsers.data;
      
      this.setState({users})
    }
  }

  onRefresh = async () => {
    const resUsers = await API.getUsers_API();
    let users = [];
    if (resUsers.status) {
      users = resUsers.data;
      
      this.setState({users})
    }
  }

  onLike = () => {
    
    this._deckSwiper._root.swipeRight()
  }

  onUnLike = () => {
    this._deckSwiper._root.swipeLeft()
  }

  onSuperLike = () => {
    const navigation = this.props.navigation;
    navigation.navigate("PhotoCardDetails")
  }

  render() {
    const { users } = this.state
    const data1 = users.filter(item => item.uid != null) 
    console.log(data1)
    const navigation = this.props.navigation;
    if(data1.length == 0)
      return <Spinner />

    if(data1.length < 2)
      return <Text>No user found.</Text>

    return (
      <Container style={styles.wrapper}>
        <View style={styles.deckswiperView}>
          <DeckSwiper
            activeOpacity={1}
            dataSource={data1}
            ref={mr => (this._deckSwiper = mr)}
            onSwiping={(dir, opa) =>
              this.setState({ direction: dir, opac: opa })}
            renderTop={item =>
              <Card activeOpacity={1} style={{ borderRadius: 10 }}>
                <CardItem
                  button
                  style={styles.deckswiperImageCarditem}
                  activeOpacity={1}
                  cardBody
                  onPress={() => navigation.navigate("PhotoCardDetails")}
                >
                  <ImageBackground style={styles.cardMain} source={item.uid == null ? item.image : item.image != '' ? {uri: item.image} : require('../../../assets/launchscreen.png')}>
                    {this.state.direction === "left" &&
                      <View
                        style={{
                          opacity: -this.state.opac / 150,
                          position: "absolute",
                          right: 30,
                          top: 40,
                          borderWidth: 2,
                          borderRadius: 5,
                          borderColor: commonColor.brandPrimary,
                          width: 100,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                          transform: [{ rotate: "20deg" }]
                        }}
                      >
                        <Text
                          style={{
                            backgroundColor: "transparent",
                            fontSize: 30,
                            color: commonColor.brandPrimary,
                            fontWeight: "900",
                            textAlign: "center",
                            lineHeight: 35
                          }}
                        >
                          NOPE
                        </Text>
                      </View>}
                    {this.state.direction === "right" &&
                      <View
                        style={{
                          opacity: this.state.opac / 150,
                          position: "absolute",
                          left: 30,
                          top: 40,
                          borderWidth: 2,
                          borderRadius: 5,
                          borderColor: commonColor.brandSuccess,
                          width: 100,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                          transform: [{ rotate: "-20deg" }]
                        }}
                      >
                        <Text
                          style={{
                            backgroundColor: "transparent",
                            fontSize: 30,
                            color: commonColor.brandSuccess,
                            fontWeight: "900",
                            textAlign: "center",
                            lineHeight: 35
                          }}
                        >
                          Like
                        </Text>
                      </View>}
                  </ImageBackground>
                </CardItem>
                <CardItem
                  button
                  activeOpacity={1}
                  onPress={() => navigation.navigate("PhotoCardDetails")}
                  style={styles.deckswiperDetailsCarditem}
                >
                  <Body>
                    <Text style={styles.text}>
                      {item.name}
                    </Text>
                    <Text style={styles.subtextLeft}>
                      {item.college}
                    </Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Icon name="md-book" style={styles.iconRight} />
                      <Text style={styles.subtextRight}>
                        {item.num}
                      </Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>}
            renderBottom={item =>
              <Card style={{ borderRadius: 10 }}>
                <CardItem
                  style={{
                    borderTopLeftRadius: 10,
                    overflow: "hidden",
                    borderTopRightRadius: 10
                  }}
                  cardBody
                >
                  <Image style={styles.cardMain} source={item.uid == null ? item.image : item.image != '' ? {uri: item.image} : require('../../../assets/launchscreen.png')} />
                </CardItem>
                <CardItem
                  style={{
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                  }}
                >
                  <Body>
                    <Text style={styles.text}>
                      {item.name}
                    </Text>
                    <Text style={styles.subtextLeft}>
                      {item.college}
                    </Text>
                  </Body>
                  <Right>
                    <Button
                      transparent
                      textStyle={{ color: "#797979", fontWeight: "900" }}
                    >
                      <Icon
                        name="md-book"
                        style={{ color: "#797979", paddingRight: 4 }}
                      />
                      <Text style={styles.text}>
                        {item.num}
                      </Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>}
          />
        </View>
        <Grid style={styles.bottomGrid}>
          <Row style={styles.bottomRowStyle}>
            <Button style={styles.bottomRoundedSmallPills} onPress={this.onRefresh}>
              <Icon
                name="md-refresh"
                style={{
                  color: commonColor.brandWarning,
                  fontSize: 34
                }}
              />
            </Button>
            <Button
              style={styles.bottomRoundedPills}
              onPress={this.onUnLike}
            >
              <Icon
                name="md-close"
                style={{
                  color: commonColor.brandDanger,
                  fontSize: 40,
                  lineHeight: 40
                }}
              />
            </Button>
            <Button
              style={styles.bottomRoundedPills}
              onPress={this.onLike}
            >
              <Icon
                name="md-heart"
                style={{
                  color: commonColor.brandSuccess,
                  fontSize: 35,
                  lineHeight: 40,
                  marginLeft: 2,
                  marginRight: 2
                }}
              />
            </Button>
            <Button
              style={styles.bottomRoundedSmallPills}
              onPress={this.onSuperLike}
            >
              <Icon
                name="md-star"
                style={{
                  color: commonColor.brandInfo,
                  fontSize: 34,
                  marginLeft: 3,
                  marginRight: 3
                }}
              />
            </Button>
          </Row>
        </Grid>
      </Container>
    );
  }
}


export default connect(
  state => ({
    
  }),
  {
   
  }
)(PhotoCard);