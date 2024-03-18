import { Button } from "@mui/material";

export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "500px",
      }}
    >
      <div
        style={{
          maxWidth: "100%",
          width: "50%",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <img src="src\assets\images\study-4522028_1280.png" width="80%" />
      </div>
      <div style={{ maxWidth: "50%", wordWrap: "break-word", margin: "auto", marginTop:'60px' }}>
        <div style={{ width: "80%" }}>
          <p style={{ fontSize: 50, fontWeight: "bolder", color: "white" }}>
            First step to your dream
          </p>
          <p style={{ fontSize: 18, color: 'white' }}>
            Are you ready to start a new journey? Do you want to learn about
            programming and want to become a professional coder in future? Let's
            start with registering your account.
          </p>
          <Button
            variant="contained"
            color="success"
            style={{ borderRadius: 20 }}
          >
            Register Your Account
          </Button>
        </div>
      </div>
    </div>
  );
}
