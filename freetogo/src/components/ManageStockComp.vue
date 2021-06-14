<template>

    <v-container>

        <div v-if="stock.stock == ''">
            <v-alert
            border="top"
            color="red lighten-2"
            dark
            >
            Your stock is empty! :( Checkout our shoplist :
            <v-btn @click="$router.push('/QuickSearch')" icon >
            
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            </v-alert>
        </div>
        <div v-else>
        <v-btn @click="modify = !modify">Modify</v-btn>

        <v-btn @click="StockSearch()">Stock Search</v-btn>

        <div v-for="aisle in filterStock" :key="aisle.asile">
            <strong> {{aisle.aisle}} </strong>
            <div v-for="item in aisle.ingredients" :key="item">
                {{item}}
                <v-btn v-if="modify" @click="removeItem(item)">X</v-btn>
            </div>
        </div>
        </div>

    </v-container>

</template>



<script>

    import { mapState } from 'vuex'
    export default {
        name: 'ManageStockComp',

        data: () => ({
            filterStock: [],
            modify: false,
            
        }),

        created() {
            this.getItemByAsil()

        },

        computed: {
            ...mapState([
                'user',
                'stock',
            ]),
            
        },

        methods:{

            getItemByAsil(){
                let item = this.stock.stock
                let turnItem = item.length
                this.filterStock = []

                for(let i = 0; i < turnItem; i++){

                    let filterStock = this.filterStock
                    let stock = item[i]
                    let turnFilter = filterStock.length
                    let found = 'false'

                    for(let i = 0; i < turnFilter; i++){
                        if(filterStock[i].aisle === stock.aisle){
                            found = i 
                        }
                    }

                    if(found == 'false'){
                       let content = {
                           aisle: stock.aisle,
                           ingredients:[
                               stock.name
                           ]
                       }
                       this.filterStock.push(content)
                    }else{
                        this.filterStock[found].ingredients.push(stock.name)
                    }

                    
                }
            },

            removeItem(name){
                
               this.$store.commit('stock/REMOVE_TO_STOCK', name) 

               this.getItemByAsil()
            },

            StockSearch(){

                let item = this.stock.stock
                let search = []

                for(let i = 0; i < item.length; i++){
                   search.push(item[i].name)
                }
                this.$router.push('/StockSearch/' + search);
            }

        }

        

    }
</script>