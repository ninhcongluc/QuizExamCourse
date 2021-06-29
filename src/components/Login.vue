<template>
<form @submit.prevent = "handleSubmit" action="">
    <h3>Login</h3>
    <div class="form-group">
        <label for="Email"></label>
        <input type="text"  class="form-control" v-model="email" placeholder="Email">
    </div>

    <div class="form-group">
        <label for="">Password</label>
        <input type="password" class="form-control" v-model="password" placeholder="Password">
    </div>
    <button class="btn btn-primary btn-block">Login</button>
</form>
    
</template>


<script>
import axios from 'axios'
export default {
    name : 'Login',
    data() {
        return {
            email : '',
            password : ''
        }
    },
    methods: {
        async handleSubmit() {
            const response = await axios.post('login', {
                email : this.email,
                password:this.password
            })
            console.log(response)

        }
    }
  
}
</script>