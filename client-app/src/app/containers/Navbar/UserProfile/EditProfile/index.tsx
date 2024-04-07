import Box from "@mui/joy/Box";
import EditProfileForm from "./components/EditProfileForm";

export default function EditProfile() {
  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Box
        component="main"
        className="MainContent"
        sx={{
          pt: { xs: "calc(12px + var(--Header-height))", md: 3 },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100dvh",
          gap: 1,
          overflow: "auto",
        }}
      >
        <EditProfileForm />
      </Box>
    </Box>
  );
}
