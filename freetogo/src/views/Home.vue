<template>

  <div>

    <NavBarComp />

    <HomeComp />

    <FooterComp />

  </div>

</template>

<script>
import NavBarComp from '@/components/NavBarComp.vue';
import HomeComp from '@/components/HomeComp.vue'
import FooterComp from '@/components/FooterComp.vue'


export default {
  name: 'Home',
  components: {
    NavBarComp,
    HomeComp,
    FooterComp,
  }
}
</script>
