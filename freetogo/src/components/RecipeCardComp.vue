<template>

            <v-container>

                <v-card :loading="loading" class="mx-auto my-12" max-width="374">

                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>

                    <v-img @click="redirect(recipe.id, recipe)" height="250" :src="recipe.image">
                        <v-app-bar
                        flat
                        color="rgba(0, 0, 0, 0)"
                        >
                            
                        </v-app-bar>
                    
                    </v-img>

                    <v-card-title>{{recipe.title}}</v-card-title>

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
                            <div v-for="ingredient in recipe.usedIngredients" :key="ingredient.name">
                                <div class="used"> {{ingredient.name}} </div>
                            </div>

                            <div v-for="ingredient in recipe.unusedIngredients" :key="ingredient.name">
                                <div class="unused"> {{ingredient.name}} </div>
                            </div>

                            <div v-for="ingredient in recipe.missedIngredients" :key="ingredient.name">
                                <div class="missed">{{ingredient.name}} </div>
                            </div>

                            <div class="status">
                                Used
                                <div class="count-used">
                                    <div class="count-number">{{recipe.usedIngredients.length}}</div>
                                </div>
                                Unused
                                <div class="count-unused">
                                    <div class="count-number">{{recipe.unusedIngredients.length}}</div>
                                </div>
                                Missing
                                <div class="count-missing">
                                    <div class="count-number">{{recipe.missedIngredients.length}}</div>
                                </div>
                            </div>

                        </div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <v-card-actions style="display:flex; justify-content:center;">

                        
                        <v-btn v-if="isShop(recipe) == false" color="deep-purple lighten-2" text @click="addToShoplist(recipe.id, recipe.title, recipe.image, 0)">
                            Add to Shoplist +
                        </v-btn>

                        <v-btn v-else color="red lighten-2" text @click="removeShop(recipe.title)">
                            Remove 
                        </v-btn>

                         <!-- <ModalShoplistComp :title="recipe.title" :id="recipe.id" :image="recipe.image"/> -->
                        
                        <v-btn icon color="indigo" @click="addToFav(recipe.id, recipe.title, recipe.image)">
                                <v-icon v-if="isFav(recipe) == true">mdi-thumb-up</v-icon>
                                <v-icon v-else>mdi-thumb-up-outline</v-icon>
                               
                            </v-btn>

                    </v-card-actions>
                  

                   


                </v-card>

        </v-container>

</template>

<script>

    import { mapState } from 'vuex'

    // import ModalShoplistComp from '@/components/ModalShoplistComp.vue';

    export default {
        name: 'RecipeCardComp',

        props:['recipe'],

        components: {
            
            // ModalShoplistComp,
        },

        data: () => ({
            loading: false,
            selection: 1,
            dialogm1: '',
            dialog: false,
            // recipe: this.recipe
        }),

        mounted: function () {
            this.items = this.ingredients.items
            
        },

        methods: {

            addToShoplist(id, title, img, index) {
                console.log('user', this.user.access_token)
                if (this.user.access_token) {
                    this.$store.commit('shoplist/ADD_RECIPE', {id, title, img, index})
                }else{
                    this.$router.push({ name: 'Register' });
                }
            },

            async addToFav(id, title, img) {
                console.log('user', this.user.access_token)
                if (this.user.access_token) {
                    await this.$store.commit('favorites/ADD_TO_FAVORITES', {id, title, img})
                }else{
                    this.$router.push({ name: 'Register' });
                }
            },

            isFav(item){
                
                let fav = this.favorites.favorites                   

                for(let i = 0; i < fav.length; i++){
                    if(fav[i].id == item.id){
                        return true              
                    }          
                }
                return false                                        
            },

            redirect(id , recipe){
                let recipeInfo = [recipe.title, recipe.image]
                
                //MAKE ARRAY TO STING
                let dataJoin = recipeInfo.join()
                //REPLACE SLASH BY *
                let data = dataJoin.replace(/\//g, '*')
              
                this.$router.push('/recipe/' + id + '/' + data )
            },

            isShop(item){
                let Shop = this.shoplist.shoplist[0].recipe                   

                for(let i = 0; i < Shop.length; i++){
                    if(Shop[i].id == item.id){
                        return true              
                    }          
                }
                return false 
            },

            removeShop(name){
                console.log('name:', name)

                this.$store.commit("shoplist/DELETE_RECIPE_ID", name)
            }
        },

        computed: {
            ...mapState([
                'user',
                'ingredients',
                'favorites',
                'shoplist',
            ]),
        }
    }
</script>

<style scoped>
    .ingredient {
        display: flex;
        flex-wrap: wrap;

        /* white-space:nowrap */
        /* width: 500px; */
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

    /* COLUMN DISPLAY */



    /* CUSTOM SEARCHBAR */

    .searchbar{
        display: flex;
        justify-content: center;
        width: 100%;
    }
    input{
        width: 900px;
        height: 70px;
        padding: 25px;
    

        background: #FFFFFF;
        box-shadow: inset -5px 5px 10px rgba(230, 230, 230, 0.2),
                    inset 5px -5px 10px rgba(230, 230, 230, 0.2),
                    inset -5px -5px 10px rgba(255, 255, 255, 0.9),
                    inset 5px 5px 13px rgba(230, 230, 230, 0.9);
        border-radius: 9999px 0px 0px 9990px;
    }

    .search-btn{
        width: 85px;
        height: 70px;

        background: linear-gradient(135deg, #FAFDFF 0%, #E2E5EA 100%);
        box-shadow: -1px 1px 2px rgba(214, 217, 221, 0.2),
                    1px -1px 2px rgba(214, 217, 221, 0.2),
                    -1px -1px 2px rgba(255, 255, 255, 0.9),
                    1px 1px 3px rgba(214, 217, 221, 0.9);
        border-radius: 0px 999px 999px 0px;
    }

</style>