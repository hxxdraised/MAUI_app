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
  role: 'SUPERADMIN' | 'ADMIN' | 'USER';
  avatarUrl: string;
  vpn: IVpnConfigInfo[];
}
