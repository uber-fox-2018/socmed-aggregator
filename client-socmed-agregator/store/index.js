import Vuex from "vuex";

const createStore = () => {
    return new Vuex.Store({
        state : {
            owner : '',
            repo : '',
            language : '', 
        },
        mutations : {
            getOwner (state, data) {
                state.owner = data  
            },
            getRepoAndLanguage (state, data){
                state.repo = data.repo
                state.language = data.language
            }
        },
     })
}

export default createStore