import axios from './index';
import {setLocalForage} from "../utils/localforage";
import {getCategoryName} from "../config/store";

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
};

export const detail = (params) => {
  return axios.request({
    method: 'get',
    url: `/book/detail`,
    params
  })
};

export const list = () => {
  return axios.request({
    method: 'get',
    url: '/book/list'
  })
}

export function download(item, onSuccess, onFailed, onError, onProgress) {
  axios.create({
    baseURL: process.env.VUE_APP_EPUB_URL,
    method: 'get',
    responseType: 'blob',
    timeout: 180 * 1000,
    onDownloadProgress: progressEvent => {
      if (onProgress) onProgress(progressEvent)
    }
  }).get(`${getCategoryName(item.category)}/${item.fileName}.epub`)
    .then(res => {
      const blob = new Blob([res.data])
      setLocalForage(item.fileName, blob, () => {
        if (onSuccess) onSuccess(item)
      }, err => {
        if (onFailed) onFailed(err)
      })
    })
    .catch(err => {
      if (onError) onError(err)
    })
}
