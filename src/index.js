import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StoreContext } from "./store/context";
import { I18nProvider } from "./i18n/context";
import App from "./app";
import Store from "./store";
import { AuthProvider } from "./auth/context";

const store = new Store();

const root = createRoot(document.getElementById("root"));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <AuthProvider>
      <I18nProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nProvider>
    </AuthProvider>
  </StoreContext.Provider>
);
