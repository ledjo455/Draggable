import React, {Fragment, useRef, useState, useEffect } from "react";
import "./ActiveLibDesigner.css";
import ReactDOM from "react-dom";
import { Viewer as ReportViewer, Designer } from "@grapecity/activereports-react";
import { PageReport } from "@grapecity/activereports/core";
import { exportDocument as PdfExport } from "@grapecity/activereports/pdfexport";
import { FontStore } from "@grapecity/activereports/core";
import { autocompleteClasses } from "@mui/material";
import populationdata from "../dataLayer/population.json"


export default function ActiveLibDesigner() {
  const currentResolveFn = useRef();
  const counter = useRef(0);
  const [reportStorage, setReportStorage] = useState(new Map());
  const designer = useRef();
  const viewer = useRef();
  const [designerVisible, setDesignerVisible] = useState(true);
  const sumArray = [];
  const [theSum, setSum] = useState(0);
  const deaths =[]
  const [sumDeaths, setSumDeaths] = useState(0);
  const [maxPopulation, setMax] = useState(0);
  useEffect(() => {
    populationdata.map(element =>sumArray.push(element.population))
    const sum = sumArray.reduce((a, b) => a + b, 0)
    setSum(sum);
    console.log(sumArray, sum);
    const maxPop = Math.max(...sumArray);
    setMax(maxPop);
  }, [sumArray])

  useEffect(() => {
    populationdata.map((element) => deaths.push(element.deaths))
    const sumd = deaths.reduce((a, b) => a + b,  0)
    setSumDeaths(sumd)
    console.log("sum of deaths", sumDeaths )
  }, [deaths])
 

  function onDesignerOpen() {
    setDesignerVisible(true);
    const data = JSON.parse(populationdata);
  }
  
  function onReportPreview(report){
    setDesignerVisible(false);
    viewer.current.open(report.definition);
    return Promise.resolve();
  }
async function onPdfPreview() {
    const reportInfo = await designer.current.getReport();
    const report = new PageReport();
    await report.load(reportInfo.definition);
    const doc = await report.run();
    const result = await PdfExport(doc);
    result.download("exportedreport");
  }

  function onReportPreview(report){
    setDesignerVisible(false);
    viewer.current.open(report.definition);
    return Promise.resolve();
  }

  function onReportSave(info) {

  }



  function onSaveReport(info){
    const reportId = info.id || `NewReport${++counter.current}`;
    setReportStorage(new Map(reportStorage.set(reportId, info.definition)));
    return Promise.resolve({ displayName: reportId });    
  }
  function onSaveAsReport(info){
    const reportId = `NewReport${++counter.current}`;
    setReportStorage(new Map(reportStorage.set(reportId, info.definition)));
    return Promise.resolve({ id: reportId, displayName: reportId });    
  }

  return (
    <Fragment>
      <div id="designer-toolbar" class="container-fluid">
        <div class="row mt-3 mb-3">
          {designerVisible && (
            <button
              type="button"
              class="btn btn-primary btn-sm col-sm-2 ml-1"
              onClick={() => onPdfPreview()}
              style={pdfstylebtns}
            >
             Download PDF
            </button>
           
          )}
           <br/>
          {!designerVisible && (
            <button
              type="button"
              class="btn btn-primary btn-sm col-sm-2 ml-1"
              onClick={() => onDesignerOpen()}
              style={pdfstylebtns}
            >
              Go back to Designer
            </button>
          )}
        </div>
      </div>
      <br/>
      <div
        id="designer-host"
        style={{ display: designerVisible ? "block" : "none" }}
      >
        <Designer report={{ id: "blank.rdlx-json" }}
         ref={designer}
        onRender={onReportPreview}
        onSaveAs={onSaveAsReport}
        onSave={onSaveReport}
        />
      </div>
      {!designerVisible && (
        <div id="viewer-host">
          <ReportViewer ref={viewer} />
        </div>
      )}
      <div style={footer}>
        <h1 style={footerItem}> Total Deaths: </h1> 
        <h1 style={footerItem}> {sumDeaths}</h1> 
        <h1 style={footerItem}>Total Population:</h1>
        <h1 style={footerItem}> {theSum}</h1> 
        <h1 style={footerItem}>Max:</h1>
        <h1 style={footerItem}>{maxPopulation}</h1>
        


      </div>
    </Fragment>
  );
}

const pdfstylebtns = {
  width: "100px",
  height: "60px",
  backgroundColor: "#0BA1FE",
  borderRadius: "90px",
  color: "white",
  border: "2px solid black",
  fontFamily: "Tahoma",
  fontSize: "16px",
  display: "center",

}

const footer = {
  color: "black",
  display: "flex",
  backgroundColor: "#F5EE9E",
  color: "black",
}

const footerItem = {
  paddingLeft: "20px",
  paddingRight: "20px",
}
