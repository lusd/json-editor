export interface IJSONModel {
  id: string;
  address: string;
  name: string;
  email: string;
  phone?: string;
  about?: string;
  age?: number;
  company?: string;
  isActive?: boolean;
  picture?: string;
  registered?: string;
  tags?: string[];
}
