<template>
<v-container id='requestpassword'>
    <div v-if="isSent==false">
        <div class="reqpassheader">Please indicate your email adress, a link to change your password will be sent.</div>
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
            <v-text-field
            v-model="email"
            :rules="inputRules"
            label="email"
            required
            ></v-text-field>
            <!-- {{errors}} -->
                <div v-if="wrongMail==true">    
                    <div class="reqpassheader">Sorry, we can't find this email adress in our database.</div>
                </div>
            <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            >
            Send
            </v-btn>
        </v-form>
    </div>
    <div v-if="isSent">    
        <div class="reqpassheader">The email has been sent. You can now go check on your inbox.</div>
    </div>

</v-container>

</template>

<script>
import axios from 'axios';
    export default {
        name: 'RequestPasswordComp',

        data: () => ({
            email: '',
            isSent:false,
            wrongMail:false,
            errors: '',
            valid: true,
            inputRules:[
                v=> !!v || 'You must enter a valid email adress', v=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'You must enter a valid email adress'
            ]
        }),
        methods: {
            validate () {
                const vm = this
                if(this.$refs.form.validate()){
                    axios.post(this.URL_BACK+'auth/forgotPassword', {
                    'email' : this.email,
                    })
                    .then(function (response) {
                        console.log('response', response)
                        vm.isSent=true;
                    })
                    .catch(error=> {
                        if(error.response.status == 404){
                        //console.log('ok')
                            vm.wrongMail = true;
                            // this.errors = "Wrong email";
                        }
                    }) 
                }
            },
        }
    }
</script>
<style scoped>

#requestpassword{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
.reqpassheader{
    margin-top: 30px;
    /* text-align: center; */
}

/* INPUT CUSTOM */

.v-input {
    width: 600px;
    margin: 2rem auto;
    padding: 0.5rem 2rem;
    background: #DDE1E9;
    box-shadow: inset -2px 2px 4px rgba(202, 205, 209, 0.2), inset 2px -2px 4px rgba(202, 205, 209, 0.2), inset -2px -2px 4px rgba(255, 255, 255, 0.9), inset 2px 2px 5px rgba(202, 205, 209, 0.9);
    border-radius: 9999px;
    
}

/* BUTTON CUSTOM */

.v-application .success {
    width: 150px;
    border-radius: 9999px;
    box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.2), 4px -4px 8px rgba(255, 255, 255, 0.9), -4px -4px 8px #FFFFFF, 4px 4px 10px #5E6164, inset 6px 11px 10px rgba(255, 255, 255, 0.15), inset 1px 1px 2px rgba(226, 226, 226, 0.6), inset -1px -1px 2px rgba(28, 28, 28, 0.5);   
}

.v-btn:not(.v-btn--round).v-size--default {
    width: 150px;
    border-radius: 9999px;
    box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.2), 
    4px -4px 8px rgba(255, 255, 255, 0.9), 
    -4px -4px 8px #FFFFFF, 4px 4px 10px #5E6164,
    inset 6px 11px 10px rgba(255, 255, 255, 0.15),
    inset 1px 1px 2px rgba(226, 226, 226, 0.6), 
    inset -1px -1px 2px rgba(28, 28, 28, 0.5);
}

</style>