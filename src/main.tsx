import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { saga, store } from "./store/store.ts";
import { RootSaga } from "./sagas/rootSaga.ts";

saga.run(RootSaga);

const theme = createTheme({
  palette: {
    primary: {
      main: "#005A9A",
    },
    secondary: {
      main: "#3B5166",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
