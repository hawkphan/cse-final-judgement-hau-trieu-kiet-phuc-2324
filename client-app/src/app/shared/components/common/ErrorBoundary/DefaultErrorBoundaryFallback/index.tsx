import { PATHS } from '@app-config/paths';
import { Button, Typo } from '@components';
import { Box, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FallbackProps } from '../CustomErrorBoundary';

const DefaultErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
  showErrorMessage = false,
}) => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    resetErrorBoundary();
    navigate(PATHS.dashboard);
  };

  const handleTryAgain = () => {
    resetErrorBoundary();
    window.location.reload();
  };

  return (
    <Container>
      <Box minHeight="70vh" pt={8} textAlign="center">
        <Typo variant="h2">Unfortunately, something went wrong.</Typo>
        <Typo mt={4}>
          Please refresh your browser. If the error continues, please contact our support team.
        </Typo>

        {showErrorMessage && (
          <Box mt={4}>
            <pre>{error?.message}</pre>
          </Box>
        )}

        <Stack direction="row" alignItems="center" justifyContent="center" mt={4} spacing={3}>
          <Button onClick={handleBackToHome}>Back to Home</Button>
          <Button onClick={handleTryAgain} variant="outline">
            Try again
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default DefaultErrorFallback;
