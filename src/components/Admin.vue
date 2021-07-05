<template>
 <div class="container">
        <div class="tittle">
            <h2>Admin Page</h2>
        </div>
        <div id="manageUser">
            <a href="/admin/users">Click here to manage users</a>
        </div>
        <div id="manageCourse">
            <a href="/admin/courses">Click here to manage courses</a>

        </div>
   
 </div>

    

</template>

<script>
export default {
    name: "Admin",
     created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
  },

}
</script>

<style scoped>
  .container {
            text-align: center;
            width: 50%;
            margin: auto;
        }
        h2{
            margin-top: 30px;
            font-family: Arial, Helvetica, sans-serif;
            color: rgb(185, 115, 129);
        }
        #manageUser{
            margin-top: 30px;
            width: 100%;
            height: 50px;
            background-color: cadetblue;
        
        }
        #manageCourse{
            margin-top: 30px;
            width: 100%;
            height: 50px;
            background-color: cadetblue;
        
        }

        a {
            padding:1em;
            text-align: center;
            display:inline-block;
            text-decoration: none !important;
            margin:0 auto;
            -webkit-transition: all 0.2s ease-in-out;
           -moz-transition: all 0.2s ease-in-out;
           -ms-transition: all 0.2s ease-in-out;
           -o-transition: all 0.2s ease-in-out;
            transition: all 0.2s ease-in-out;
            color: darkblue;
         
        }

</style>