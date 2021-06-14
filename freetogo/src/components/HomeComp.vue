<template>
<v-container>
    <div class="homepage">

        <Welcome/>

        <Can/>

        <Inspiration/>

        <FindUs/>

    </div>
</v-container>
</template>

<script>
import { mapState } from 'vuex'

import Welcome from './homepageComponents/Welcome'
import Can from './homepageComponents/Can'
import Inspiration from './homepageComponents/Inspiration'
import FindUs from './homepageComponents/FindUs'

    export default {
        name: 'HomeComp',
        components: {
            Welcome,
            Can,
            Inspiration,
            FindUs
        },

        data: () => ({
            
        }),
        
 computed: {
            ...mapState(['user', 'access_token']),           
    },
        mounted() {
            console.log('acces_token', this.user.access_token)
        }
    }
</script>

<style scoped>


</style>