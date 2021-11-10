import React, {useState, useEffect} from 'react'
import "./Admin.css"
import AdminForm from './AdminForm';
import {Link, useNavigate, useLocation} from 'react-router-dom';


export default function Admin() {
    const savedData = JSON.parse(localStorage.getItem("savedData"));
    const [adminData, setAdminData] = useState(savedData);
    const [state, setState] = useState(savedData);
    console.log(state);


    return (
        <div className="morgan">
        {state.map(item =>
        <ul class="tilesWrap">
        <li>
            <h2>{item.id}</h2>
            <h3>{item.title}</h3>
            <p>
               {item.caption}
            </p>
            <img src={item.src} style={iconStyle} />
        </li>
        <AdminForm item={item} setState={setState} state={state} />
        </ul>
        )}
        </div>
        
    )
}


const iconStyle = {
    width: "90px",
    height: "60px",
    marginLeft: "66px"
}