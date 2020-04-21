import axios from "axios";

const { CancelToken } = axios;
export let cancel;

export default axios.create({
  baseURL: "https://api.github.com",
  responseType: "json",
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  }),
});

