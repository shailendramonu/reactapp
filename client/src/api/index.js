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

export const insertNative = payload => api.post(`/native`, payload)
export const getAllNatives = () => api.get(`/natives`)
export const updateNativeById = (id, payload) => api.put(`/native/${id}`, payload)
export const deleteNativeById = id => api.delete(`/native/${id}`)
export const getNativeById = id => api.get(`/native/${id}`)
export const getNativeByTitle = title => api.get(`/natives/${title}`)

const apis = {
  insertAlternate,
  getAllAlternates,
  updateAlternateById,
  deleteAlternateById,
  getAlternateById,
  getIosApps,
  insertNative,
  getAllNatives,
  updateNativeById,
  deleteNativeById,
  getNativeById,
  getNativeByTitle,
}

export default apis
