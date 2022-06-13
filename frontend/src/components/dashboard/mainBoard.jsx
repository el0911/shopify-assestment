import React from 'react'
import styled from 'styled-components'
import { usePopUpContext } from '../../providers/popUp.provider'
import { createAnInventory, loadInventory, editAnInventory, deleteInventory } from '../../services/inventory'

import TableV2 from './table.components'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { loadLocation } from '../../services/location'
const Component = styled.div`
background: var(--background);
border-radius:10px;

table {
    border-spacing: 0;
    width: 100%;
}

.content-dashboard{
    padding: 20px 40px;
    padding-top: 70px;
}

td {
    margin: 0;
    padding: 0.5rem;
    height: 41px;
      padding-left: 10px;
  }

   
  thead{
    background: #F3F4FA;
    color: #9D9FAD;
    height: 41px;
    font-size: 13px;
    text-align: left;
  }

p{
    margin:0;
}

.title{ 
        font-size: 18px;
        font-weight: 500;
}

    .actionbtn{
        width: max-content;
        padding: 0 9px;
        border: 0;
        border-radius: 10px;
        cursor:pointer;
    
    }

    .action-bar{
    justify-content: space-between;
    display: flex;
    margin-bottom: 40px;
    }

    select{
        height: 50px;
        border: 0;
    }
`

const PopupComponent = styled.div`

margin: auto;
background: white;
padding: 25px 35px;
border-radius: 13px;
width: 100vw;

height: 100vh;

.close{
  text-align: left;
  margin: 35px 0 ;
}

.close button{
  cursor: pointer;
  border-radius: 50%;
  height: 43px;
  width: 43px;
}

.list{
  padding-top: 25px;
}

.list-item{

  display: grid;
  width: -webkit-fill-available;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 25px;

}


.inventory-form{
    display: grid;
    width: 500px;
    margin: auto;
}

.inventory-form input{

    height: 45px;
    margin-bottom: 20px;
    border-radius: 7px;
    border: 1px solid silver;
    padding: 12px;


}

.inventory-form select{
    height: 50px;
    border: 0;
}

.inventory-form button{

    height: 40px;
    margin-bottom: 20px;
    border-radius: 7px;
    border:0;
    cursor:pointer;

}




`;


const EditPopupComponent = styled.div`
form{
    display: inline-grid;
    width: 444px;
}

input{
  padding: 15px 20px;
  margin-top: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  width: -webkit-fill-available;
  height: 40px;
}



button{
    width: -webkit-fill-available;
    height: 40px;
    border-radius: 8px;
    border: none;
}


`



const Popup = ({ handleCloseModal, component }) => {
    return <PopupComponent >
        <div className='close'>
            <button onClick={e => {
                handleCloseModal()
            }} style={{
                cursor: 'pointer'
            }} >X</button>
        </div>
        {component}
    </PopupComponent>
}

const Status = ({ value }) => {
    const stylDefault = {
        color: 'white',
        background: 'rgb(64, 160, 212)',
        width: 'max-content',
        padding: ' 5px 13px',
        textAlign: 'center',
        borderRadius: '9px'

    }
    return <p style={value === 'IN_TRANSIT' ? { ...stylDefault, background: '#40A0D4' } : { ...stylDefault, background: '#8C40D4' }}>
        {value.split('_').join(' ')}
    </p>
}

const EditInventoryComponent = ({ id, setPopUp, location = 'LOCATION', status, locations }) => {
     // loadLocation(setLocations)
    return <EditPopupComponent>
        <form onSubmit={async event => {


            event.preventDefault()
            console.log(event)

            const statusNew = event.target.status.value && event.target.status.value.length ? event.target.status.value : status
            const location = event.target.location.value

            setPopUp(false)
            await editAnInventory(id, {
                status: statusNew,
                location
            })

            window.location = '/app'
            // setInventory([...inventory , data])


        }} action="">
            <select placeholder={'status'} name="status" id="">
                <option value="" disabled selected>Select your option</option>
                <option>NOT_SHIPPED</option>
                <option>IN_TRANSIT</option>
                <option>DELIVERED</option>
            </select>
            <select name="location" id="">
                <option value="" disabled selected>Select a location</option>
                {(console.locations).map((loca => {
                   return <option>{loca.locationName}</option>
                }))}
            </select>
            <button>
                Edit Inventory
            </button>
        </form>
    </EditPopupComponent>
}



const EditComponent = ({ value }) => {
    const { setPopUp } = usePopUpContext()

    const handleClick = () => {
        setPopUp(<Popup handleCloseModal={handleCloseModal} component={<EditInventoryComponent setPopUp={setPopUp} id={value._id} location={value.location} status={value.status} ></EditInventoryComponent>} />)
    }

    const handleCloseModal = () => {
        setPopUp(false)
    }
    return <div>
        <EditOutlined onClick={e => {
            handleClick()
        }} />
    </div>
}


const DeleteComponent = ({ value }) => {
    return <DeleteOutlined />
}


export default function MainBaord() {
    const { setPopUp } = usePopUpContext()

    const [inventory, setInventory] = React.useState([])


    const deleteRow = async (id) => {
        const newInventory = inventory.filter(data => {
            if (data._id !== id) {
                return true
            }
        })
        await deleteInventory(id)
        setInventory(newInventory)
    }


    const columnsOccurence = React.useMemo(() => [
        {
            Header: "Order Id",
            accessor: 'orderId',
        },
        {
            Header: "Item name",
            accessor: 'itemName',
        }, {
            Header: "Location",
            accessor: 'location',
        }, {
            Header: "Status",
            accessor: 'status',
            Cell: Status,
        }, {
            Header: "Edit",
            accessor: 'info',
            Cell: EditComponent,
        }, {
            Header: "Delete",
            accessor: '_id',
            Cell: DeleteComponent,
        }, {
            Header: "Created At",
            accessor: 'createdAt',
        }, {
            Header: "Updated At",
            accessor: 'updatedAt',
        },
    ], [])

    const handleCloseModal = () => {
        setPopUp(false)
    }

    const [locations, setLocations] = React.useState([])


    React.useState(() => {
        loadInventory(setInventory)
        loadLocation((setLocations))
    }, [])

    return (
        <Component>
            {/* <Navigation /> */}
            <div className="content-dashboard">
                <div className='action-bar'>
                    <p className='title'>
                        Overview
                    </p>

                    <button onClick={e => {
                        setPopUp(<Popup handleCloseModal={handleCloseModal} component={<form onSubmit={
                            async event => {

                                event.preventDefault()
                                console.log(event)
                                const itemName = event.target.itemName.value
                                const location = event.target.location.value

                                setPopUp(false)
                                const data = await createAnInventory(itemName, location,)
                                setInventory([...inventory, data])

                            }
                        } className='inventory-form'
                        >

                             <select name="location" id="">
                                <option value="" disabled selected>Select a location</option>
                                {locations.map((loca => {
                                  return  <option>{loca.locationName}</option>
                                }))}
                            </select>

                            <input name="itemName" placeholder='Item name' ></input>
                          

                            <button type='submit'>
                                Create Inventory
                            </button>
                        </form>} />)
                    }} className='actionbtn'>
                        Add an Inventory +
                    </button>
                </div>

                <TableV2 deleteRow={deleteRow} columns={columnsOccurence} data={inventory} />
            </div>
        </Component>
    )
}
