
// import { ErrorService, Yup, getStartCase } from '../../../../shared';

// // export const RoleOptions = [
// //   { label: getStartCase(UserRole.SYSTEM_ADMINISTRATOR), value: UserRole.SYSTEM_ADMINISTRATOR },
// //   { label: getStartCase(UserRole.USER), value: UserRole.USER },
// // ];

// // export const StatusOptions = [
// //   { label: getStartCase(Status.ACTIVE), value: STATUS.ACTIVE },
// //   { label: getStartCase(STATUS.INACTIVE), value: STATUS.INACTIVE },
// // ];

// /**
//  * ************** Types **************
//  */

// export enum ActiveType {
//   ACTIVE = 'ACTIVE',
//   INACTIVE = 'INACTIVE',
// }

// export interface AdminProfileForm {
//   id?: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   middleName: string;

//   email: string;
//   userType: UserType;
//   roles: UserRole[];
//   status: STATUS;
// }

// export const initialUser: AdminProfileForm = {
//   username: '',
//   firstName: '',
//   lastName: '',
//   email: '',
//   middleName: '',
//   roles: [],
//   userType: null,
//   status: STATUS.ACTIVE,
// };

// /**
//  * ************** Schemas **************
//  */
// export const UserFormSchema = Yup.object().shape({
//   username: Yup.string().required().username().max(25),
//   firstName: Yup.string()
//     .nullable()
//     .required()
//     .letterOnly(ErrorService.MESSAGES.pleaseUseEnglishAlphabetForInput)
//     .max(25)
//     .notTrimmable(),
//   lastName: Yup.string()
//     .nullable()
//     .required()
//     .letterOnly(ErrorService.MESSAGES.pleaseUseEnglishAlphabetForInput)
//     .max(25)
//     .notTrimmable(),
//   middleName: Yup.string()
//     .nullable()
//     .max(2)
//     .letterOnly(ErrorService.MESSAGES.pleaseUseEnglishAlphabetForInput)
//     .notTrimmable(),
//   email: Yup.string().nullable().email('Invalid email format. Please try again.').required(),
//   roles: Yup.array().min(1, 'This field must have at least 1 item.'),
//   userType: Yup.mixed().required(),
// });
