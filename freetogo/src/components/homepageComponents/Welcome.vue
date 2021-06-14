<template>
    <div class="hero">
        <div class="welcome">
            <img src="../../assets/freeToGo-horizontal.svg" alt="" class="logo-horizontal">
            <h1>Find the perfect recipe!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada integer accumsan, ultrices faucibus hac morbi quam etiam. </p>
            <img src="../../assets/appstore.svg" alt="" class="dl-app">
            <img src="../../assets/googleplay.svg" alt="" class="dl-app">
        </div>
            <div class="homepic-container">
                <img src="../../assets/homepic.jpg" alt="" class="homepic">
            </div>
    </div>

</template>

<script>
export default {
    name: 'Welcome'

}
</script>

<style>

h1 {
    font-size: 48px;
}

.hero {
    height: 90vh;
}

.welcome {
    width: 600px;
    position: absolute;
    top: 50vh;
    left: 20%;

}
.homepic-container {
    text-align: center;
}

.logo-horizontal {
    width: 230px;
}

@media (max-width: 1000px) {
    .logo-horizontal {
        margin: 0 auto;
    }

    h1 {
        font-size: 24px;
    }
    .welcome {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        top: 20vh;
        left: 0;
        margin-bottom: 3rem;
    }
    .homepic {
        display: none;
    }
    .dl-app {
        align-self: center;
        width: 200px;
    }

}

</style>