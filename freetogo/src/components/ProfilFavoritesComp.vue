<template>

    <v-container>

        <div class="favorites-box">

            <div v-if="favorites.favorites == ''">
                <v-alert
                border="top"
                color="red lighten-2"
                dark
                >
                Your favorite'list is empty! :( Checkout our recipes :
            <v-btn @click="$router.push('/QuickSearch')" icon >
            
              <v-icon>mdi-eye</v-icon>
            </v-btn>
                </v-alert>
            </div>

            <div v-else v-for="(favorites) in favorites.favorites" :key="favorites.index" class="box-title">
                <span class="recipe-title">{{favorites.title}}</span>
            <v-img
             @click="redirect(favorites.id, favorites)"
                height="150px"
                width="150px"
                over
                :src="favorites.img"
                >
                </v-img>

                <v-btn 
                class="white--text"              
                color="red darken-2" 
                @click="addToFavorites(favorites)" >Remove</v-btn>
            </div>

        </div>

    </v-container>

</template>

<script>
import { mapState } from 'vuex'

    export default {
        name: 'ProfilFavoritesComp',

        data: () => ({
            
        }),
        computed: {
            ...mapState([
                'user',
                'favorites',
            ]),
        },

        methods:{
            addToFavorites(item){

                this.$store.commit('favorites/ADD_TO_FAVORITES', item)
                
            },
            redirect(id , recipe){
                console.log('id', id)
                let recipeInfo = [recipe.title, recipe.img]
                console.log(recipeInfo)
                
                //MAKE ARRAY TO STING
                let dataJoin = recipeInfo.join()
                //REPLACE SLASH BY *
                let data = dataJoin.replace(/\//g, '*')
              
                this.$router.push('/recipe/' + id + '/' + data )
            }
        }
    }
</script>

<style scoped>

.box-title {
    width: 200px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.recipe-title {
    color: #474E57;
    font-weight: bolder;
}

.favorites-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-radius: 25px;
    box-shadow: -5px 5px 10px rgba(202, 205, 209, 0.2),
                5px -5px 10px rgba(202, 205, 209, 0.2),
                -5px -5px 10px rgb(255, 255, 255),
                5px 5px 13px rgb(202, 205, 209),
                inset 1px 1px 2px rgba(255, 255, 255, 0.3),
                inset -1px -1px 2px rgba(202, 205, 209, 0.5);
}



button {
width: 150px;
height: 40px;
border-radius: 300px;
color: #EEF1F6;
margin: 1rem 0;

box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.2),
            4px -4px 8px rgba(255, 255, 255, 0.9),
            -4px -4px 8px #FFFFFF,
            4px 4px 10px #5E6164,
            inset 6px 11px 10px rgba(255, 255, 255, 0.15),
            inset 1px 1px 2px rgba(226, 226, 226, 0.6),
            -1px -1px 15px rgba(28, 28, 28, 0.3);
            /* inset -1px -1px 2px rgba(28, 28, 28, 0.5); */
}

</style>
