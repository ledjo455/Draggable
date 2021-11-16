import React, {useRef, useEffect} from 'react';
import WebViewer from '@pdftron/webviewer';
import "./pdfTronStyle.css"

function PdfTron() {
    const viewer = useRef(null);

    useEffect(() => {
      WebViewer(
        {
          path: '/webviewer/lib',
          initialDoc: '/files/sample.pdf',
        },
        viewer.current,
      ).then((instance) => {
        const { documentViewer, annotationManager, Annotations } = instance.Core;

        instance.UI.setHeaderItems(header => {
            header.push({
              type: 'actionButton',
              img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
              onClick: async () => {
                console.log(await annotationManager.exportAnnotations({links: false, widgets: false}));
            }
            });
          });
  
        documentViewer.addEventListener('documentLoaded', () => {
            annotationManager.setCurrentUser("Ledjo")
          const rectangleAnnot = new Annotations.RectangleAnnotation({
            PageNumber: 1,
            X: 100,
            Y: 150,
            Width: 200,
            Height: 50,
            Author: annotationManager.getCurrentUser()
          });
  
          annotationManager.addAnnotation(rectangleAnnot);
          annotationManager.redrawAnnotation(rectangleAnnot);
        });
      });
    }, []);
  
    return (
      <div className="App">
        <div className="header">Edit the document, click download to Save!</div>
        <div className="webviewer" ref={viewer}></div>
      </div>
    );
  };
  

export default PdfTron;
