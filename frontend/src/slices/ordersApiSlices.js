import { apiSlice} from './apiSlice';
import { ORDERS_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) =>
      ({
        url: ORDERS_URL,
        method: 'POST',
        body: {...order},
      })
    }),
      getMyOrders: builder.query({
        query: () => fetch(`${ORDERS_URL}/mine`),
      }),keepUnusedDataFor: 5,
    }),
});

export const { useCreateOrderMutation,useGetMyOrdersQuery } =orderApiSlice;