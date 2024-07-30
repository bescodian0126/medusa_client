import { CategoriesQueryOptionsType, Category } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import backend_http from '@framework/utils/backend_http';

export const fetchCategories = async () => {
  const {
    data: { data },
  } = await backend_http.get(API_ENDPOINTS.CATEGORIES);
  // console.log(data);
  return {
    categories: {
      data: data as Category[],
    },
  };
};

export const fetchCategories_old = async () => {
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.CATEGORIES_2);
  // console.log(data);
  return {
    categories: {
      data: data,
    },
  };
};

const fetchAncientCategories = async () => {
  const {
    data: { data },
  } = await backend_http.get(API_ENDPOINTS.CATEGORIES_ANCIENT);

  return {
    categories: {
      data: data as Category[],
    },
  };
};

export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  if (options.demoVariant === 'ancient') {
    return useQuery<{ categories: { data: Category[] } }, Error>({
      queryKey: [API_ENDPOINTS.CATEGORIES, options],
      queryFn: fetchAncientCategories
    });
  }
  return useQuery<{ categories: { data: Category[] } }, Error>({
    queryKey: [API_ENDPOINTS.CATEGORIES, options],
    queryFn: fetchCategories
  });
};


