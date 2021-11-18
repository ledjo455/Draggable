import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Grid, Button } from "@mui/material";
import "ag-grid-enterprise";
import "./AggridTable.css";
import companydata from "./companies.json";

export default function RangeSelection({
  passedStatus,
  setPassedStatus,
  formObject,
  setCalcStatusCall,
  calculateStatusCall,
  jsonData,
  setJsonData,
}) {
  const statusBar = {
    statusPanels: [
      {
        statusPanel: "agAggregationComponent",
        statusPanelParams: {
          // possible values are: 'count', 'sum', 'min', 'max', 'avg'
          aggFuncs: ["min", "max", "avg", "count", "sum", "min", "max", "avg"],
        },
      },
    ],
  };

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(jsonData);
  const [filterParam, setFilterParam] = useState("new");

  const columnDefs = [
    { headerName: "Company", field: "company", enableRowGroup: true },
    { headerName: "First Name", field: "first_name", enableRowGroup: true },
    { headerName: "Last Name", field: "last_name", enableRowGroup: true },
    { headerName: "Phone", field: "phone", enableRowGroup: true },
    {
      headerName: "Status",
      field: "status",
      enableRowGroup: true,
      cellClass: cellClass,
    },

    // {
    //   headerName: "Filter",
    //   field: "status",
    //   cellRendererFramework: (params) => (
    //     <div>
    //       {/* <Button onClick={onFilterTextBoxChanged}>Update</Button> */}
    //       <Button onClick={statusFilter}>Filter New</Button>
    //       <Button onClick={() => gridApi.setFilterModel(null)}>reset</Button>
    //     </div>
    //   ),
    // },
  ];
  function cellClass(params) {
    switch (params.value) {
      case "new":
        return "status___new";
      case "converted":
        return "status_converted";
      case "unqualified":
        return "status__unqualified";
      case "in process":
        return "status__in_process";
      case "needs review":
        return "status__needs_review";
      default:
        return "status_converted";
    }
  }
  const handleQuickFilter = (event) => {
    gridApi.setQuickFilter(event.target.value);
  };

  useEffect(() => {
    if (passedStatus != null) {
      var statusFilterComponent = gridApi.getFilterInstance("status");
      statusFilterComponent.setModel({
        values: [passedStatus],
      });
      gridApi.onFilterChanged();
    }
  }, [passedStatus]);

  //   const onGridReady = (params) => {
  //     setGridApi(params);
  //   };
  useEffect(() => {
    if (formObject !== null) {
      const newitem = [formObject];
      gridApi.applyTransaction({
        add: newitem,
      });
      setCalcStatusCall(!calculateStatusCall);
    }
  }, [formObject]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.setRowData(companydata);
  };

  const statusFilter = () => {
    var statusFilterComponent = gridApi.getFilterInstance("status");
    statusFilterComponent.setModel({
      values: [passedStatus],
    });
    gridApi.onFilterChanged();
  };

  const downloadPdf = () => {
    window.print();
  };

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };

  const onFilterTextBoxChanged = (e) => {
    const value = " qualified";
    gridApi.setQuickFilter(value);
  };

  const handleResetFilter = () => {
    gridApi.setFilterModel(null);
    setPassedStatus(null);
  };

  return (
    <div>
      <div className="filter__header">
        <button onClick={handleResetFilter}>Clear</button>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleQuickFilter}
        />
      </div>
      <div className="table">
        <Grid align="right"></Grid>
        <Button classname="reset" onClick={handleResetFilter}>
          RESET
        </Button>{" "}
        {"         "}
        <Button onClick={downloadPdf}>Download Pdf</Button>
        <div className="ag-theme-alpine" style={{ height: "400px" }}>
          <AgGridReact
            rowGroupPanelShow={"always"}
            //   rowData={tableData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            statusBar={statusBar}
            enableRangeSelection={true}
            suppressDragLeaveHidesColumns={true}
            suppressMakeColumnVisibleAfterUnGroup={true}
            // rowSelection={'single'}
          />
        </div>
      </div>
    </div>
  );
}
