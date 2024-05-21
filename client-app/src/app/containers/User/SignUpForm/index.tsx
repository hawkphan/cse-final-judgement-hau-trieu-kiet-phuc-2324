/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useStore } from "../../../shared/common/stores/store";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../configs/paths";
import { Link } from "@mui/material";
import { SignUpFormKey, SignUpLabel } from "./types";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        CodeCrafter
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const { userStore } = useStore();

  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate(PATHS.login);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get(SignUpFormKey.EMAIL) as string;
    const password = data.get(SignUpFormKey.PASSWORD) as string;
    const lastName = data.get(SignUpFormKey.LAST_NAME) as string;
    const firstName = data.get(SignUpFormKey.FIRST_NAME) as string;
    const userName = data.get(SignUpFormKey.USER_NAME) as string;
    const displayName = data.get(SignUpFormKey.DISPLAY_NAME) as string;

    try {
      await userStore.register({
        email,
        password,
        firstName,
        lastName,
        userName,
        displayName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete={SignUpFormKey.FIRST_NAME}
                  name={SignUpFormKey.FIRST_NAME}
                  required
                  fullWidth
                  id={SignUpFormKey.FIRST_NAME}
                  label={SignUpLabel[SignUpFormKey.FIRST_NAME]}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id={SignUpFormKey.LAST_NAME}
                  label={SignUpLabel[SignUpFormKey.LAST_NAME]}
                  name={SignUpFormKey.LAST_NAME}
                  autoComplete={SignUpFormKey.LAST_NAME}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id={SignUpFormKey.DISPLAY_NAME}
                  label={SignUpLabel[SignUpFormKey.DISPLAY_NAME]}
                  name={SignUpFormKey.DISPLAY_NAME}
                  autoComplete={SignUpFormKey.DISPLAY_NAME}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id={SignUpFormKey.EMAIL}
                  label={SignUpLabel[SignUpFormKey.EMAIL]}
                  name={SignUpFormKey.EMAIL}
                  autoComplete={SignUpFormKey.EMAIL}
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id={SignUpFormKey.USER_NAME}
                  label={SignUpLabel[SignUpFormKey.USER_NAME]}
                  name={SignUpFormKey.USER_NAME}
                  autoComplete={SignUpFormKey.USER_NAME}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={SignUpFormKey.PASSWORD}
                  label={SignUpLabel[SignUpFormKey.PASSWORD]}
                  type={SignUpFormKey.PASSWORD}
                  id={SignUpFormKey.PASSWORD}
                  autoComplete={SignUpFormKey.PASSWORD}
                />
              </Grid>
              {/* Unimplemented Function */}
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={handleNavigateToLogin} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
