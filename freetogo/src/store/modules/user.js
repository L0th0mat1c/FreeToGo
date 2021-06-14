import axios from 'axios';
import { Mixin } from '../../../mixin.js'

var access_token = localStorage.getItem('access_token');
var user = window.localStorage.getItem('user');

const state = {
    user: user ? JSON.parse(user) : [],
    access_token: access_token ,

    
  }


   
const mutations = {
    ADD_ACCESS_TOKEN(state, token) {
      state.access_token = token;
      localStorage.setItem('access_token', state.access_token);
    },
    ADD_USER(state, user) {
      state.user = user;
      window.localStorage.setItem('user', JSON.stringify(state.user));
      console.log('test', Mixin.data().URL_FRONT)
    },
    REMOVE_ACCESS_TOKEN(state) {
      state.access_token = '';
      localStorage.removeItem('access_token');
      window.localStorage.removeItem('user');
      this.commit("user/CLEAN_STORAGE")
    },
    // GET_USER(state, user) {
    //   state.user = user;
    //   localStorage.setItem
    // }
    CLEAN_STORAGE(){

      this.state.stock.stock = [];
      this.state.favorites.favorites = [];
      this.state.historique.historique = [];
      this.state.shoplist.shoplist = [
        {
            title:'',
            recipe:[

            ]
        }
      ],
      this.state.recipe.recipe = [];
 
      window.localStorage.setItem('stock', JSON.stringify(this.state.stock.stock));
      window.localStorage.setItem('favorites', JSON.stringify(this.state.favorites.favorites));
      window.localStorage.setItem('historique', JSON.stringify(this.state.historique.historique));
      window.localStorage.setItem('shoplist', JSON.stringify(this.state.shoplist.shoplist));
      window.localStorage.setItem('recipe', JSON.stringify(this.state.recipe.recipe));
    },

    UPDATE_STORAGE(){
      
      // STOCK \\  
      let userStock = state.user.stock
      let stock = []

      for(let i = 0; i < userStock.length; i++){
        let tempStock = {name: userStock[i].ingredients, aisle: userStock[i].aisle }
        stock.push(tempStock)
      }
      this.state.stock.stock = stock

      // FAVORITES \\
      let userFav = state.user.wish_list
      console.log('state.user.wish_list:', state.user.wish_list)
      let fav = []
      for(let i = 0; i < userFav.length; i++){
        let tempFav = {
          id: userFav[i].wish_id,
          title: userFav[i].title,
          img: userFav[i].img,
        }
        fav.push(tempFav)
      }
      this.state.favorites.favorites = fav;
      
      // HISTIRIQUE \\
      this.state.historique.historique = state.user.historic;
      console.log('state.user.historic:', state.user.historic)

      // SHOPLIST \\
      this.state.shoplist.shoplist = [
        {
            title:'',
            recipe: state.user.shopping_list
            
        }
      ]

     
      // this.state.recipe.recipe = state.user.recipe;
      // UPDATE LOCALSTORAGE \\
      window.localStorage.setItem('stock', JSON.stringify(this.state.stock.stock));
      window.localStorage.setItem('favorites', JSON.stringify(this.state.favorites.favorites));
      window.localStorage.setItem('historique', JSON.stringify(this.state.historique.historique));
      window.localStorage.setItem('shoplist', JSON.stringify(this.state.shoplist.shoplist));
      // window.localStorage.setItem('recipe', JSON.stringify(this.state.recipe.recipe));
    },
}

const actions = {

    GET_AUTHORISATION(state) {
      axios.get(Mixin.data().URL_BACK+'/auth/profile', {
        headers: {
          "Authorization": "Bearer "+ state.access_token
        }
      }).then((response) => {
        state.user = response.data
      })
    }


  }


export default {
    namespaced: true,
    state,
    actions,
    mutations,
}

