<template>
  <div class="auth-wrapper">
      <div class="auth-inner">
        <form @submit.prevent = "handleSubmit" action="">
    <h3>Login</h3>
    <div class="form-group">
        <label for="">Username</label>
        <input type="text"  class="form-control" v-model="username" placeholder="username">
    </div>

    <div class="form-group">
        <label for="">Password</label>
        <input type="password" class="form-control" v-model="password" placeholder="Password">
    </div>
    <button class="btn btn-primary btn-block">Login</button>
</form>
      </div>
    </div>

    
</template>


<script>
import axios from 'axios'
export default {
    name : 'Login',
    data() {
        return {
            username : '',
            password : ''
        }
    },
    methods: {
        async handleSubmit() {
            const response = await axios.post('login', {
                username : this.username,
                password:this.password
            })
            console.log(response)
            this.$router.push('/home')
        }} 
}
</script>

<style scoped>

.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}
.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

</style>