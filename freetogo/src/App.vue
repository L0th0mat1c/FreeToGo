<template>

    <!-- <div id="app">
        <router-view/>
    </div> -->

    <v-app>

        <v-main class="body">

            <router-view/>
            
        </v-main>

    </v-app>
    
</template>

<script>

    export default {
        name: 'App',

        components: {

        },

        data: () => ({
            //
        }),
    };
</script>

<style>

.body {
    background-color: #EEF1F6;
    color: #5E6775;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Fredoka One', cursive;
    color: #474E57;
}

span, p, a, button {
    font-family: 'Open Sans', sans-serif;
}

a {
    text-decoration: none;
    color: #FD9256;
}

</style>