<template>

  <div>
    <NavBarComp />
    <span>Loading</span>
  </div>

</template>

<script>
import NavBarComp from '@/components/NavBarComp.vue';
import { mapState } from 'vuex';
import axios from 'axios';


export default {
  name: 'Token',
  components: {
    NavBarComp,
  },
  computed: {
    ...mapState(['user', 'access_token']),           
  },
  async created() {
    await this.$store.commit('user/ADD_ACCESS_TOKEN', this.$route.params.token);
    await axios.get(this.URL_BACK+'auth/Profile', {
					headers: {
					"Authorization": "Bearer "+ this.$route.params.token
					}
				}).then((response) => {
          this.$store.commit('user/ADD_USER', response.data)
        })
    this.$router.push({ name: 'Profil', params: { userId: this.user.user._id } })
  }
}
</script>