import { createContext, useContext, useState } from "react";

const CopyProtectionContext = createContext();

export function CopyProtectionProvider({ children }) {
  const [isProtected, setIsProtected] = useState(false); // Default: Copy Allowed

  return (
    <CopyProtectionContext.Provider value={{ isProtected, setIsProtected }}>
      {children}
    </CopyProtectionContext.Provider>
  );
}

export function useCopyProtection() {
  return useContext(CopyProtectionContext);
}
