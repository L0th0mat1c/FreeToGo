<template>
<v-container id='requestpassword'>
    <div v-if="!isSent && !tokenExpired">
        <div class="reqpassheader">Please indicate your email adress and a new password.</div>
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >

            <v-text-field
            v-model="email"
            :rules="emailRules"
            label="email"
            required
            ></v-text-field>

            <v-text-field
            v-model="password"
            label="New password"
            :type="'password'"
            :rules="[ v=> !!v || 'Enter your new password']"
            required
            ></v-text-field>

            <v-text-field
            v-model="passwordconf"
            :rules="[ v=> !!v || 'Enter your new password', (password === passwordconf) || 'Password must match']"
            :type="'password'"
            label="Password confirmation"
            required
            ></v-text-field>

            <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            >
            Validate
            </v-btn>
        </v-form>
    </div>
    <div v-if="tokenExpired">    
        <div class="reqpassheader">Something wrent wrong. You must ask for a new link.</div>
    </div>
    <div v-if="isSent">    
        <div class="reqpassheader">Your password have been changed. You can now go to the login page.</div>
    </div>
</v-container>

</template>

<script>
import axios from 'axios';
    export default {
        name: 'RequestPasswordComp',

        data: () => ({
            email:'',
            password: '',
            passwordconf:'',
            token:'',
            isSent:false,
            tokenExpired:false,
            valid: false,
            emailRules:[
                v=>!!v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'You must enter a valid email adress'
            ]          
        }),
        async created() {
          this.token = this.$route.params.token
          console.log(this.token)
        },
        methods: {
            validate () {
              //console.log(this.token)
                const vm = this
                if(this.$refs.form.validate()){

                    axios.post(this.URL_BACK+'auth/resetPassword', {
                    'email' : this.email,
                    'newpassword' : this.password,
                    'token' : this.token
                    })
                    .then(function (resp) {
                        if (resp.status === 200) {
                        //console.log('response', resp.status)
                          vm.isSent=true;
                        }
                    })
                    .catch(error=> {
                        if (error.response.status === 401) {
                          console.log('ok')
                          vm.tokenExpired=true;
                        }
                        // console.log(error)
                    }) 
                }
            },
        }
    }
</script>
<style>
#requestpassword{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
.reqpassheader{
    margin-top: 30px;
}

</style>