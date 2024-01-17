const PERMISSION_KEY = 'PERMISSIONS';

const setPermissions = (payload: unknown): null => {
  try {
    const permissions = JSON.stringify(payload);
    localStorage.setItem(PERMISSION_KEY, permissions);
    return null;
  } catch {
    return null;
  }
};

const getPermissions = (): string[] => {
  try {
    const permissions = localStorage.getItem(PERMISSION_KEY);
    return JSON.parse(permissions) ?? [];
  } catch {
    return [];
  }
};

export default {
  setPermissions,
  getPermissions,
};
