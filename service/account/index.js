import api from '@/api'
class AccountService {
    getUserInfo() {
        const token = localStorage && localStorage.getItem("token") || "";
        return api({
            url: '/account/user',
            method: 'get',
            options: {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        })
    }
    updateUserInfo(data) {
        const token = localStorage && localStorage.getItem("token") || "";
        return api({
            url: '/account/user',
            method: 'put',
            options: {
                headers: {
                    authorization: `Bearer ${token}`
                }
            },
            data
        })
    }
    sendOtpAttachEmail(data) {
        const token = localStorage && localStorage.getItem("token") || "";
        return api({
            url: '/account/user/attach-email/request',
            method: 'post',
            options: {
                headers: {
                    authorization: `Bearer ${token}`
                }
            },
            data
        })
    }
    verifyOtpAttachEmail(data){
        const token = localStorage && localStorage.getItem("token") || "";
        return api({
            url: '/account/user/attach-email/verify',
            method: 'post',
            options: {
                headers: {
                    authorization: `Bearer ${token}`
                }
            },
            data
        })
    }
}
export default new AccountService()