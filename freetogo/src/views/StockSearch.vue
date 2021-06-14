<template>

  <div>

    <NavBarComp />

    <StockSearchComp :stock="stock" />

    <FooterComp />

  </div>

</template>

<script>
import NavBarComp from '@/components/NavBarComp.vue';
import StockSearchComp from '@/components/StockSearchComp.vue';
import FooterComp from '@/components/FooterComp.vue';


export default {
  name: 'StockSearch',
  components: {
    NavBarComp,
    StockSearchComp,
    FooterComp,
  },

  data() {

    return {
       stock: this.$route.params.stock,
    }

  }

  
}
</script>