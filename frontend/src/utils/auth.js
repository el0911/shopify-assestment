import axiosCall from "./axios"

/**
 * @description login util function 
 */
export const loginUtil = async (email, password) => {
   try {
     const {data} = await  axiosCall.post('/auth/login', {
         email,
         password
     })

     if (data.status!=='success') {
        alert('Unable to login,check email and password')
        return
     }

     login(data.accessToken)
    
   } catch (error) {
    alert('Unable to login,check email and password')
   }
}




/**
 * Login user
 */
export const login = async (accessToken) => {
    if ((accessToken === localStorage.getItem('accessToken'))) {
        return
    }


    localStorage.setItem('accessToken', accessToken)
    window.location.href = "/app"

}

/**
 * @description save user
 * @param {*} userDetails 
 */
export const saveUser = async (userDetails) => {
    localStorage.setItem('userData', JSON.stringify(userDetails))
}