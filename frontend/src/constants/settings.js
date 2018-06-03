import { settingsPath } from '../lib/paths';

const ACCOUNT_TAB_NAME = 'account';
const ACCOUNT_TAB_CONTENT = 'Account settings';
export const ACCOUNT_TAB = `?tab=${ACCOUNT_TAB_NAME}`;

const SECURITY_TAB_NAME = 'security';
const SECURITY_TAB_CONTENT = 'Security and Login';
export const SECURITY_TAB = `?tab=${SECURITY_TAB_NAME}`;

export const MENU_UI_NAME_MAP = new Map([
  [ACCOUNT_TAB_NAME, ACCOUNT_TAB_CONTENT],
  [SECURITY_TAB_NAME, SECURITY_TAB_CONTENT],
]);

export const MENU_UI_NAME_ICON_MAP = new Map([
  [ACCOUNT_TAB_NAME, 'user'],
  [SECURITY_TAB_NAME, 'lock'],
]);

export const GENERAL_SETTINGS_MENU_ITEMS = [
  {
    to: { pathname: settingsPath, search: ACCOUNT_TAB },
    name: ACCOUNT_TAB_NAME,
    content: ACCOUNT_TAB_CONTENT,
  },

  {
    to: { pathname: settingsPath, search: SECURITY_TAB },
    name: SECURITY_TAB_NAME,
    content: SECURITY_TAB_CONTENT,
  },
];
