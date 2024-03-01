import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./features/home/Home";
import Billing from "./features/billing/Billing";
import Inventory from "./features/inventory/Inventory";
import {
  BILLING_ROUTE,
  EMPLOYEE_TIME_SHEET,
  HOME_ROUTE,
  HOME_SETTINGS,
  INVENTORY_ROUTE,
  INVOICE_ROUTE,
  TIME_SHEET_ROUTE,
} from "./constants/route.constants";
import { Box } from "@mui/material";
import Invoice from "./features/invoice/Invoice";
import "./App.css";
import TimeSheets from "./features/timesheets/TimeSheets";
import EmployeeTimeSheets from "./features/timesheets/components/employee/EmployeeTimeSheets";
import { HomSettings } from "./features/home/HomSettings";

function App() {
  return (
    <div className="appBackground">
      <BrowserRouter>
        <Layout />
        <Box
          style={{
            marginLeft: "5rem",
            marginTop: "4rem",
            marginRight: "1rem",
            height: "90vh",
          }}
        >
          <Routes>
            <Route path={HOME_ROUTE} element={<Home />} />
            <Route path={BILLING_ROUTE} element={<Billing />} />
            <Route path={INVENTORY_ROUTE} element={<Inventory />} />
            <Route path={INVOICE_ROUTE} element={<Invoice />} />
            <Route path={TIME_SHEET_ROUTE} element={<TimeSheets />} />
            <Route
              path={EMPLOYEE_TIME_SHEET}
              element={<EmployeeTimeSheets />}
            />
             <Route
              path={HOME_SETTINGS}
              element={<HomSettings />}
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
