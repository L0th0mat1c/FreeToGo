<template>

  <div>

    <NavBarComp />

    <PasswordResetComp />

    <FooterComp />

  </div>

</template>

<script>
import NavBarComp from '@/components/NavBarComp.vue';
import PasswordResetComp from '@/components/PasswordResetComp.vue';
import FooterComp from '@/components/FooterComp.vue';


export default {
  name: 'passwordReset',
  components: {
    NavBarComp,
    PasswordResetComp,
    FooterComp,
  }
}
</script>