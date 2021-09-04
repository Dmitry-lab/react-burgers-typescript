export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TOrder = {
  _id: string;
  number: string;
  name: string;
  date: string;
  price: number;
  status: string;
  ingredients: Array<string>;
  updatedAt: string;
};

export type TUserInfoResponse = {
  success: boolean;
  user: { email: string; name: string };
  accessToken: string
  refreshToken: string;
} 

export type TTabNames = 'buns' | 'sauces' | 'main' | '';

export type TStatusName = {
  [key in string]: 'Создан' | 'Готовится' | 'Выполнен';
}