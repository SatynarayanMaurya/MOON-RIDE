import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserDetails, setLoading, setUserDetails } from "../redux/slices/userSlice";
import { apiConnector } from "../services/apiConnector";
import { userEndpoints } from "../services/apis";
import Spinner from "./Spinner";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const userDetails = useSelector((state) => state.user.userDetails);
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    const verifyUser = async () => {
      if (hasCheckedAuth.current) return;
      
      try {
        if (userDetails) {
          hasCheckedAuth.current = true;
          return;
        } 
        
        dispatch(setLoading(true));
        
        const result = await apiConnector("GET", userEndpoints.GET_USER_DETAILS);
        
        if (result?.data?.userDetails) {
          dispatch(setUserDetails(result.data.userDetails));
        } else {
          dispatch(clearUserDetails());
        }
      } catch (err) {
        console.error("Auth verification failed:", err);
        dispatch(clearUserDetails());
      } finally {
        dispatch(setLoading(false));
        hasCheckedAuth.current = true;
      }
    };

    verifyUser();
  }, [dispatch]);

  if (loading || !hasCheckedAuth.current) return <Spinner />;
  
  return userDetails ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;