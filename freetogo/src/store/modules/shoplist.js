import axios from "axios"
import { Mixin } from '../../../mixin.js'

var shoplist = window.localStorage.getItem('shoplist');

const state = {
    itemToDelete:'',
    shoplist: shoplist ? JSON.parse(shoplist) : [
        {
            title:'',
            recipe:[

            ]
        }
    ],
}  
const mutations = {

    async CREATE_SHOPLIST(state, title){
        console.log('title:', title)
        let shoplist = [
            {
                title:'',
                recipe:[

                ]
            }
        ]
        shoplist[0].title = title;

        await state.shoplist.push(shoplist[0]);

        window.localStorage.setItem('shoplist', JSON.stringify(state.shoplist));
    },

    async ADD_RECIPE(state, {id, title, img, index}) {
        
        // CREATE ARRAY RECIPE \\
        let recipe = [
            {
                title:'',
                id:'',
                img:'',
                ingredients:[
                    
                ]
            }
        ]
        
        // ASIGNE VALUES TO ARRAY RECIPE \\
        recipe[0].title = title;
        recipe[0].id    = id;
        recipe[0].img   = img;

        // CONFIG AXIOS \\
        var axios = require('axios');
        let key = '71327757c0c2469ab70c0f1e0a5bfe0d'
        var config = {
        method: 'get',
        url: `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${key}`,
        };

        // CALL AXIOS TO GET INGREDIENTS OF RECIPE \\
        await axios(config)
        .then(function (response) {

            let turn = response.data.extendedIngredients.length

            for(let i = 0; i < turn; i++){
                let item = {name: '', amount: '', unit: '', aisle: ''}
                item.name = response.data.extendedIngredients[i].name
                item.amount = response.data.extendedIngredients[i].measures.metric.amount
                item.unit = response.data.extendedIngredients[i].measures.metric.unitShort
                item.aisle = response.data.extendedIngredients[i].aisle

                // ASIGNE INGREDIENTS TO ARRAY RECIPE \\
                recipe[0].ingredients.push(item)
            }
        })
        .catch(function (error) {
        console.log(error);
        });

        // ADD ARRAY RECIPE TO STATE \\
        state.shoplist[index].recipe.push(recipe[0]);

        // ADD STATE TO LOCALSTORAGE \\
        window.localStorage.setItem('shoplist', JSON.stringify(state.shoplist));
 
        // ADD STATE TO DATABASE \\
        this.dispatch("shoplist/updateShoplist", recipe[0])        
    },

    DELETE_SHOPLIST(state, index){
        state.shoplist.splice(index, 1)
        console.log('state.shoplist.splice(index, 1):', state.shoplist.splice(index, 1))
        window.localStorage.setItem('shoplist', JSON.stringify(state.shoplist));

    },
    DELETE_RECIPE(state, item){
        state.itemToDelete = state.shoplist[item.parentIndex].recipe[item.index];
        state.shoplist[item.parentIndex].recipe.splice(item.index, 1)
        window.localStorage.setItem('shoplist', JSON.stringify(state.shoplist));
        this.dispatch("shoplist/removeShoplist")
    },
    DELETE_RECIPE_ID(state, name){
        console.log('name:', name)
        let recipe = state.shoplist[0].recipe
        let found = "false"
        for(let i = 0; i < recipe.length; i++){
            if(recipe[i].title == name){
                found = i
            }   
        }

        if(found !== "false"){
            state.shoplist[0].recipe.splice(found, 1)
        }
        
        this.dispatch("shoplist/removeShoplist")
    },

    GET_RESUME(state){
        state.shoplist
    },

    CLEAN_SHOPLIST(state){
        state.shoplist = []
        // window.localStorage.setItem('shoplist', JSON.stringify(state.shoplist));
    },

    CREATE_RESUME(state){
        shoplist = state.shoplist[0]
        console.log('shoplist:', shoplist)
    }

    
}
const actions = {
    updateShoplist(state, item){

        axios.put(Mixin.data().URL_BACK+'user/addShoplist?userID='+this.state.user.user._id, 
            {
                "title": item.title, 
                "img": item.img,
                "shopId": item.id,
                "ingredientsShop": JSON.stringify(item.ingredients)
            },          
            { headers:
                {
                   Authorization: "Bearer "+ this.state.user.access_token
                }
            })
            .then(function (response) {
                console.log('response', response)
            })
            .catch(error=> {
                console.log('error:', error)
            }) 
    },

    removeShoplist({state}){
        console.log('item2:', state.itemToDelete)

        axios.put(Mixin.data().URL_BACK+'user/deleteShoplist?userID='+this.state.user.user._id, 
            {
                "title": state.itemToDelete.title
            },          
            { headers:
                {
                   Authorization: "Bearer "+ this.state.user.access_token
                }
            })
            .then(function (response) {
                console.log('response', response)
            })
            .catch(error=> {
                console.log('error:', error)
            }) 
        state.itemToDelete ='';
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
