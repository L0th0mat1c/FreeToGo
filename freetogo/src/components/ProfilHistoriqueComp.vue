<template>

    <v-container>

   
        <div v-if="user.user.historic == ''">
            <v-alert
            border="top"
            color="red lighten-2"
            dark
            >
            Your historic is empty
            </v-alert>
        </div>

        


        <div v-else v-for="(historique, index) in historique.historique" :key="historique.index">
            <strong> {{historique.date}}</strong> 
            <br>   
            {{historique.title}} 
           <v-img
           @click="redirect(favorites.id, favorites)"
            height="150px"
            width="150px"
            
            :src="historique.img"
            >
            </v-img>

            <v-btn @click="deleteHistorique(historique, index)" >Remove</v-btn>
        </div>

    </v-container>

</template>

<script>
import { mapState } from 'vuex'

    export default {
        name: 'ProfilHistoriqueComp',

        data: () => ({
            
        }),
        computed: {
            ...mapState([
                'user',
                'historique',
            ]),
        },

        methods:{
            deleteHistorique(historique, index){           
                this.$store.commit('historique/REMOVE_FROM_HIST', historique, index) 
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