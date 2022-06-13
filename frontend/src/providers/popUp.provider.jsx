import React, { createContext, useContext } from "react";
import styled from "styled-components";
 

const PopUpContext = createContext({ isLoading: false, setLoader: () => { } });

const Component = styled.div`

.loading{
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 50;
  text-align: center;
  top: 0;
  background: rgba(30,30,30,0.4);
  display: grid;
  -webkit-align-content: center;
  -ms-flex-line-pack: center;
  align-content: center;
}

`;


const PopUpProvider = ({ children }) => {
  const [isPopUp, setPopUp] = React.useState(false);

  
 
  return (
    <Component>
      <PopUpContext.Provider value={{ isPopUp, setPopUp }}>
        {isPopUp && <div className="loading">
           <div>
             {isPopUp}
           </div>
        </div>}
        {children}
      </PopUpContext.Provider>
    </Component>

  );
};

export const usePopUpContext = () => useContext(PopUpContext);

export default PopUpProvider;
