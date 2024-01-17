import { emptyFunction, handleShowErrorMsg } from '@common-utils';
import {
  Button,
  CustomTableFilterContainer,
  CustomTableSearch,
  Grid,
  Table2,
  Typo,
} from '@components';
import {
  AutoDeleteOutlined,
  CheckCircleOutlineRounded,
  EditOutlined,
  ErrorOutlineRounded,
} from '@mui/icons-material';
import { Box, Container, MenuItem, Stack } from '@mui/material';
import { GetPropertiesParams, UserProfile, useGetAllUsers, useMyPermissions } from '@queries';
import { hideAllDialog, hideDialog, showDialog } from '@redux/dialog/dialogSlice';
import { DIALOG_TYPES } from '@redux/dialog/type';
import React, { useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import AccountDetail from 'src/containers/AccountManagement/AccountDetail';
import AccountForm from 'src/containers/AccountManagement/AccountForm';
import AccountFilter from 'src/containers/AccountManagement/AccountList/AccountFilter';
import AccountFilterChips from 'src/containers/AccountManagement/AccountList/AccountFilterChips';
import ChangeStatusModal from 'src/containers/AccountManagement/AccountList/ChangeStatusModal';
import DeleteAccountModal from 'src/containers/AccountManagement/AccountList/DeleteAccountModal';
import PermissionRestrict from 'src/containers/StartupContainers/PermissionRestrict';
import { Callback } from 'src/redux/types';
import { allColumns, getMoreOptions } from './allColumns';
import { ActiveType } from './helpers';

const AccountManagement: React.FC<Props> = ({ onHideDialog, onShowDialog }) => {
  const { permissionStore, loading } = useMyPermissions();
  const hasPermissionToView = permissionStore.user.canView;
  const hasPermissionsToUpdate = permissionStore.user.canUpdate;
  const hasPermissionsToDelete = permissionStore.user.canDelete;
  const hasPermissionsToCreate = permissionStore.user.canCreate;

  const { users, totalRecords, setParams, isFetching, isError } = useGetAllUsers({
    onError: (error) => handleShowErrorMsg(error),
  });

  const handleGetAccounts = (params: GetPropertiesParams & { roles: string }) => {
    setParams({ ...params, roles: params.roles ? params.roles.toString().split(',') : undefined });
  };

  const handleShowConfirmCancelModal =
    (onCancelClick: Callback = emptyFunction, onConfirmClick: Callback = emptyFunction) =>
    () => {
      onShowDialog({
        type: DIALOG_TYPES.YESNO_DIALOG,
        data: {
          title: 'Confirm Cancel',
          content: 'Cancel editing? Change you made will not be saved.',
          onCancel: () => {
            onHideDialog();
            onCancelClick();
          },
          onOk: () => {
            onHideDialog();
            onHideDialog();

            onConfirmClick();
          },
          cancelText: 'No, keep it',
          okText: 'Yes, confirm',
        },
      });
    };

  const handleViewAccountDetail = (rowIndex: number) => {
    const index = rowIndex;
    const user = users[index];
    const userId = user.id;
    onShowDialog({
      type: DIALOG_TYPES.CONTENT_DIALOG,
      data: {
        hideTitle: true,
        content: <AccountDetail userId={userId} onCancel={handleShowConfirmCancelModal} />,
        maxWidth: 'md',
      },
    });
  };

  const handleAddUser = () => {
    onShowDialog({
      type: DIALOG_TYPES.CONTENT_DIALOG,
      data: {
        content: <AccountForm onCancel={handleShowConfirmCancelModal} />,
        maxWidth: 'md',
        hideTitle: true,
        // onCancel: handleShowConfirmCancelModal(),
      },
    });
  };

  const handleEditAccount = (user: UserProfile) => () => {
    onShowDialog({
      type: DIALOG_TYPES.CONTENT_DIALOG,
      data: {
        content: <AccountForm onCancel={handleShowConfirmCancelModal} userId={user.id} isEditing />,
        hideTitle: true,
        maxWidth: 'md',
        overflowVisible: true,
        onCancel: handleShowConfirmCancelModal(),
      },
    });
  };

  const handleDeleteAccount = (user: UserProfile) => () => {
    onShowDialog({
      type: DIALOG_TYPES.CONTENT_DIALOG,
      data: {
        content: <DeleteAccountModal userId={user.id} />,
        maxWidth: 'xs',
        hideTitle: true,
      },
    });
  };

  const handleActivateAccount = (profile: UserProfile) => () => {
    const userId = profile.id;
    onShowDialog({
      type: DIALOG_TYPES.CONTENT_DIALOG,
      data: {
        content: <ChangeStatusModal userId={userId} action={ActiveType.ACTIVE} />,
        maxWidth: 'xs',
        hideTitle: true,
      },
    });
  };

  const handleDeactivateAccount = (profile: UserProfile) => () => {
    const userId = profile.id;
    onShowDialog({
      type: DIALOG_TYPES.CONTENT_DIALOG,
      data: {
        content: <ChangeStatusModal userId={userId} action={ActiveType.INACTIVE} />,
        maxWidth: 'xs',
        hideTitle: true,
      },
    });
  };

  const MoreOptionItems = useMemo(
    () => [
      {
        label: 'Edit',
        onClick: handleEditAccount,
        icon: <EditOutlined />,
      },
      {
        label: 'Deactivate',
        onClick: handleDeactivateAccount,
        icon: <ErrorOutlineRounded />,
      },
      {
        label: 'Reactivate',
        onClick: handleActivateAccount,
        icon: <CheckCircleOutlineRounded />,
      },
      {
        label: 'Delete',
        onClick: handleDeleteAccount,
        icon: <AutoDeleteOutlined />,
      },
    ],
    // eslint-disable-next-line
    [],
  );

  const columns = useMemo(
    () => allColumns(),
    // eslint-disable-next-line
    [users],
  );

  if (!hasPermissionToView) return <PermissionRestrict loading={loading} />;

  return (
    <Stack py={6}>
      <Container maxWidth="xl">
        <Typo variant="h1" sx={{ marginBottom: 2 }}>
          Account Management
        </Typo>
        <Grid.Wrap>
          <Grid.Item xs={4}>
            <CustomTableSearch placeholder="Search by username or full name or email" />
          </Grid.Item>
          <Grid.Item xs={4} />
          <Grid.Item xs={4}>
            <Stack justifyContent="flex-end" direction="row" flexGrow={1} alignItems="center">
              <CustomTableFilterContainer filterParamsKeys={['userType', 'roles']}>
                <AccountFilter />
              </CustomTableFilterContainer>
              {hasPermissionsToCreate && (
                <Button icon={<FaPlus />} className="fit-width ml-16" onClick={handleAddUser}>
                  Add User
                </Button>
              )}
            </Stack>
          </Grid.Item>
        </Grid.Wrap>
        <AccountFilterChips />
        <Box my={2}>
          <Table2<UserProfile>
            columns={columns}
            data={users}
            additionalFilterParams={['userType', 'roles']}
            // isLocalState
            recordName="accounts"
            onAction={handleGetAccounts}
            initialState={{
              sorting: [
                {
                  id: 'createdAt',
                  desc: true,
                },
              ],
              // columnPinning: { left: ['fullName'], right: ['mrt-row-actions'] },
            }}
            enableRowActions={true}
            rowCount={totalRecords}
            state={{
              showLoadingOverlay: isFetching,
              showProgressBars: isFetching,
              showAlertBanner: isError,
            }}
            renderRowActionMenuItems={({ row, closeMenu }) => {
              const allOptions = getMoreOptions({
                MoreOptionItems,
                userProfile: row.original,
                hasPermissionsToUpdate,
                hasPermissionsToDelete,
              });

              return allOptions.map((option) => {
                return (
                  <MenuItem
                    key={option.label}
                    onClick={() => {
                      option.onClick(row.original)();
                      closeMenu();
                    }}
                  >
                    {option.label}
                  </MenuItem>
                );
              });
            }}
            muiTableBodyRowProps={({ row }) => ({
              onClick: () => handleViewAccountDetail(row.index),
              sx: { cursor: 'pointer' },
            })}
          />
        </Box>
      </Container>
    </Stack>
  );
};

type Props = typeof mapDispatchToProps;

const mapDispatchToProps = {
  onShowDialog: showDialog,
  onHideDialog: hideDialog,
  onHideAllDialog: hideAllDialog,
};

export default connect(undefined, mapDispatchToProps)(AccountManagement);
