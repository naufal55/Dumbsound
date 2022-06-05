import { Outlet,Navigate } from "react-router-dom";

// create component here
const PrivateRoute= (props) => {
    return(
        props.isLogin==='admin' ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoute