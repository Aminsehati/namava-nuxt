import api from '@/api'
class AuthService {
  sendOtpByPhoneLogin(data) {
    return api({
      url: 'Auth/login/by-phone/send-otp',
      method: 'post',
      data
    })
  }
  verifyOtpByPhoneLogin(data) {
    return api({
      url: 'Auth/login/by-phone/verify-otp',
      method: 'post',
      data
    })
  }
  sendOtpEmailByLogin(data) {
    return api({
      url: 'Auth/login/by-email/send-otp',
      method: 'post',
      data
    })
  }
  verifyOtpEmailByLogin(data) {
    return api({
      url: 'Auth/login/by-email/verify-otp',
      method: 'post',
      data
    })
  }
}
export default new AuthService()
