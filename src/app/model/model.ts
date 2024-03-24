export interface User{
    userId: number;
    username:string;
    password:string;
    email: string;
    firstName: string;
    lastName: string;
    jmbg: string;
    position: string;
    phoneNumber: string;
    active: boolean;
    permissions:Permissions[]
}
export interface Permissions{
    permission_id?:number;
    name:string;
    description?:string;
}

export interface CreateUserRequest{
  email: string;
  firstName:string;
  lastName:string;
  jmbg:string;
  position:string;
  phoneNumber:string;
  active:boolean;
}
export interface TransactionBasics{
  outflow:string;
  inflow:string;
  amount:string;
}

export interface UserToEdit{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    position: string;
    status: string;
    jmbg: string;
    brlk: string;
    phone: string;
    active: boolean;
    birth_date: string;
}
export interface Forex {
  listingId: number;
  listingType: "Forex";
  ticker: string;
  name: string;
  exchange: string;
  lastRefresh: number;
  price: number;
  high: number;
  low: number;
  priceChange: number;
  volume: number;
  baseCurrency: string;
  quoteCurrency: string;
}

export interface ListingHistory {
  listingId: number;
  date: number;
  price: number;
  high: number;
  low: number;
  change: number;
  volume: number;
}

export interface Account {
  accountNumber: string;
  accountType: AccountType;
  currencyName: string;
  maintenanceCost: number;
}

export enum AccountType {
  FOREIGN_CURRENCY = "FOREIGN_CURRENCY",
  CURRENT = "CURRENT",
  BUSINESS = "BUSINESS"
}

