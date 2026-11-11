// Extension & Environment Compatibility Polyfill: Fix "Cannot set property fetch of #<Window> which has only a getter"
try {
  const currentFetch = window.fetch;
  let _fetch = currentFetch;
  Object.defineProperty(window, "fetch", {
    get() {
      return _fetch;
    },
    set(val) {
      _fetch = val;
    },
    configurable: true,
    enumerable: true,
  });
} catch (_) {}

import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
