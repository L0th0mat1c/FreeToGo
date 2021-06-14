import { Mixin } from '../../../mixin.js'

var stock = window.localStorage.getItem('stock');

const state = {
    stock: stock ? JSON.parse(stock) : [],
}  
const mutations = {
    ADD_TO_STOCK(state, items){ 
                                console.log('items:', items)
                                
        // SEND ARRAY OF ITEM  
        let turnItem = items.length
        
        for(let i = 0; i < turnItem; i++){
            let turnState = this.state.stock.stock.length
            let theItem = items[i]
            let found = 'false'
             
            for(let i = 0; i < turnState; i++){
                let theState = this.state.stock.stock[i]
                if(theItem.name == theState.name){
                    found = i
                } 
            }

            if(found == 'false'){
                let aisle = theItem.aisle
                let name = theItem.name
                let ingredients = {
                    aisle: aisle,
                    name: name
                }
                this.state.stock.stock.push(ingredients)
                console.log('theItem.aisle:', theItem.aisle)

                this.dispatch("stock/addItem", {name, aisle})
            }

        }

        window.localStorage.setItem('stock', JSON.stringify(state.stock));
    },

    REMOVE_TO_STOCK(state, name){ 
        
        let found = state.stock.find(product => product.name == name);       
        let index = state.stock.indexOf(found);
        
        
        console.log('state.stock[index]:', state.stock[index])
        state.stock.splice(index, 1)
        
        window.localStorage.setItem('stock', JSON.stringify(state.stock));

        this.dispatch("stock/deleteItem", name)

    },
}
const actions = {

    deleteItem(state, name){

        var axios = require('axios');

        axios.put(Mixin.data().URL_BACK+'user/deleteStock?userID=' + this.state.user.user._id, {
                "ingredients": name,
            }, {
                headers: {
                    Authorization: "Bearer " + this.state.user.access_token
                }
            })
            .then(function (response) {
                console.log('response', response)
            })
            .catch(error => {
                console.log('error:', error)
            })
        },

        addItem(state, item){
            let name = item.name
            let aisle = item.aisle

            var axios = require('axios');
    
            axios.put(Mixin.data().URL_BACK+'user/addStock?userID=' + this.state.user.user._id, {
                    "ingredients": name,
                    "aisle": aisle,
                }, {
                    headers: {
                        Authorization: "Bearer " + this.state.user.access_token
                    }
                })
                .then(function (response) {
                    console.log('response', response)
                })
                .catch(error => {
                    console.log('error:', error)
                })
            }
        
}

    
const getters = {}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}