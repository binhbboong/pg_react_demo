import axios from 'axios';
import { reduce } from 'lodash';
import { SERVER_URL } from '../constants/app';
import { needCache, getCachedCollection } from './cache';

const formatData = (value) => {
  if (value instanceof Date) {
    return value.toJSON();
  }
  return value;
};

const transformData = data => reduce(data, (result, current, key) => {
  result[key] = formatData(current);
  return result;
}, {});

const formatAndRejectError = error => Promise.reject(error);

// AJAX method
export const get = (path, params) => {
  let cachedCollection = null;
  let cached = null;
  if (needCache(path)) {
    cachedCollection = getCachedCollection(path);
    console.log('** cache Data: **', cachedCollection);
    if (cachedCollection[path]) {
      cached = cachedCollection[path];
    }
  }
  return cached ?
    Promise.resolve(cached) :
    axios({
      url: (SERVER_URL || '') + path,
      params: transformData(params),
      responseType: 'json'
    })
      .then((res) => {
        // cache data...
        if (cachedCollection) {
          cachedCollection[path] = res.data;
        }
        return res.data;
      })
      .catch(formatAndRejectError);
};

export const post = (path, params, data) =>
  axios({
    method: 'post',
    url: (SERVER_URL || '') + path,
    params: transformData(params),
    data: transformData(data),
    responseType: 'json',
    timeout: 15000
  })
    .then(res => res.data)
    .catch(formatAndRejectError);

export const put = (path, data) =>
  axios({
    method: 'put',
    data: transformData(data),
    url: SERVER_URL + path,
    responseType: 'json',
    timeout: 15000
  })
    .then(res => res.data)
    .catch(formatAndRejectError);

export const del = (path, data) =>
  axios({
    method: 'delete',
    data: transformData(data),
    url: SERVER_URL + path,
    responseType: 'json',
    timeout: 15000
  })
    .then(res => res.data)
    .catch(formatAndRejectError);

export default {
  get,
  post,
  put,
  del
};
