import { Alert, Button, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useStore } from "../../../shared/common/stores/store";
import { Label } from "@mui/icons-material";

export default function LoginForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch((error) => setErrors({ error: "invalid email or password" }))
      }
    >
      {({ handleSubmit, errors }) => (
        <Form className="ui form" autoComplete="on" onSubmit={handleSubmit}>
          <Field
            as={TextField}
            type="text"
            label="Email"
            name="email"
            onBlur={() => {}}
          />
          <Field
            as={TextField}
            type="password"
            label="Password"
            name="password"
          />
          <ErrorMessage
            name="error"
            render={() => (
              <Typography variant="h6" component="h2">
                {errors.error}
              </Typography>
            )}
          />
          <Button type="submit">Log in</Button>
        </Form>
      )}
    </Formik>
  );
}
