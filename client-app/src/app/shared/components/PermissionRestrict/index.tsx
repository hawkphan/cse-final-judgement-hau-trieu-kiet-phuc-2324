import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import "./styles.scss";
import { IMAGES } from "../../../configs/images";
import { LoadingCommon, Text } from "../common";

const PermissionRestrict: React.FC<{ loading?: boolean }> = ({
  loading = false,
}) => {
  return (
    <Stack py={6} marginTop={10}>
      <Container maxWidth="xl">
        {loading ? (
          <Typography textAlign="center">
            {"Loading your permissions to access this resource."}
            <LoadingCommon className="mt-16" />
          </Typography>
        ) : (
          <Typography textAlign="center" lineHeight={3}>
            <img src={IMAGES.noPermission} alt="403NoPermission" />
            <Text size={32} className="cmp-permission__restrict-title">
              No Permission
            </Text>
            <Text size={20} className="cmp-permission__restrict-content">
              Sorry, but you don’t have permission to access this page
            </Text>
          </Typography>
        )}
      </Container>
    </Stack>
  );
};

export default PermissionRestrict;
