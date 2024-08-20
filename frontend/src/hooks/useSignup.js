import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  //this is not any value
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    userName,
    password,
    confirmedPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      userName,
      password,
      confirmedPassword,
      gender,
    });
    if (!success) { console.log("not succeeded in signup"); return;}

    setLoading(true);

    try {
     const res = await fetch("http://localhost:3000/api/auth/signup", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         fullName,
         userName,
         password,
         confirmedPassword,
         gender,
       }),
     });
      
      console.log(
        JSON.stringify({
          fullName,
          userName,
          password,
          confirmedPassword,
          gender,
        })
      );

     if (!res.ok) {
       const errorData = await res.json();
       console.log(errorData);
       throw new Error(errorData.error || "An unexpected error occurred");
     }


      const data = await res.json();
      if (data.error)
        throw new Error(data.error);

      //local storage

      localStorage.setItem("chat-app-user-info",JSON.stringify(data));
      //context
      setAuthUser(data);
      // Handle successful signup
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

const handleInputErrors = async ({
  fullName,
  userName,
  password,
  confirmedPassword,
  gender,
}) => {
  if (!fullName || !userName || !password || !confirmedPassword || !gender) {
    toast.error("Please do fill all the fields below");
    return false;
  }

  if (password !== confirmedPassword) {
    toast.error("Passwords do not match");
    console.log({ fullName, userName, password, confirmedPassword, gender });
    return false;
  }

  if (password.length < 6) {
    toast.error("Password need to be at least 6 characters");
    return false;
  }
};
