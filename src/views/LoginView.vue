<template>
    <div class="container">
            <h2 class="title">Авторизация</h2>
            <div class="input">
                <label for="email">Логин</label>
                <input v-model="login" class="form-control" type="text" placeholder="email@adress.com">
            </div>
            <div class="input">
                <label for="password">Пароль</label>
                <input v-model="password" class="form-control" type="password" placeholder="password123">
            </div>
            <button @click="onClickLogin" class="btn-pers"> Войти </button>
    </div>
</template>

<script lang="ts">

import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

export default {
    name: 'LoginView',
    components: {},
    data() {
        return {
            auth: useAuthStore(),
            router: useRouter(),
            login: '',
            password: ''
        }
    },
    methods: {
        async onClickLogin() {
            let formData = new FormData();
            formData.append('gr8_l', this.login)
            formData.append('gr8_p', this.password)
            await this.auth.authLogin(formData).then((res) => {
                if (res.success) {
                    this.router.push('/')
                }
            })
        }
    }
}

</script>

<style scss>
.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #d3d3d3;
    padding: 4rem 4rem;
    border-radius: 5px;
    background: #fefefe;
    width: 400px;
}

.title {
    margin-bottom: 1rem !important;
}

.input {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.form-control {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.btn-pers {
    position: relative;
    left: 50%;
    padding: 1em 2.5em;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 700;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
    transition: all .3s ease 0s;
    cursor: pointer;
    outline: none;
    transform: translateX(-50%);
}
</style>
