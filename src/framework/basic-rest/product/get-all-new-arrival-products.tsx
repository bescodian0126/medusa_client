import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import backend_http from '@framework/utils/backend_http';

export const fetchNewArrivalProducts_old = async () => {
  const { data } = await http.get(API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS);
  return data as Product[];
};

export const fetchNewArrivalProducts = async () => {
  const { data } = await backend_http.get(API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS);
  return data as Product[];
};

const fetchNewArrivalAncientProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS_ANCIENT);
  return data as Product[];
};

export const useNewArrivalProductsQuery = (options: QueryOptionsType) => {
  if (options.demoVariant === 'ancient') {
    return useQuery<Product[], Error>({
      queryKey: [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS_ANCIENT, options],
      queryFn: fetchNewArrivalAncientProducts
    });
  }
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.PRODUCTS_ANCIENT, options],
    queryFn: fetchNewArrivalProducts
  });
};
