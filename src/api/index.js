import Axios from 'axios';

Axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
Axios.defaults.timeout = 30000;

Axios.interceptors.response.use(response => {
  if (response && response.status === 200) {
    if (response.data.error_code === 0) {
      return response.data
    } else {
      return Promise.reject({message: response.data.msg})
    }
  } else {
    return Promise.reject({message: '请求错误，请稍后再试'})
  }
});

export default Axios;
