<template>
    <v-layout row wrap justify-center align-center class="main">
        <v-layout row wrap justify-center align-center class="main" v-if="hasAccount"> 
            <v-card>
                <v-card-title primary-title>
                    <h2>Log In Your Account</h2>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="loginData.email" label="Email"></v-text-field>
                    <v-text-field v-model="loginData.password" label="Password" type="password"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-layout row wrap justify-center>
                        <v-btn @click="login()" color="success">Log in</v-btn>
                        <v-btn @click="hasAccount=false" color="warning">Register</v-btn>
                    </v-layout>
                </v-card-actions>

            </v-card>
        </v-layout>

        <v-layout row wrap justify-center align-center class="main" v-else> 
            <v-card>
                <v-card-title primary-title>
                    <h2>Create Your Account</h2>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="registerData.name" label="Name"></v-text-field>
                    <v-text-field v-model="registerData.email" label="Email"></v-text-field>                    
                    <v-text-field v-model="registerData.password" label="Password" type="password"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-layout row wrap justify-center>
                        <v-btn @click="register()" color="warning">Register</v-btn>
                        <v-btn @click="hasAccount=true" color="success">Log in</v-btn>
                    </v-layout>
                </v-card-actions>

            </v-card>
        </v-layout>

    </v-layout>
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
    .main {
       min-height: 100vh; 
    }
</style>