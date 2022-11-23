import $axios from 'axios'

const axios = $axios.create({ baseURL: 'http://localhost:3333' })
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
const traceName = (traceName) => ({ traceName })


export const getBooks = () => axios.get(`/books`, traceName('/books')).then(res => res)

export const addBook = (book) => axios.post(`/books`, { ...book }, traceName('/books')).then(res => res)

export const deleteBook = (isbn) => axios.delete(`/books/${isbn}`, traceName('/books/${isbn}')).then(res => res)
