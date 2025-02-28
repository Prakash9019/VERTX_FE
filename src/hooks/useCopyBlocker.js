import { useEffect } from "react";

export function useCopyBlocker(enabled) {
  useEffect(() => {
    if (!enabled) return; // If disabled, do nothing

    const disableRightClick = (event) => event.preventDefault();
    
    const disableCopyShortcuts = (event) => {
      // Prevent common copy shortcuts (Ctrl + C, X, V, U, A)
      if (event.ctrlKey && ["c", "x", "v", "u", "a"].includes(event.key.toLowerCase())) {
        event.preventDefault();
      }
    };
    
    // Disable text selection
    const disableSelection = () => {
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";
      document.body.style.msUserSelect = "none";
      document.body.style.mozUserSelect = "none";
    };
    
    // Add event listeners
    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableCopyShortcuts);
    document.addEventListener("selectstart", disableSelection);

    return () => {
      // Remove event listeners when the component unmounts
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableCopyShortcuts);
      document.removeEventListener("selectstart", disableSelection);
      
      // Re-enable text selection
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      document.body.style.msUserSelect = "";
      document.body.style.mozUserSelect = "";
    };
  }, [enabled]);
}
