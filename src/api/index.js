import Axios from 'axios';

Axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
Axios.defaults.timeout = 30000;
Axios.defaults.withCredentials = true;

Axios.interceptors.response.use(response => {
  if (response && response.status === 200) {
    return response.data
  } else {
    return Promise.reject({message: '请求错误，请稍后再试'})
  }
});

export default Axios;
