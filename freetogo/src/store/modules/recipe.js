import axios from 'axios';
import { Mixin } from '../../../mixin.js'

var recipe = window.localStorage.getItem('recipe');

const state = {
    recipe: recipe ? JSON.parse(recipe) : [],
}  
const mutations = {

    ADD_TO_RECIPE(state, recipe){

        let turn = recipe.length

        for(let i = 0; i < turn; i++){
            state.recipe.push(recipe[i])
            console.log('foi=r i', recipe[i])
        }
        
        window.localStorage.setItem('recipe', JSON.stringify(state.recipe));
        this.dispatch("recipe/updateRecipies", recipe[0])
    },

    DONE_RECIPE(state, id){
        console.log('id', id)
  
        let found = state.recipe.find(product => product.id == id);      
        let index = state.recipe.indexOf(found);

        state.recipe.splice(index, 1)
        this.dispatch("recipe/removeRecipies", recipe[0])
        
    }
}
const actions = {
    async updateRecipies(state, item){
        console.log('recpies', item.ingredients)

        await axios.put(Mixin.data().URL_BACK+'user/addRecipies?userID='+this.state.user.user._id, 
            {
                "title": item.title, 
                "img": item.img,
                "recipe_id": `${item.id}`,
                "recipies_ingredients": JSON.stringify(item.ingredients)
            },          
            { headers:
                {
                   Authorization: "Bearer "+ this.state.user.access_token
                }
            })
            .then(function (response) {
                console.log('response', response)
                // this.dispatch('user/ADD_USER', response.data.user)
                // this.dispatch('user/ADD_ACCESS_TOKEN', response.data.access_token)

            })
            .catch(error=> {
                console.log('error:', error)
            }) 
    },

    removeRecipies({state}){
        console.log('item2:', state.itemToDelete)

        axios.put(Mixin.data().URL_BACK+'user/deleteRecipies?userID='+this.state.user.user._id, 
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