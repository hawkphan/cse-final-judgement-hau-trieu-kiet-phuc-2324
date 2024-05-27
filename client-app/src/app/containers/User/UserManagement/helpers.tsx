

export const getTabList = () => {
  
    return [
      {
        label: "Charts",
        value: "tab1",
      },
      {
        label: "User Accounts",
        value: "tab2",
      },
    ];
  
};

export enum Tab {
  CHARTS = "tab1",
  USER_ACCOUNTS = "tab2"
}
