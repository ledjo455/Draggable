import {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from "react-sortable-hoc";
import styled from "styled-components";
import filedata from "../dataLayer/data";
import FormDialog from "../logicLayer/Forms/FormDialog";
import  "./styles.css";

const SortableItem = SortableElement((props) => {
  const {data: data} = props
  const { value: item } = props;
  const {btns: buttons} = props;
  console.log("props",props);
  // const handleDelete = (id) => {
  //   const indx = data.findIndex(ob => ob.id === id);
  //   data.splice(indx, 1);
  //   console.log("after delete",data);
  //   }
   return (
    <StyledItem>
        <br/>
      <div style={contentStyle}>
          <div className="header" style={conditionalHeaderRender(item.id)}>
        <label className="title" style={labelStyle}> {item.title} ✡︎</label> {buttons}
        </div>
        <br/>
        <img  src={item.src} style={iconStyle}/>
        <br/>
        <label className="caption" style={labelStyle} src={captionStyle}>{item.caption}</label>
      </div>
      <br/>
    </StyledItem>
  );
});



const SortableList = SortableContainer((props) => {
  const { items, ...restProps } = props;
  
  function handleDelete(id)  {
    const indx = items.findIndex(ob => ob.id === id);
       items.splice(indx, 1);
     console.log("after delete",items);
  }

  console.log("po",);
  return (
    <StyledContainer>
    <h1 className="headerTitle">✡︎ EVENTS ✡︎</h1>
      {items.map((item, index) => (
        <div>
        <SortableItem
          key={`item-${item.id}`}
          index={index}
          value={item}
          {...restProps}
          data={items}
         onClick={console.log("clicked")}      />     
        </div>   
      ))}
    </StyledContainer>
  );
});



export default function DragGrid() {
  const navigate = useNavigate();

  

    const savedData = JSON.parse(localStorage.getItem("savedData"));
    // useEffect(() => {
    //     localStorage.setItem("savedData", JSON.stringify(data));
    //   });

    const handleReset = () => {
        setData(filedata)
    }

    const handleSave = () => {
        localStorage.setItem("savedData", JSON.stringify(data));
    }

    const HandleAdmin = () => {
    navigate("admin", {state: {data}});
    }

  const [data, setData] = useState( savedData || filedata );

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setData(arrayMove(data, oldIndex, newIndex));
  };

  return (
    <Container>
    <button className="clearBtn" onClick={handleReset}>Reset</button>  
    <button className="saveBtn" onClick={handleSave} >Save</button>
    <button className="saveBtn" onClick={HandleAdmin} >ADMIN</button>
      <SortableList
        axis="xy"
        items={data}
        onSortEnd={onSortEnd}
        setData={setData}
      />
     <FormDialog setData={setData} data={data}/>
    </Container>
  );
}



const conditionalHeaderRender = (id) => {
  if (id<4){
    return headerStyleOrange
  }
  if (id>3 && id<7){
    return headerStyleBlue
  }
  if (id>6 && id<10){
    return headerStyleRed
  }
  else {
    return headerStyleGreen
  }
}

const StyledContainer = styled.div`
  background-color: #FFF5D6;
  margin-left: -18px;
  margin-right: -8px;
  overflow-y: scroll;
  height: 700px;
  white-space: nowrap;
  &:after {
    content: "";
    clear: both;
    display: table;
  }
`;
const StyledItem = styled.div`
  float: left;
  padding-left: 16px;
  padding-right: 8px;
  width: calc(32% - 16px);
  .content {
    padding: 8px 12px;
    background-color: #ddd;
    height: 150px;
    background-color: white;
  }
`;

const iconStyle = {
    width: "90px",
    height: "60px"
}

const labelStyle = {
    color: "#F9A620"
}

const captionStyle = {

}

const headerStyleOrange = {
    color: "#F6DB79",
    backgroundColor: "#FDDFAF",
    borderBottom: "2px solid #F9A620"
}

const headerStyleBlue = {
  color: "blue",
  backgroundColor: "blue",
  borderBottom: "2px solid blue",
  opacity: 0.4
}


const headerStyleRed = {
  color: "#B81456",
  backgroundColor: "#B81456",
  borderBottom: "2px solid B81456",
  opacity: 0.8
}

const headerStyleGreen = {
  color: "green",
  backgroundColor: "green",
  borderBottom: "2px solid green",
  opacity: 0.8
}

const contentStyle = {
    width: "200px",
    backgroundColor: "white",
    textAlign: "center",
    border: "2px solid #F9A620",
    borderRadius: "6px",
    height: "155px"

}


const Container = styled.div`
  width: 700px;
  margin: 0 auto;

`;