<template>

	<div>

		<NavBarComp />


		<v-container class="manage-box">
			<v-container>
				<br>	
				<v-row justify="space-around">
					
					<span @click="show = 'shoplist'">ShopList </span><v-btn
        class="ma-2"
        color="primary"
        dark
      >
        {{this.user.user.shopping_list.length}}
        
      </v-btn>
			
					<span @click="show = 'recipie'" outlined color="#5E6775">Recipies</span>
					<v-btn
        class="ma-2"
        color="primary"
        dark
      >
        {{this.recipe.recipe.length}}
        
      </v-btn>

					<span @click="show = 'stock'" outlined color="#5E6775">Stock</span>
					<v-btn
        class="ma-2"
        color="primary"
        dark
      >
        {{this.stock.stock.length}}
     
      </v-btn>

				</v-row>
				<br>
				<br>
			</v-container>

			<div v-if="show === 'shoplist'">
				<ManageShoplistComp />
			</div>

			<div v-if="show === 'stock'">
				<ManageStockComp />
			</div>

			<div v-if="show === 'recipie'">
				<ManageRecipieComp />
			</div>
		</v-container>

		<FooterComp />

	</div>

</template>

<script>
	import NavBarComp from '@/components/NavBarComp.vue';
	import ManageShoplistComp from '@/components/ManageShoplistComp.vue'
	import ManageStockComp from '@/components/ManageStockComp.vue'
	import ManageRecipieComp from '@/components/ManageRecipieComp.vue'
	import FooterComp from '@/components/FooterComp.vue';
	import axios from 'axios';
	import { mapState } from 'vuex';


	export default {
		name: 'Manage',
		components: {
			NavBarComp,
			ManageShoplistComp,
			ManageStockComp,
			ManageRecipieComp,
			FooterComp,
		},
		data: () => ({
			show: 'shoplist'
		}),
		computed: {
            ...mapState(['user', 'access_token', 'recipe', 'stock'])
    },
		async mounted() { 
			await this.getUser()
			
		}, 
		methods: {
			async getUser() {
				await axios.get(this.URL_BACK+'auth/Profile', {
					headers: {
					"Authorization": "Bearer "+ this.user.access_token
					}
				})
				.then((response) => {
					if (response.data) {
						this.userLog = response.data
					}
					else{
						this.$router.push({ name: 'Login' });
					}
				})
				.catch((error) => {
					this.errors = error;
					console.log('errors', this.errors)
					if (!this.user.user._id) {
						this.$router.push({ name: 'Login' });
					}
						
					
				})
			}
		}
	}
</script>

<style scoped>

.manage-box {
	background: #EEF1F4;
	box-shadow: -2px 2px 4px rgba(202, 205, 207, 0.2), 2px -2px 4px rgba(202, 205, 207, 0.2), -2px -2px 4px rgba(255, 255, 255, 1), 2px 2px 5px rgba(202, 205, 207, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(202, 205, 207, 0.5);
	border-radius: 25px;
}

span {
	cursor: pointer;
	text-transform: uppercase;
	font-weight: 600;
	line-height: 33px;
	text-decoration: underline;
}

span:hover {
	color: #FD9256;
}

</style>