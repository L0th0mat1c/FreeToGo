<template>

    <v-container>

       
        
      <div v-if="!this.recipe.recipe.length">

            <v-alert
            border="top"
            color="red lighten-2"
            dark
            >
            Your Recipies is empty! :( Checkout our shoplist :
            <v-btn @click="$router.push('/QuickSearch')" icon >
            
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            </v-alert>
        </div>

        <div v-for="recipe in recipe.recipe" :key="recipe.index">
            {{recipe.title}}
           
           <button @click="redirect(recipe.id, recipe)">
           <v-img
            height="150px"
            width="150px"
            
            :src="recipe.img"
            >
            </v-img>
           </button>
            <ModalFinishRecipeComp :item="recipe"/>
            

            
        </div>

    </v-container>

</template>



<script>

    import ModalFinishRecipeComp from '@/components/ModalFinishRecipeComp.vue';

    import { mapState } from 'vuex'
    export default {
        name: 'ManageRecipieComp',


        components: {
            
            ModalFinishRecipeComp,
        },

        data: () => ({
            
        }),
        computed: {
            ...mapState([
                'recipe',
            ]),
        },

        methods:{
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