export type TaxBase = {
  id: string;
  name: string;
  percentage: number;
};

export type Taxable = {
  id: string;
  deleted: boolean;
  type: string;
};
