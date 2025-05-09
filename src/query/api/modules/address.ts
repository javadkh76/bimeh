import { publicMutator } from '@/query/mutator/public';
import { AddressesList200 } from '@/query/api/types/addressesList200';
import {
  QueryFunction,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query';

type SecondParameter<T extends (...args: never) => Promise<unknown>> = Parameters<T>[1];

export const addressesList = (
  params?: { page?: string },
  options?: SecondParameter<typeof publicMutator>,
  signal?: AbortSignal
) => {
  return publicMutator<AddressesList200>(
    {
      url: `/my-addresses/`,
      method: 'GET',
      params,
      signal,
    },
    options
  );
};

export const getAddressesListQueryKey = (params?: { page?: string }) => {
  return [`/my-addresses`, ...(params ? [params] : [])] as const;
};

export const getAddressesListQueryOptions = <
  TData = Awaited<ReturnType<typeof addressesList>>,
  TError = unknown,
>(
  params?: { page?: string },
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof addressesList>>, TError, TData>>;
    request?: SecondParameter<typeof publicMutator>;
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAddressesListQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof addressesList>>> = ({ signal }) =>
    addressesList(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof addressesList>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export function useAddressesList<
  TData = Awaited<ReturnType<typeof addressesList>>,
  TError = unknown,
>(
  params?: { page?: string },
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof addressesList>>, TError, TData>>;
    request?: SecondParameter<typeof publicMutator>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAddressesListQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
}
