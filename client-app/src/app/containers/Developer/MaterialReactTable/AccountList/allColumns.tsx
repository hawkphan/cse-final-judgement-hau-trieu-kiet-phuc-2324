import { formatDate, formatValueOrNull, getStartCase, getTitleCase, isEmpty } from '@common-utils';
import { Tag } from '@components';
import { OptionType, STATUS, UserProfile } from '@queries';
import { MRT_ColumnDef } from 'material-react-table';

export enum MoreOptionIndex {
  _Deactivate = 1,
  _Reactivate = 2,
}

const customStatusRender = (status: string) => {
  if (!status) return '--';
  switch (status) {
    case STATUS.ACTIVE:
      return (
        <Tag isLight variant="is-success">
          {getTitleCase(status)}
        </Tag>
      );
    case STATUS.INACTIVE:
    default:
      return (
        <Tag isLight variant="is-black">
          {getTitleCase(status)}
        </Tag>
      );
  }
};

// type metaType =
//   | MUIDataTableMeta
//   | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: UserProfile[] });

export const getMoreOptions = (params: {
  MoreOptionItems: OptionType[];
  userProfile: UserProfile;
  hasPermissionsToUpdate: boolean;
  hasPermissionsToDelete: boolean;
}) => {
  const { MoreOptionItems, hasPermissionsToDelete, hasPermissionsToUpdate, userProfile } = params;
  const [editOption, deactivateOption, reactiveOption, deleteOption] = MoreOptionItems;
  const allOptions = [];
  if (hasPermissionsToUpdate) {
    allOptions.push(editOption);
    switch (userProfile.status) {
      case STATUS.INACTIVE:
        allOptions.push(reactiveOption);
        break;
      case STATUS.ACTIVE:
      default:
        allOptions.push(deactivateOption);
        break;
    }
  }
  if (hasPermissionsToDelete) allOptions.push(deleteOption);

  return allOptions;
};

export const allColumns = (): MRT_ColumnDef<UserProfile>[] => [
  {
    accessorKey: 'fullName',
    header: 'Name',
    enableColumnFilterModes: false,
    enableSorting: true,
    Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
  },
  {
    accessorKey: 'email',
    header: 'Email Address',
    enableColumnFilterModes: false,
    enableSorting: true,
    Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
  },
  {
    accessorKey: 'username',
    header: 'Username',
    enableColumnFilterModes: false,
    enableSorting: true,
    Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
  },
  {
    accessorKey: 'roles',
    header: 'Roles',
    enableColumnFilterModes: false,
    enableSorting: false,
    Cell: ({ cell }) => {
      const roles = cell.getValue<{ name: string }[]>() || [];
      return isEmpty(roles) ? '--' : roles.map((r) => r.name).join(', ');
    },
  },
  {
    accessorKey: 'userType',
    header: 'User Type',
    enableColumnFilterModes: false,
    enableSorting: true,
    Cell: ({ cell }) => formatValueOrNull(getStartCase(cell.getValue<string>())),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableColumnFilterModes: false,
    enableSorting: true,
    Cell: ({ cell }) => customStatusRender(cell.getValue<string>()),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created Date',
    enableColumnFilterModes: false,
    enableSorting: true,
    Cell: ({ cell }) => formatDate(cell.getValue<string>()) ?? '--',
  },
];
