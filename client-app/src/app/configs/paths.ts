export const PATHS = {
  root: '/',
  dev: '/dev-container',
  welcome: '/welcome',
  signIn: '/login',
  myAccount: '/my-accounts',
  dashboard: '/dashboard',
  logout: '/logout',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  signUp: '/sign-up',

  // ======== Profile ========
  myProfile: '/me',
  changePassword: '/me/change-password',
  editMyProfile: '/me/edit',

  // ========= Agents ========
  accountManagement: '/account-management',

  // ========= Advanced Agreement ========
  advancedAgreement: '/advanced-agreements',
  advancedAgreementDetail: '/advanced-agreements/:id',

  // ========= Account Payable ========
  accountPayable: '/account-payable',
  accountPayablePartner: '/account-payable/partner',
  accountPayablePartnerDetail: '/account-payable/partner/:tab/:id',
  contractVendorDetail: '/account-payable/partner/:tab/:vendorId/:id',
  subcontractorProgramDetail: '/account-payable/partner/Subcontractors/:subcontractorId/:id',
  accountPayableInvoice: '/account-payable/invoice',
  accountPayableInvoiceDetail: '/account-payable/invoice/:type/:id',
  accountPayableAPAging: '/account-payable/apAging',

  // ========= Account Receivable ========
  accountReceivable: '/account-receivable',
  accountReceivableProgram: '/account-receivable/program',
  accountReceivableProgramDetail: '/account-receivable/program/:id/:tab',
  accountReceivableClients: '/account-receivable/clients',
  accountReceivableClientDetail: '/account-receivable/clients/:id',
  accountReceivableInvoice: '/account-receivable/invoice',
  accountReceivableInvoiceAdd: '/account-receivable/invoice/add-invoice',
  accountReceivableARAging: '/account-receivable/arAging',
  accountReceivableARAgingReport: '/account-receivable/templateReportArAging',
  accountReceivableARAgingReportDetail: '/account-receivable/previewReportARAging',
  accountReceivableProgramPlanningDetail:
    '/account-receivable/program/planning/:idContract/:idProgram/:idPlan',
  accountReceivableProgramChargeCodeDetail: '/account-receivable/program/chargeCode/:isFrom/:id',
  accountReceivableProgramInvoiceDetail: '/account-receivable/program/invoice/:id/:programId',

  rolesPermissions: '/roles-permissions',
  userPermissions: '/user-permissions',
  multiLanguages: '/multi-languages',
  // ========= Fiscal Year ========
  fiscalYears: '/fiscal-years',
  fiscalYearForm: '/fiscal-years/create',
  fiscalYearClosing: '/fiscal-year-closing/:id',
  fiscalYearDetail: '/fiscal-years/:id',

  settings: '/settings',

  // ========= Indirect Pool ========
  indirectPool: '/management/indirect-pool',
  indirectPoolTrend: '/management/indirectTrend',

  // ========= Management ========
  chargeCode: '/management/charge-code/:tab',
  chargeCodeDetail: '/management/charge-code/:tab/:id',
  coa: '/management/coa',
  payType: '/management/pay-type',
  financeCode: '/management/finance',
  department: '/management/department',
  departmentDetail: '/management/department/:isFrom/:id',

  // ========= Request ========
  request: '/request',
  createRequestDepartment: '/request/department/create',
  requestDetailDepartment: '/request/department/:id',
  createRequestProgram: '/request/program/create',
  requestDetailProgram: '/request/program/:id',
  createRequestSubChargeCode: '/request/general/create',
  requestDetailSubChargeCode: '/request/general/:id',
  purchaseRequest: '/request/purchase',
  requestTravelRequest: '/request/travel-request',
  requestTravelExpense: '/request/travelExpense',
  requestDetails: '/request/requestDetails',

  // ========= Transaction ========
  transaction: '/transaction',
  journalEntries: '/transaction/journal-entries',
  journalEntry: '/transaction/journal-entries/:id',
  newJournalEntry: '/transaction/new-journal-entry',

  // ========= Payment Entry ========
  paymentEntry: '/payment-entry',
  PaymentEntryDetail: '/payment-entry/:id',
  viewPaymentEntry: '/payment-entry/:id/:action',

  // ======== General Ledger ========
  generalLedgers: '/transaction/general-ledgers',
  generalLedger: '/transaction/general-ledgers/:id',

  // ======== Salary Period ========
  salaryPeriod: '/salary-period',
  salaryPeriodPayScheduleCalendar: '/salary-period/pay-schedule/calendar',
  salaryPeriodPayScheduleList: '/salary-period/pay-schedules',
  salaryPeriodTimeCard: '/salary-period/time-card/:tab',
  salaryPeriodEmployees: '/salary-period/employees',
};

export const PATH_HEADERS = {
  [PATHS.myProfile]: 'My Profile',
  [PATHS.editMyProfile]: 'My Profile',
  [PATHS.changePassword]: 'Change Password', // pragma: allowlist secret
};

export const HIDE_NAV_PATHS: string | string[] = [];
