/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * busdes kic API
 * This is busdes kic API
 * OpenAPI spec version: 1.0.0
 */
import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import {
  useQuery,
  useInfiniteQuery
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  UseInfiniteQueryOptions,
  QueryFunction,
  UseQueryResult,
  UseInfiniteQueryResult,
  QueryKey
} from '@tanstack/react-query'
import type {
  GetTimetableMulti200,
  GetTimetableMultiParams,
  GetNextbus200,
  GetNextbusParams,
  GetTimetable200,
  GetTimetableParams
} from '.././model'


/**
 * Returns multi timetable info
 */
export const getTimetableMulti = (
  params: GetTimetableMultiParams, options?: AxiosRequestConfig
): Promise<AxiosResponse<GetTimetableMulti200>> => {
  return axios.get(
    `/timetable/multi`, {
    ...options,
    params: { ...params, ...options?.params },
  }
  );
}


export const getGetTimetableMultiQueryKey = (params: GetTimetableMultiParams,) => [`/timetable/multi`, ...(params ? [params] : [])];


export type GetTimetableMultiInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getTimetableMulti>>>
export type GetTimetableMultiInfiniteQueryError = AxiosError<unknown>

export const useGetTimetableMultiInfinite = <TData = Awaited<ReturnType<typeof getTimetableMulti>>, TError = AxiosError<unknown>>(
  params: GetTimetableMultiParams, options?: { query?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTimetableMulti>>, TError, TData>, axios?: AxiosRequestConfig }

): UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetTimetableMultiQueryKey(params);




  const queryFn: QueryFunction<Awaited<ReturnType<typeof getTimetableMulti>>> = ({ signal, pageParam }) => getTimetableMulti({ ...params }, { signal, ...axiosOptions });




  const query = useInfiniteQuery<Awaited<ReturnType<typeof getTimetableMulti>>, TError, TData>(queryKey, queryFn, { staleTime: 10000, ...queryOptions }) as UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export type GetTimetableMultiQueryResult = NonNullable<Awaited<ReturnType<typeof getTimetableMulti>>>
export type GetTimetableMultiQueryError = AxiosError<unknown>

export const useGetTimetableMulti = <TData = Awaited<ReturnType<typeof getTimetableMulti>>, TError = AxiosError<unknown>>(
  params: GetTimetableMultiParams, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getTimetableMulti>>, TError, TData>, axios?: AxiosRequestConfig }

): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetTimetableMultiQueryKey(params);




  const queryFn: QueryFunction<Awaited<ReturnType<typeof getTimetableMulti>>> = ({ signal }) => getTimetableMulti(params, { signal, ...axiosOptions });




  const query = useQuery<Awaited<ReturnType<typeof getTimetableMulti>>, TError, TData>(queryKey, queryFn, { staleTime: 10000, ...queryOptions }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * Returns nextbus info
 */
export const getNextbus = (
  params: GetNextbusParams, options?: AxiosRequestConfig
): Promise<AxiosResponse<GetNextbus200>> => {
  return axios.get(
    `/nextbus`, {
    ...options,
    params: { ...params, ...options?.params },
  }
  );
}


export const getGetNextbusQueryKey = (params: GetNextbusParams,) => [`/nextbus`, ...(params ? [params] : [])];


export type GetNextbusInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getNextbus>>>
export type GetNextbusInfiniteQueryError = AxiosError<unknown>

export const useGetNextbusInfinite = <TData = Awaited<ReturnType<typeof getNextbus>>, TError = AxiosError<unknown>>(
  params: GetNextbusParams, options?: { query?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNextbus>>, TError, TData>, axios?: AxiosRequestConfig }

): UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetNextbusQueryKey(params);




  const queryFn: QueryFunction<Awaited<ReturnType<typeof getNextbus>>> = ({ signal, pageParam }) => getNextbus({ ...params }, { signal, ...axiosOptions });




  const query = useInfiniteQuery<Awaited<ReturnType<typeof getNextbus>>, TError, TData>(queryKey, queryFn, { staleTime: 10000, ...queryOptions }) as UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export type GetNextbusQueryResult = NonNullable<Awaited<ReturnType<typeof getNextbus>>>
export type GetNextbusQueryError = AxiosError<unknown>

export const useGetNextbus = <TData = Awaited<ReturnType<typeof getNextbus>>, TError = AxiosError<unknown>>(
  params: GetNextbusParams, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getNextbus>>, TError, TData>, axios?: AxiosRequestConfig }

): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetNextbusQueryKey(params);




  const queryFn: QueryFunction<Awaited<ReturnType<typeof getNextbus>>> = ({ signal }) => getNextbus(params, { signal, ...axiosOptions });




  const query = useQuery<Awaited<ReturnType<typeof getNextbus>>, TError, TData>(queryKey, queryFn, { staleTime: 10000, ...queryOptions }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * Returns timetable
 */
export const getTimetable = (
  params: GetTimetableParams, options?: AxiosRequestConfig
): Promise<AxiosResponse<GetTimetable200>> => {
  return axios.get(
    `/timetable`, {
    ...options,
    params: { ...params, ...options?.params },
  }
  );
}


export const getGetTimetableQueryKey = (params: GetTimetableParams,) => [`/timetable`, ...(params ? [params] : [])];


export type GetTimetableInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getTimetable>>>
export type GetTimetableInfiniteQueryError = AxiosError<unknown>

export const useGetTimetableInfinite = <TData = Awaited<ReturnType<typeof getTimetable>>, TError = AxiosError<unknown>>(
  params: GetTimetableParams, options?: { query?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTimetable>>, TError, TData>, axios?: AxiosRequestConfig }

): UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetTimetableQueryKey(params);




  const queryFn: QueryFunction<Awaited<ReturnType<typeof getTimetable>>> = ({ signal, pageParam }) => getTimetable({ ...params }, { signal, ...axiosOptions });




  const query = useInfiniteQuery<Awaited<ReturnType<typeof getTimetable>>, TError, TData>(queryKey, queryFn, { staleTime: 10000, ...queryOptions }) as UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export type GetTimetableQueryResult = NonNullable<Awaited<ReturnType<typeof getTimetable>>>
export type GetTimetableQueryError = AxiosError<unknown>

export const useGetTimetable = <TData = Awaited<ReturnType<typeof getTimetable>>, TError = AxiosError<unknown>>(
  params: GetTimetableParams, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getTimetable>>, TError, TData>, axios?: AxiosRequestConfig }

): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetTimetableQueryKey(params);




  const queryFn: QueryFunction<Awaited<ReturnType<typeof getTimetable>>> = ({ signal }) => getTimetable(params, { signal, ...axiosOptions });




  const query = useQuery<Awaited<ReturnType<typeof getTimetable>>, TError, TData>(queryKey, queryFn, { staleTime: 10000, ...queryOptions }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}
