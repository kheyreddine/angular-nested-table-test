export interface Person {
  name: string;
  type: string;
  email: string;
  phoneNo: string;
  companyName: string;
  address: string;
  children?: Person[];
  expanded?: boolean; // Optional property for expand/collapse
  selected?: boolean;
}


