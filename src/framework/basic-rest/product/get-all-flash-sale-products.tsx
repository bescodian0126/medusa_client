import { QueryOptionsType } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import backend_http from '@framework/utils/backend_http';

export const fetchFlashSaleProducts_old = async () => {
  const { data } = await http.get(API_ENDPOINTS.FLASH_SALE_PRODUCTS);
  return data;
};

export const fetchFlashSaleProducts = async () => {
  const { data } = await backend_http.get(API_ENDPOINTS.FLASH_SALE_PRODUCTS);
  return data;
};

const fetchAncientFlashSaleProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.FLASH_SALE_PRODUCTS_ANCIENT);
  return data;
};

export const useFlashSaleProductsQuery = (options: QueryOptionsType) => {
  if (options.demoVariant === 'ancient') {
    return useQuery<any, Error>({
      queryKey: [API_ENDPOINTS.FLASH_SALE_PRODUCTS_ANCIENT, options],
      queryFn: fetchAncientFlashSaleProducts
    });
  }

  return useQuery<any, Error>({
    queryKey: [API_ENDPOINTS.FLASH_SALE_PRODUCTS, options],
    queryFn: fetchFlashSaleProducts
  });
};
