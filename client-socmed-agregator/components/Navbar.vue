<template>
    <nav>
        <ul>
            <div class="row">
                <div class="col-6">
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                    <li><nuxt-link to="/list">List</nuxt-link></li>
                    <li><nuxt-link to="/search">Search Repo</nuxt-link></li>
                    <li><a href="#">Contact Us</a></li>
                </div>
                <div class="col-6">
                    <li>
                        <input v-model="repo" type="text" placeholder="repository name"> 
                    </li>
                    <li>
                        <input v-model="language" type="text" placeholder="language"> 
                    </li>
                    <li>
                       <button> <a @click="storeSearch" >Search</a></button>
                    </li>
                </div>
            </div>
        </ul>
    </nav>
</template>

<script>
export default {
    data () {
        return {
            repo : '',
            language : '',
        }
    },
    methods : {
        storeSearch (){
            this.$store.commit('getRepoAndLanguage', {repo : this.repo, language :this.language})
            this.$router.replace({ 'path' : '/search' })
        },
    }

}
</script>


<style scoped>

* {margin:0; padding:0;}
 
 nav {
 margin:0;
 text-align: center;
 width: 100%;
 font-family: arial;
 } 

 nav ul {
 background:#37988e;
 padding: 0 20px;
 list-style: none;
 position: relative;
 display: inline-table;
 width: 100%;
 }

 nav ul li{
 float:left;
 }

nav ul li input {
    opacity:0.6;
    display: block;
    padding: 25px;
    color: #000;
    text-decoration: none;    
}
 nav ul li:hover{
 background:#d68d9a;
 }

 nav ul li:hover a{
 color:#000;
 }


nav ul li :hover input {
    opacity:0.1;
}
 nav ul li a{
 display: block;
 padding: 25px;
 color: #fff;
 text-decoration: none;
}

.row::after {
    content: "";
    clear: both;
    display: table;
}

.right {
    float: right;
}

[class*="col-"] {
    float: left;
    padding: 0;
    border: 0px solid red;
}
.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}
</style>

