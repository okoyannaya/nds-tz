import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { store } from "@containers/redux/store";
import { Router } from "@containers/router/router";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <Router />
        <ToastContainer autoClose={5000} position="bottom-right"/>
      </BrowserRouter>
    </Provider>
  );
};
