import { useState, useEffect } from 'react';

const useDebounce = (term: string, delay: number): string => {
  const [debouncedTerm, setDebouncedTerm] = useState<string>(term);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(term);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [term, delay]);

  return debouncedTerm;
};

export default useDebounce;