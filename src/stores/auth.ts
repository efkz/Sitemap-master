import { defineStore } from 'pinia'
// @ts-ignore
import ax from '../api.js'

export const useAuthStore = defineStore('auth', () => {
    const authLogin = async (payload : FormData) => {
        try {
            const {data} = await ax.post('/gr8', payload)
            let token = data.response.token;
            token && localStorage.setItem('accessToken', token)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    return { authLogin }
})
