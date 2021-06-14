<template>
<v-container>

  <h3 >Register</h3>
   <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="username"
      :counter="20"
      :rules="usernameRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      type="text"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      type="password"
      required
    ></v-text-field>
    <div v-if="errors">
   <v-alert
      border="top"
      color="red lighten-2"
      dark
    >
      {{errors}}
    </v-alert>
  </div>

  <div class="buttons">
    <v-btn
      :disabled="!valid"
      
      class="mr-4 white--text"
      @click="validate()"
    >
      Register Now
    </v-btn>

    <div>
      <a href="https://freetogoback.herokuapp.com/auth/facebook/"><v-btn
        rounded
        color="primary"
        plain
        
      >
        Sign up with Facebook
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
        name: 'RegisterComp',

        data: () => ({
            username: '',
            password: '',
            email:'',
            errors: '',
            valid: true,
            usernameRules: [
              v => !!v || 'Username is required',
              v => (v && v.length >= 6) || 'username must be less than 6 characters',
            ],
            emailRules: [
              v => !!v || 'E-mail is required',
              v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
              v => !!v || 'password is required',
              v => (v && v.length >= 6) || 'Password must be less than 6 characters',
            ],
        }),
        computed: {
            ...mapState(['user', 'access_token']),           
        },
        methods: {
            async validate() {
                await axios.post('https://freetogoback.herokuapp.com/auth/register', {
                    'username' : this.username,
                    'password' : this.password,
                    'email': this.email
                })
                .then((response) => {
                  console.log('response', response.message)
                  window.location = this.URL_FRONT+'this.URL_BACK#/Login'
                })
                .catch(error=> {
                  if (error.response.status == 400){
                    this.errors = 'all is required'
                  }
                  if (error.response.status == 500) {
                    this.errors = error.response.data.message
                  }
                })
                
            },
            async loginFacebook() {
              const vm = this
                await axios.get('https://freetogoback.herokuapp.com/auth/facebook/redirect')
                .then(function (response) {
                  vm.$store.commit('ADD_ACCESS_TOKEN', response)
                  window.location = this.URL_FRONT+'#/'
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

.buttons {
  width: 300px;
  text-align: center;
}

.v-btn {
  margin-bottom: 2rem;
  border-radius: 9999px;
background: rgb(253,146,86);
background: linear-gradient(90deg, rgba(253,146,86,1) 0%, rgba(255,55,0,1) 100%);
  box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.2), 
              4px -4px 8px rgba(255, 255, 255, 0.9), 
              -4px -4px 8px #FFFFFF, 
              4px 4px 10px #5E6164, 
              inset 6px 11px 10px rgba(255, 255, 255, 0.15), 
              inset 1px 1px 2px rgba(226, 226, 226, 0.6), 
              inset -1px -1px 2px rgba(28, 28, 28, 0.5);   
}

/* INPUT CUSTOM */

.v-input {
    width: 300px;
    padding: 0.5rem 2rem;
    margin: 2rem 0;
    background: #DDE1E9;
    box-shadow: inset -2px 2px 4px rgba(202, 205, 209, 0.2), 
                inset 2px -2px 4px rgba(202, 205, 209, 0.2), 
                inset -2px -2px 4px rgba(255, 255, 255, 0.9), 
                inset 2px 2px 5px rgba(202, 205, 209, 0.9);
    border-radius: 9999px;
    
}



</style>