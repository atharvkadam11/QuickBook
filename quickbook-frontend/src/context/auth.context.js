import React, { createContext, useContext, useEffect, useState } from "react";
import apiService from "../services/api.service";
// import UserService from "../services/user.service";

const authContext = createContext({});

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

// const login = async (email, password) =>{

// }

const register = async (username, email, password) => {
    const res = await apiService.post('/users', { username, email, password });
    const user = res.data.user;
    setUser(user);
    return res;
    // try {
    //   console.log("Entered auth");
    //   const res = await apiService.post('/users', { username, email, password });
  
    //   const user = res.data.user; // Destructure the 'user' from the response data
    //   console.log("User registered:", user);
  
    //   return res; // Return the registered user data for further use
  
    // } catch (error) {
    //   console.error("Error registering user:", error);
  
    //   throw error; // Optionally, rethrow the error for the calling function to handle
    // } finally {
    //   console.log("Registration attempt complete"); // Clarify that registration completed (success or failure)
    // }
  };


  const login = async (username, password) => {
      // Make an asynchronous POST request to the login endpoint
      const res = await apiService.post('/login', { username, password });
  
      const user = res.data.user; // Assuming the response has a 'user' key
        setUser(user); // Store the user in state
        return res; 
  };

  const logout = () =>{
    setUser(null);
  }

//   const register = async (email, password, riot_name, tagline, region) => {
//     const { user, token } = await UserService.register(
//       email,
//       password,
//       riot_name,
//       tagline,
//       region
//     );
//     setUser(user);
//     localStorage.setItem("token", token);
//   }; // TODO

//   const contact_us = async (email, riot_name, tagline, region, subject, message) => {
//     await UserService.contact_us(
//       email,
//       riot_name,
//       tagline,
//       region,
//       subject,
//       message
//     );
//   }; 

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   const refreshUser = async () => {
//     const user = await UserService.whoami();
//     setUser(user);
//   };

//   const whoami = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         setLoading(true);
//         const user = await UserService.whoami();
//         setUser(user);
//         setLoading(false);
//       } else {
//         setUser(null);
//         setLoading(false);
//       }
//     } catch (error) {
//       localStorage.removeItem("token");
//       setUser(null);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     whoami();
//   }, []);

  return (
    <authContext.Provider
    value = {{register, login, user, logout}}
    //   value={{ user, login, logout, loading, register, refreshUser, contact_us }}
    >
      {children}
    </authContext.Provider>
  );
};
