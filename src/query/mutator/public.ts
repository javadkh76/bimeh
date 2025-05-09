import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    showToast?: boolean;
    notifyFeature?: string;
  }
}

axios.defaults.withCredentials = true;

export const publicAdapter = axios.create();

publicAdapter.interceptors.request.use(config => {
  config.baseURL = process.env.NEXT_PUBLIC_API_URL;
  return config;
});

export function publicMutator<T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> {
  return publicAdapter({
    ...config,
    ...options,
  }).then(({ data }) => data);
}
