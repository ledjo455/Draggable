import {useState, useEffect} from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from "react-sortable-hoc";
import styled from "styled-components";
import filedata from "./data";
import FormDialog from "./FormDialog";
import  "./styles.css";


const SortableItem = SortableElement(props => {
  const { value: item } = props;
  console.log(props);
  return (
    <StyledItem>
        <br/>
      <div style={contentStyle}>
          <div className="header" style={headerStyle}>
        <label className="title" style={labelStyle}> {item.title} </label>
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



const SortableList = SortableContainer(props => {
  const { items, ...restProps } = props;
  return (
    <StyledContainer>
    <h1 className="headerTitle">EVENTS</h1>
      {items.map((item, index) => (
        <SortableItem
          key={`item-${item.id}`}
          index={index}
          value={item}
          {...restProps}
        />
      ))}
    </StyledContainer>
  );
});



export default function DragGrid() {

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

  const [data, setData] = useState( savedData || filedata );

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setData(arrayMove(data, oldIndex, newIndex));
  };

  return (
    <Container>
    <button className="clearBtn" onClick={handleReset}>Reset</button>  
    <button className="saveBtn" onClick={handleSave} >Save</button>
      <SortableList
        axis="xy"
        items={data}
        onSortEnd={onSortEnd}
      />
     <FormDialog setData={setData} data={data}/>
    </Container>
  );
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

const headerStyle = {
    color: "#F6DB79",
    backgroundColor: "#FDDFAF",
    borderBottom: "2px solid #F9A620"


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