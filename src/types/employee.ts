export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  dynamicFields: {
    [key: string]: string | string[];
  };
}
