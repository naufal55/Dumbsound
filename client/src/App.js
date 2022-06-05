import { useContext, useEffect } from "react";

import { Routes, Route, useNavigate} from 'react-router-dom';
import {AddArtist, AddMusic, Home, Payment, Transaction} from './pages';


import { setAuthToken, API } from './config/api';
import { UserContext } from "./context/userContext";
import PrivateRoute from "./components/PrivateRoute";
import { useQuery } from "react-query";

if(localStorage.token){
  setAuthToken(localStorage.token)
}

document.body.style.background = "black"

function App() {
  //useNavigate can use in browserRouter or router only
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext)
  // console.log(state);//

  let { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get("/transaction/"+state.user.id);
    return response.data.data;
  });

  useEffect(() => {
    // Redirect Auth diperlukan ketika page login dan beranda utama nya berbeda
      if (state.user.status === 'admin') {
        navigate('/transaction');
      } else if (state.user.status === 'customer') {
        navigate('/');
        if(!transaction){
          navigate("/payment");
        }
      }
     
    
  }, []);


  // Create function for check user token here ...
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
  
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
  
      // Get user data
      let payload = response.data.data.user;
      console.log(payload);
      // Get token from local storage
      payload.token = localStorage.token;
  
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
       <Route exact path="/" element={<Home/>} />
       <Route exact path="/payment" element={<Payment/>} />
       <Route path="/" element={<PrivateRoute isLogin={state.user.status}/>}>
        <Route exact path="/transaction" element={<Transaction/>} />
        <Route exact path="/add-music" element={<AddMusic/>} />
        <Route exact path="/add-artist" element={<AddArtist/>} />
       </Route>

    </Routes>

  );
}

export default App;
