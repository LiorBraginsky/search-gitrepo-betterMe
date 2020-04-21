import axios from "axios";

const { CancelToken } = axios;
export let cancel;

const API = "https://api.github.com";

const instance = (url,params) => axios.get(API+url, {
  params,
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  }),});


export default instance
