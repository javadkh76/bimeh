import { SubmitOrderBody } from '@/query/api/types/submitOrderBody';
import { publicMutator } from '@/query/mutator/public';
import { SubmitOrder200 } from '@/query/api/types/submitOrder200';
import { SubmitOrder400 } from '@/query/api/types/submitOrder400';
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

type SecondParameter<T extends (...args: never) => Promise<unknown>> = Parameters<T>[1];

export const submitOrder = (
  submitOrderBody: SubmitOrderBody,
  options?: SecondParameter<typeof publicMutator>
) => {
  return publicMutator<SubmitOrder200>(
    {
      url: `/order/completion/`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: submitOrderBody,
    },
    options
  );
};

export const getSubmitOrderMutationOptions = <
  TError = SubmitOrder400,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof submitOrder>>,
    TError,
    { data: SubmitOrderBody },
    TContext
  >;
  request?: SecondParameter<typeof publicMutator>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof submitOrder>>,
  TError,
  { data: SubmitOrderBody },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof submitOrder>>,
    { data: SubmitOrderBody }
  > = props => {
    const { data } = props ?? {};

    return submitOrder(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type SubmitOrderMutationResult = NonNullable<Awaited<ReturnType<typeof submitOrder>>>;
export type SubmitOrderMutationBody = SubmitOrderBody;
export type SubmitOrderMutationError = SubmitOrder400;

export const useSubmitOrder = <TError = SubmitOrder400, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof submitOrder>>,
    TError,
    { data: SubmitOrderBody },
    TContext
  >;
  request?: SecondParameter<typeof publicMutator>;
}): UseMutationResult<
  Awaited<ReturnType<typeof submitOrder>>,
  TError,
  { data: SubmitOrderBody },
  TContext
> => {
  const mutationOptions = getSubmitOrderMutationOptions(options);

  return useMutation(mutationOptions);
};
