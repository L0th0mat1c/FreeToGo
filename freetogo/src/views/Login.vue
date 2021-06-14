<template>

  <div>

    <NavBarComp />

    <LoginComp />

    <FooterComp />

  </div>

</template>

<script>
import NavBarComp from '@/components/NavBarComp.vue';
import LoginComp from '@/components/LoginComp.vue';
import FooterComp from '@/components/FooterComp.vue';


export default {
  name: 'Login',
  components: {
    NavBarComp,
    LoginComp,
    FooterComp,
  }
}
</script>