import React from 'react';
import { Viewer } from '@grapecity/activereports-react';
import '@grapecity/activereports/styles/ar-js-ui.css';
import '@grapecity/activereports/styles/ar-js-viewer.css';

const report2 = {
    "Name": "Report",
    "Type": "report",
    "Width": "9.7215in",
    "Body": {
      "Name": "Body",
      "Type": "section",
      ReportItems: [
        { Type: "textbox", Name: "textbox1", Value: "Active Reports", Height: "10in" },
          ]
    }
  };

  const report = {
    "Name":"Report","Width":"6.5in","Layers":[{"Name":"default"}],"CustomProperties":[{"Name":"DisplayType","Value":"Page"},{"Name":"SizeType","Value":"Default"},{"Name":"PaperOrientation","Value":"Portrait"}],"Page":{"PageWidth":"8.5in","PageHeight":"11in","RightMargin":"1in","LeftMargin":"1in","TopMargin":"1in","BottomMargin":"1in","Columns":1,"ColumnSpacing":"0in"},"Body":{"Height":"0.5105in","ReportItems":[{"Type":"textbox","Name":"TextBox1","CanGrow":true,"KeepTogether":true,"Value":"Hello, ActiveReportsJS Designer","Style":{"FontSize":"18pt","PaddingLeft":"2pt","PaddingRight":"2pt","PaddingTop":"2pt","PaddingBottom":"2pt"},"Width":"6.5in","Height":"0.5105in"}]}}
  
function ActiveReportLib() {
    return (
        <div className="demo-app" style={{ height: '800px'}} >
        <Viewer report={{ Uri: report2 }} />
      </div>

    )
}

export default ActiveReportLib
