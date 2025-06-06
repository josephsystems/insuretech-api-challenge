import { KOBO } from 'src/product/constant';

export const toKobo = (amount: number) => amount * KOBO;

export const toNaira = (amount: number) => amount / KOBO;
