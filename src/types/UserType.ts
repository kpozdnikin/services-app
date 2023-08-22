import { Session } from '@getsquire/sage/session';

export type UserType = Session['userKind'] | 'admin';
export type NonAdminUserType = Session['userKind'];
