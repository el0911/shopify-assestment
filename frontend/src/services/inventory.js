import moment from "moment"
import axiosCall from "../utils/axios"

/**
 * @description creates an inventory 
 */
 export const createAnInventory = async (itemName, location) => {
    try {
        const { data } = await axiosCall.post('/inventory', {
            itemName, location
        })

        if (data.status !== 'success') {
            alert('Unable to create inventory')
            return
        }

         return {
            ...data.inventory, 
            createdAt: moment(data.inventory.createdAt).format('llll'),
            updatedAt: moment(data.inventory.updatedAt).format('llll'),
        }

    } catch (error) {
        alert('Unable to create inventory')
    }
}


/**
 * @description edit an inventory 
 */
 export const editAnInventory = async (id , input ) => {
    try {
        const { data } = await axiosCall.update('/inventory', {
            id,
            ...input
        })

        if (data.status !== 'success') {
            alert('Unable to Update inventory')
            return
        }

        alert('Inventory Update')
        return {
            ...data.inventory, 
            createdAt: moment(data.inventory.createdAt).format('llll'),
            updatedAt: moment(data.inventory.updatedAt).format('llll'),
        }

    } catch (error) {
        console.log(error)
        alert('Unable to Update inventory')
    }
}

/**
 * @description load inventory
 * @param {*} setInventory 
 * @returns 
 */
export const loadInventory = async (setInventory) => {
    try {
        const { data } = await axiosCall.get('/inventory')
        if (data.status !== 'success') {
            alert('Unable to load inventory')
            return
        }

        const newData = data.allInventory.map((data) => {
            return {
                ...data,
                createdAt: moment(data.createdAt).format('llll'),
                updatedAt: moment(data.updatedAt).format('llll'),
                info:{
                    ...data
                }
            }
        })
        setInventory(newData)
    } catch (error) {
        console.log(error)
        alert('Unable to Load inventory')
    }
}


/**
 * @description deletes a record
 * @param {*} id 
 */
export const deleteInventory = async (id) =>{
    const { data } = await axiosCall.delete('/inventory?id='+id)
    if (data.status !== 'success') {
        alert('Unable to delete inventory')
        return
    }
}