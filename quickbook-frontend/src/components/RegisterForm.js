// import React from "react";
// import { Button, Checkbox, Form, Input, message } from "antd";
// import axios from "axios";

// const { register } = useAuth();

// const onFinish = async (values) => {
//   await wrapPromiseWithToast(
//     register(email, password, riotName, tagline, region),
//     {
//       pending: "Registering...",
//       success: "Registered successfully!",
//       error: (err) =>
//         err.response?.data?.detail?.toString?.() ||
//         err.reponse?.data?.details?.[0]?.toString?.() ||
//         "Error registering!",
//     }
//   );
//   try {
//     const response = await axios.post("http://localhost:8090/register", values);
//     console.log("Registration successful:", response.data);
//     const userData = response.data;
//     const res = response.data;
//     if (res.success) {
//       message.success(res.message);
//     } else {
//       message.error(res.message);
//     }
//   } catch (error) {
//     //   console.log('Success:', values);

//     console.error("Form submission failed:", error);
//     message.error("Form submission failed. Please try again later.");
//   }
// };
// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

// const handleClose = () => {};

// const RegisterForm = () => (
//   <div className="popup">
//     <div className="popup-inner">
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <h3
//           style={{
//             color: "black",
//           }}
//         >
//           {" "}
//           Register now!
//         </h3>
//         <button onClick={handleClose} style={{ padding: "5px" }}>
//           x
//         </button>
//       </div>

//       <Form
//         name="basic"
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         style={{
//           maxWidth: 600,
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             {
//               required: true,
//               message: "Please input your email!",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           label="Username"
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: "Please input your username!",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Please input your password!",
//             },
//           ]}
//         >
//           <Input.Password />
//         </Form.Item>

//         {/* <Form.Item
//       name="remember"
//       valuePropName="checked"
//       wrapperCol={{
//         offset: 8,
//         span: 16,
//       }}
//     >
//       <Checkbox>Remember me</Checkbox>
//     </Form.Item> */}

//         <Form.Item
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   </div>
// );

// export default RegisterForm;






import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import wrapPromiseWithToast from "../utils/wrapPromiseWithToast";
import { TextField, Button, Box, Typography, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import a close icon from Material UI
import { useAuth } from '../context/auth.context';
import { message } from "antd";

const RegisterForm = () => {
  // State to manage the form's visibility
  const [isVisible, setIsVisible] = useState(true);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {register} = useAuth();

  // Function to check if all required fields are filled
  const validateFields = () => {
    const missingFields = [];
    if (!username) missingFields.push("Username");
    if (!email) missingFields.push("Email");
    if (!password) missingFields.push("Password");

    if (missingFields.length) {
      toast.error(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return false; // Validation failed
    }

    return true; // Validation succeeded
  };

  // Function to simulate registration process
  const handleRegister = async () => {
    if (validateFields()) {
      try {
        // Await the asynchronous register function to ensure proper error handling
        const response = await register(username, email, password);
        const res=response.data;
        if (res.success) {
          // Registration was successful
          // message.success("Registration successful!");
          toast.success("Successfully registered!");
        } else {
          // If success is false, display error messages
          // message.error(response.message || "Registration failed.");
          toast.error(res.message || "Registration failed. Please try again.");
        }
  
      } catch (error) {
        // Handle exceptions and unexpected errors
        console.error("Error during registration:", error);
  
        const errorMessage = error.response?.data?.error || "An unexpected error occurred.";
        message.error(errorMessage); // Display error message from server
        toast.error("An error occurred during registration. Please try again.");
      }
    } else {
      // Validation failed, inform user to fill in required fields
      toast.error("Please fill in all required fields.");
    }
  };

  // Function to close the form
  const closeForm = () => {
    setIsVisible(false); // Hide the form
  };

  if (!isVisible) {
    return null; // Don't render if the form is not visible
  }

  return (
    <>
      <Box component="form" onSubmit={(e) => e.preventDefault()}> {/* Prevent default submit */}
          <TextField
            name="username"
            label="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button
            type="button" // To prevent default form submission
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
    </>
  );
};

export default RegisterForm;