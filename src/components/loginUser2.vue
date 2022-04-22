<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center v-if="hasAccount">
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                            <v-text-field v-model="loginData.email" label="Email"></v-text-field>
                            <v-text-field v-model="loginData.password" label="Password" type="password"></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login()">Login</v-btn>
                        <v-btn @click="hasAccount=false" color="warning">Register</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
            <v-layout align-center justify-center v-else>
                <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Register form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                            <v-text-field v-model="registerData.name" type="Text" label="Name"></v-text-field>
                            <v-text-field v-model="registerData.email" label="Email"></v-text-field>
                            <v-text-field v-model="registerData.password" label="Password" type="password"></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn @click="register()" color="warning">Register</v-btn>
                        <v-btn color="primary" @click="hasAccount=true">Login</v-btn>
                        
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
         
      </v-content>
   </v-app>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            hasAccount: true,
            loginData: new Object(),
            registerData: new Object()
        }
    },
    methods: {        
        login(){
            var data = {
                email: this.loginData.email,
                password: this.loginData.password
            }

            axios.post('http://localhost:3000/api/login', data)
                .then((res)=>{
                    var user = res.data.user;
                    if(user != null){
                        localStorage.setItem('user',JSON.stringify(user));
                        console.log(user);
                        this.$router.push('/user');
                    }
                })
        },
        register(){
            var data = {
                name: this.registerData.name,
                email: this.registerData.email,
                password: this.registerData.password
            }

            axios.post('http://localhost:3000/api/users', data)
                .then((res)=>{
                    console.log(res.data.user)
                })
        }
    }
}
</script>
<style scoped>

</style>