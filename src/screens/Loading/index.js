import React, { Component } from 'react';
import { View } from 'react-native';
import {auth} from '../../constants/database'
import { success, alert } from '../../utils/Alert';
import { connect } from "react-redux";
import * as Actions from "../../redux/action";


import styles from './style';

class LoadingScreen extends Component {
  constructor(props) {
    super(props);

    this.unsubscriber = null;
  }

  componentDidMount() {

    // Listen for authentication state to change.

    this.unsubscriber = auth.onAuthStateChanged(async (user) => {
      try {

        //const userToken = await AsyncStorage.getItem('userToken');
        //console.log('loading user: ', user )
        if (user ) {
          await this.props.getUser(user.uid)
          if(user.dob == null)
            this.props.navigation.navigate('VerifyBirthday');
          else if(user.gender == null )
            this.props.navigation.navigate('VerifyGender');
          else if(user.church == null )
            this.props.navigation.navigate('VerifyChurch');
          else 
            this.props.navigation.navigate('HomeTabNavigation');
            
        } else {
          this.props.navigation.navigate('Login');
        }
      } catch (error) {
        alert(error.message);
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {

    return <View style={styles.container} />;
  }
}



export default connect(
  state => ({
    user: state.global.user
  }),
  {
    getUser: Actions.getUser,
   
  }
)(LoadingScreen);