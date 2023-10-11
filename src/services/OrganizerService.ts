import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { Organizer } from '@/type'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getOrganizers(perPage: number, page: number): Promise<AxiosResponse<Organizer[]>> {
    return apiClient.get<Organizer[]>('/organizers?_limit=' + perPage + '&_page=' + page)
  },
  getOrganizerById(id: number): Promise<AxiosResponse<Organizer>> {
    return apiClient.get<Organizer>('organizers/' + id.toString())
},
saveOrganizer (organizer:Organizer) : Promise<AxiosResponse<Organizer>> {
    return apiClient.post<Organizer>('/organizers', organizer)
},
getOrganizersBy(): Promise<AxiosResponse<Organizer[]>> {
    return apiClient.get<Organizer[]>(`/organizers`)
}
}