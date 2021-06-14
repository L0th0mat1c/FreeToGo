<template>
    <v-container>
        <h1>search</h1>

        <!-- <div class="searchbar">
            <input v-model="values" :items="items" placeholder="Enter an ingredient..."/>
            <button class="search-btn" @click="Search()">
                <img src="../assets/search-btn.svg" alt="search">
            </button>
            <div v-if="errors">
                <v-alert
                    border="top"
                    color="red lighten-2"
                    dark
                >
                {{errors}}
                </v-alert>
            </div>
        </div> -->
        <!-- <v-autocomplete auto-select-first chips clearable deletable-chips multiple small-chips v-model="values"
            :items="items"></v-autocomplete> -->

                {{cuisine}}
                {{diet}}
            
                <v-card-text>
                    <h2 class="title mb-2">
                    Choose cuisine
                    </h2>
            
                    <v-chip-group
                    v-model="cuisine"
                    column
                    multiple 
                    
                    >
                        <v-chip
                        v-for="choix in cuisineChoix" :key="choix"
                            filter
                            outlined
                        >
                            {{choix}}
                        </v-chip>
                        
                    </v-chip-group>

                    
                </v-card-text>

                <v-card-text>
                    <h2 class="title mb-2">
                    Choose Diet
                    </h2>
            
                    <v-chip-group
                    v-model="diet"
                    column
                    multiple 
                    
                    >
                        <v-chip
                        v-for="choix in dietChoix" :key="choix"
                            filter
                            outlined
                        >
                            {{choix}}
                        </v-chip>
                        
                    </v-chip-group>

                    
                </v-card-text>

                <v-card-text>
                    <h2 class="title mb-2">
                    Choose intolerances
                    </h2>
            
                    <v-chip-group
                    v-model="intolerances"
                    column
                    multiple 
                    
                    >
                        <v-chip
                        v-for="choix in intolerancesChoix" :key="choix"
                            filter
                            outlined
                        >
                            {{choix}}
                        </v-chip>
                        
                    </v-chip-group>

                    
                </v-card-text>

                <v-card-text>
                    <h2 class="title mb-2">
                    Choose Type
                    </h2>
            
                    <v-chip-group
                    v-model="type"
                    column
                    multiple 
                    
                    >
                        <v-chip
                        v-for="choix in typeChoix" :key="choix"
                            filter
                            outlined
                        >
                            {{choix}}
                        </v-chip>
                        
                    </v-chip-group>

                    
                </v-card-text>
            
                
           
           

        <v-btn @click="Search()"> Yumm!</v-btn>


       


        <!-- ////////////////////CARD\\\\\\\\\\\\\\\\\\\\ -->
        <v-row class="columns">

            <v-col class="child" cols="4" sm="4" v-for="recipie in recipies" :key="recipie.title" 
                style="margin-bottom:-100px">

                <RecipeCardComp :recipe="recipie" />

               
                <br>

                <!-- <v-card @click="redirect(recipie.id, recipie)" :loading="loading" class="mx-auto my-12" max-width="374">

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

    import Masonry from 'masonry-layout'

    import RecipeCardComp from '@/components/RecipeCardComp.vue';

    export default {
        name: 'SearchFiltreComp',

        components: {

            RecipeCardComp,
        },

        

        data: () => ({
            items: [],
            values: [],
            
            cuisineChoix: [
                "African",
                "American",
                "British",
                "Cajun",
                "Caribbean",
                "Chinese",
                "Eastern European",
                "European",
                "French",
                "German",
                "Greek",
                "Indian",
                "Irish",
                "Italian",
                "Japanese",
                "Jewish",
                "Korean",
                "Latin American",
                "Mediterranean",
                "Mexican",
                "Middle Eastern",
                "Nordic",
                "Southern",
                "Spanish",
                "Thai",
                "Vietnamese"],
            dietChoix: [
                "Gluten Free",
                "Ketogenic",
                "Vegetarian",
                "Lacto-Vegetarian",
                "Ovo-Vegetarian",
                "Vegan",
                "Pescetarian",
                "Paleo",
                "Primal",
                "Whole30",
            ],
            intolerancesChoix: [
                "Dairy",
                "Egg",
                "Gluten",
                "Grain",
                "Peanut",
                "Seafood",
                "Sesame",
                "Shellfish",
                "Soy",
                "Sulfite",
                "Tree Nut",
                "Wheat",
            ],
            typeChoix: [
                "main course",
                "side dish",
                "dessert",
                "appetizer",
                "salad",
                "bread",
                "breakfast",
                "soup",
                "beverage",
                "sauce",
                "marinade",
                "fingerfood",
                "snack",
                "drink",
            ],
            titleMatchChoix: '',

            cuisine: '',
            diet: '',
            intolerances: '',
            type: '',
            titleMatch: '',

            loading: false,
            selection: 1,
            dialogm1: '',
            dialog: false,
            recipies: [{
                    "id": 646660,
                    "title": "Goat Cheese and Fig Crostini",
                    "image": "https://spoonacular.com/recipeImages/646660-312x231.jpg",
                    "imageType": "jpg",
                    "usedIngredientCount": 3,
                    "missedIngredientCount": 2,
                    "missedIngredients": [{
                        "id": 11519297,
                        "amount": 6,
                        "unit": "servings",
                        "unitLong": "servings",
                        "unitShort": "servings",
                        "aisle": "Nut butters, Jams, and Honey",
                        "name": "fig preserves",
                        "original": "Fig preserves",
                        "originalString": "Fig preserves",
                        "originalName": "Fig preserves",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/fig-preserves.jpg"
                    }, {
                        "id": 4053,
                        "amount": 0.75,
                        "unit": "cup",
                        "unitLong": "cups",
                        "unitShort": "cup",
                        "aisle": "Oil, Vinegar, Salad Dressing",
                        "name": "olive oil",
                        "original": "3/4 cup olive oil",
                        "originalString": "3/4 cup olive oil",
                        "originalName": "olive oil",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg"
                    }],
                    "usedIngredients": [{
                        "id": 18033,
                        "amount": 1,
                        "unit": "",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Bakery/Bread",
                        "name": "baguette",
                        "original": "1 baguette",
                        "originalString": "1 baguette",
                        "originalName": "baguette",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/half-baguette.jpg"
                    }, {
                        "id": 1017,
                        "amount": 4,
                        "unit": "oz",
                        "unitLong": "ounces",
                        "unitShort": "oz",
                        "aisle": "Cheese",
                        "name": "cream cheese",
                        "original": "4 oz. cream cheese",
                        "originalString": "4 oz. cream cheese",
                        "originalName": "cream cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cream-cheese.jpg"
                    }, {
                        "id": 1159,
                        "amount": 4,
                        "unit": "oz",
                        "unitLong": "ounces",
                        "unitShort": "oz",
                        "aisle": "Cheese",
                        "name": "goat cheese",
                        "original": "4 oz. goat cheese",
                        "originalString": "4 oz. goat cheese",
                        "originalName": "goat cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/goat-cheese.jpg"
                    }],
                    "unusedIngredients": [{
                        "id": 18064,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Bakery/Bread",
                        "name": "bread",
                        "original": "bread",
                        "originalString": "bread",
                        "originalName": "bread",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg"
                    }, {
                        "id": 1041009,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Cheese",
                        "name": "cheese",
                        "original": "cheese",
                        "originalString": "cheese",
                        "originalName": "cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
                    }, {
                        "id": 10111529,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "grape tomatoes",
                        "original": "grape tomatoes",
                        "originalString": "grape tomatoes",
                        "originalName": "grape tomatoes",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cherry-tomatoes.png"
                    }],
                    "likes": 3
                }, {
                    "id": 633167,
                    "title": "Avocado Tomato & Mozzarella Panini/sandwiches",
                    "image": "https://spoonacular.com/recipeImages/633167-312x231.jpg",
                    "imageType": "jpg",
                    "usedIngredientCount": 2,
                    "missedIngredientCount": 2,
                    "missedIngredients": [{
                        "id": 9037,
                        "amount": 1,
                        "unit": "",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Produce",
                        "name": "avocado",
                        "original": "1 ripe avocado sliced",
                        "originalString": "1 ripe avocado sliced",
                        "originalName": "ripe avocado sliced",
                        "metaInformation": ["ripe", "sliced"],
                        "meta": ["ripe", "sliced"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/avocado.jpg"
                    }, {
                        "id": 1001,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Milk, Eggs, Other Dairy",
                        "name": "butter",
                        "original": "butter for outside of panini",
                        "originalString": "butter for outside of panini",
                        "originalName": "butter for outside of panini",
                        "metaInformation": ["for outside of panini"],
                        "meta": ["for outside of panini"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/butter-sliced.jpg"
                    }],
                    "usedIngredients": [{
                        "id": 18029,
                        "amount": 8,
                        "unit": "slices",
                        "unitLong": "slices",
                        "unitShort": "slice",
                        "aisle": "Bakery/Bread",
                        "name": "french bread",
                        "original": "8 slices french bread",
                        "originalString": "8 slices french bread",
                        "originalName": "french bread",
                        "metaInformation": ["french"],
                        "meta": ["french"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/crusty-bread.jpg"
                    }, {
                        "id": 1026,
                        "amount": 0.5,
                        "unit": "cup",
                        "unitLong": "cups",
                        "unitShort": "cup",
                        "aisle": "Cheese",
                        "name": "mozzarella",
                        "original": "1/2 cup grated mozzarella about",
                        "originalString": "1/2 cup grated mozzarella about",
                        "originalName": "grated mozzarella about",
                        "metaInformation": ["grated"],
                        "meta": ["grated"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/mozzarella.png"
                    }],
                    "unusedIngredients": [{
                        "id": 18064,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Bakery/Bread",
                        "name": "bread",
                        "original": "bread",
                        "originalString": "bread",
                        "originalName": "bread",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg"
                    }, {
                        "id": 1041009,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Cheese",
                        "name": "cheese",
                        "original": "cheese",
                        "originalString": "cheese",
                        "originalName": "cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
                    }, {
                        "id": 10111529,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "grape tomatoes",
                        "original": "grape tomatoes",
                        "originalString": "grape tomatoes",
                        "originalName": "grape tomatoes",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cherry-tomatoes.png"
                    }],
                    "likes": 3
                },
                {
                    "id": 633165,
                    "title": "Avocado Tomato & Mozzarella Panini",
                    "image": "https://spoonacular.com/recipeImages/633165-312x231.jpg",
                    "imageType": "jpg",
                    "usedIngredientCount": 2,
                    "missedIngredientCount": 2,
                    "missedIngredients": [{
                        "id": 9037,
                        "amount": 1,
                        "unit": "",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Produce",
                        "name": "avocado",
                        "original": "1 ripe avocado sliced",
                        "originalString": "1 ripe avocado sliced",
                        "originalName": "ripe avocado sliced",
                        "metaInformation": ["ripe", "sliced"],
                        "meta": ["ripe", "sliced"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/avocado.jpg"
                    }, {
                        "id": 1001,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Milk, Eggs, Other Dairy",
                        "name": "butter",
                        "original": "butter for outside of panini",
                        "originalString": "butter for outside of panini",
                        "originalName": "butter for outside of panini",
                        "metaInformation": ["for outside of panini"],
                        "meta": ["for outside of panini"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/butter-sliced.jpg"
                    }],
                    "usedIngredients": [{
                        "id": 18029,
                        "amount": 8,
                        "unit": "slices",
                        "unitLong": "slices",
                        "unitShort": "slice",
                        "aisle": "Bakery/Bread",
                        "name": "french bread",
                        "original": "8 slices french bread",
                        "originalString": "8 slices french bread",
                        "originalName": "french bread",
                        "metaInformation": ["french"],
                        "meta": ["french"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/crusty-bread.jpg"
                    }, {
                        "id": 1026,
                        "amount": 0.5,
                        "unit": "cup",
                        "unitLong": "cups",
                        "unitShort": "cup",
                        "aisle": "Cheese",
                        "name": "mozzarella",
                        "original": "1/2 cup grated mozzarella about",
                        "originalString": "1/2 cup grated mozzarella about",
                        "originalName": "grated mozzarella about",
                        "metaInformation": ["grated"],
                        "meta": ["grated"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/mozzarella.png"
                    }],
                    "unusedIngredients": [{
                        "id": 18064,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Bakery/Bread",
                        "name": "bread",
                        "original": "bread",
                        "originalString": "bread",
                        "originalName": "bread",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg"
                    }, {
                        "id": 1041009,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Cheese",
                        "name": "cheese",
                        "original": "cheese",
                        "originalString": "cheese",
                        "originalName": "cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
                    }, {
                        "id": 10111529,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "grape tomatoes",
                        "original": "grape tomatoes",
                        "originalString": "grape tomatoes",
                        "originalName": "grape tomatoes",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cherry-tomatoes.png"
                    }],
                    "likes": 1
                }, {
                    "id": 639318,
                    "title": "Chorizo and Cheese Crostini",
                    "image": "https://spoonacular.com/recipeImages/639318-312x231.jpg",
                    "imageType": "jpg",
                    "usedIngredientCount": 2,
                    "missedIngredientCount": 2,
                    "missedIngredients": [{
                        "id": 11109,
                        "amount": 0.25,
                        "unit": "head",
                        "unitLong": "heads",
                        "unitShort": "head",
                        "aisle": "Produce",
                        "name": "cabbage",
                        "original": "1/4 head cabbage, grated",
                        "originalString": "1/4 head cabbage, grated",
                        "originalName": "cabbage, grated",
                        "metaInformation": ["grated"],
                        "meta": ["grated"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cabbage.jpg"
                    }, {
                        "id": 99233,
                        "amount": 1,
                        "unit": "pound",
                        "unitLong": "pound",
                        "unitShort": "lb",
                        "aisle": "Meat",
                        "name": "chorizo",
                        "original": "1 pound cooked chorizo, casings removed",
                        "originalString": "1 pound cooked chorizo, casings removed",
                        "originalName": "cooked chorizo, casings removed",
                        "metaInformation": ["cooked"],
                        "meta": ["cooked"],
                        "extendedName": "cooked chorizo",
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/chorizo.jpg"
                    }],
                    "usedIngredients": [{
                        "id": 1030,
                        "amount": 1,
                        "unit": "cup",
                        "unitLong": "cup",
                        "unitShort": "cup",
                        "aisle": "Cheese",
                        "name": "muenster cheese",
                        "original": "cup About ½ mixture of grated Muenster and Daisy cheese",
                        "originalString": "cup About ½ mixture of grated Muenster and Daisy cheese",
                        "originalName": "About ½ mixture of grated Muenster and Daisy cheese",
                        "metaInformation": ["grated"],
                        "meta": ["grated"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/muenster-cheese.png"
                    }, {
                        "id": 18033,
                        "amount": 0.5,
                        "unit": "loaf",
                        "unitLong": "loafs",
                        "unitShort": "loaf",
                        "aisle": "Bakery/Bread",
                        "name": "baguette",
                        "original": "1/2 loaf of Italian baguette",
                        "originalString": "1/2 loaf of Italian baguette",
                        "originalName": "Italian baguette",
                        "metaInformation": ["italian"],
                        "meta": ["italian"],
                        "extendedName": "italian baguette",
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/half-baguette.jpg"
                    }],
                    "unusedIngredients": [{
                        "id": 18064,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Bakery/Bread",
                        "name": "bread",
                        "original": "bread",
                        "originalString": "bread",
                        "originalName": "bread",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg"
                    }, {
                        "id": 1041009,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Cheese",
                        "name": "cheese",
                        "original": "cheese",
                        "originalString": "cheese",
                        "originalName": "cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
                    }, {
                        "id": 10111529,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "grape tomatoes",
                        "original": "grape tomatoes",
                        "originalString": "grape tomatoes",
                        "originalName": "grape tomatoes",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cherry-tomatoes.png"
                    }],
                    "likes": 1
                }, {
                    "id": 645733,
                    "title": "Grilled Ham and Swiss Sandwich",
                    "image": "https://spoonacular.com/recipeImages/645733-312x231.jpg",
                    "imageType": "jpg",
                    "usedIngredientCount": 2,
                    "missedIngredientCount": 2,
                    "missedIngredients": [{
                        "id": 1001,
                        "amount": 2,
                        "unit": "",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Milk, Eggs, Other Dairy",
                        "name": "butter",
                        "original": "2 pats of butter",
                        "originalString": "2 pats of butter",
                        "originalName": "pats of butter",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/butter-sliced.jpg"
                    }, {
                        "id": 10151,
                        "amount": 3,
                        "unit": "Pieces",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Meat",
                        "name": "ham",
                        "original": "3 Pieces Thin Sliced Ham",
                        "originalString": "3 Pieces Thin Sliced Ham",
                        "originalName": "Thin Sliced Ham",
                        "metaInformation": ["sliced", "thin"],
                        "meta": ["sliced", "thin"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/ham-whole.jpg"
                    }],
                    "usedIngredients": [{
                        "id": 1040,
                        "amount": 2,
                        "unit": "Slices",
                        "unitLong": "Slices",
                        "unitShort": "slice",
                        "aisle": "Cheese",
                        "name": "swiss cheese",
                        "original": "2 Slices Swiss Cheese",
                        "originalString": "2 Slices Swiss Cheese",
                        "originalName": "Swiss Cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/Swiss-cheese.jpg"
                    }, {
                        "id": 18069,
                        "amount": 2,
                        "unit": "Slices",
                        "unitLong": "Slices",
                        "unitShort": "slice",
                        "aisle": "Gluten Free",
                        "name": "white bread",
                        "original": "2 Slices White Bread",
                        "originalString": "2 Slices White Bread",
                        "originalName": "White Bread",
                        "metaInformation": ["white"],
                        "meta": ["white"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg"
                    }],
                    "unusedIngredients": [{
                        "id": 18064,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Bakery/Bread",
                        "name": "bread",
                        "original": "bread",
                        "originalString": "bread",
                        "originalName": "bread",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg"
                    }, {
                        "id": 1041009,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Cheese",
                        "name": "cheese",
                        "original": "cheese",
                        "originalString": "cheese",
                        "originalName": "cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
                    }, {
                        "id": 10111529,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "grape tomatoes",
                        "original": "grape tomatoes",
                        "originalString": "grape tomatoes",
                        "originalName": "grape tomatoes",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cherry-tomatoes.png"
                    }],
                    "likes": 1
                }, {
                    "id": 642777,
                    "title": "Fig and Goat Cheese Pizza With Pesto",
                    "image": "https://spoonacular.com/recipeImages/642777-312x231.jpg",
                    "imageType": "jpg",
                    "usedIngredientCount": 2,
                    "missedIngredientCount": 2,
                    "missedIngredients": [{
                        "id": 9094,
                        "amount": 5,
                        "unit": "medium",
                        "unitLong": "mediums",
                        "unitShort": "medium",
                        "aisle": "Dried Fruits;Produce",
                        "name": "dried figs",
                        "original": "5 Figs, Dried, chopped, medium fine",
                        "originalString": "5 Figs, Dried, chopped, medium fine",
                        "originalName": "Figs, Dried, chopped, medium fine",
                        "metaInformation": ["dried", "chopped", "fine"],
                        "meta": ["dried", "chopped", "fine"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/figs-dried.jpg"
                    }, {
                        "id": 93698,
                        "amount": 1,
                        "unit": "cup",
                        "unitLong": "cup",
                        "unitShort": "cup",
                        "aisle": "Pasta and Rice",
                        "name": "pesto",
                        "original": "1 cup pesto",
                        "originalString": "1 cup pesto",
                        "originalName": "pesto",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/basil-pesto.png"
                    }],
                    "usedIngredients": [{
                        "id": 1159,
                        "amount": 0.75,
                        "unit": "cup",
                        "unitLong": "cups",
                        "unitShort": "cup",
                        "aisle": "Cheese",
                        "name": "goat cheese",
                        "original": "3/4 cup goat cheese",
                        "originalString": "3/4 cup goat cheese",
                        "originalName": "goat cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/goat-cheese.jpg"
                    }, {
                        "id": 93723,
                        "amount": 4,
                        "unit": "pieces",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Bakery/Bread;Ethnic Foods",
                        "name": "naan bread",
                        "original": "4 pieces of naan bread",
                        "originalString": "4 pieces of naan bread",
                        "originalName": "naan bread",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/naan.png"
                    }],
                    "unusedIngredients": [{
                        "id": 18064,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Bakery/Bread",
                        "name": "bread",
                        "original": "bread",
                        "originalString": "bread",
                        "originalName": "bread",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg"
                    }, {
                        "id": 1041009,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Cheese",
                        "name": "cheese",
                        "original": "cheese",
                        "originalString": "cheese",
                        "originalName": "cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
                    }, {
                        "id": 10111529,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "grape tomatoes",
                        "original": "grape tomatoes",
                        "originalString": "grape tomatoes",
                        "originalName": "grape tomatoes",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cherry-tomatoes.png"
                    }],
                    "likes": 1
                }, {
                    "id": 655477,
                    "title": "Peas And Tarragon With Fresh Goat Cheese",
                    "image": "https://spoonacular.com/recipeImages/655477-312x231.jpg",
                    "imageType": "jpg",
                    "usedIngredientCount": 1,
                    "missedIngredientCount": 2,
                    "missedIngredients": [{
                        "id": 11304,
                        "amount": 1,
                        "unit": "pound",
                        "unitLong": "pound",
                        "unitShort": "lb",
                        "aisle": "Produce",
                        "name": "peas",
                        "original": "1 pound Peas",
                        "originalString": "1 pound Peas",
                        "originalName": "Peas",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/peas.jpg"
                    }, {
                        "id": 2041,
                        "amount": 1,
                        "unit": "teaspoon",
                        "unitLong": "teaspoon",
                        "unitShort": "tsp",
                        "aisle": "Produce",
                        "name": "tarragon",
                        "original": "1 teaspoon Chopped tarragon",
                        "originalString": "1 teaspoon Chopped tarragon",
                        "originalName": "Chopped tarragon",
                        "metaInformation": ["chopped"],
                        "meta": ["chopped"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/tarragon.jpg"
                    }],
                    "usedIngredients": [{
                        "id": 1159,
                        "amount": 1,
                        "unit": "package",
                        "unitLong": "package",
                        "unitShort": "pkg",
                        "aisle": "Cheese",
                        "name": "goat cheese",
                        "original": "1 package 5.3 oz. Chavrie fresh goat cheese, Pyramid",
                        "originalString": "1 package 5.3 oz. Chavrie fresh goat cheese, Pyramid",
                        "originalName": "5.3 oz. Chavrie fresh goat cheese, Pyramid",
                        "metaInformation": ["fresh"],
                        "meta": ["fresh"],
                        "extendedName": "fresh goat cheese",
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/goat-cheese.jpg"
                    }],
                    "unusedIngredients": [{
                        "id": 18064,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Bakery/Bread",
                        "name": "bread",
                        "original": "bread",
                        "originalString": "bread",
                        "originalName": "bread",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg"
                    }, {
                        "id": 1041009,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Cheese",
                        "name": "cheese",
                        "original": "cheese",
                        "originalString": "cheese",
                        "originalName": "cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
                    }, {
                        "id": 10111529,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "grape tomatoes",
                        "original": "grape tomatoes",
                        "originalString": "grape tomatoes",
                        "originalName": "grape tomatoes",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cherry-tomatoes.png"
                    }],
                    "likes": 1
                }, {
                    "id": 633227,
                    "title": "Baby Brie Wedge In Phyllo",
                    "image": "https://spoonacular.com/recipeImages/633227-312x231.jpg",
                    "imageType": "jpg",
                    "usedIngredientCount": 1,
                    "missedIngredientCount": 2,
                    "missedIngredients": [{
                        "id": 93632,
                        "amount": 4,
                        "unit": "tablespoons",
                        "unitLong": "tablespoons",
                        "unitShort": "Tbsp",
                        "aisle": "Ethnic Foods",
                        "name": "clarified butter",
                        "original": "4 tablespoons Clarified Butter or melted butter",
                        "originalString": "4 tablespoons Clarified Butter or melted butter",
                        "originalName": "Clarified Butter or melted butter",
                        "metaInformation": ["melted"],
                        "meta": ["melted"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/ghee.jpg"
                    }, {
                        "id": 18338,
                        "amount": 3,
                        "unit": "sheets",
                        "unitLong": "sheets",
                        "unitShort": "sheets",
                        "aisle": "Refrigerated;Frozen",
                        "name": "phyllo dough",
                        "original": "3 sheets Phyllo dough",
                        "originalString": "3 sheets Phyllo dough",
                        "originalName": "Phyllo dough",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/filo-dough.png"
                    }],
                    "usedIngredients": [{
                        "id": 1006,
                        "amount": 1,
                        "unit": "",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Cheese",
                        "name": "brie",
                        "original": "1 wedge Alouette Baby Brie",
                        "originalString": "1 wedge Alouette Baby Brie",
                        "originalName": "wedge Alouette Baby Brie",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/brie.jpg"
                    }],
                    "unusedIngredients": [{
                        "id": 18064,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Bakery/Bread",
                        "name": "bread",
                        "original": "bread",
                        "originalString": "bread",
                        "originalName": "bread",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg"
                    }, {
                        "id": 1041009,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Cheese",
                        "name": "cheese",
                        "original": "cheese",
                        "originalString": "cheese",
                        "originalName": "cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
                    }, {
                        "id": 10111529,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "grape tomatoes",
                        "original": "grape tomatoes",
                        "originalString": "grape tomatoes",
                        "originalName": "grape tomatoes",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cherry-tomatoes.png"
                    }],
                    "likes": 1
                }, {
                    "id": 645708,
                    "title": "Grilled Figs With Brie and Prosciutto",
                    "image": "https://spoonacular.com/recipeImages/645708-312x231.jpg",
                    "imageType": "jpg",
                    "usedIngredientCount": 1,
                    "missedIngredientCount": 2,
                    "missedIngredients": [{
                        "id": 9089,
                        "amount": 2,
                        "unit": "",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Produce",
                        "name": "figs",
                        "original": "2 figs per skewer",
                        "originalString": "2 figs per skewer",
                        "originalName": "figs per skewer",
                        "metaInformation": ["per skewer"],
                        "meta": ["per skewer"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/figs-fresh.jpg"
                    }, {
                        "id": 10010123,
                        "amount": 1,
                        "unit": "slice",
                        "unitLong": "slice",
                        "unitShort": "slice",
                        "aisle": "Meat",
                        "name": "prosciutto",
                        "original": "1 slice prosciutto per fig",
                        "originalString": "1 slice prosciutto per fig",
                        "originalName": "prosciutto per fig",
                        "metaInformation": ["per fig"],
                        "meta": ["per fig"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/proscuitto.jpg"
                    }],
                    "usedIngredients": [{
                        "id": 1006,
                        "amount": 1,
                        "unit": "square",
                        "unitLong": "square",
                        "unitShort": "square",
                        "aisle": "Cheese",
                        "name": "brie cheese",
                        "original": "1 square brie cheese per fig",
                        "originalString": "1 square brie cheese per fig",
                        "originalName": "brie cheese per fig",
                        "metaInformation": ["per fig"],
                        "meta": ["per fig"],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/brie.jpg"
                    }],
                    "unusedIngredients": [{
                        "id": 18064,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Bakery/Bread",
                        "name": "bread",
                        "original": "bread",
                        "originalString": "bread",
                        "originalName": "bread",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg"
                    }, {
                        "id": 1041009,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Cheese",
                        "name": "cheese",
                        "original": "cheese",
                        "originalString": "cheese",
                        "originalName": "cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
                    }, {
                        "id": 10111529,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "grape tomatoes",
                        "original": "grape tomatoes",
                        "originalString": "grape tomatoes",
                        "originalName": "grape tomatoes",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cherry-tomatoes.png"
                    }],
                    "likes": 1
                }, {
                    "id": 157994,
                    "title": "Oreo Balls",
                    "image": "https://spoonacular.com/recipeImages/157994-312x231.jpg",
                    "imageType": "jpg",
                    "usedIngredientCount": 1,
                    "missedIngredientCount": 2,
                    "missedIngredients": [{
                        "id": 10019146,
                        "amount": 10,
                        "unit": "oz",
                        "unitLong": "ounces",
                        "unitShort": "oz",
                        "aisle": "Baking",
                        "name": "chocolate chips",
                        "original": "10-12 oz. of CHOCOLATE ALMOND BARK or CHOCOLATE CHIPS",
                        "originalString": "10-12 oz. of CHOCOLATE ALMOND BARK or CHOCOLATE CHIPS",
                        "originalName": "CHOCOLATE ALMOND BARK or CHOCOLATE CHIPS",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/chocolate-chips.jpg"
                    }, {
                        "id": 10018166,
                        "amount": 30,
                        "unit": "",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Sweet Snacks",
                        "name": "oreo cookies",
                        "original": "30 oreo cookies",
                        "originalString": "30 oreo cookies",
                        "originalName": "oreo cookies",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/oreos.png"
                    }],
                    "usedIngredients": [{
                        "id": 1017,
                        "amount": 8,
                        "unit": "oz",
                        "unitLong": "ounces",
                        "unitShort": "oz",
                        "aisle": "Cheese",
                        "name": "cream cheese",
                        "original": "8 oz cream cheese",
                        "originalString": "8 oz cream cheese",
                        "originalName": "cream cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cream-cheese.jpg"
                    }],
                    "unusedIngredients": [{
                        "id": 18064,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Bakery/Bread",
                        "name": "bread",
                        "original": "bread",
                        "originalString": "bread",
                        "originalName": "bread",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg"
                    }, {
                        "id": 1041009,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Cheese",
                        "name": "cheese",
                        "original": "cheese",
                        "originalString": "cheese",
                        "originalName": "cheese",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
                    }, {
                        "id": 10111529,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "grape tomatoes",
                        "original": "grape tomatoes",
                        "originalString": "grape tomatoes",
                        "originalName": "grape tomatoes",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cherry-tomatoes.png"
                    }],
                    "likes": 0
                }
            ]
        }),

        mounted: function () {
            this.items = this.ingredients.items

            var msnry = new Masonry('.columns', {
                // options
                itemSelector: "[class*='col-']",
            });
            console.log('ok')
        },

        methods: {

            async Search() {

                var key = '71327757c0c2469ab70c0f1e0a5bfe0d'

                var cuisine = []
                for(let i = 0; i < this.cuisine.length; i++ ){
                    let index = this.cuisine[i]
                    cuisine.push(this.cuisineChoix[index])
                }
                if(this.cuisine.length == 0){
                    cuisine = this.cuisineChoix
                }
                cuisine.join()
                console.log("cuisine: ",cuisine)

                var diet = []
                for(let i = 0; i < this.diet.length; i++ ){
                    let index = this.diet[i]
                    diet.push(this.dietChoix[index])
                }
                if(this.diet.length == 0){
                    diet = this.dietChoix
                }
                diet.join()
                console.log("diet: ",diet)

                var intolerances = []
                for(let i = 0; i < this.intolerances.length; i++ ){
                    let index = this.intolerances[i]
                    intolerances.push(this.intolerancesChoix[index])
                }
                if(this.intolerances.length == 0){
                    intolerances = this.intolerancesChoix
                }
                intolerances.join()
                console.log("intolerances: ",intolerances)

                var type = []
                for(let i = 0; i < this.type.length; i++ ){
                    let index = this.type[i]
                    type.push(this.typeChoix[index])
                }
                if(this.type.length == 0){
                    type = this.typeChoix
                }
                type.join()
                console.log("type: ",type)
                var titleMatch = []
                
                
                // var intolerances = this.intolerances
                // var intolerances = this.intolerances
                // var intolerances = this.intolerances
                // var intolerances = this.intolerances
                // var intolerances = this.intolerances
                var recipie = []
                // &titleMatch=egg

                var axios = require('axios');

                var config = {
                    method: 'get',
                    url: `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&type=${type}&instructionsRequired=true&addRecipeInformation=true&apiKey=${key}`,
                };

                await axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data));
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
            },

            redirect(id , recipe){
                let recipeInfo = [recipe.title, recipe.image]
                
                //MAKE ARRAY TO STING
                let dataJoin = recipeInfo.join()
                //REPLACE SLASH BY *
                let data = dataJoin.replace(/\//g, '*')
              
                this.$router.push('/recipe/' + id + '/' + data )
            }

        },

        computed: {
            ...mapState([
                'user',
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