<template>

        <v-row justify="center">
            <v-dialog v-model="dialog" scrollable max-width="700px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="deep-purple lighten-2" text dark v-bind="attrs" v-on="on">
                        Finish Recipe
                    </v-btn>
                    
                </template>
                <v-card>
                    <v-card-title>Have you finished these ingredients ?</v-card-title>
                    <v-divider></v-divider>

                        <v-container>
                            
                           <div v-for="item in item.ingredients" :key="item.name">
                               <v-checkbox
                                v-model="selected"
                                :label="item.name"
                                :value="item.name"
                            ></v-checkbox>
                           </div>

                           

                           <p>Add Recipe To Fav:</p>

                           <v-btn icon color="white" @click="addToFav(item.id, item.title, item.img)">
                                <v-icon v-if="isFav(item) == true" color="red">mdi-thumb-up</v-icon>
                                <v-icon v-else color="red" >mdi-thumb-up-outline</v-icon>
                            </v-btn>

                            
                            
                            
                        </v-container>
                        
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text @click="dialog = false">
                            Close
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="doneRecipe(item.id, item), dialog = false">
                            Done
                        </v-btn>
                        
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
   

</template>

<script>
import { mapState } from 'vuex'

    export default {
        name: 'ModalFinishRecipeComp',

        props: ['item'],

        data: () => ({

            dialogm1: '',
            dialog: false,
            shoplistTitle: '',
            selected: [],
            
        }),

        computed: {
            ...mapState([
                'shoplist',
                'favorites'
            ]),
        },

        methods: {

            doneRecipe(id, item){
                console.log('item:', item)
                this.$store.commit('recipe/DONE_RECIPE', id)
                this.$store.commit('historique/ADD_TO_HISTORIQUE', item)

                let turn = this.selected.length
                for(let i = 0; i < turn; i++){
                    this.$store.commit('stock/REMOVE_TO_STOCK', this.selected[i])
                }
            },

            addToFav(id, title, img){
                this.$store.commit('favorites/ADD_TO_FAVORITES', {id, title, img})
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

        }

        
        
    }
</script>

<style scoped>
    .recipe {

        background-color: rgb(226, 226, 226);
        border-radius: 15px;
        padding: 0px 7px 0px 7px;
        margin: 1px;
        font-size: 0.8em;
    }
    .recipes{
         display: flex;
        flex-wrap: wrap;
    }
</style>