import { ContactData } from "./contact";

export interface OrganizationData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
  id?: number;
  contacts?: ContactData[];
}
