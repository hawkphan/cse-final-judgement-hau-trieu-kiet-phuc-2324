import { Button } from "@mui/material";


type LayoutProps = {
  children: React.ReactNode | undefined;
};

export default function Header({ children }: LayoutProps) {
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        minHeight: "500px",
      }}
    >
      <div style={{ maxWidth: "100%", width: '50%', margin: 'auto' }}>
        <img
          src="src\assets\folder-icon.png"
          alt="Girl in a jacket"
          width="100%"
        />
      </div>
      <div style={{  maxWidth: "50%", wordWrap: 'break-word', margin: 'auto' }}>
        <h3>Content</h3>
        <p>
          This is some text in a paragraph.
          ContentContentContentCont entContentContentContent
          {children}
        </p>
        <Button variant="contained" color="success">
          Create Account
        </Button>
      </div>
    </div>
  );
}
