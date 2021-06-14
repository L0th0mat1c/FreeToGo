<template>
  <div class="frame">


          <v-card-title >{{randomRecipies.title}}</v-card-title>

          <button @click="redirect(randomRecipies.id, randomRecipies)"><img :src="`${randomRecipies.image}`" :alt="`${randomRecipies.title}`"></button>

       
      

    
  
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Frame",
    data: () => ({
            randomRecipies: '',
            errors: '',
        }),
        mounted() {
          this.getRandom()
        },
    methods: {
      async getRandom() {
        await axios.get('https://api.spoonacular.com/recipes/random?includeNutrition=false&apiKey=71327757c0c2469ab70c0f1e0a5bfe0d')
                .then((response) => {
                  console.log('response random', response.data.recipes[0])
                  this.randomRecipies = response.data.recipes[0];
                })
                .catch(error=> {
                  this.errors = error;
                })
      },
      redirect(id , recipe){
                console.log('id', id)
                let recipeInfo = [recipe.title, recipe.image]
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

.frame {
    width: 320px;
    height: 320px;
    padding: 10px;
    display:inline-table;
    
    background: #EEF1F6;
    box-shadow: -5px 5px 10px rgba(214, 217, 221, 0.2),
                5px -5px 10px rgba(214, 217, 221, 0.2),
                -5px -5px 10px rgba(255, 255, 255, 0.9),
                5px 5px 13px rgba(214, 217, 221, 0.9), 
                inset 1px 1px 2px rgba(255, 255, 255, 0.3), 
                inset -1px -1px 2px rgba(214, 217, 221, 0.5);
    border-radius: 25px;
}

img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 25px;
}

</style>