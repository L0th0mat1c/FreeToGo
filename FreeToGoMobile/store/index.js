import Vue from 'vue-native-core'
import Vuex from 'vuex'
import axios from 'axios'
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorage } from 'react-native';

Vue.use(Vuex)

// var access_token = AsyncStorage.getItem('access_token');
// var user = AsyncStorage.getItem('user');

const store = new Vuex.Store({
  state: {
    user: [],
    access_token: '' ,
    shoppingList:'',
    notInDb:'',
    shoppingLoading: true,
  },
  
  mutations: {
    setUserData(state, result) {
      state.user = result
      AsyncStorage.setItem('user', JSON.stringify(state.user));
    },
    setShoppingList(state, result){
      state.shoppingList = result;
      console.log('shoppingList:', state.shoppingList)
      state.shoppingLoading = false

    },
    setLoginError(state){
      state.notInDb = true;
    },
    resetLoginError(state){
      state.notInDb = false;
    },
    ADD_ACCESS_TOKEN(state, token) {
      console.log('token:', token)
      state.access_token = token;
      AsyncStorage.setItem('access_token', state.access_token);
    },
    resetUser(state) {
      state.user = [];
      state.access_token = '';
      AsyncStorage.removeItem('access_token');
      AsyncStorage.removeItem('user');
    },
  },
  
  actions:{
    async login({commit},user){

      await axios.post('https://freetogoback.herokuapp.com/auth/login/', {
          'username' : user.username,
          'password' : user.password
      })
      .then(function (response) {
        //console.log('response:', response)
        commit('ADD_ACCESS_TOKEN', response.data.access_token)
        commit('setUserData', response.data.user)
        commit('setShoppingList', response.data.user.shopping_list)
      })
      .catch(error => {
          console.log('error:', error)
          commit('setLoginError')
      }) 
    },
  }
})

export default store;
