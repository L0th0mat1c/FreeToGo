<template>
  <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
} from "vue-native-router";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorage } from 'react-native';

import LoginScreen from "./screens/LoginScreen.vue";
import BareCodeScanner from "./screens/BareCodeScanner.vue";
import ShoppingList from "./screens/ShoppingList.vue";



const StackNavigator = createStackNavigator(
  {

    BareCodeScanner: {
      screen: BareCodeScanner,
      navigationOptions: ({navigation}) => ({header: null}),
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: ({navigation}) => ({header: null}),
    },
    ShoppingList: {
      screen: ShoppingList,
      navigationOptions: ({navigation}) => ({header: null}),
    },
  },
  {
    initialRouteName: 'Login',
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator },
}
</script>

<style>

.button-pink{
  background-color: red;
}

</style>