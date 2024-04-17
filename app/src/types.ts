export enum FetchStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type UserRole = 'SUPERADMIN' | 'ADMIN' | 'USER';

interface IVpnConfigInfo {
  id: string;
  name: string;
}
export interface IUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  avatarUrl: string;
  vpn: IVpnConfigInfo[];
}
