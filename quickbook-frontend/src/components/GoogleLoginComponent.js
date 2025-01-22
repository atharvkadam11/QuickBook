import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { Button } from "antd";
import { useAuth } from "../context/auth.context";

function GoogleLoginComponent() {
  const { setUser } = useAuth();

  const handleGoogleLoginSuccess = async (response) => {
    console.log("Login Success:", response);
    const token = response.credential;

    const res = await fetch("http://localhost:3001/login/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Server response:", data);

      // Assuming your server returns user details
      const user = data;
      setUser(user); // Set user details in the Auth context
    } else {
      console.error("Login failed with status:", res.status);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Login Failed:", error);
    // Handle the error
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: handleGoogleLoginFailure,
  });

  return (
    <Button
      onClick={() => login()}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "30px",
        fontSize: "25px",
      }}
    >
      Sign In with Google 🚀
    </Button>
  );
}

export default GoogleLoginComponent;
