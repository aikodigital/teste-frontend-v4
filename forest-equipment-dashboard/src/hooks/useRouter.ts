import {
  usePathname,
  useSearchParams,
  useRouter as nextRouter,
} from 'next/navigation';
import { useCallback } from 'react';

function useRouter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = nextRouter();

  const createQueryString = useCallback(
    (params: Record<string, string>): string => {
      const query = new URLSearchParams(searchParams.toString());
      Object.keys(params).forEach((key) => {
        query.set(key, params[key]!);
      });

      return query.toString();
    },
    [searchParams],
  );

  const navigate = (params: Record<string, string>[]): void => {
    const combinedParams = params.reduce(
      (acc, param) => ({ ...acc, ...param }),
      {},
    );
    router.push(`${pathname}/?${createQueryString(combinedParams)}`);
  };

  return { navigate };
}

export { useRouter };
