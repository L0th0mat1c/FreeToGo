<template>
<scroll-view class="scroll">
<view class="page-header">
  <image class="imgElt"
  :source="require('../img/freeToGo-square-orange.png')"
          :style="{height: 150, width: 207}"
   />
  <!-- <text class="logo">FreeToGo</text> -->
  <view class="btn-elt">
    <text class="favtxt">Sign in</text>
    <text class="favdesc">Hi there! Nice to see you again.</text>
    <view class="hr"></view>
    <text v-if="incompleteInput">You must enter a username and a password first</text>
    <text v-if="notInDb">Invalid password and/or username</text>
    <text-input placeholder=" Username"
        :style="{height: 40, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 7, marginBottom:8}"
        v-model="user.username"
    />
    <text-input placeholder=" password" secure-text-entry
        :style="{height: 40, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 7, marginBottom:20}"
        v-model="user.password"
    />
    <touchable-opacity class="btn-favorite" @press="signIn()">
        <text class="btn-favorite-text">Sign in</text>
    </touchable-opacity>
</view>
</scroll-view> 
</template>

<script>
import store from '../store/index.js';

export default {

  data(){
    return{
      user:{      
        username:'',
        password:''
      },

      incompleteInput:''
    }
  },
  props: {
    navigation: {
      type: Object,
    },
  }, 
  computed: {

    userData: function () {
      return store.state.user;
    },
    notInDb: function () {
      return store.state.notInDb;
    },
  },
  methods:{
    async signIn(){
      await store.commit('resetLoginError')
      if(!this.user.username || !this.user.password){
        this.incompleteInput = true
      } else {
        await store.dispatch("login", this.user);
        this.incompleteInput = ''
        if(!this.notInDb){
          this.user.username=""
          this.user.password=""
          this.navigation.navigate("ShoppingList");  
        }
      }
    },
    goHome(){
      this.navigation.navigate("Home");
    },
  }
}
</script>
<style>
.scroll{
    background-color: #EEF1F6;
}
.page-header{
  display:flex;
  align-items: center;
  /* justify-content: space-around; */
  width:100%;
  height: 100%;
  padding-top: 150px;
  background-color: #EEF1F6;
}
.btn-elt{
    padding-top: 70px;
    align-items: center;
    width: 70%;
}
.favtxt{
  font-size: 20px;
  text-align: center;
  color:#474E57;
}
.favdesc{
  font-size: 14px;
  color:  #5E6775;
  text-align: center;
  margin-top:10px;
}
.btn-favorite {
    display:flex;
    background-color: #FD9256;
    border-radius: 7px;
    height: 45px;
    text-align: left;
    width: 70%;
    align-items: center;
    justify-content: center;
}
.btn-favorite-text {
    color: white;
    font-size: 18px;
}
.btn1{
  text-align: right;
  margin: 40px, 5px, 0px, 5px;
  background-color: white;
}
.btn-text1{
  text-align: right;
  color: #F85F6A;
  font-size: 20px;
}
.logo{
  font-size: 30px;
}
.hr{
    border-bottom-width: 1px;
    border-bottom-color: grey;
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
