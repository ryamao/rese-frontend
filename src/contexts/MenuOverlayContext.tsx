import { createContext, useContext, useEffect, useState } from "react";

export interface MenuOverlayContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const MenuOverlayContext = createContext<MenuOverlayContextType>(
  {} as MenuOverlayContextType
);

// eslint-disable-next-line react-refresh/only-export-components
export const useMenuOverlayContext = () => useContext(MenuOverlayContext);

// eslint-disable-next-line react-refresh/only-export-components
export function useMenuOverlayState(): MenuOverlayContextType {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("useEffect", isOpen);
  }, [isOpen]);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  };
}

export function MenuOverlayProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const state = useMenuOverlayState();

  return (
    <MenuOverlayContext.Provider value={state}>
      {children}
    </MenuOverlayContext.Provider>
  );
}
