<template>
    
    <v-container>


      <div v-if="!this.shoplist.shoplist[0].recipe.length">

            <v-alert
            border="top"
            color="red lighten-2"
            dark
            >
            Your Shoplist is empty! :( Checkout our recipes :
            <v-btn @click="$router.push('/QuickSearch')" icon >
            
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            </v-alert>
        </div>


       <!-- ////////////////////SHOPLIST_BTN\\\\\\\\\\\\\\\\\\\\ -->
      <!-- <v-row class="list-menu" justify="space-around">
        
        <div v-for="(recipe, index) in  shoplist.shoplist" :key="recipe.title">
          <v-btn @click="show = index">
              {{recipe.title}} 
          </v-btn>
          <v-btn @click="deleteShoplist(index)">X</v-btn>
        </div>
      </v-row> -->
      <!-- \\\\\\\\\\\\\\\\\\\\SHOPLIST_BTN//////////////////// -->

      <!-- ////////////////////RECIPES\\\\\\\\\\\\\\\\\\\\ -->

      <div v-else class="shoplist-box">
        <div class="recipes-box">
          
          <v-card width="275" height="150px" v-for="(recipe, index) in  shoplist.shoplist[show].recipe" :key="recipe.title">
            <!-- <btn @click="redirect(recipe.id, recipe)"> -->
              <button class="remove-btn" 
                  
                  @click="deleteRecipe(show, index)"><v-icon medium class="white--text">mdi-delete-forever </v-icon></button>
            <v-img
            @click="redirect(recipe.id, recipe)"
              height="150px"
              width="550px"
              :src="recipe.img"
            >
            
              <v-app-bar
                flat
                color="rgba(0, 0, 0, 0)"
              >
              
                <!-- <v-btn
                  color="white"
                  icon
                  @click="deleteRecipe(show, index)"
                >
                  <v-icon medium>mdi-delete-forever </v-icon>
                </v-btn> -->
               
              </v-app-bar>

              <v-card-title class="white--text mt-8">
                <p class="ml-3">{{recipe.title}}</p>
              </v-card-title>
            </v-img>
            <!-- </btn> -->
          </v-card>
          
        </div>
      


        <!-- \\\\\\\\\\\\\\\\\\\\RECIPES//////////////////// -->
        
        <!-- ////////////////////RESUME SHOPLIST\\\\\\\\\\\\\\\\\\\\ -->
        <div class="shoplist-resume">
          <h3 class="mb-6"> Shoplist </h3>
          <hr class="mb-6"/>
          <button class="AddToStock" @click="addToStock(show)">Add to my Stock</button> <br>
          <div  v-for="resum in resum" :key="resum.aisle">
            {{resum.aisle}}
            <v-list-item v-for="item in resum.ingredients" :key="item.name">
              
              <v-list-item-content>
                <!-- <v-list-item-title>{{item.name}}</v-list-item-title> -->
                <v-list-item-subtitle>{{item.amount}} {{item.unit}}: {{item.name}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
      </div>

        <!-- \\\\\\\\\\\\\\\\\\\\RESUME SHOPLIST//////////////////// -->
        
    

        

    </v-container>

</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'ManageShoplistComp',
        
        data: () => ({
            show: 0,
            resum: [],
            object: [ { "title": "", "recipe": [] } ]

        }),
        created: function () {
            this.creatResume()
            console.log('ok')
        },
        computed: {
            ...mapState([
              'user',
                'shoplist',
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
            },
            deleteRecipe(parentIndex, index){         
              this.$store.commit('shoplist/DELETE_RECIPE', {parentIndex, index})
              this.creatResume()
            },

            deleteShoplist(index){
                console.log('index comp:', index)
                this.$store.commit('shoplist/DELETE_SHOPLIST', index)
            },
            addToStock(index){
                
                
                let mylist = this.shoplist.shoplist[index].recipe
                let turn = mylist.length
                let items = []
                let recipe = []
                for(let i = 0; i < turn; i++){
                  let turn2 = mylist[i].ingredients.length
                  recipe.push(mylist[i])
                  
                  for(let i2 = 0; i2 < turn2; i2++){
                    items.push(mylist[i].ingredients[i2])
                  }       
                }
                this.$store.commit('stock/ADD_TO_STOCK', items)
                
                this.$store.commit('recipe/ADD_TO_RECIPE', recipe)  
                
                // this.$store.commit('shoplist/CLEAN_SHOPLIST')  
                // this.mylist = []
            }, 

            creatResume(){
     
              // SELECT VARIBLE SHOPLIST

              this.resum = []
              let shoplist = []
              shoplist =  localStorage.getItem("shoplist"); 
              shoplist = JSON.parse(shoplist)
              shoplist = shoplist[this.show].recipe
              let turn = shoplist.length
              //\\
             
              for(let i = 0; i < turn; i++){
                  // console.log('/////////////////////RECIPE[' + [i] + ']/////////////////////')
                  
                  let ingredientsList = shoplist[i].ingredients
                  let turn2 = ingredientsList.length       
                  
                  for(let i = 0; i < turn2; i++){
                    // console.log('///////Turn[' + [i] + ']///////')

                    let aisle = ingredientsList[i].aisle
                    
                    let turn3 = this.resum.length
                    let found = "false"
                    for(let i = 0; i < turn3; i++){
                      if(aisle === this.resum[i].aisle){  
                        found = i
                      }
                    }
                    if(found == "false"){
                      let myAisle = {
                         aisle: aisle,
                         ingredients:[ingredientsList[i]]
                      }
                      this.resum.push(myAisle)
                    }else{
                      let found2 = "false"
                      let IngredientName = ingredientsList[i].name           
                      let IngredientResum = this.resum[found].ingredients
                      for(let i = 0; i < IngredientResum.length; i++){
                        if(IngredientResum[i].name == IngredientName){
                          found2 = i
                          // console.log('found2:', found2)
                        }
                      }
                      if(found2 == "false"){
                        this.resum[found].ingredients.push(ingredientsList[i])
                      }else{
                        // console.log("FOUND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                        
                        let add = ingredientsList[i].amount
                        // console.log('add:', add)

                    
                        this.resum[found].ingredients[found2].amount += add
                        // console.log('mycount:', mycount)
                      }
                      
                      
                    }  
                  
                  }
                  
              }
            }
        }
        
    }
</script>

<style scoped>

.shoplist-box {
  display: flex;
  justify-content: space-around;
}

.shoplist-resume {

  display: flex;
  text-align: center;
  flex-direction: column;

}

.AddToStock {
  border-radius: 300px;
  color: #474E57;
  width: 140px;
  padding: 0.5rem;
  background: linear-gradient(135deg, rgba(241, 244, 246, 0.9) 0%, rgba(233, 236, 239, 0.9) 100%);
  box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.2),
              4px -4px 8px rgba(255, 255, 255, 0.9),
              -4px -4px 8px #FFFFFF,
              4px 4px 10px #5E6164,
              inset 1px 1px 2px rgb(255, 255, 255),
              inset -1px -1px 2px rgba(28, 28, 28, 0.5);
}

v-img {
  transform: scale(1.2);
}

.v-card {
  border-radius: 25px;
  
}

.remove-btn {

  width: 40px;
  height: 40px;
  border-radius: 300px;
  color: #EEF1F6;

  background: #D95454;
  box-shadow: -3px 3px 6px rgba(0, 0, 0, 0.2),
              3px -3px 6px rgba(255, 185, 185, 0.2),
              -2px -2px 4px rgba(226, 226, 226, 0.3),
              4px 4px 10px #5E6164,
              inset 6px 11px 10px rgba(255, 255, 255, 0.15),
              inset 1px 1px 2px rgba(226, 226, 226, 0.6),
              inset -1px -1px 2px rgba(28, 28, 28, 0.5);
}



</style>