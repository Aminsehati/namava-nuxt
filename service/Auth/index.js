import api from '@/api'
class AuthService {
    sendOtpByPhoneLogin(data) {
        return api({
            url: 'Auth/login/by-phone/send-otp',
            method: 'post',
            data
        })
    }
}
export default new AuthService()