import axios from './index';

export const home = () => {
  return axios.request({
    method: 'get',
    url: `book/home`
  })
};
