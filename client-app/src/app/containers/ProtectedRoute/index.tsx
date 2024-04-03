import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { useStore } from "../../shared/common/stores/store";
import { LoadingCommon } from "../../shared";

interface Props {
  authRequired?: boolean;
  children?: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children, authRequired = true }) => {
  const location = useLocation();
  const { userStore } = useStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      await userStore.getUser();
      setIsAuthenticated(userStore.isLoggedIn);
      setIsLoading(false);
    };

    fetchUser();
  }, [userStore, userStore.isLoggedIn]);

  if (isLoading) {
    return <LoadingCommon />;
  }

  if ((isAuthenticated && authRequired) || (!isAuthenticated && !authRequired)) {
    return <>{children}</>;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoute;
