// hooks/useSidenav.js
import { useState, useEffect, useRef, useCallback } from 'react';

export const useSidenav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const sidenavRef = useRef(null);
  const triggerRef = useRef(null);

  const toggleSidenav = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const openSidenav = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSidenav = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle delayed unmount
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
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
