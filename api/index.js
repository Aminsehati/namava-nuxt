// api call method
import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    timeout: 1000,
});
const call = (arg) => {
    // arguments
    let method = arg.method || "get",
        url = arg.url,
        data = arg?.data || {},
        msg = arg.msg,
        options = arg.options || {},
        // read user phone from localStorage
        storageName = arg.storage || false

    // prepare api call url
    return new Promise((resolve, reject) => {
        // check connectivity
        if (navigator.onLine) {
            axios({
                method: method,
                url: url,
                // data: method != "get" ? data : {},
                data: method != "get" ? data : {},
                params: method == "get" ? data : {},
                headers: options && options.headers ? options.headers : {},
                baseURL: 'http://localhost:4000/api/v1'
            })
                .then(res => {
                    if (method != "get" && msg) {
                        // success message after submit
                    }
                    if (res.data.statusCode != 200) {
                    }
                    if (storageName) {

                    }
                    resolve(res?.data);
                })
                .catch(err => {
                    let message = ''
                    if (err.response) {
                        message = err?.response?.data?.message;
                    } else {
                        message = 'خطا در برقراری ارتباط با سرور'
                    }

                    if (err?.response?.status == 401) {
                        localStorage.clear();
                        window.location.href = window.location.origin + '/';
                    }
                    else if (err?.response?.status != 200) {
                        if (err?.response?.data?.message) {
                        }
                        else {
                        }

                    }
                    reject(err);
                });
        } else {


        }
    });
}
export default call