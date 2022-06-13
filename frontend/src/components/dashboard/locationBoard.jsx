import React from 'react'
import styled from 'styled-components'
import { usePopUpContext } from '../../providers/popUp.provider'
import { createLocation, loadLocation, deleteLocation } from '../../services/location'

import TableV2 from './table.components'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
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

}

.inventory-form button{

    height: 40px;
    margin-bottom: 20px;
    border-radius: 7px;
    border:0;
    cursor:pointer;

}




`;


 



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



 

const DeleteComponent = ({ value }) => {
    return <DeleteOutlined />
}


export default function LocationBoard() {
    const { setPopUp } = usePopUpContext()

    const [inventory, setInventory] = React.useState([])


    const deleteRow = async (id) => {
        const newLocation = inventory.filter(data => {
            if (data._id !== id) {
                return true
            }
        })
        setInventory(newLocation)
        await deleteLocation(id)
    }


    const columnsOccurence = React.useMemo(() => [
        
        {
            Header: " Location name",
            accessor: 'locationName',
        }, {
            Header: "city",
            accessor: 'city',
        },  {
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

    React.useState(() => {
        loadLocation(setInventory)
    }, [])

    return (
        <Component>
            {/* <Navigation /> */}
            <div className="content-dashboard">
                <div className='action-bar'>
                    <p className='title'>
                        Location
                    </p>

                    <button onClick={e => {
                        setPopUp(<Popup handleCloseModal={handleCloseModal} component={<form onSubmit={
                            async event => {

                                event.preventDefault()
                                console.log(event)
                                const locationName = event.target.locationName.value
                                const city = event.target.city.value

                                setPopUp(false)
                                const data = await createLocation(locationName, city)
                                setInventory([...inventory, data])

                            }
                        } className='inventory-form'
                        >

                            <input name="locationName" placeholder='Location name' ></input>
                            <input name="city" placeholder='city' ></input>

                            <button type='submit'>
                                Create Inventory
                            </button>
                        </form>} />)
                    }} className='actionbtn'>
                        Add a Location +
                    </button>
                </div>

                <TableV2 deleteRow={deleteRow} columns={columnsOccurence} data={inventory} />
            </div>
        </Component>
    )
}
