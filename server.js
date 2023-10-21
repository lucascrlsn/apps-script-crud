function accessCRMCRUD() {

  let startFunc = new Date().getTime();
  
  const htmlServ = HtmlService.createTemplateFromFile("app_CRM"),
  html = htmlServ.evaluate();
  html.setWidth(1200).setHeight(400);
  const ui = SpreadsheetApp.getUi();

  ui.showModalDialog(html, "Customer Relationship Management");

  let endFunc = new Date().getTime();

  Logger.log('The CRM tool opened in ' + (endFunc - startFunc) + ' microseconds');

}

const cache = {};

function loadCRMPartialHTML_(partial) {
  if (!cache[partial]) {
    cache[partial] = HtmlService.createTemplateFromFile(partial).evaluate().getContent();
  }
  return cache[partial];
}

function loadCRMSearchView(){

  return loadCRMPartialHTML_("searchView_CRM");

}

function loadCRMEditView(){

  return loadCRMPartialHTML_("editView_CRM");

}

function loadCRMHelpView(){

  return loadCRMPartialHTML_("helpView_CRM");

}

function getCRMDataForSearch(){

  let startFunc = new Date().getTime();

  let ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SpreadsheetID'));
  const ws = ss.getSheetByName("main");

  let dataRange = ws.getDataRange();
  let data = dataRange.getValues();

  let endFunc = new Date().getTime();

  Logger.log('All data was returned in ' + (endFunc - startFunc) + ' microseconds');

  return data;

}

function deleteCRMDataByID(CRMIdForDelete){

  let startFunc = new Date().getTime();

  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SpreadsheetID'));
  const ws = ss.getSheetByName("main");

  const CRMRecordId = ws.getRange(2,1,ws.getLastRow()-1,1).getDisplayValues().map(r => r[0].toString().toLowerCase());
  const CRMRecordIdPosition = CRMRecordId.indexOf(CRMIdForDelete.toString().toLowerCase());
  const CRMRecordIdRowNumber = CRMRecordIdPosition === -1 ? 0 : CRMRecordIdPosition + 2;

  ws.deleteRow(CRMRecordIdRowNumber);

  let endFunc = new Date().getTime();

  Logger.log('The record was deleted in ' + (endFunc - startFunc) + ' microseconds');
}

function getCRMRecordById(CRMIdForEdit){

  let startFunc = new Date().getTime();

  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SpreadsheetID'));
  const ws = ss.getSheetByName("main");

  const CRMRecordId = ws.getRange(2,1,ws.getLastRow()-1,1).getDisplayValues().map(r => r[0].toString().toLowerCase());
  const CRMRecordIdPosition = CRMRecordId.indexOf(CRMIdForEdit.toString().toLowerCase());
  const CRMRecordIdRowNumber = CRMRecordIdPosition === -1 ? 0 : CRMRecordIdPosition + 2;
  const CRMRecordInfo = ws.getRange(CRMRecordIdRowNumber,1,1,ws.getMaxColumns()).getDisplayValues()[0];

  // GET ROW VALUES BY EST COL letS
  let headers = ws.getDataRange().getValues().shift();
  let dateAdded = headers.indexOf("Date Added");
  let fname = headers.indexOf("First Name");
  let lname = headers.indexOf("Last Name");  
  let phoneNumber = headers.indexOf("Phone Number");  
  let jobTitle = headers.indexOf("Job Title");
  let company = headers.indexOf("Company");  
  let address = headers.indexOf("Address");    
  let leadType = headers.indexOf("Lead Type");  

  let endFunc = new Date().getTime();

  Logger.log('A specific record was grabbed in ' + (endFunc - startFunc) + ' microseconds');

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // FIND AND SET COLUMN INDEXES BASED OF COLUMN NAMES - THIS ALLOWS SERVER TO FLEX IF/WHEN COLUMN/FIELDS ARE MODIFIED AND/OR MOVED
  
  return {recordID: CRMRecordInfo[0],
            dateAdded: CRMRecordInfo[dateAdded],
            fname: CRMRecordInfo[fname],
            lname: CRMRecordInfo[lname],
            phoneNumber: CRMRecordInfo[phoneNumber],
            jobTitle: CRMRecordInfo[jobTitle],
            company: CRMRecordInfo[company],
            address: CRMRecordInfo[address],
            leadType: CRMRecordInfo[leadType]
            }

}

function editCRMRecordById(CRMIdForEdit,CRMRecordInfo){

  let startFunc = new Date().getTime();
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("main");
  const CRMRecordId = ws.getRange(2,1,ws.getLastRow()-1,1).getDisplayValues().map(r => r[0].toString().toLowerCase());
  const CRMRecordIdPosition = CRMRecordId.indexOf(CRMIdForEdit.toString().toLowerCase());
  const CRMRecordIdRowNumber = CRMRecordIdPosition === -1 ? 0 : CRMRecordIdPosition + 2;

  let changeValue = 'False';

  CRMRecordInfo.dateAdded != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('dateColumnIndex')) ? (ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('dateAddedColumnIndex')).setValue(CRMRecordInfo.dateAdded),(changeValue = 'True')) : PASS; 

  CRMRecordInfo.fname != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('firstNameColumnIndex')) ? ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('firstNameColumnIndex')).setValue(CRMRecordInfo.fname) : PASS;

  CRMRecordInfo.lname != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('lastNameColumnIndex')) ? ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('lastNameColumnIndex')).setValue(CRMRecordInfo.lname) : PASS;

  CRMRecordInfo.phoneNumber != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('phoneNumberColumnIndex')) ? ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('phoneNumberColumnIndex')).setValue(CRMRecordInfo.phoneNumber) : PASS;

  CRMRecordInfo.jobTitle != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('jobTitleColumnIndex')) ? ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('jobTitleColumnIndex')).setValue(CRMRecordInfo.jobTitle) : PASS;

  CRMRecordInfo.company != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('companyColumnIndex')) ? ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('companyColumnIndex')).setValue(CRMRecordInfo.company) : PASS;

  CRMRecordInfo.address != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('addressColumnIndex')) ? ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('addressColumnIndex')).setValue(CRMRecordInfo.address) : PASS;
  
  CRMRecordInfo.leadType != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('leadTypeColumnIndex')) ? ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('leadTypeColumnIndex')).setValue(CRMRecordInfo.leadType) : PASS;
  
  let endFunc = new Date().getTime();

  Logger.log('A specific record was edited in ' + (endFunc - startFunc) + ' microseconds. Was the date changed? ' + changeValue);

  return true;
}
