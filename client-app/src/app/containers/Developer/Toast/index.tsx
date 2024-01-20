import { Box, Stack } from "@mui/material";
import { Button, Toastify, Typo } from "../../../shared";


const TemplateToast = () => {
  return (
    <Box>
      <Typo mb={1}>Toast</Typo>
      <Stack direction={'row'} gap={2}>
        <Button onClick={() => Toastify.success('Test Toast Success')}>Toast Success</Button>
        <Button onClick={() => Toastify.error('Test Toast Error')}>Toast Error</Button>
        <Button onClick={() => Toastify.info('Test Toast Info')}>Toast Info</Button>
        <Button onClick={() => Toastify.warning('Test Toast Warning')}>Toast Warning</Button>
      </Stack>
    </Box>
  );
};

export default TemplateToast;
