import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  const login = async ({ userName, password }) => {
    
    const success = handleInputErrors({
      
      userName,
      password,
     
    });
    if (!success) {
      console.log("not succeeded in login");
      return;
    }
    setLoading(true);
    try {
      const data = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          password,
        }),
      })

      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      // console.log(data);
      localStorage.setItem('chat-app-user-info',JSON.stringify(data));
      setAuthUser(data);
      
    } catch (error) {
      toast.error(error.message);
      
    } finally {
      setLoading(false);
    }
  }

  return {login,loading};
}

export default useLogin;

const handleInputErrors = async ({

  userName,
  password,
  
}) => {
  if ( !userName || !password ) {
    toast.error("Please do fill all the fields below");
    return false;
  }


  if (password.length < 6) {
    toast.error("Password need to be at least 6 characters");
    return false;
  }
};
