<template>
    <div class="can">
        <h2 class="section-title">You can...</h2>
        <div class="can-container">
            <div class="manage">
                <img src="../../assets/manage.svg" alt="">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id massa neque urna ac congue fermentum nullam a.</p>
            </div>
            <div class="search">
                <img src="../../assets/search.svg" alt="">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id massa neque urna ac congue fermentum nullam a.</p>
            </div>
            <div class="favorites">
                <img src="../../assets/favorites.svg" alt="">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id massa neque urna ac congue fermentum nullam a.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Can'
}
</script>

<style scoped>

.can {
    text-align: center;
    width: 60%;
    margin: 5rem auto;
}

.section-title {
    font-size: 48px;
    padding-bottom: 1.5rem;
}

.can-container {
    display: flex;
    justify-content: space-around;
}

.can-container p {
    max-width: 200px;
}

@media (max-width: 1000px) {
    .can-container {
        flex-direction: column;
    }
    .can-container p {
        max-width: 400px;
        margin: 1rem auto;
    }
}

</style>