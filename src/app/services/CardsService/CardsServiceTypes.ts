export type Card = {
  user_id: number;
  template: string;
  fio: string;
  first_name: string;
  last_name: string;
  pat_name: string;
  phone: string;
  sms_verify: true;
  email: string;
  birthday: string;
  gender: string;
  car_number: string;
  discount: string;
  bonus: string;
  bonus_last: string;
  write_off_last: string;
  loyalty_level: string;
  summ: string;
  summ_all: string;
  summ_last: string;
  visits: string;
  visits_all: string;
  date_last: string;
  barcode: string;
  city: string;
  confirm_code: string;
  delivery_form: string;
  o_s: string;
  link: string;
  referal: string;
  backgroundColor: string;
  created_at: string;
};

export type MetaParams = {
  size?: number;
  limit: number;
  offset: number;
};

export type GetCardSearchParams = {
  phone?: string;
  template?: string;
} & MetaParams;

export type GetClientsResponse = {
  meta: MetaParams;
  passes: Card[];
};
