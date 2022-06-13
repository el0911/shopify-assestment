import React, { createContext, useContext } from "react";
import styled from "styled-components";
 
import { loadUser } from "../services/auth";
import { LoaderContext } from "./fullLoader.provider";
 
const userContext = createContext({userData:{twitter:{}}} );

const Component = styled.div`
.loading{
   height: 100vh;
   width: 100vw;
   background: white;
   position: sticky;
   z-index: 4;
   text-align: center;
   padding-top: 40vh;
   top:0
}
`;
 

const UserProvider = ({ children }) => {
 
  const [userData, setUserData] = React.useState({twitter:{}});
  const {setLoader} =  LoaderContext()

  
  const holdAppLoadTillLoadUser = async ()=>{
    try {
      setLoader(true)
  
     const data =  await loadUser()
      setUserData(data)
      setLoader(false)
    } catch (error) {
      console.log(error)
      setUserData({})
    }

  }

  React.useEffect(()=>{
    ////aut load user
    holdAppLoadTillLoadUser()
  },[])

  
  

  return (
    <Component>
      <userContext.Provider value={{ userData }}> 
        {children}
      </userContext.Provider>
    </Component>

  );
};

export const UserContext = () => useContext(userContext);

export default UserProvider;