/**
 * Set of fucntions to handle axios calls
 */

import axios from "axios";
import { toast } from "react-toastify";


function manageErrorConnection(err) {
    if (err.response && err.response.status >= 400 && err.response.status <= 500) {
       try {
        if (   err.response){
           
            if (err.response.status === 401)  {
                localStorage.clear()
                window.location = '/'
             }
    
            const { data } = err.response;
            const error = data.errors ? `${data.errors[0].message} ${data.errors[0].cause ? data.errors[0].cause : ''}` : data.payload.message
            console.log('::::::::::',error)
            toast(error)
            return Promise.reject(new Error(error))
    
       
         
        }
    } catch (error) {
        console.log(error)
    }
        // this will trigger the `handleError` function in the promise chain
      } else if (err.code === 'ECONNREFUSED') {
        // this will trigger the `handlerResponse` function in the promise chain
        // bacause we are not returning a rejection! Just an example
        return 'nevermind'
    } else {
        // this will trigger the `handleError` function in the promise chain
        return Promise.reject(err)
    }
}

function handleResponse(response) {
    console.log(`handleResponse: ${response}`);
}

function handleError(error) {
    console.log(`handleError: ${error}`);
}

class AxiosCalls {
    constructor() {
        this.client = axios.create({
            baseURL: `${process.env.REACT_APP_API}`
        });


        // Add a request interceptor
        this.client.interceptors.request.use(function (config) {
            // Do something before request is sent
            const token = localStorage.getItem('accessToken')
            // const refresh = localStorage.getItem('refreshToken')
            config.headers.Authorization = `Bearer ${token}`;
            // config.headers["X-Refresh-Token"] = `refresh ${refresh}`;
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        this.client.interceptors.response.use(function (config) {
            try {
               

                return config;
            } catch (error) {
                console.log({ mmm: error })
                return config;
            }

        }
            , manageErrorConnection
        )

    }

    /**
     * @description Axios get request
     * @param {*} url url for request
     * @returns  axios promisr
     */
    get(url) {
        return this.client.get(url)
    }

    /**
     * @description axios post request
     * @param {*} url  for requst
     * @param {*} data to post
     * @returns 
     */
    post(url, data) {
        return this.client.post(url, data)
    }

    /**
     * @description deltet axios requestt
     * @param {*} url url for request
     * @returns 
     */
    delete(url) {
        return this.client.delete(url)
    }

    /**
     * 
     * @param {*} url url for request
     * @param {*} data data to pass
     * @returns 
     */
    update(url, data = {}) {
        return this.client.put(url, data)
    }


    /**
     * @description this function extract the error response message from the data
     * @param {ErrorObject} error 
     */
    extractErrorMessage(error) {
        console.log({ error: error })

        const { data } = error.response;
        return `${data.errors[0].message} ${data.errors[0].cause ? data.errors[0].cause : ''}`
    }


}


const axiosCall = new AxiosCalls()


export default axiosCall