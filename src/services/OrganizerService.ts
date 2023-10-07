import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { EventOrganizer } from '@/type'
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getOrganizers(): Promise<AxiosResponse<EventOrganizer[]>> {
    return apiClient.get<EventOrganizer[]>(`/organizers`)
  }
}