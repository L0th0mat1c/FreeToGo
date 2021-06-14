<template>

  <div>

    <NavBarComp />

    <SearchFiltreComp />

    <FooterComp />

  </div>

</template>

<script>
import NavBarComp from '@/components/NavBarComp.vue';
import SearchFiltreComp from '@/components/SearchFiltreComp.vue'
import FooterComp from '@/components/FooterComp.vue'


export default {
  name: 'Home',
  components: {
    NavBarComp,
    SearchFiltreComp,
    FooterComp,
  }
}
</script>
