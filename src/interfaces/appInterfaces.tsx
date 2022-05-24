export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  username: string;
  btc: number;
  usd: number;
  auth_token: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  map: any;
}

export interface Transaction {
  id: number;
  type_transaction: string;
  type_coin_send: string;
  type_coin_get: string;
  amont_to_send: number;
  amont_to_get: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}
