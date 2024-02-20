import { Button } from "@mui/material";

type LayoutProps = {
  children: React.ReactNode | undefined;
};

export default function Header({ children }: LayoutProps) {
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
      <div style={{ maxWidth: "50%", wordWrap: "break-word", margin: "auto" }}>
        <div style={{width: '80%'}}>
          <p style={{ fontSize: 24, fontWeight: "bold", color: "red" }}>
            Title Content
          </p>
          <p>
            This is some text in a paragraph. ContentContentContentCont
            entContentContentContent
            {children}
          </p>
          <Button
            variant="contained"
            color="success"
            style={{ borderRadius: 20 }}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
