import axios from "axios"

// 响应拦截
axios.interceptors.response.use(res => {
    return res.data
}, err => {
    // console.log(JSON.parse(JSON.stringify(err)));
    let errRes = JSON.parse(JSON.stringify(err)).response
    if (errRes){
        switch(errRes.status){
            case 401: window.location.href = "/"
        }
        return Promise.reject(errRes.status);
    }        
});

export default axios