import { getStartCase } from '../utils/format';
import navigator from './navigator';

const LOCAL_STORAGE_COMPANY_ID = 'companyId';
const LOCAL_STORAGE_FISCAL_YEAR_ID = 'fiscalYearId';
const LOCAL_STORAGE_EMPLOYEE_ID = 'employeeId';
const LOCAL_STORAGE_DEPARTMENT_ID = 'departmentId';

export enum Tenants {
  ADMIN = 'admin',
}

const TenantOptions = Object.values(Tenants).map((value) => ({
  label: getStartCase(value),
  isHideOnProduction: false,
  value,
}));

const DefaultTenant = Tenants.ADMIN;

type Tenant = {
  name: string;
};

let _tenant: Tenant = {
  name: '',
};

const setTenant = (tenant?: Tenant) => {
  if (tenant) _tenant = tenant;
};

const getTenant = () => _tenant;

const getWebTenant = () => {
  const subDomain = navigator.getSubdomain();
  const isHasSubdomain = Object.values(Tenants).some((item) => item === subDomain);
  const validSubdomain = isHasSubdomain ? subDomain : DefaultTenant;
  return validSubdomain;
};

const changeWebTenant = (tenant: string) => {
  const validSubdomain = getWebTenant();
  if (tenant !== validSubdomain) {
    // const nextDomain = tenant === DefaultTenant ? '' : tenant;
    // return navigator.jumpToCrossDomain(nextDomain);
  }
};

// ================== Check tenant ==================
const isAdmin = () => _tenant?.name === Tenants.ADMIN;

const setCompanyId = (companyId: string) => {
  localStorage.setItem(LOCAL_STORAGE_COMPANY_ID, JSON.stringify(companyId));
};

const setFiscalYearId = (companyId: string) => {
  localStorage.setItem(LOCAL_STORAGE_FISCAL_YEAR_ID, JSON.stringify(companyId));
};

const setDepartmentId = (departmentId: string) => {
  localStorage.setItem(LOCAL_STORAGE_DEPARTMENT_ID, JSON.stringify(departmentId));
};

const setEmployeeId = (employeeId: string) => {
  localStorage.setItem(LOCAL_STORAGE_EMPLOYEE_ID, JSON.stringify(employeeId));
};

const getCompanyId = (): string => {
  const result = localStorage.getItem(LOCAL_STORAGE_COMPANY_ID);
  if (result) return JSON.parse(result);
  return null;
};

const getFiscalYearId = (): string => {
  const result = localStorage.getItem(LOCAL_STORAGE_FISCAL_YEAR_ID);
  if (result) return JSON.parse(result);
  return null;
};

const getDepartmentId = (): string => {
  const result = localStorage.getItem(LOCAL_STORAGE_DEPARTMENT_ID);
  if (result) return JSON.parse(result);
  return null;
};

const getEmployeeId = (): string => {
  const result = localStorage.getItem(LOCAL_STORAGE_EMPLOYEE_ID);
  if (result) return JSON.parse(result);
  return null;
};

export {
  DefaultTenant,
  TenantOptions,
  changeWebTenant,
  getCompanyId,
  getFiscalYearId,
  getTenant,
  getWebTenant,
  isAdmin,
  setCompanyId,
  setFiscalYearId,
  setTenant,
  setDepartmentId,
  getDepartmentId,
  setEmployeeId,
  getEmployeeId,
};
