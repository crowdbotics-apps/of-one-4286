import * as Expo from "expo";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { StyleProvider } from "native-base";
import App from "../App";
import configureStore from "./configureStore";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaView } from "react-native";
import store from "../redux/store";

const storeObj = {};
export default class Setup extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      store: configureStore(() => this.setState({ isLoading: false })),
      isReady: false
    };
    storeObj.store = this.state.store;
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("../../node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf"),
      arial: require("../../Fonts/Arial.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StyleProvider style={getTheme(variables)}>
          <Provider store={store}>
           
              <App />
           
          </Provider>
        </StyleProvider>
      </SafeAreaView>
    );
  }
}
