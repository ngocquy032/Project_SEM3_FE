export interface UserModel {
  userId: number;
  name: string;
  email: string;
  phone: string;

  streetAddress?: string;
  avatar?: string;
  description?: string;
  postcodeZip?: string;
  level?: string;
  country?: string;
  town?: string;
  district?: string;
  lastName?: string;
  firstName?: string;
  password?: string;
  blogComments?: any[];
  blogs?: any[];
  orders?: any[];
}
