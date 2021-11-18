import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Admin from "../logicLayer/Admin/Admin";
import PdfTron from "../dataLayer/pdfTron/PdfTron";
import ActiveReportLib from "../dataLayer/ActiveReportLib";
import ActiveLibDesigner from "../dataLayer/ActiveLibDesigner";
import Aggrid from "../aggrid/Aggrid";
function Main() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="admin" element={<Admin />} />
          <Route path="pdftron" element={<PdfTron />} />
          <Route path="activereports" element={<ActiveReportLib />} />
          <Route
            path="activereports_designer"
            element={<ActiveLibDesigner />}
          />
          <Route path="aggrid" element={<Aggrid />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main;
