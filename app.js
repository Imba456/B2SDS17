console.log("app.js has loaded");

//to do list
//create variables for the url, container and the options of the dashboard
//create a function that initializes the dashboard
//execute this function when page loads

//variables
let viz;
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
const vizContainer = document.getElementById("vizContainer");
const options = {
  device: "desktop",
  hideToolbar: "true", //doesn't work in this case as it's on Tableau public!
};

//function to initialize dashboard
function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
  console.log("viz is loaded");
}

//load viz on load
document.addEventListener("DOMContentLoaded", initViz);

//variables for pdf button
const pdfButton = document.getElementById("pdfButton");
//function for pdf button
function loadPDF() {
  viz.showExportPDFDialog();
  console.log("pdf window loaded");
}
//addevent listener on click
pdfButton.addEventListener("click", loadPDF);

//variable excel button
const excelButton = document.getElementById("excelButton");
//function
function loadExcel() {
  viz.exportCrossTabToExcel();
  console.log("excel downloaded");
}
//addevent listener on click
excelButton.addEventListener("click", loadExcel);

//variable
const showHideButton = document.getElementById("hideButton");
let isVizHidden = false;
//function
function showHideViz() {
  if (isVizHidden === false) {
    viz.hide();
    showHideButton.innerText = "Show Viz";
    isVizHidden = true;
    console.log("hiding viz");
  } else {
    viz.show();
    showHideButton.innerText = "Hide Viz";
    console.log("showing viz");
    isVizHidden = false;
  }
}
//addevent listener on click
showHideButton.addEventListener("click", showHideViz);

//variables
const applyFilter = document.getElementById("applyFilter");

//function
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(console.log("filter applied"));
}

//add event listener
applyFilter.addEventListener(
  ("click",
  function () {
    getRangeValues();
  })
);
