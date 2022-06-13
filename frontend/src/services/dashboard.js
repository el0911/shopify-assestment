import axiosCall from "../utils/axios"

////
export const toggleCoommentWebhooks = async (state) =>{
  const data = await  axiosCall.get(`provider/togglecomments?state=${state}`)
  console.log({data})
}