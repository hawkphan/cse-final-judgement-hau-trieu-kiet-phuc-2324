/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useStore } from "../../../shared/common/stores/store";
import { PATHS } from "../../../configs/paths";
import { COLOR_CODE, Link } from "../../../shared";
import { useEffect, useState } from "react";

function Copyright(props: any) {
  const navigate = useNavigate();

  const handleNavigateToProblems = () => {
    navigate(PATHS.problems);
  };

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" onClick={handleNavigateToProblems}>
        CodeCrafter
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function LoginSide() {
  const [error, setError] = useState<string | null>(null);
  const [rememberMeChecked, setRememberMeChecked] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { userStore } = useStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      await userStore.login({ email, password });

      if (rememberMeChecked) {
        localStorage.setItem("loginEmail", email);
        localStorage.setItem("loginPassword", password);
        localStorage.setItem("rememberMeChecked", "true");
      } else {
        localStorage.removeItem("loginEmail");
        localStorage.removeItem("loginPassword");
        localStorage.removeItem("rememberMeChecked");
      }

      setError("");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const onChangeCheckbox = (event) => {
    setRememberMeChecked(event.target.checked);
  };

  useEffect(() => {
    if (localStorage.loginEmail !== null) {
      setEmail(localStorage.getItem("loginEmail"));
      setPassword(localStorage.getItem("loginPassword"));
      setRememberMeChecked(
        localStorage.getItem("rememberMeChecked") === "true" ? true : false
      );
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                }}
                value={email}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMeChecked}
                    color="primary"
                    onChange={onChangeCheckbox}
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log in
              </Button>
              <Typography component="h6" variant="h6" color={COLOR_CODE.DANGER}>
                {error}
              </Typography>
              <Grid container>
                {/* Not implemented yet */}
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <RouterLink to={PATHS.signup}>
                    {"Don't have an account? Sign Up"}
                  </RouterLink>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
