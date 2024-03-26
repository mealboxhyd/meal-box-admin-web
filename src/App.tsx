import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./features/home/Home";
import MealsDashboard from "./features/meals/MealsDashboard";
import OrdersDashboard from "./features/orders/OrdersDashboard";
import { Alert, Box, IconButton, Snackbar } from "@mui/material";
import Kitchensdashboard from "./features/kitchens/KitchensDashboard";
import "./App.css";
import { ROUTING_CONSTANTS } from "./constants/route.constants";
import { SubscriptionsDashboard } from "./features/subscriptions/Subscriptions";
import UsersDashboard from "./features/users/UsersDashboard";
import { useDispatch, useSelector } from "react-redux";
import { homeSlice, homeState } from "./features/home/slices/slice";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

function App() {
  const { snackBarData } = useSelector(homeState);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(homeSlice.actions.resetSnackbarData());
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="appBackground">
      <BrowserRouter>
        <Layout />
        <Snackbar
          open={snackBarData?.open}
          autoHideDuration={6000}
          onClose={handleClose}
          action={action}
        >
          <Alert
            onClose={handleClose}
            severity={snackBarData.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackBarData.message}
          </Alert>
        </Snackbar>
        <Box
          style={{
            marginLeft: "5rem",
            marginTop: "4rem",
            marginRight: "1rem",
            height: "90vh",
          }}
        >
          <Routes>
            <Route path={ROUTING_CONSTANTS.HOME_ROUTE} element={<Home />} />
            <Route
              path={ROUTING_CONSTANTS.KITCHENS_ROUTE}
              element={<Kitchensdashboard />}
            />
            <Route
              path={ROUTING_CONSTANTS.MEALS_ROUTE}
              element={<MealsDashboard />}
            />
            <Route
              path={ROUTING_CONSTANTS.ORDERS_ROUTE}
              element={<OrdersDashboard />}
            />
            <Route
              path={ROUTING_CONSTANTS.USERS_ROUTE}
              element={<UsersDashboard />}
            />
            <Route
              path={ROUTING_CONSTANTS.SUBSCRIPTIONS}
              element={<SubscriptionsDashboard />}
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
