export const state = ()=>({
    user:{
        isLogin:false,
        token:""
    }
});
export const mutations = {
    setStatusLogin(state,flag){
        state.user = {
            ...state.user ,
            isLogin:flag
        }
    }
}