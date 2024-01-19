import { Button, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useStore } from "../../shared/common/stores/store";

export default function LoginForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => userStore.login(values)}
    >
      {({ handleSubmit }) => (
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
          <Button type="submit">Log in</Button>
        </Form>
      )}
    </Formik>
  );
}
