import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);


import ingredients from "./modules/ingredients"
import user from "./modules/user"
import shoplist from "./modules/shoplist"
import stock from "./modules/stock"
import recipe from "./modules/recipe"
import historique from "./modules/historique"
import favorites from "./modules/favorites"

export default new Vuex.Store({
    modules: {
        ingredients,
        user,
        shoplist,
        stock,
        recipe,
        historique,
        favorites,
    },
})