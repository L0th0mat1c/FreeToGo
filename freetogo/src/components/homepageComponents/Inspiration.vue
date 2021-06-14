<template>

          <div class="inspiration">
            <h2 class="section-title">Get Some Inspiration</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada integer accumsan, ultrices faucibus hac morbi quam etiam. </p>
            <div class="random-container">
              
                <Frame/>
                <Frame/>
                <Frame/>
   
            </div>
        </div>

</template>

<script>

import Frame from './Frame'

export default {
    name: 'Inspiration',
    components: {
        Frame
    }
}
</script>

<style>

.section-title {
    font-size: 48px;
    padding-bottom: 1.5rem;
}

.inspiration {
    text-align: center;
    width: 60%;
    margin: 5rem auto;
}

.inspiration p {
    max-width: 600px;
    margin: 0 auto;
}

.random-container {
    padding-top: 3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

@media (max-width: 1000px) {
    .random-container {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}

</style>