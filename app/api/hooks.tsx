import { DependencyList, useEffect, useState } from 'react';


export function useTimeout(
  callback: VoidFunction,
  delay: number,
  deps: DependencyList = []
): void {
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback();
    }, delay);
    return () => clearTimeout(timeout);
  }, deps);
}

export function useGet<T>(
  url: string,
  params?: Record<string, string>
): [boolean, T | null] {
  const [loading, setLoading] = useState<boolean>(true);
  const [responseBody, setResponseBody] = useState<T | null>(null);
  const queryParams = new URLSearchParams(params).toString();

  useEffect(() => {
    setLoading(true);
    const abortCtrl = new AbortController();
    (async () => {
      const urlWithParams = new URL(url);
      urlWithParams.search = queryParams;
      const response = await fetch(urlWithParams, { signal: abortCtrl.signal });
      setResponseBody((await response.json()) as T);
      setLoading(false);
    })();
    return () => abortCtrl.abort();
  }, [queryParams]);

  return [loading, responseBody];
}
