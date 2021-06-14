<template>

  <div>

    <NavBarComp />

    <RequestPasswordComp />

    <FooterComp />

  </div>

</template>

<script>
import NavBarComp from '@/components/NavBarComp.vue';
import RequestPasswordComp from '@/components/RequestPasswordComp.vue';
import FooterComp from '@/components/FooterComp.vue';


export default {
  name: 'requestPasswordReset',
  components: {
    NavBarComp,
    RequestPasswordComp,
    FooterComp,
  }
}
</script>