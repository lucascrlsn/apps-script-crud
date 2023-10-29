function accessCRUDRecords() {

  let startFunc = new Date().getTime();
  
  const htmlServ = HtmlService.createTemplateFromFile("app_CRUD"),
  html = htmlServ.evaluate();
  html.setWidth(1200).setHeight(400);
  const ui = SpreadsheetApp.getUi();

  // Wait for the templates to finish loading.
  Utilities.sleep(100);

  ui.showModalDialog(html,"Create Update Delete (CRUD) Application");

  let endFunc = new Date().getTime();

  Logger.log('The CRUD tool opened in ' + (endFunc - startFunc) + ' microseconds');

}

const cache = {};

function loadCRUDPartialHTML_(partial) {
  if (!cache[partial]) {
    cache[partial] = HtmlService.createTemplateFromFile(partial).evaluate().getContent();
  }
  return cache[partial];
}
function loadCRUDSearchView(){

  return loadCRUDPartialHTML_("searchView_CRUD");

}

function loadCRUDEditView(){

  return loadCRUDPartialHTML_("editView_CRUD");

}

function loadCRUDHelpView(){

  return loadCRUDPartialHTML_("helpView_CRUD");

}

function getCRUDDataForSearch(){

  let startFunc = new Date().getTime();

  let ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SpreadsheetID'));
  const ws = ss.getSheetByName("RAW DATA");

  // Get the data range
  let dataRange = ws.getDataRange().offset(1, 0);

  // Filter out the empty row at the bottom
  const data = dataRange.getDisplayValues().filter(row => row.some(cell => cell !== ""));

  // Get the data values from the data range
  //const data = dataRange.getDisplayValues();

  let endFunc = new Date().getTime();

  Logger.log('All data was returned in ' + (endFunc - startFunc) + ' microseconds');

  return data;

}

function deleteCRUDDataByID(CRUDIdForDelete){

  var startFunc = new Date().getTime();

  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SpreadsheetID'));
  const ws = ss.getSheetByName("RAW DATA");

  const CRUDRecordId = ws.getRange(2,1,ws.getLastRow()-1,1).getDisplayValues().map(r => r[0].toString().toLowerCase());
  const CRUDRecordIdPosition = CRUDRecordId.indexOf(CRUDIdForDelete.toString().toLowerCase());
  const CRUDRecordIdRowNumber = CRUDRecordIdPosition === -1 ? 0 : CRUDRecordIdPosition + 2;

  ws.deleteRow(CRUDRecordIdRowNumber);

  var endFunc = new Date().getTime();

  Logger.log('The record was deleted in ' + (endFunc - startFunc) + ' microseconds');
}

function getCRUDRecordById(CRUDIdForEdit){

  var startFunc = new Date().getTime();

  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SpreadsheetID'));
  const ws = ss.getSheetByName("RAW DATA");

  const CRUDRecordId = ws.getRange(2,1,ws.getLastRow()-1,1).getDisplayValues().map(r => r[0].toString().toLowerCase());
  const CRUDRecordIdPosition = CRUDRecordId.indexOf(CRUDIdForEdit.toString().toLowerCase());
  const CRUDRecordIdRowNumber = CRUDRecordIdPosition === -1 ? 0 : CRUDRecordIdPosition + 2;
  const CRUDRecordInfo = ws.getRange(CRUDRecordIdRowNumber,1,1,ws.getMaxColumns()).getDisplayValues()[0];

  // GET ROW VALUES
  var headers = ws.getDataRange().getValues().shift();
    
  var date = headers.indexOf("Date");
  var site = headers.indexOf("Site");
  var process = headers.indexOf("Process");
  var shift = headers.indexOf("Shift");
  var justification = headers.indexOf("Justification");
  var employeeType = headers.indexOf("Employee Type");
  var firstName = headers.indexOf("First Name");
  var lastName = headers.indexOf("Last Name");  
  var ID = headers.indexOf("ID");

  var endFunc = new Date().getTime();

  Logger.log('A specific record was grabbed in ' + (endFunc - startFunc) + ' microseconds');

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // FIND AND SET COLUMN INDEXES BASED OF COLUMN NAMES - THIS ALLOWS SERVER TO FLEX IF/WHEN COLUMN/FIELDS ARE MODIFIED AND/OR MOVED
  
  return {recordID: CRUDRecordInfo[0],
            timestamp: CRUDRecordInfo[1],
            date: CRUDRecordInfo[date],
            site: CRUDRecordInfo[site],
            process: CRUDRecordInfo[process],
            shift: CRUDRecordInfo[shift],
            justification: CRUDRecordInfo[justification],
            employeeType: CRUDRecordInfo[employeeType],
            fname: CRUDRecordInfo[firstName],
            lname: CRUDRecordInfo[lastName],
            ID: CRUDRecordInfo[ID],
            }

}

function editCRUDRecordById(CRUDIdForEdit,CRUDRecordInfo){

  var startFunc = new Date().getTime();
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("RAW DATA");
  const CRUDRecordId = ws.getRange(2,1,ws.getLastRow()-1,1).getDisplayValues().map(r => r[0].toString().toLowerCase());
  const CRUDRecordIdPosition = CRUDRecordId.indexOf(CRUDIdForEdit.toString().toLowerCase());
  const CRUDRecordIdRowNumber = CRUDRecordIdPosition === -1 ? 0 : CRUDRecordIdPosition + 2;

  // ONLY WRITE IF A CHANGE WAS MADE BY THE USER

  // PREVIOUS CONDITIONALS

  /*if(CRUDRecordInfo.date != ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('dateColumnIndex'))){
    ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('dateColumnIndex')).setValue(CRUDRecordInfo.date);
  }*/

  //TERNARY

  let changeValue = 'False';

  CRUDRecordInfo.date != ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('dateColumnIndex')) ? (ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('dateColumnIndex')).setValue(CRUDRecordInfo.date),(changeValue = 'True')) : PASS; 

  CRUDRecordInfo.site != ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('siteColumnIndex')) ? ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('siteColumnIndex')).setValue(CRUDRecordInfo.site) : PASS;

  CRUDRecordInfo.process != ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('processColumnIndex')) ? ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('processColumnIndex')).setValue(CRUDRecordInfo.process) : PASS;

  CRUDRecordInfo.justification != ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('justificationColumnIndex')) ? ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('justificationColumnIndex')).setValue(CRUDRecordInfo.justification) : PASS;

  CRUDRecordInfo.employeeType != ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('employeeTypeColumnIndex')) ? ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('employeeTypeColumnIndex')).setValue(CRUDRecordInfo.employeeType) : PASS;

  CRUDRecordInfo.firstName != ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('firstNameColumnIndex')) ? ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('firstNameColumnIndex')).setValue(CRUDRecordInfo.fname) : PASS;
  
  CRUDRecordInfo.lname != ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('lastNameColumnIndex')) ? ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('lastNameColumnIndex')).setValue(CRUDRecordInfo.lname) : PASS;

  CRUDRecordInfo.ID != ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('IDColumnIndex')) ? ws.getRange(CRUDRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('IDColumnIndex')).setValue(CRUDRecordInfo.ID) : PASS;
  
  var endFunc = new Date().getTime();

  Logger.log('A specific record was edited in ' + (endFunc - startFunc) + ' microseconds. Was the date changed? ' + changeValue);

  return true;

}


