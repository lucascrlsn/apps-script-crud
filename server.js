function accessCRMCRUD() {

  let startFunc = new Date().getTime();
  
  let scriptProperties = PropertiesService.getScriptProperties();

  // SET WORKSHEET ID
  var SpreadsheetID = "1ASSelzFhN32EU--JyhYspcy3ZNDZmLWq1Q7Zgupdus4";
  scriptProperties.setProperty('SpreadsheetID', JSON.stringify(SpreadsheetID).replace(/['"]+/g,""));

  // SET COLUMN HEADER INDEXS IN THE BACKGROUND
  var ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SpreadsheetID')),
  ws = ss.getSheetByName("main"),
  headers = ws.getDataRange().getValues().shift();
  
  // SET HEADER INDICES PROPERTY FOR LATER USE
  scriptProperties.setProperty('rawDataColIndices', JSON.stringify(headers).replace(/['"]+/g,""))

  // CALL PROPERTY BY: PropertiesService.getScriptProperties().getProperty('rawDataColIndices')

  let dateAddedColumnIndex = headers.indexOf("Date Added")+1,
  firstNameColumnIndex = headers.indexOf("First Name")+1,
  lastNameColumnIndex = headers.indexOf("Last Name")+1,
  phoneNumberColumnIndex = headers.indexOf("Phone Number")+1,
  jobTitleColumnIndex = headers.indexOf("Job Title")+1,
  companyColumnIndex = headers.indexOf("Company")+1,
  addressColumnIndex = headers.indexOf("Address")+1,
  leadTypeColumnIndex = headers.indexOf("Lead Type")+1;

  try {
    // Set multiple script properties in one call.
    const scriptProperties = PropertiesService.getScriptProperties();
    scriptProperties.setProperties({
      'dateAddedColumnIndex': JSON.stringify(dateAddedColumnIndex).replace(/['"]+/g,""),
      'firstNameColumnIndex': JSON.stringify(firstNameColumnIndex).replace(/['"]+/g,""),
      'lastNameColumnIndex': JSON.stringify(lastNameColumnIndex).replace(/['"]+/g,""),
      'phoneNumberColumnIndex': JSON.stringify(phoneNumberColumnIndex).replace(/['"]+/g,""),
      'jobTitleColumnIndex': JSON.stringify(jobTitleColumnIndex).replace(/['"]+/g,""),
      'companyColumnIndex': JSON.stringify(companyColumnIndex).replace(/['"]+/g,""),
      'addressColumnIndex': JSON.stringify(addressColumnIndex).replace(/['"]+/g,""),
      'leadTypeColumnIndex': JSON.stringify(leadTypeColumnIndex).replace(/['"]+/g,"")
    });
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
  
  const htmlServ = HtmlService.createTemplateFromFile("app_CRM"),
  html = htmlServ.evaluate();
  html.setWidth(1200).setHeight(400);
  const ui = SpreadsheetApp.getUi();

  ui.showModalDialog(html, "Customer Relationship Management");

  let endFunc = new Date().getTime();

  Logger.log('The CRM tool opened in ' + (endFunc - startFunc) + ' microseconds');

}

function loadCRMPartialHTML_(partial){
  // REUSABLE FOR TABS WITHIN CRM EDIT GUI
  const htmlServ = HtmlService.createTemplateFromFile(partial);
  return htmlServ.evaluate().getContent();
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

  let endFunc = new Date().getTime();

  Logger.log('All data was returned in ' + (endFunc - startFunc) + ' microseconds');


  // TRY TO PLACE .withFailureHandler(failedDataRetrieval)
  return ws.getRange(2,1,ws.getLastRow()-1,ws.getMaxColumns()).getDisplayValues();

}

function deleteCRMDataByID(CRMIdForDelete){

  var startFunc = new Date().getTime();

  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SpreadsheetID'));
  const ws = ss.getSheetByName("main");

  const CRMRecordId = ws.getRange(2,1,ws.getLastRow()-1,1).getDisplayValues().map(r => r[0].toString().toLowerCase());
  const CRMRecordIdPosition = CRMRecordId.indexOf(CRMIdForDelete.toString().toLowerCase());
  const CRMRecordIdRowNumber = CRMRecordIdPosition === -1 ? 0 : CRMRecordIdPosition + 2;

  ws.deleteRow(CRMRecordIdRowNumber);

  var endFunc = new Date().getTime();

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

  // GET ROW VALUES BY EST COL VARS
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

  var startFunc = new Date().getTime();
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("main");
  const CRMRecordId = ws.getRange(2,1,ws.getLastRow()-1,1).getDisplayValues().map(r => r[0].toString().toLowerCase());
  const CRMRecordIdPosition = CRMRecordId.indexOf(CRMIdForEdit.toString().toLowerCase());
  const CRMRecordIdRowNumber = CRMRecordIdPosition === -1 ? 0 : CRMRecordIdPosition + 2;

  // ONLY WRITE IF A CHANGE WAS MADE BY THE USER

  // PREVIOUS CONDITIONALS

  /*if(CRMRecordInfo.date != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('dateColumnIndex'))){
    ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('dateColumnIndex')).setValue(CRMRecordInfo.date);
  }*/

  //TERNARY

  let changeValue = 'False';

  CRMRecordInfo.dateAdded != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('dateColumnIndex')) ? (ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('dateAddedColumnIndex')).setValue(CRMRecordInfo.dateAdded),(changeValue = 'True')) : PASS; 

  CRMRecordInfo.fname != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('firstNameColumnIndex')) ? ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('firstNameColumnIndex')).setValue(CRMRecordInfo.fname) : PASS;

  CRMRecordInfo.lname != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('lastNameColumnIndex')) ? ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('lastNameColumnIndex')).setValue(CRMRecordInfo.lname) : PASS;

  CRMRecordInfo.phoneNumber != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('phoneNumberColumnIndex')) ? ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('phoneNumberColumnIndex')).setValue(CRMRecordInfo.phoneNumber) : PASS;

  CRMRecordInfo.jobTitle != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('jobTitleColumnIndex')) ? ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('jobTitleColumnIndex')).setValue(CRMRecordInfo.jobTitle) : PASS;

  CRMRecordInfo.company != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('companyColumnIndex')) ? ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('companyColumnIndex')).setValue(CRMRecordInfo.company) : PASS;

  CRMRecordInfo.address != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('addressColumnIndex')) ? ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('addressColumnIndex')).setValue(CRMRecordInfo.address) : PASS;
  
  CRMRecordInfo.leadType != ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('leadTypeColumnIndex')) ? ws.getRange(CRMRecordIdRowNumber,PropertiesService.getScriptProperties().getProperty('leadTypeColumnIndex')).setValue(CRMRecordInfo.leadType) : PASS;
  
  var endFunc = new Date().getTime();

  Logger.log('A specific record was edited in ' + (endFunc - startFunc) + ' microseconds. Was the date changed? ' + changeValue);

  return true;
}
