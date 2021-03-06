const axios = require('axios')

const api = axios.create({
    baseURL : 'https://my-json-server.typicode.com/outuy1000/numerweb'
})

const getRoot = () => api.get('/root_of_equation')
const getMatrix = () => api.get('/matrix')
const getInterpolation = () => api.get('/interpolation')
const getRegression = () => api.get('/regression')

const apis = {
    getRoot,
    getMatrix,
    getInterpolation,
    getRegression
}

export default apis