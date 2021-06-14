import { Mixin } from '../../../mixin.js'

var favorites = window.localStorage.getItem('favorites'); 

const state = {
    favorites: favorites ? JSON.parse(favorites) : [],
}  
const mutations = {
    ADD_TO_FAVORITES(state, item){
    console.log('itemfav:', item)

        let found = state.favorites.find(product => product.id == item.id);

        if(found){
            let index = state.favorites.indexOf(found);
            state.favorites.splice(index, 1)
            this.commit("favorites/removeToDb", item)  
        }else{
            state.favorites.unshift(item)
            this.commit("favorites/addToDb", item)
        }         

        window.localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    
    async addToDb(state, item){
    

        console.log('ADD TO BD')

        var axios = require('axios');

        if (this.state.user.user._id) {
            await axios.put(Mixin.data().URL_BACK+'user/addFavorite?userID=' + this.state.user.user._id, {
                
                    'wish_id': item.id,
                    'title': item.title,
                    'img': item.img
                
            }).then((response) => {
                console.log('response', response)
            }).catch((error) => {
                this.errors = error
            })
            
        }else{
            this.errors = "You have to connect for add this!"
            // redirect
        }
    },

    async removeToDb(state, item){

        console.log('REMOVE TO BD')

        var axios = require('axios');

        let user = this.state.user.user._id
        
        if (user) {
            await axios.put(Mixin.data().URL_BACK+'user/deleteFavorite?userID=' + user, {
                
                    'wish_id': item.id,
                
            }).then((response) => {
                console.log('response', response)
            }).catch((error) => {
                this.errors = error
            })
            
        }else{
            this.errors = "You have to connect for add this!"
            // redirect
        }
    },
    
    
}
const actions = {}
const getters = {}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}