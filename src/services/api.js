import axios from 'axios'

const api = axios.create({
	baseURL: 'https://rocketdrive-back.herokuapp.com/',
})

export default api