<template>
<v-container>


  <h3 >Sign In</h3>
   <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field class="first-input"
      v-model="username"
      :counter="20"
      :rules="usernameRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      type="password"
      required
    ></v-text-field>
      <button class="ml-7 mb-7 text--disabled" 
        @click="$router.push('/requestPasswordReset')"
      >
        Forgot your password?
      </button>
    
    <div class="buttons">
      <v-btn
        :disabled="!valid"
        color="orange lighten-1"
        class="mr-4 white--text" 
        @click="validate()"
      >
        Sign me in!
      </v-btn>

      <div>
        <a href="https://freetogoback.herokuapp.com/auth/facebook/"><v-btn
          rounded
          color="primary"
          plain
          
          
        >
          Sign in with Facebook
        </v-btn></a>
      </div>
    </div>

    <!-- <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn> -->

  </v-form>
</v-container>

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios';
    export default {
        name: 'LoginComp',

        data: () => ({
            username: '',
            password: '',
            errors: '',
            passwordRules: [
              v => !!v || 'Password is required',
              v => (v && v.length >= 6) || 'Password must be less than 6 characters',
            ],
            valid: true,
            usernameRules: [
              v => !!v || 'Name is required',
              v => (v && v.length >= 6) || 'Name must be less than 6 characters',
            ],
        }),
        computed: {
            ...mapState(['user', 'access_token']),           
            
        },
        methods: {
            async validate() {
                const vm = this
                await axios.post(this.URL_BACK+'auth/login/', {
                    'username' : this.username,
                    'password' : this.password
                })
                .then(function (response) {
                  vm.$store.commit('user/ADD_ACCESS_TOKEN', response.data.access_token)
                  vm.$store.commit('user/ADD_USER', response.data.user)
                  vm.$store.commit("user/UPDATE_STORAGE")
                  window.location = vm.URL_FRONT+'#/Profil/'+response.data.user._id

                })
                .catch(error => {
                  console.log('error', error)
                  //   if (error.response.status == 400){
                  //   this.errors = error.response.data.message
                  // }
                  // if (error.response.status == 500) {
                  //   this.passwordRules = error.response.data.message
                  // }
                }) 

                
            },
            async loginFacebook() {
              const vm = this
                await axios.get(this.URL_BACK+'auth/facebook/redirect')
                .then(function (response) {
                  vm.$store.commit('ADD_ACCESS_TOKEN', response.data)
                  window.location = vm.URL_FRONT+'#/'
                })
                .catch(error=> {
                    console.log(error)
            
                }) 
            }
        }
    }
</script>

<style  scoped>

/* BUTTON CUSTOM */

.first-input {
  margin: 2rem 0;
}

.buttons {
  width: 300px;
  text-align: center;
}

.v-btn {
  margin-bottom: 2rem;
  border-radius: 9999px;
  box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.2), 
              4px -4px 8px rgba(255, 255, 255, 0.9), 
              -4px -4px 8px #FFFFFF, 4px 4px 10px #5E6164, 
              inset 6px 11px 10px rgba(255, 255, 255, 0.15), 
              inset 1px 1px 2px rgba(226, 226, 226, 0.6), 
              inset -1px -1px 2px rgba(28, 28, 28, 0.5);   
}

/* INPUT CUSTOM */

.v-input {
  width: 300px;
  padding: 0.5rem 2rem;
  background: #DDE1E9;
  box-shadow: inset -2px 2px 4px rgba(202, 205, 209, 0.2), 
              inset 2px -2px 4px rgba(202, 205, 209, 0.2), 
              inset -2px -2px 4px rgba(255, 255, 255, 0.9), 
              inset 2px 2px 5px rgba(202, 205, 209, 0.9);
  border-radius: 9999px;
}



</style>