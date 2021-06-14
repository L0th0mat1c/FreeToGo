<template>
  <scroll-view>
  <view class ="main">
    <view class="header">
      <view>
        <touchable-opacity class="btn-favorite" :on-press="GoBack">
          <text class="headertxt">Logout</text>
        </touchable-opacity>
      </view>
      <view>
      <touchable-opacity class="btn-favorite" :on-press="GoShoppinglist">
        <text class="headertxt">Shopping list</text>
      </touchable-opacity>
      </view>
    </view>

    <text class="favtitle">Bar code scanner</text>

    <view class="barecodereader" v-if="!scanned">
      <bar-code-scanner
        :onBarCodeScanned="handleBarCodeScanned"
        :barCodeTypes="[BarCodeScanner.Constants.BarCodeType.qr]"
        :style="StyleSheet.absoluteFillObject"
      />
    </view>
    <text class="bartxt">Your product doesn't have any barcode? Add it manually:</text>
    <view >
        <text-input placeholder=" Enter the name of the product"
            :style="{height: 40, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 7, marginBottom:8}"
            v-model="prodName"
        />
        <text-input placeholder=" Aisle"
            :style="{height: 40, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 7, marginBottom:8}"
            v-model="prodAisle"
        />
        <text-input placeholder=" Quantity"
            :style="{height: 40, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 7, marginBottom:8}"
            v-model="prodQty"
        />
        <Picker
            :selectedValue="prodUnit"
            :onValueChange="val => {prodUnit = val}"
        >
          <Item label="Choose a unit" />
          <Item label="gram" value="gram" />
          <Item label="kg" value="kg" />
          <Item label="litre" value="litre" />
          <Item label="centilitre" value="centilitre" />
          <Item label="unité" value="unité" />

        </Picker>
        <text class="formtxt"> Selected: {{ prodUnit }}</text>
    </view>
            <touchable-opacity class="btn-favorite2" @press="addManual()">
          <text class="btn-favorite-text">Add</text>
      </touchable-opacity>
  </view>
  </scroll-view>
</template>
<script>
import store from '../store/index.js';
import { StyleSheet, Picker } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios'

export default {
  components: {
    BarCodeScanner,
    Picker,
    Item: Picker.Item
  },
  mounted () {
    Permissions.askAsync(Permissions.CAMERA)
  },
  computed: {
    id: function () {
      return store.state.user._id;
    },
    token: function () {
      return store.state.access_token
    },
  },
  data: function() {
    return {
      StyleSheet: StyleSheet,
      BarCodeScanner: BarCodeScanner,
      scanned : false,
      prodName:'',
      prodQty:'',
      prodUnit:'',
      prodAisle:'',
    };
  },
  props: {
    navigation: {
      type: Object,
    },
  }, 
  methods: {
    async handleBarCodeScanned (e) {
      this.scanned = true;
      await this.getScanInfo(e.data);
      if (this.prodName && this.prodQty && this.prodUnit && this.prodAisle){
        alert(`${this.prodName} has been added to your stock!`);
        // alert(`Bar code with type ${e.type} and data ${e.data} has been scanned!`);
        await this.addManual();
      } else{
        alert(`Sorry, we can't find valid data about your product!`);
      }
      this.scanned = false;
    },
    async addManual(){
      axios.put('https://freetogoback.herokuapp.com/user/addStock?userID=' + this.id, {
              "ingredients": this.prodName,
              "aisle": this.prodAisle, 
              "quantity": this.prodQty, 
              "unity": this.prodUnit
          }, {
              headers: {
                  Authorization: "Bearer " + this.token
              }
          })
          .then(function (response) {
              console.log('response', response)
          })
          .catch(error => {
              console.log('error:', error)
          })
          this.prodName=''
          this.prodAisle='' 
          this.prodQty=''
          this.prodUnit=''
    },
    async GoBack(){
        await store.commit('resetUser')                
        this.navigation.navigate("Login");
        //this.navigation.goBack();
    },
    GoShoppinglist(){
        this.navigation.navigate("ShoppingList");
    },    
    async getScanInfo(code){
      const vm = this
      await axios.get('https://world.openfoodfacts.org/api/v0/product/'+code+'.json')
            .then(function(response){
              console.log('response:', response)

              if(response.data.product.generic_name){
                vm.prodName = response.data.product.generic_name
              } else if(response.data.product.product_name_fr){
                vm.prodName = response.data.product.product_name_fr
              }

              vm.prodAisle = "Scans"
              for (let i = 0; i < response.data.product.quantity.length; i++) {
                if(response.data.product.quantity[i].match(/[A-Za-z]/)){
                  vm.prodUnit += response.data.product.quantity[i]
                }
                if(response.data.product.quantity[i].match(/[0-9]/)){
                  vm.prodQty += response.data.product.quantity[i]
                }
              }
              vm.prodQty = parseInt(vm.prodQty)
            })
            .catch(function (error) {console.log(error)});
    },  
  }
};
</script>
<style>
  
  .main{
    padding: 50px, 0px, 60px, 0px;
    align-items: center;
    width:100%;
    height:100%;
  }
.header{
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
  width:100%;
}
.favtitle{
  margin:10px, 0px, 10px, 0px;
  font-size: 25px;
      color:#474E57; 
      text-align: center;
}
  .barecodereader{
    margin: 0px, 5px, 0px, 5px;
    width:400px;
    height: 400px;
  }
  .bartxt{
    margin: 20px, 0px, 5px, 0px;
    color:#474E57;
    text-align:center;
  }
  .formtxt{
       color:#474E57; 
  }
.headertxt{
    font-size:18px;    
    text-align: center;
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
.btn-favorite2 {
  margin-top:15px;
    display:flex;
    background-color: #FD9256;
    border-radius: 7px;
    height: 45px;
    width:150px;
    align-items: center;
    justify-content: center;
}
  .btn-favorite-text{
    color:#474E57; 
    font-size: 18px;
    font-weight: bold;

height: 35px;
  }
</style>