import axios from 'axios';

export const ethereumAxiosInstance = axios.create({
  baseURL:
    'https://raw.githubusercontent.com/CryptoRStar/GasPriceTestTask/main/gas_price.json',
});
