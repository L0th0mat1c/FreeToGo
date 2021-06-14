<template>

	<div>

		<NavBarComp />

		<v-container class="manage-box">
				<v-container>
					<br>
					<v-row justify="space-around">

							<v-btn @click="show = 'Favorites'">Favorites</v-btn>

							<v-btn @click="show = 'Parameters'">Parameters</v-btn>

							<v-btn @click="show = 'Historique'">Historique</v-btn>

					</v-row>
				</v-container>
			

			<div v-if="show === 'Favorites'">
				<ProfilFavoritesComp />
			</div>

			<div v-if="show === 'Parameters'">
				<ProfilParameterComp />
			</div>

			<div v-if="show === 'Historique'">
				<ProfilHistoriqueComp />
			</div>
		</v-container>

		<FooterComp />

	</div>

</template>

<script>
	import NavBarComp from '@/components/NavBarComp.vue';
	import ProfilFavoritesComp from '@/components/ProfilFavoritesComp.vue'
	import ProfilParameterComp from '@/components/ProfilParameterComp.vue'
	import ProfilHistoriqueComp from '@/components/ProfilHistoriqueComp.vue'
	import FooterComp from '@/components/FooterComp.vue'
	import axios from 'axios';
	import { mapState } from 'vuex';


	export default {
		name: 'Profil',
		components: {
			NavBarComp,
			ProfilFavoritesComp,
			ProfilParameterComp,
			ProfilHistoriqueComp,
			FooterComp,
		},
		data: () => ({
			show: 'shoplist',
			userLog: '',
			errors: '',
		}),
		computed: {
            ...mapState(['user', 'access_token'])
    },
		async mounted() {
			await this.getUser()
			
		}, 
		methods: {
			async getUser() {

				

				// let vm = this;
				await axios.get(this.URL_BACK+'auth/Profile', {

					headers: {
					"Authorization": "Bearer "+ this.user.access_token
					}
				})
				.then((response) => {
					if (response.data) { 
				// vm.$store.commit('user/ADD_ACCESS_TOKEN', response.data.access_token)
            //vm.$store.commit('user/ADD_USER', response.data.user)
            // vm.$store.commit("user/UPDATE_STORAGE")
						this.userLog = response.data
					}
					else{
						this.$router.push({ name: 'Login' });
					}
				})
				.catch((error) => {
					this.errors = error;
					if (!this.user.user._id) {
						this.$router.push({ name: 'Login' });
					}
				})
			}
		}
	}
</script>


<style scoped>

.v-btn {
  margin-bottom: 2rem;
  border-radius: 9999px;
  background-color: linear-gradient(135deg, rgba(241, 244, 246, 0.5) 0%, rgba(233, 236, 239, 0.5) 100%);
  box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.2), 
              4px -4px 8px rgba(255, 255, 255, 0.9), 
              -4px -4px 8px #FFFFFF, 4px 4px 10px #5E6164, 
              inset 6px 11px 10px rgba(255, 255, 255, 0.15), 
              inset 1px 1px 2px rgba(226, 226, 226, 0.6), 
              inset -1px -1px 2px rgba(28, 28, 28, 0.5);   
}

</style>