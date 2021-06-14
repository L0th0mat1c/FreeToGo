import Vue from 'vue'
import axios from "axios"
import { Mixin } from '../../../mixin.js'

var historique = window.localStorage.getItem('historique'); 

const state = {
    historique: historique ? JSON.parse(historique) : [],
    item:'',
}  
const mutations = {
    async ADD_TO_HISTORIQUE(state, items){
        const currentDate = new Date();

        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const currentHours = currentDate.getHours();
        const currentMin = currentDate.getMinutes()

        const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear + ' ' + currentHours + ':' + currentMin ;

        Vue.set(items, 'date', dateString);
  
        state.historique.unshift(items)


        await window.localStorage.setItem('historique', JSON.stringify(state.historique));
        state.item = items;
        this.dispatch("historique/updateHistDb")

    },
    async REMOVE_FROM_HIST(state, itemToDelete, index){
        console.log('ok')
        state.historique.splice(index, 1)
        state.item = itemToDelete
        await window.localStorage.setItem('historique', JSON.stringify(state.historique));
        this.dispatch("historique/removeHistDb")
    }
}
const actions = {
    updateHistDb({state}){
        //console.log('item2:', state.item)
        //console.log('token', this.state.user.access_token)
        // console.log('hist', this.state.historique.historique)
        // // console.log('id', this.state.user.user._id)
        axios.put(Mixin.data().URL_BACK+'user/addHistoric?userID='+this.state.user.user._id, 
            {
                "histId": state.item.id, 
                "title": state.item.title, 
                "img": state.item.img,
                "date": state.item.date
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
    removeHistDb({state}){
        console.log('item2:', state.item)
        //console.log('token', this.state.user.access_token)
        // console.log('hist', this.state.historique.historique)
        // // console.log('id', this.state.user.user._id)
        axios.put(Mixin.data().URL_BACK+'user/deleteHistoric?userID='+this.state.user.user._id, 
            {
                "date": state.item.date
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