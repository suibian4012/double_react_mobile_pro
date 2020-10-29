import axios from "axios";
const request = axios.create({
  baseURL: "/",
});
const messages = {
  401: "没有权限",
  403: "禁止访问",
  404: "没有资源",
};
request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use(
  (response) => {
    //响应成功,在判断功能是否成功---根据response.data.code
    if (response.data.code === 20000) {
      return response.data.data;
    } else {
      return Promise.reject(response.data.message);
    }
  },
  //响应不成功
  (error) => {
    let message = "未知错误";
    //如果服务器有响应，再根据状态码返回不同错误信息
    if (error.response) {
      if (messages[error.response.status]) {
        message = messages[error.response.status];
      }
    } else {
      //服务器无响应
      if (error.message.indexOf("NetWork Err")) {
        message = "暂无网络，请打开网络连接或连接WIFI试试";
      } else if (error.message.indexOf("timeout")) {
        message = "网络延迟，请打开4/5G网络或WIFI试试";
      }
    }
  }
);

export default request;
