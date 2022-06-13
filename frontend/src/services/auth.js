import axiosCall from "../utils/axios"
import queryString from 'query-string';
import { login } from "../utils/auth";


/**
 * @description tthis function calls the request user auth token
 */
export const requestAuthToken = async () => {
    const { data } = await axiosCall.get('auth/provider/request/get')
    return data
}

/**
 * @description validate the callback
 */
export const validateUtil = async () => {
    const { oauth_token, oauth_verifier } = queryString.parse(window.location.search);

    ///validate tth tokens on the backend
    if (oauth_token && oauth_verifier) {
        try {
            //Oauth Step 3
            const { data } = await axiosCall.post('auth/provider/setupuser', { oauth_token, oauth_verifier });
            if (data.status !== 'success') {
                throw new Error('Cant log in')
            }
            console.log(data)
            login(data.data.tokens)
        } catch (error) {
            console.error(error);
            //////error if i cant login show a toast and go back too login page
            window.location.href = "/login"
        }
    }

}



/**
 * @description Load user details
 */
export const loadUser = async () => {

    try {
        //Oauth Step 3
        const { data } = await axiosCall.get('auth/provider/loaduser');
        if (data.status !== 'success') {
            throw new Error('Cant log in')
        }
        console.log(data)
        return data.data
     } catch (error) {
        console.error(error);
        //////error if i cant login show a toast and go back too login page
     }


}