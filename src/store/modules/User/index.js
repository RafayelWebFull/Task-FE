import axios from '../../../plugins/axios'
import Router from "../../../router";

export default {
    state: {
        user: null,
        token : localStorage.getItem('token') || null,
        error: null,
    },
    mutations: {
        setUser(state,data){
            state.user = data;
        },
        setError(state,data) {
            state.error = data
        }
    },
    actions: {
        getUser(ctx) {
            axios.post('/api/user',{token: this.state.token}, {withCredentials: true}).then(response => {
                this.currentUser = response.data
                this.user = this.currentUser.user
                console.log(this.user)
            }).catch((error) => {
                console.log(error)
                localStorage.removeItem('token')
                this.route = Router.name;
                ctx.commit('setError', error.response.statusText)
                if(this.route !== 'Login') {
                    Router.push({name: 'Login'})
                }
            }).finally(() => {
                setTimeout(function () {
                    this.isLoading =  false
                }.bind(this), 1000);
            })
        },
        register(ctx, data) {
            axios.post('api/register', data, {headers: {Accept: 'application/json'}, withCredentials: true}).then((res) => {
                localStorage.setItem('token', res.data);
                return res
            }).catch((error) => {
                console.log(error)
                return error
            });
        },
        login(ctx, data) {
            axios.post('api/login', data, {headers: {Accept: 'application/json'}, withCredentials: true}).then((res) => {
                localStorage.setItem('token', res.data);
                ctx.commit('setUser', data);
                Router.push({name: 'Home'})
            }).catch((error) => {
                ctx.commit('setError', error.response.data.message)
            });
        }
    },
    getters: {
        user(state){
            return state.user
        },
        token(state){
            return state.token
        },
        error(state) {
            return state.error
        }
    }
}