<template>

    <v-container class="parameters-box">

      <div class="button-box">
        <v-btn @click="CleanStorage()" class="edit-btn">Clean</v-btn>

        <v-btn @click="UpdateStorage()" class="edit-btn">Update</v-btn>

        <v-btn @click="ShowStorage()" class="edit-btn">Show</v-btn>
      </div>

        <v-card
    max-width="600"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/lists/ali.png"
      height="300px"
      dark
    >
      <v-row class="fill-height">
        <v-card-title>

         <div class="display-1 pl-1">
           Your last recipie
          </div>
        </v-card-title>

        <v-spacer></v-spacer>

        <v-card-title class="white--text pl-12 pt-12">
          <div class="display-1 pl-12 pt-12">
           <!-- {{user.user.username}} -->
          
          </div>
          
            <v-row justify="center" >
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            
            dark
            v-bind="attrs"
            v-on="on"
            icon
            class="mr-4"
            @click="show=true"
        >
         <v-icon color="indigo">mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card v-if="!user.user.facebook_id">
        <v-card-title>
          <span class="headline">{{user.user.username}}'s Profile</span>
        </v-card-title>
       
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                v-model="username"
                    label="Username*"
                    :placeholder="`${user.user.username}`"
                    required
                ></v-text-field>
              </v-col>
               <v-alert v-if="errors.all"
                border="top"
                color="red lighten-2"
                dark
                >
                {{errors.all}}
                </v-alert>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
               
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="email"
                    label="Email*"
                    :placeholder="`${user.user.email}`"
                    required
                ></v-text-field>
              </v-col>
                <v-alert v-if="errors.all"
                border="top"
                color="red lighten-2"
                dark
                >
                {{errors.all}}
                </v-alert>
              <v-col cols="12">
                <v-text-field
                    v-model="password"
                    label="Password*"
                    type="password"
                    required
                ></v-text-field>
                 <v-alert v-if="errors.password"
                    border="top"
                    color="red lighten-2"
                    dark
                    >
                    {{errors.password}}
                    </v-alert>
                <v-text-field
                    v-model="passwordConfirm"
                    label="Confirm your Password*"
                    type="password"
                    required
                ></v-text-field>
                 <v-alert v-if="errors.password"
                    border="top"
                    color="red lighten-2"
                    dark
                    >
                    {{errors.password}}
                    </v-alert>
              </v-col>
              
             
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
                Close
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="putUser()"
            >
                Save
            </v-btn>
            
        </v-card-actions>
      </v-card>
       <v-card v-else>
        <v-card-title>
          <span class="headline">{{user.user.username}}'s Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                You have sign in with Facebook, please change your facebook's profile for change here
              </v-col>
            </v-row>
          </v-container>
          
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Ok
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
        
          
        </v-card-title>
      </v-row>
    </v-img>

    <v-list two-line>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            Username : 
          </v-icon>
          
        </v-list-item-icon>
         
        

        <v-list-item-content>
          <v-list-item-title>{{user.user.username}}</v-list-item-title>
          <v-list-item-subtitle v-if="user.user.facebook_id">Identified by Facebook</v-list-item-subtitle>
          <v-list-item-subtitle v-else>Identified in FreeToGo</v-list-item-subtitle>
        </v-list-item-content>

        <!-- <v-list-item-icon>
          <v-icon>mdi-message-text</v-icon>
        </v-list-item-icon> -->
      </v-list-item>


      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-email
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ user.user.email }}</v-list-item-title>
          <!-- <v-list-item-subtitle>Personal</v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
           Your stock :
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Number of ingredients </v-list-item-title>
          <v-list-item-subtitle>{{user.user.stock.length}}</v-list-item-subtitle>
     
        
   
          
        </v-list-item-content>
      </v-list-item>
      <v-divider inset></v-divider>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
           Numbers of favorites :
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
   
          <v-list-item-title>{{user.user.wish_list.length}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
       <v-divider inset></v-divider>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
           Shoplist :
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
   
          <v-list-item-title>{{user.user.shopping_list.length}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
 

    </v-container>

</template>

<script>
// import axios from 'axios';
import { mapState } from 'vuex';
import axios from 'axios';
    export default {
        name: 'ProfilParameterComp',

        data: () => ({
            show: false,
            dialog: '',
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            errors: {
                username: '',
                email: '',
                password: '',
                all: ''
            }
        }),
        computed: {
            ...mapState(['user', 'access_token'])
    },
        async mounted() {

        },
        methods: {
            async putUser() {
                if(this.username != '' && this.email != '' && this.password != '') {
                     if(this.password === this.passwordConfirm) {
                        await axios.put(this.URL_BACK+'auth/updateUser?userID='+ this.user.user._id, {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    }).then((response) => {
                        console.log('response', response)
                        this.dialog = false;
                    })
                }else{
                    this.errors.password = "Yours passwords is not the same, please retry !"
                    
                }
                }else{
                    this.errors.all = "You have to sastify all cases"
                }
               
                
            },

            CleanStorage(){
              this.$store.commit('user/CLEAN_STORAGE')
            },

            UpdateStorage(){
              this.$store.commit('user/UPDATE_STORAGE')
            },

            ShowStorage(){
              // this.$store.user.user
              console.log('this.$store.user.user:', this.user.user)
            }
        }
    }
</script>


<style scoped>

.parameters-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}



.parameters-box  .edit-btn {
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