import { defineStore } from "pinia";
import axios from "axios";
import type { AxiosInstance } from "axios";
import type { Organizer } from "@/type";

const apiClient: AxiosInstance = axios.create ({
    baseURL: import.meta.env.VITE_BACKEND_URL ,
    withCredentials: false ,
    headers: {
        Accept: 'application/json' ,
        'Content-Type': 'application/json'
    }
})

export const useAuthStore = defineStore('auth', {
 state: () => ({
    token: null as string | null,
    user: null as Organizer | null
 }),
 getters: {
  currentUserName() : string {
    return this.user?.name || ''
  }
 },

 actions: {
    login(email: string, password: string) {
        return apiClient
            .post('/api/v1/auth/authenticate', {
                username: email,
                password: password
            })
            .then((res) => {
                this.token = res.data.access_token
                ///SUS Line
                this.user = res.data.user
                localStorage.setItem('access_token', this.token as string)
                localStorage.setItem('user', JSON.stringify(this.user))
                return res
            })
    },
    logout(){
      console.log('logout')
      this.token = null
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    },
    reload(token: string, user:Organizer) {
      this.token = token
      this.user = user
    }
 }
})