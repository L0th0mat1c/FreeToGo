<template>

        <v-row justify="center">
            <v-dialog v-model="dialog" scrollable max-width="700px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="deep-purple lighten-2" text dark v-bind="attrs" v-on="on">
                        Add to Shoplist +
                    </v-btn>
                    
                </template>
                <v-card>
                    <v-card-title>SHOPLIST</v-card-title>
                    <v-divider></v-divider>

                        <v-container>
                            
                           <!-- Delete later -->
                            <v-btn @click="addToShoplist(id, title, image, 0)">
                                        Add Recipe
                            </v-btn>
                            <!-- Delete later -->

                            <!-- <v-card style="margin-bottom: 10px;" v-for="(shoplist, index) in shoplist.shoplist" :key="shoplist.title">
                                <v-card-title>
                                    {{shoplist.title}}
                                    <v-btn @click="addToShoplist(id, title, image, index)">
                                        Add Recipe
                                    </v-btn>
                                </v-card-title>
                                <div class="recipes">
                                    <div v-for="recipe in shoplist.recipe" :key="recipe.title">
                                        <div class="recipe"> {{recipe.title}} </div>
                                    </div>
                                </div>
                                <v-card></v-card>
                               
                            </v-card>
                            <form>

                                <v-text-field
                                    v-model="shoplistTitle"
                                    
                                    label="New Shoplist"
                                    required
                                ></v-text-field>
                                <v-btn type="submit" style="margin:-100px 0px 0px 560px" @click="createShoplist()" color="deep-purple lighten-2" text dark>
                                    Create +
                                </v-btn>
                            </form> -->
                            
                        </v-container>
                        
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text @click="dialog = false">
                            Close
                        </v-btn>
                        
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
   

</template>

<script>
import { mapState } from 'vuex'

    export default {
        name: 'ModalShoplistComp',

        props: ['title', 'id', 'image'],

        data: () => ({

            dialogm1: '',
            dialog: false,
            shoplistTitle: '',
            
        }),

        computed: {
            ...mapState([
                'shoplist',
            ]),
        },

        methods: {

            createShoplist(){
                let title = this.shoplistTitle
                this.$store.commit('shoplist/CREATE_SHOPLIST', title)
            },

            addToShoplist(id, title, img, index) {

                this.$store.commit('shoplist/ADD_RECIPE', {id, title, img, index})
            },

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