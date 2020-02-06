import axios from './index';

export const home = () => {
  return axios.request({
    method: 'get',
    url: `book/home`
  })
};

export const shelf = () => {
  return axios.request({
    method: 'get',
    url: `book/shelf`
  })
};

export const flatList = () => {
  return axios.request({
    method: 'get',
    url: `book/flat-list`
  })
}

export const detail = (params) => {
  return axios({
    method: 'get',
    url: `/book/detail`,
    params
  })
}
