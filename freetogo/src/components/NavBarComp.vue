<template>

<nav id="top">

    <div class="navbar-left">
        <router-link to="/#"><img src="../assets/freeToGo-square.svg" alt="logo freetogo" class="navbar-brand"></router-link>
    </div>
    
    <div class="navbar-right">
        <div v-if="!user.access_token">
            <router-link to="/Register">Login/Register</router-link>
            <!-- <router-link to="/foo">Register</router-link> -->
        </div>
    </div>

    <div v-if="user.access_token">


        <v-btn
            href="#/Manage"
            text
        >
            <span class="mr-2">Manage</span>
        </v-btn>
        

        <v-btn
            :href="'#/Profil/'+user.user._id"
            text
        >
            <span class="mr-2">{{user.user.username}}</span>
        </v-btn>

        <v-btn 
            @click="logout()"
            text
        >
            <span class="mr-2">Logout</span>
        </v-btn>
    </div>

</nav>



    <!-- <v-app-bar
        app

        >
        <div class="d-flex align-center">
           FreeToGo
        </div>

        <v-spacer></v-spacer>

         <v-btn
            href="#/"
            text
        >
            <span class="mr-2">Home</span>
        </v-btn>

        <v-btn
            href="#/QuickSearch"
            text
        >
            <span class="mr-2">Search</span>
        </v-btn>

    <div v-if="!user.access_token">

        <v-btn
            href="#/Login"
            text
        >
            <span class="mr-2">Sign in</span>
        </v-btn>

        <v-btn
            href="#/Register"
            text
        >
            <span class="mr-2">Sign up</span>
        </v-btn>
    </div>

    <div v-if="user.access_token">
         <v-btn
            href="#/Manage"
            text
        >
            <span class="mr-2">Manage</span>
        </v-btn>

        <v-btn
            :href="'#/Profil/'+user.user._id"
            text
        >
            <span class="mr-2">{{user.user.username}}</span>
        </v-btn>

        <v-btn 
            @click="logout()"
            text
        >
            <span class="mr-2">Logout</span>
        </v-btn>
    </div>
      
    </v-app-bar>
    
     -->
</template>


<script>
import { mapState } from 'vuex'

  export default {
    name: 'NavBarComp',
    component: {

    },
    computed: {
            ...mapState(['user', 'access_token']),           
    },
    data: () => ({
       
    }),
    methods: {
        logout() {
            const vm = this;
            vm.$store.commit('user/REMOVE_ACCESS_TOKEN')
            this.$router.push({ name: 'Home' })
        },
       
    }
  }
</script>

<style scoped>

nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    
}

.navbar-brand {
    width: 80px;
}

.navbar-left {
    display: flex;

}

.navbar-right {
    display: flex;

}

button {
    padding-left: 2rem;
    font-family: 'Fredoka One', cursive;
    color: #FD9256;
}

.v-application a {
    padding-left: 2rem;
    font-family: 'Fredoka One', cursive;
    color: #FD9256;
}

</style>
