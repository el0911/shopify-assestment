import moment from "moment"
import axiosCall from "../utils/axios"

/**
 * @description creates an inventory 
 */
 export const createLocation = async (locationName, city) => {
    try {
        const { data } = await axiosCall.post('/location', {
            locationName, city
        })

        if (data.status !== 'success') {
            alert('Unable to create Location')
            return
        }

         return {
            ...data.location, 
            createdAt: moment(data.location.createdAt).format('llll'),
            updatedAt: moment(data.location.updatedAt).format('llll'),
        }

    } catch (error) {
        console.error(error)
        alert('Unable to create inventory')
    }
}




/**
 * @description load inventory
 * @param {*} loadLocation 
 * @returns 
 */
export const loadLocation = async (setLocation) => {
    try {
        const { data } = await axiosCall.get('/location')
        if (data.status !== 'success') {
            alert('Unable to load locations')
            return
        }

        const newData = data.allLocations.map((data) => {
            return {
                ...data,
                createdAt: moment(data.createdAt).format('llll'),
                updatedAt: moment(data.updatedAt).format('llll'),
                info:{
                    ...data
                }
            }
        })
        console.locations = newData
        setLocation(newData)
    } catch (error) {
        console.log(error)
        alert('Unable to Load locations')
    }
}


/**
 * @description deletes a record
 * @param {*} id 
 */
export const deleteLocation = async (id) =>{
    const { data } = await axiosCall.delete('/location?id='+id)
    if (data.status !== 'success') {
        alert('Unable to delete locations')
        return
    }
}