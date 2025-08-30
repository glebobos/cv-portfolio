import { useState, useEffect } from 'react';

export const usePrintMode = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const printMediaQuery = window.matchMedia('print');

    const handleChange = (event: MediaQueryListEvent) => {
      setIsPrinting(event.matches);
    };

    printMediaQuery.addEventListener('change', handleChange);

    // Initial check
    if (printMediaQuery.matches) {
      setIsPrinting(true);
    }

    return () => {
      printMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isPrinting;
};
