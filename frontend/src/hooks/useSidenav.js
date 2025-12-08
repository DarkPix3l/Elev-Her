import { useState, useEffect, useRef, useCallback, useLayoutEffect} from 'react';

export const useSidenav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const sidenavRef = useRef(null);
  const triggerRef = useRef(null);

  const toggleSidenav = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const openSidenav = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSidenav = useCallback(() => {
    setIsOpen(false);
  }, []);

  useLayoutEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  // Handle delayed unmount for transition to finish
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidenavRef.current &&
        !sidenavRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        if (isOpen) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return {
    isOpen,
    shouldRender,
    toggleSidenav,
    openSidenav,
    closeSidenav,
    sidenavRef,
    triggerRef,
  };
};
