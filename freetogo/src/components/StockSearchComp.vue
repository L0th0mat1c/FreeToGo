<template>
    <v-container>
        <h1>StockSearch</h1>

        <v-combobox auto-select-first chips clearable deletable-chips multiple small-chips v-model="values"
            :items="items"></v-combobox>

        <v-btn @click="Search()"> Yumm!</v-btn>

        <!-- ////////////////////CARD\\\\\\\\\\\\\\\\\\\\ -->
        <v-row class="columns">

            <v-col class="child" cols="4" sm="4" v-for="recipie in recipies" :key="recipie.title"
                style="margin-bottom:-100px">

                <RecipeCardComp :recipe="recipie" />

                <!-- <v-card :loading="loading" class="mx-auto my-12" max-width="374">

                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>

                    <v-img height="250" :src="recipie.image">
                        <v-app-bar
                        flat
                        color="rgba(0, 0, 0, 0)"
                        >
                            <v-btn icon color="white" @click="addToFav(recipie.id, recipie.title, recipie.image)">
                                <v-icon v-if="isFav(recipie) == true">mdi-thumb-up</v-icon>
                                <v-icon v-else>mdi-thumb-up-outline</v-icon>
                               
                            </v-btn>
                        </v-app-bar>
                    
                    </v-img>

                    <v-card-title>{{recipie.title}}</v-card-title>

                    <v-card-text>
                        <v-row align="center" class="mx-0">
                            <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                            <div class="grey--text ml-4">
                                4.5 (413)
                            </div>
                        </v-row>

                        <div class="my-4 subtitle-1">
                            <v-divider class="mx-4"></v-divider>
                        </div>

                        <div class="ingredient">
                            <div v-for="ingredient in recipie.usedIngredients" :key="ingredient.name">
                                <div class="used"> {{ingredient.name}} </div>
                            </div>

                            <div v-for="ingredient in recipie.unusedIngredients" :key="ingredient.name">
                                <div class="unused"> {{ingredient.name}} </div>
                            </div>

                            <div v-for="ingredient in recipie.missedIngredients" :key="ingredient.name">
                                <div class="missed">{{ingredient.name}} </div>
                            </div>

                            <div class="status">
                                Used
                                <div class="count-used">
                                    <div class="count-number">{{recipie.usedIngredients.length}}</div>
                                </div>
                                Unused
                                <div class="count-unused">
                                    <div class="count-number">{{recipie.unusedIngredients.length}}</div>
                                </div>
                                Missing
                                <div class="count-missing">
                                    <div class="count-number">{{recipie.missedIngredients.length}}</div>
                                </div>
                            </div>

                        </div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>
                    

                    <v-card-actions style="display:flex; justify-content:center;">
                         <ModalShoplistComp :title="recipie.title" :id="recipie.id" :image="recipie.image"/>
                        <v-btn color="deep-purple lighten-2" text @click="addToShoplist(recipie.id, recipie.title, recipie.image, 0)">
                            Add to Shoplist +
                        </v-btn>
                    </v-card-actions>

                   


                </v-card> -->

            </v-col>

        </v-row>
        <!-- \\\\\\\\\\\\\\\\\\\\CARD//////////////////// -->

        

    </v-container>
</template>

<script src="https://unpkg.com/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"></script>

<script>

    import { mapState } from 'vuex'

    import { mapMutation } from 'vuex'

    // import { mapAction } from 'vuex'

    import Masonry from 'masonry-layout'
    import ModalShoplistComp from '@/components/ModalShoplistComp.vue';
    import RecipeCardComp from '@/components/RecipeCardComp.vue';

    export default {
        name: 'StockSearchComp',

        props: ['stock'],

        components: {
            
            ModalShoplistComp,
            RecipeCardComp,
        },

        

        data: () => ({
            items: [],
            values: [],
            loading: false,
            selection: 1,
            dialogm1: '',
            dialog: false,
            recipies: []
        }),

        created: function (){

          this.values = this.stock.split(',')

        },

        mounted: function () {

            this.items = this.ingredients.items
            var msnry = new Masonry('.columns', {
                // options
                itemSelector: "[class*='col-']",
            });

            this.Search()
        },

        methods: {

            async Search() {

                var Key = '71327757c0c2469ab70c0f1e0a5bfe0d'
                var values = this.values
                var recipie = []

                var axios = require('axios');

                var config = {
                    method: 'get',
                    url: `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${values}&number=10&limitLicense=true&ranking=2&ignorePantry=salt&apiKey=${Key}`,
                };

                await axios(config)
                    .then(function (response) {
                        recipie = response.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                this.recipies = recipie

            },
            addToShoplist(id, title, img, index) {

                this.$store.commit('shoplist/ADD_RECIPE', {id, title, img, index})
            },

            async addToFav(id, title, img) {

                await this.$store.commit('favorites/ADD_TO_FAVORITES', {id, title, img})
                
            },

            isFav(item){
                
                let fav = this.favorites.favorites                   

                for(let i = 0; i < fav.length; i++){
                    if(fav[i].id == item.id){
                        return true              
                    }          
                }
                return false                                        
            }

        },

        computed: {
            ...mapState([
                'ingredients',
                'favorites',
            ]),
        }
    }
</script>

<style scoped>
    .ingredient {
        display: flex;
        flex-wrap: wrap;
    }

    .missed {
        background-color: rgb(255, 211, 211);
        border-radius: 15px;
        padding: 0px 7px 0px 7px;
        margin: 1px;
        font-size: 0.8em;
    }

    .used {

        background-color: rgb(202, 255, 202);
        border-radius: 15px;
        padding: 0px 7px 0px 7px;
        margin: 1px;
        font-size: 0.8em;
    }

    .unused {

        background-color: rgb(197, 197, 255);
        border-radius: 15px;
        padding: 0px 7px 0px 7px;
        margin: 1px;
        font-size: 0.8em;
    }

    .status {
        margin-top: 15px;
        display: flex;
        font-size: 0.8em;


    }

    .count-number {
        text-align: center;
    }

    .count-missing {
        background-color: rgb(255, 211, 211);
        border-radius: 25px;
        width: 20px;
        height: 20px;
        white-space: nowrap;
        margin-right: 10px;
        margin-left: 3px;
        font-size: 0.9em;

    }

    .count-used {
        background-color: rgb(202, 255, 202);
        border-radius: 25px;
        width: 20px;
        height: 20px;
        white-space: nowrap;
        margin-right: 10px;
        margin-left: 3px;
        font-size: 0.9em;

    }

    .count-unused {
        background-color: rgb(197, 197, 255);
        border-radius: 25px;
        width: 20px;
        height: 20px;
        white-space: nowrap;
        margin-right: 10px;
        margin-left: 3px;
        font-size: 0.9em;

    }
</style>