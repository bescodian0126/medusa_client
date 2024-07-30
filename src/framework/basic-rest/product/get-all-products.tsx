import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "@tanstack/react-query";
import backend_http from "@framework/utils/backend_http";
type PaginatedProduct = {
	data: Product[];
	paginatorInfo: any;
};
const fetchProducts = async ({ queryKey }: any) => {
	const [_, options] = queryKey; // Destructure the queryKey to get options  
	const { category, price, sort_by } = options; // Assuming 'query' is the parameter you need
	console.log(category, price);
	const { data } = await backend_http.get(`${API_ENDPOINTS.PRODUCTS}`, {
		params: { category, price, sort_by }, // Passing query parameters  
	});
	return {
		data: data,
		paginatorInfo: {
			nextPageUrl: "",
		},
	};
};

const useProductsQuery = (options: QueryOptionsType) => {
	return useInfiniteQuery<PaginatedProduct, Error>({
		queryKey: [API_ENDPOINTS.PRODUCTS, options],
		queryFn: fetchProducts,
		initialPageParam: 0,
		getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
	});
};

export { useProductsQuery, fetchProducts };
