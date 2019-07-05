import React, { Component } from "react";
import { View, Image, Platform } from "react-native";
import {
  Container,
  Content,
  Text,
  Grid,
  Row,
  Icon,
  Button,
  Spinner
} from "native-base";
import Swiper from "react-native-swiper";
import commonColor from "../../theme/variables/commonColor";
import styles from "./styles";
import * as API from "../../services/Api";
import { connect } from "react-redux";
import * as Actions from "../../redux/action";

var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

class PhotoCardDetails extends Component {
  state = {
    images: []
  };
  async componentDidMount() {
    const person = this.props.navigation.getParam("person", null);

    const { getPerson } = this.props;
    await getPerson(person.uid);

    const res = await API.getImages_API(person.uid);
    if (res.status) {
      const images = res.data;
      this.setState({
        images: images.filter(image => image.uri != "")
      });
    }
  }

  render() {
    const { person } = this.props;

    if (!person) return <Spinner />;

    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Content style={{ marginTop: Platform.OS === "ios" ? 20 : undefined }}>
          <View style={styles.instagramPhotosCarousel}>
            <Swiper
              width={width}
              height={height / 1.5}
              dot={
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: "rgba(255,255,255,0.5)" }
                  ]}
                />
              }
              activeDot={
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: commonColor.brandPrimary }
                  ]}
                />
              }
              loop={false}
            >
              <View style={styles.slideView}>
                <Image
                  style={styles.image}
                  source={
                    person.image == ""
                      ? require("../../../assets/launchscreen.png")
                      : { uri: person.image }
                  }
                />
              </View>
              {/* <View style={styles.slideView}>
                <Image
                  style={styles.image}
                  source={require("../../../assets/r5.jpg")}
                />
              </View>
              <View style={styles.slideView}>
                <Image
                  style={styles.image}
                  source={require("../../../assets/r1.jpeg")}
                />
              </View> */}
            </Swiper>
            <Button
              onPress={() => this.props.navigation.goBack()}
              style={styles.backBtn}
            >
              <Icon name="md-arrow-back" style={styles.backBtnIcon} />
            </Button>
          </View>
          <View style={styles.subTextView}>
            <Text style={styles.nameText}>
              {person.name}, {person.age}
            </Text>
            {/* <Text style={styles.workingText}>Model, Actress</Text> */}
            {/* <Text style={styles.distanceAwayText}>3 km away</Text> */}
          </View>

          {person.aboutMe != null ? (
            <View style={styles.quoteView}>
              <Text style={styles.quoteText}>{person.aboutMe}</Text>
            </View>
          ) : (
            <React.Fragment />
          )}

          <View style={styles.instagramPhotoCountView}>
            <Text>Photos</Text>
          </View>
          <View>
            <Swiper
              width={width}
              height={
                Platform.OS === "ios"
                  ? (width / 3 - 5) * 2
                  : (width / 3 + 14) * 2
              }
              paginationStyle={styles.swiperPaginationStyle}
              dot={
                <View
                  style={[
                    styles.thumbnailDot,
                    {
                      backgroundColor: "rgba(0,0,0,0.3)"
                    }
                  ]}
                />
              }
              activeDot={
                <View
                  style={[
                    styles.thumbnailDot,
                    { backgroundColor: commonColor.brandPrimary }
                  ]}
                />
              }
              loop={false}
            >
              <View style={styles.instagramCarouselView}>
                {Array.isArray(this.state.images) ? (
                  this.state.images.map(image => {
                    return (
                      <Image
                        style={styles.thumbnail}
                        source={{ uri: image.uri }}
                        resizeMode='contain'
                      />
                    );
                  })
                ) : (
                  <React.Fragment />
                )}
              </View>
              {/* <View style={styles.instagramCarouselView}>
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r2.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r6.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r3.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r1.jpeg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r4.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r5.jpg")}
                />
              </View>
              <View style={styles.instagramCarouselView}>
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r6.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r5.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r4.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r3.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r2.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r1.jpeg")}
                />
              </View>
              <View style={styles.instagramCarouselView}>
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r1.jpeg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r2.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r3.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r4.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r5.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r6.jpg")}
                />
              </View> */}
            </Swiper>
          </View>
          {/*here*/}
          {/* <View style={styles.interestTextHeadingView}>
            <Text>3 interests</Text>
          </View>
          <View style={styles.interestsView}>
            <Button bordered style={{ margin: 5 }}>
              <Text> Southpaw</Text>
            </Button>
            <Button bordered style={{ margin: 5 }}>
              <Text> Hollywood</Text>
            </Button>
            <Button bordered style={{ margin: 5 }}>
              <Text style={styles.interestText}> Game of Thrones</Text>
            </Button>
          </View> */}
        </Content>
        <View>
          <Grid style={styles.bottomPillsView}>
            <Row style={styles.bottomRowStyle}>
              <Button
                danger
                onPress={() => this.props.navigation.goBack()}
                style={styles.bottomRoundedPillsBtn}
              >
                <Icon
                  active
                  name="close"
                  style={styles.bottomRoundedPillsCloseIcon}
                />
              </Button>
              <Button info style={styles.bottomRoundedPillsBtn}>
                <Icon
                  active
                  name="star"
                  style={styles.bottomRoundedPillsStarIcon}
                />
              </Button>
              <Button success style={styles.bottomRoundedPillsBtn}>
                <Icon
                  active
                  name="heart"
                  style={styles.bottomRoundedPillsHeartIcon}
                />
              </Button>
            </Row>
          </Grid>
        </View>
      </Container>
    );
  }
}

export default connect(
  state => ({
    person: state.global.person
  }),
  {
    getPerson: Actions.getPerson
    // unlike: Actions.unlike,
    // checkMatch: Actions.checkMatch,
  }
)(PhotoCardDetails);
