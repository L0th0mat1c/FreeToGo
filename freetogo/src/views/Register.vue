<template>

  <div>


    <NavBarComp />
    <v-container>
      <div class="logs-box">
        <div class="img-container">
          <img src="../assets/signup.jpg" alt="signup illustration" class="img-sign">
        </div>

      <div class="forms">  
        <RegisterComp />

        <LoginComp />
        </div>  
      </div>

    </v-container>
  </div>

</template>

<script>

import NavBarComp from '@/components/NavBarComp.vue';
import LoginComp from '@/components/LoginComp.vue';
import RegisterComp from '@/components/RegisterComp.vue';

export default {
  name: 'Register',
  components: {
    NavBarComp,
    RegisterComp,
    LoginComp

  }
}
</script>

<style scoped>

.forms {
  margin-top: 100px;
  margin-right: 5rem;
  display: flex;
  justify-content: space-between;
}

.logs-box {
  width: 1200px;
  display: flex;
  background: #EEF1F4;
  justify-content: space-between;
  margin: 0 auto;
  box-shadow: -5px 5px 10px rgba(214, 217, 220, 0.2),
              5px -5px 10px rgba(214, 217, 220, 0.2), 
              -5px -5px 10px rgba(255, 255, 255, 0.9), 
              5px 5px 13px rgba(214, 217, 220, 0.9), 
              inset 1px 1px 2px rgba(255, 255, 255, 0.3), 
              inset -1px -1px 2px rgba(214, 217, 220, 0.5);
  border-radius: 25px;
}

.img-sign {
  object-fit: cover;
  object-position: 10% 90%;
  border-radius: 25px 0px 0px 25px;
  width: 340px;
  height: 700px;
}

</style>