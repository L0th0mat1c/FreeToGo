<template>
<div>
    <NavBarComp/>

    <v-container class="recipe-unit">
        
        <div class="illustration">
            <div class="img-box my-8">
                <img :src="data[1]">
                                <!-- <v-app-bar
                                flat
                                color="rgba(0, 0, 0, 0)"
                                >
                                    <v-btn icon color="white" @click="addToFav(id, data[0], data[1])">
                                        <v-icon v-if="isFav(recipie) == true">mdi-thumb-up</v-icon>
                                        <v-icon v-else>mdi-thumb-up-outline</v-icon>
                                    
                                    </v-btn>
                                </v-app-bar> -->
            </div>
            <button>Add to favorite</button>

            <div class="ingredients-box">
                <li v-for="ingredient in ingredients" :key="ingredient" class="ingredients">{{ ingredient }}</li>
            </div>

        </div>



        <div class="recipe">
            <h2>{{data[0]}}</h2>
            <hr class="mr-10 mb-6" />
            <div class="instructions">
                <div v-for="recipe in recipe[0].steps" :key="recipe.steps" class="steps">
                    <span class="step-number">{{recipe.number}}</span> 
                    <p>{{recipe.step}}</p>
                    <br>
                </div>
            </div>
            <h3>Enjoy !</h3>
        </div>
    </v-container>

    <FooterComp />
</div>
</template>

<script>

