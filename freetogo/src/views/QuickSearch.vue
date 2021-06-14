<template>

  <div>

    <NavBarComp />

    <SearchComp />

    <FooterComp />

  </div>

</template>

<script>
import NavBarComp from '@/components/NavBarComp.vue';
import SearchComp from '@/components/SearchComp.vue'
import FooterComp from '@/components/FooterComp.vue'


export default {
  name: 'QuickSearch',
  components: {
    NavBarComp,
    SearchComp,
    FooterComp,
  }
}
</script>
