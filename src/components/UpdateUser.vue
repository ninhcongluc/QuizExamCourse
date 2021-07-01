<template>
    <div class="container">
        <h1>Update User Page</h1>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name : "UpdateUser",
    data() {
        return { 
            course: {},
            

        }
    },
    async mounted() {
        const response = await axios.get(`/users/1`)
        const user = response.data
        console.log(user)
    }

}
</script>

<style scoped>

</style>