import React, { useState, useEffect } from "react";
import "./Admin.css";
import AdminForm from "./AdminForm";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const savedData = JSON.parse(localStorage.getItem("savedData"));
  const [adminData, setAdminData] = useState(savedData);
  const [state, setState] = useState(savedData);
  console.log(state);

  const pdfHandler = () => {
    navigate("/pdftron");
  };

  const reportHandler = () => {
    navigate("/activereports");
  };

  const reportDesignerHandler = () => {
    navigate("/activereports_designer");
  };

  const aggridHandler = () => {
    navigate("/aggrid");
  };

  return (
    <div className="morgan">
      <div id="options">
        <button onClick={pdfHandler} style={btnStyler}>
          PDF Factory
        </button>{" "}
        <button onClick={reportHandler} style={btnStyler}>
          Report
        </button>{" "}
        <button onClick={reportDesignerHandler} style={btnStyler}>
          {" "}
          Design Report
        </button>{" "}
        <button onClick={aggridHandler} style={btnStyler}>
          {" "}
          AG Grid
        </button>{" "}
      </div>
      {state.map((item) => (
        <ul class="tilesWrap">
          <li>
            <h2>{item.id}</h2>
            <h3>{item.title}</h3>
            <p>{item.caption}</p>
            <img src={item.src} style={iconStyle} />
          </li>
          <AdminForm item={item} setState={setState} state={state} />
        </ul>
      ))}
    </div>
  );
}

const iconStyle = {
  width: "90px",
  height: "60px",
  marginLeft: "66px",
};

const btnStyler = {
  color: "white",
  background: "#36392D",
  border: "1px solid #36392D",
  borderRadius: "90px",
  height: "40px",
};