import NavBarComp from '@/components/NavBarComp.vue';
import FooterComp from '@/components/FooterComp.vue';

    export default {
        components: {
            NavBarComp,
            FooterComp
        },
        data() {
            return {
                id: this.$route.params.id,
                data: this.$route.params.data,
                
                ingredients: ['sugar', 'salt', 'pasta'],

                recipe: [
                    {
                        "name": "",
                        "steps": [{
                            "number": 1,
                            "step": "Preheat the oven to 200 degrees F.",
                            "ingredients": [],
                            "equipment": [{
                                "id": 404784,
                                "name": "oven",
                                "localizedName": "oven",
                                "image": "oven.jpg",
                                "temperature": {
                                    "number": 200,
                                    "unit": "Fahrenheit"
                                }
                            }]
                        }, {
                            "number": 2,
                            "step": "Whisk together the flour, pecans, granulated sugar, light brown sugar, baking powder, baking soda, and salt in a medium bowl. Whisk together the eggs, buttermilk, butter and vanilla extract and vanilla bean in a small bowl. Add the egg mixture to the dry mixture and gently mix to combine. Do not overmix. Let the batter sit at room temperature for at least 15 minutes and up to 30 minutes before using.",
                            "ingredients": [{
                                "id": 19334,
                                "name": "light brown sugar",
                                "localizedName": "light brown sugar",
                                "image": "light-brown-sugar.jpg"
                            }, {
                                "id": 10719335,
                                "name": "granulated sugar",
                                "localizedName": "granulated sugar",
                                "image": "sugar-in-bowl.png"
                            }, {
                                "id": 2050,
                                "name": "vanilla extract",
                                "localizedName": "vanilla extract",
                                "image": "vanilla-extract.jpg"
                            }, {
                                "id": 18369,
                                "name": "baking powder",
                                "localizedName": "baking powder",
                                "image": "white-powder.jpg"
                            }, {
                                "id": 93622,
                                "name": "vanilla bean",
                                "localizedName": "vanilla bean",
                                "image": "vanilla.jpg"
                            }, {
                                "id": 18372,
                                "name": "baking soda",
                                "localizedName": "baking soda",
                                "image": "white-powder.jpg"
                            }, {
                                "id": 1230,
                                "name": "buttermilk",
                                "localizedName": "buttermilk",
                                "image": "buttermilk.jpg"
                            }, {
                                "id": 1001,
                                "name": "butter",
                                "localizedName": "butter",
                                "image": "butter-sliced.jpg"
                            }, {
                                "id": 12142,
                                "name": "pecans",
                                "localizedName": "pecans",
                                "image": "pecans.jpg"
                            }, {
                                "id": 20081,
                                "name": "all purpose flour",
                                "localizedName": "all purpose flour",
                                "image": "flour.png"
                            }, {
                                "id": 1123,
                                "name": "egg",
                                "localizedName": "egg",
                                "image": "egg.png"
                            }, {
                                "id": 2047,
                                "name": "salt",
                                "localizedName": "salt",
                                "image": "salt.jpg"
                            }],
                            "equipment": [{
                                "id": 404661,
                                "name": "whisk",
                                "localizedName": "whisk",
                                "image": "whisk.png"
                            }, {
                                "id": 404783,
                                "name": "bowl",
                                "localizedName": "bowl",
                                "image": "bowl.jpg"
                            }],
                            "length": {
                                "number": 15,
                                "unit": "minutes"
                            }
                        }, {
                            "number": 3,
                            "step": "Heat a cast iron or nonstick griddle pan over medium heat and brush with melted butter. Once the butter begins to sizzle, use 2 tablespoons of the batter for each pancake and cook until the bubbles appear on the surface and the bottom is golden brown, about 2 minutes, flip over and cook until the bottom is golden brown, 1 to 2 minutes longer. Transfer the pancakes to a platter and keep warm in a 200 degree F oven.",
                            "ingredients": [{
                                "id": 0,
                                "name": "pancakes",
                                "localizedName": "pancakes",
                                "image": ""
                            }, {
                                "id": 1001,
                                "name": "butter",
                                "localizedName": "butter",
                                "image": "butter-sliced.jpg"
                            }],
                            "equipment": [{
                                "id": 404645,
                                "name": "frying pan",
                                "localizedName": "frying pan",
                                "image": "pan.png"
                            }, {
                                "id": 404784,
                                "name": "oven",
                                "localizedName": "oven",
                                "image": "oven.jpg",
                                "temperature": {
                                    "number": 200,
                                    "unit": "Fahrenheit"
                                }
                            }],
                            "length": {
                                "number": 3,
                                "unit": "minutes"
                            }
                        }, {
                            "number": 4,
                            "step": "Serve 6 pancakes per person, top each with some of the bourbon butter. Drizzle with warm maple syrup and dust with confectioners' sugar. Garnish with fresh mint sprigs and more toasted pecans, if desired.",
                            "ingredients": [{
                                "id": 19336,
                                "name": "powdered sugar",
                                "localizedName": "powdered sugar",
                                "image": "powdered-sugar.jpg"
                            }, {
                                "id": 19911,
                                "name": "maple syrup",
                                "localizedName": "maple syrup",
                                "image": "maple-syrup.png"
                            }, {
                                "id": 2064,
                                "name": "fresh mint",
                                "localizedName": "fresh mint",
                                "image": "mint.jpg"
                            }, {
                                "id": 0,
                                "name": "pancakes",
                                "localizedName": "pancakes",
                                "image": ""
                            }, {
                                "id": 10014037,
                                "name": "bourbon",
                                "localizedName": "bourbon",
                                "image": "bourbon.png"
                            }, {
                                "id": 1001,
                                "name": "butter",
                                "localizedName": "butter",
                                "image": "butter-sliced.jpg"
                            }, {
                                "id": 12142,
                                "name": "pecans",
                                "localizedName": "pecans",
                                "image": "pecans.jpg"
                            }],
                            "equipment": []
                        }]
                    }, {
                        "name": "Bourbon Molasses Butter",
                        "steps": [{
                            "number": 1,
                            "step": "Combine the bourbon and sugar in a small saucepan and cook over high heat until reduced to 3 tablespoons, remove and let cool.",
                            "ingredients": [{
                                "id": 10014037,
                                "name": "bourbon",
                                "localizedName": "bourbon",
                                "image": "bourbon.png"
                            }, {
                                "id": 19335,
                                "name": "sugar",
                                "localizedName": "sugar",
                                "image": "sugar-in-bowl.png"
                            }],
                            "equipment": [{
                                "id": 404669,
                                "name": "sauce pan",
                                "localizedName": "sauce pan",
                                "image": "sauce-pan.jpg"
                            }]
                        }, {
                            "number": 2,
                            "step": "Put the butter, molasses, salt and cooled bourbon mixture in a food processor and process until smooth. Scrape into a bowl, cover with plastic wrap and refrigerate for at least 1 hour to allow the flavors to meld. Remove from the refrigerator about 30 minutes before using to soften.",
                            "ingredients": [{
                                "id": 19304,
                                "name": "molasses",
                                "localizedName": "molasses",
                                "image": "molasses.jpg"
                            }, {
                                "id": 10014037,
                                "name": "bourbon",
                                "localizedName": "bourbon",
                                "image": "bourbon.png"
                            }, {
                                "id": 1001,
                                "name": "butter",
                                "localizedName": "butter",
                                "image": "butter-sliced.jpg"
                            }, {
                                "id": 2047,
                                "name": "salt",
                                "localizedName": "salt",
                                "image": "salt.jpg"
                            }, {
                                "id": 10018364,
                                "name": "wrap",
                                "localizedName": "wrap",
                                "image": "flour-tortilla.jpg"
                            }],
                            "equipment": [{
                                "id": 404771,
                                "name": "food processor",
                                "localizedName": "food processor",
                                "image": "food-processor.png"
                            }, {
                                "id": 404730,
                                "name": "plastic wrap",
                                "localizedName": "plastic wrap",
                                "image": "plastic-wrap.jpg"
                            }, {
                                "id": 404783,
                                "name": "bowl",
                                "localizedName": "bowl",
                                "image": "bowl.jpg"
                            }],
                            "length": {
                                "number": 90,
                                "unit": "minutes"
                            }
                        }]
                    }
                ],
                
            }
        },

        created() {
            // this.getRecipe()

             //REPLACE * BY SLASH
            let dataRetriv = this.data.replace(/\*/g, '/')       
            //MAKE STRING TO ARRAY
            let getback = dataRetriv.split(',')
            this.data = getback
        },

        // methods:{
        //     async getRecipe(){
        //         var axios = require('axios');
        //         let data = []
        //         let key = '71327757c0c2469ab70c0f1e0a5bfe0d'

        //         var config = {
        //             method: 'get',
        //             url: `https://api.spoonacular.com/recipes/${this.id}/analyzedInstructions?stepBreakdown=<boolean>&apiKey=${key}`
        //         };

        //         await axios(config)
        //         .then(function (response) {
        //         console.log(JSON.stringify(response.data));
        //         data = response.data;
        //         })
        //         .catch(function (error) {
        //         console.log(error);
        //         });

        //         this.recipe = data
        //     }
        // }
    }
