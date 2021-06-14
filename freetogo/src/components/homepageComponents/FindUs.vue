<template>
    <div class="find">
        <h2 class="section-title">Find us</h2>
        <div class="social-container">
            <button class="icon-circle">
                <img src="../../assets/facebook.svg" alt="facebook logo">
            </button>
            <button class="icon-circle">
                <img src="../../assets/instagram.svg" alt="facebook logo">
            </button>
            <button class="icon-circle">
                <img src="../../assets/youtube.svg" alt="facebook logo">
            </button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.find {
    text-align: center;
    width: 60%;
    margin: 7rem auto;
}

.section-title {
    font-size: 48px;
    padding-bottom: 1.5rem;
}


.social-container {
    padding-top: 3rem;
    display: flex;
    justify-content: space-around;
}

.icon-circle {
    padding: 1rem;
    border-radius: 9999px;
    display: flex;
    justify-content: center;
    background: #EEF1F4;
    box-shadow: -5px 5px 10px rgba(202, 205, 207, 0.5), 
                5px -5px 10px rgba(202, 205, 207, 0.2), 
                -5px -5px 10px rgba(255, 255, 255, 0.9), 
                5px 5px 13px rgba(202, 205, 207, 0.9), 
                inset 1px 1px 2px rgba(255, 255, 255, 0.3), 
                inset -1px -1px 2px rgba(202, 205, 207, 0.5);
}

</style>