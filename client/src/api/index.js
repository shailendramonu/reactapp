import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export const insertAlternate = payload => api.post(`/alternate`, payload)
export const getAllAlternates = () => api.get(`/alternates`)
export const updateAlternateById = (id, payload) => api.put(`/alternate/${id}`, payload)
export const deleteAlternateById = id => api.delete(`/alternate/${id}`)
export const getAlternateById = id => api.get(`/alternate/${id}`)
export const getIosApps = (term) => api.get('/search', { params: { term: term }})

const apis = {
  insertAlternate,
  getAllAlternates,
  updateAlternateById,
  deleteAlternateById,
  getAlternateById,
  getIosApps,
}

export default apis
