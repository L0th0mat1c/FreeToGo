<template>
<scroll-view class="page-header">
<view class="page">
    <view class="header">
      <view>
        <touchable-opacity class="btn-favorite" :on-press="GoBack">
          <text class="headertxt">Logout</text>
        </touchable-opacity>
      </view>
      <view>
        <touchable-opacity class="btn-favorite" :on-press="GoCode">
          <text class="headertxt">Bar code scanner</text>
        </touchable-opacity>
      </view>
    </view>

    <text class="favtitle">My Shopping list</text>

    <view class="hr"></view>

      <view v-if="isLoading">
        <text>
            Loading
        </text>
      </view>
      
      <view class="fav-elt" v-else v-for="items in resum" :key="items.aisle">
            <view class="fav-menu">
              <text class="favtxt">
                {{items.aisle}}           
              </text> 
              <view v-for="item in items.ingredients" :key="item.name">
                <text class="favdesc">
                   {{item.name}}: {{item.amount}} {{item.unit}}          
                </text> 
              </view>
            </view>  
                <view class="hr"></view>
    
    </view>
</view>
</scroll-view>
</template>

<script>
//import axios from 'axios'
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorage } from 'react-native';

import store from '../store/index.js';

export default {
  created() {
    this.creatResume()
      //store.dispatch("getShoppingList");
  },
  data(){
    return{
      clientId:'9dee767a839765e',
      resum:[],
      shoplist:'',
      ingredientsList:'',
      turn:'',
      turn2:'',
      aisle:'',
    }
  },
  props: {
    navigation: {
      type: Object,
    },
   }, 
  computed: {
    shoppingList: function () {
      return store.state.shoppingList;
    },
    isLoading: function () {
      return store.state.shoppinLoading;
    },
  },
  methods:{
            creatResume(){ 

              this.shoplist = this.shoppingList
              this.turn = this.shoplist.length
              
              for(let i = 0; i < this.turn; i++){
                  console.log('/////////////////////RECIPE[' + [i] + ']/////////////////////')
                  this.ingredientsList = this.shoplist[i].ingredientsShop
                  let turn2 = this.ingredientsList.length       
                  console.log('turn2:', turn2)
                  

                  for(let i = 0; i < turn2; i++){
                    console.log('///////Turn[' + [i] + ']///////')
                    this.aisle = this.ingredientsList[i].aisle
                    console.log('aisle:', this.aisle)

                    
                    let turn3 = this.resum.length
                    let found = "false"

                    for(let i = 0; i < turn3; i++){
                      if(this.aisle === this.resum[i].aisle){  
                        found = i
                      }
                    }

                    if(found == "false"){
                      let myAisle = {
                         aisle: this.aisle,
                         ingredients:[this.ingredientsList[i]]
                      }
                      this.resum.push(myAisle)
                    }else {

                      let found2 = "false"
                      let IngredientName = this.ingredientsList[i].name           
                      let IngredientResum = this.resum[found].ingredients

                      for(let i = 0; i < IngredientResum.length; i++){
                        if(IngredientResum[i].name == IngredientName){
                          found2 = i
                        }
                      }

                      if(found2 == "false"){
                        this.resum[found].ingredients.push(this.ingredientsList[i])
                      }else{                        
                        let add = this.ingredientsList[i].amount
                        this.resum[found].ingredients[found2].amount += add
                      }

                   } 
                 }   
             }
            },
            async GoBack(){
                await store.commit('resetUser')                
                this.navigation.navigate("Login");
                //this.navigation.goBack();
            },
            GoCode(){
                this.navigation.navigate("BareCodeScanner");
            },
  }
}
</script>
<style>
.page-header{
  padding-top: 40px;
  background-color: #EEF1F6;
}
.page{
  width:100%;
  height: 100%;
  background-color: #EEF1F6;
}
.header{
  flex-direction: row; 
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
  margin-left: 10px;
  margin-right: 10px;
}
.headertxt{
    font-size:18px;    
    text-align: center;
}
.btn-elt{
    align-items: center;
    width: 70%;
}
.favtitle{
  margin:10px, 0px, 10px, 0px;
  font-size: 25px;
      color:#474E57; 
      text-align: center;
}
.favtxt{
  font-size: 20px;
      color:#474E57; 
}
.favdesc{
  font-size: 16px;
  color:#474E57; 
  padding-left:10px;
}
.fav-menu{
  padding-left:7px;
}
.btn-favorite {
    display:flex;
    background-color: #FD9256;
    border-radius: 7px;
    height: 45px;
    width:150px;
    text-align: left;
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
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: grey;
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
}

</style>