</script>

<style scoped>

.recipe-unit {
    margin: 0 auto;
    padding: 3rem 12rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}


.illustration {
    text-align: center;
    padding: 1rem;
    margin: 0 1rem;
    background: #EEF1F5;
    box-shadow: -2px 2px 4px rgba(190, 193, 196, 0.2),
                2px -2px 4px rgba(190, 193, 196, 0.2),
                -2px -2px 4px rgba(255, 255, 255, 0.9),
                2px 2px 5px rgba(190, 193, 196, 0.9),
                inset 1px 1px 2px rgba(255, 255, 255, 0.3),
                inset -1px -1px 2px rgba(190, 193, 196, 0.5);
    border-radius: 25px;
    height: 100%;
}


.img-box {
    width: 300px;
    height: 200px;
    overflow: hidden;
    text-align: center;
    box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), 
                -1px -1px 2px rgba(143, 145, 148, 0.5), 
                inset -2px 2px 4px rgba(143, 145, 148, 0.2), 
                inset 2px -2px 4px rgba(143, 145, 148, 0.2), 
                inset -2px -2px 4px rgba(255, 255, 255, 0.9), 
                inset 2px 2px 5px rgba(143, 145, 148, 0.9);
}

img {
    max-width: 100%;
    max-height: 100%;
    transform: scale(1.2);
}

.ingredients-box {
    margin-top: 1.5rem;
    padding: 1.5rem;
    box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), 
    -1px -1px 2px rgba(143, 145, 148, 0.5), 
    inset -2px 2px 4px rgba(143, 145, 148, 0.2), 
    inset 2px -2px 4px rgba(143, 145, 148, 0.2), 
    inset -2px -2px 4px rgba(255, 255, 255, 0.9), 
    inset 2px 2px 5px rgba(143, 145, 148, 0.9);
    border-radius: 25px;
}

.ingredients {
    font-weight: bolder;
}

hr {
    border: 1px solid #FD9256;
} 

.recipe {

    padding: 3rem;
    width: 600px;
    border-radius: 25px;
    background: #EEF1F6;
    box-shadow: -2px 2px 4px rgba(190, 193, 196, 0.2),
                2px -2px 4px rgba(190, 193, 196, 0.2),
                -2px -2px 4px rgba(255, 255, 255, 0.9),
                2px 2px 5px rgba(190, 193, 196, 0.9),
                inset 1px 1px 2px rgba(255, 255, 255, 0.3),
                inset -1px -1px 2px rgba(190, 193, 196, 0.5);
    border-radius: 25px;
}

.instructions {
    margin-bottom: 1.5rem;
    border-radius: 25px;
    box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), 
    -1px -1px 2px rgba(143, 145, 148, 0.5), 
    inset -2px 2px 4px rgba(143, 145, 148, 0.2), 
    inset 2px -2px 4px rgba(143, 145, 148, 0.2), 
    inset -2px -2px 4px rgba(255, 255, 255, 0.9), 
    inset 2px 2px 5px rgba(143, 145, 148, 0.9);
}

.steps {
    display: flex;
    padding: 1rem;
}

.step-number {
    color: #FD9256;
    font-family: 'Fredoka One', cursive;
    margin-right: 1rem;
    font-size: 32px;
}

button{
width: 150px;
height: 40px;
border-radius: 300px;
color: #474E57;
background: linear-gradient(135deg, rgba(241, 244, 246, 0.5) 0%, rgba(233, 236, 239, 0.5) 100%);
box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.2),
            4px -4px 8px rgba(255, 255, 255, 0.9),
            -4px -4px 8px #FFFFFF,
            4px 4px 10px #5E6164,
            inset 1px 1px 2px rgba(226, 226, 226, 0.6),
            inset -1px -1px 2px rgba(28, 28, 28, 0.5);
}

</style>