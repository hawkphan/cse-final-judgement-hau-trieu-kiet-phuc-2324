import { Box, Button } from "@mui/material";
import bg from "../../../assets/images/Untitled.png";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../configs/paths";

const HomePage = () => {

  const navigate = useNavigate();

  const handleNavigateToProblems = () => {
    navigate(PATHS.problems);
  }

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "round",
      }}
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
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
          <div
            style={{
              maxWidth: "50%",
              wordWrap: "break-word",
              margin: "auto",
              marginTop: "60px",
            }}
          >
            <div style={{ width: "80%" }}>
              <p style={{ fontSize: 50, fontWeight: "bolder", color: "white" }}>
                First step to your dream
              </p>
              <p style={{ fontSize: 18, color: "white" }}>
                Are you ready to start a new journey? Do you want to learn about
                programming and want to become a professional coder in future?
                Let's start with registering your account.
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

        <div
          style={{
            textAlign: "center",
            margin: "auto",
            marginBottom: 28,
            marginTop: 0,

            alignContent: "center",
            minWidth: "200px",
            width: "600px",
            paddingTop: "150px",
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingBottom: "20px",
          }}
        >
          <p style={{ color: "#00A9F5", fontSize: 24, fontWeight: "bolder" }}>
            DEVELOPING YOUR SKILL
          </p>
          <p>
            Practice and training your coding skill with our library of
            programming problems. CodeCrafter is the promise land for programer
            to improve, and develop themselves.
          </p>
          <Button
            variant="contained"
            color="success"
            style={{ borderRadius: 20 }}
            onClick={handleNavigateToProblems}
          >
             Start your training
          </Button>
        </div>
        <div
          style={{
            textAlign: "center",
            margin: "auto",
            marginBottom: 30,
            marginTop: 30,
            maxWidth: "500px",
          }}
        >
          <p>
            If you are passionate about tackling some of the most interesting
            problems around, we would love to hear from you.  
          </p>
          <p style={{ color: "#00A9F5", fontSize: 16 }}>
            <a
              href="#"
              style={{ color: "#00A9F5", fontSize: 16, fontWeight: "bold" }}
            >
              Join with us
            </a>{" "}
            &#11166;
          </p>
        </div>
      </Box>
    </div>
  );
};

export default HomePage;
