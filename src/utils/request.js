import axios from "axios";

const service = axios.create({
    // 请求接口地址
    //   baseURL: 'http://127.0.0.1:8888',
    baseURL: "http://orderadmintest.orthok.cn/service",
    // 设置延迟时间
    timeout: 3000,
    headers: {
        //公共请求头配置，本项目请求头大多数接口是这个，所以这里可以配置一下，对于特殊接口单独配置
        "Content-Type": "application/x-www-form-urlencoded"
      }
});

//请求拦截器
service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

//响应拦截器
service.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default service;
