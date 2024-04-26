export enum FetchStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type UserRole = 'SUPERADMIN' | 'ADMIN' | 'USER';

export interface IPaginationResponse<ResponseData> {
  data: ResponseData[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
export interface IVpnConfigInfo {
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
