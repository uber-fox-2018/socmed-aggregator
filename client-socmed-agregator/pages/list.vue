<template>
    <div class="container">
        <div class="card" v-for="repo in repos" v-bind:key="repo.id">
            <div class="row">
                <div class="col-3">
                    <img :src="repo.owner.avatar_url" alt="Avatar" style="margin:0;padding:0;width:100%; height:100%" >
                </div>
                <div class="col-9">
                    <h4><b>{{repo.name}}</b></h4>
                    <p>forks : {{repo.forks}}</p>
                    <p>watchers : {{repo.watchers}}</p>
                    <p>clone : {{repo.clone_url}} or {{repo.ssh_url}} </p>
                     <p>go to : <a :href="repo.html_url">{{repo.html_url}}</a> </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios' 

export default {
    layout: 'default',
    data () {
        return {
            currentOwner : '',
            repos : '',
        }
    },
    mounted () {
        this.getOwner()
    },
    computed: {
        owner () {
            console.log("===========",this.$store.state.owner) 
            return this.$store.state.owner 
        }
    },
    methods : {
        getOwner () {
            console.log("---------------",this.owner)
            axios.get(`http://localhost:4000/index?username=${this.owner}`,)
            .then(  data  => {
                console.log(data.data.info[0])
                this.repos = data.data.info
            })
            .catch(err => {
                alert(err.message)
            })
           
        }
    }
   //computed owner here
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}
/* On mouse-over, add a deeper shadow */
.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container {
    padding: 2px 16px;
}

.card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px; /* 5px rounded corners */
    margin: 10px
}

/* Add rounded corners to the top left and the top right corner of the image */
img {
    border-radius: 2px 2px 0 0;
}

.row::after {
    content: "";
    clear: both;
    display: table;
}

[class*="col-"] {
    float: left;
    padding: 15px;
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

