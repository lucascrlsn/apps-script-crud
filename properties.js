function setProperties() {

  let scriptProperties = PropertiesService.getScriptProperties();

  // SET WORKSHEET ID
  let SpreadsheetID = "----------------YOUR SPREADSHEET ID-----------------";
  scriptProperties.setProperty('SpreadsheetID', JSON.stringify(SpreadsheetID).replace(/['"]+/g,""));

  // SET COLUMN HEADER INDEXS IN THE BACKGROUND
  let ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SpreadsheetID'));
  let ws = ss.getSheetByName("RAW DATA");

  let headers = ws.getDataRange().getValues().shift();
  // SET HEADER INDICES PROPERTY FOR LATER USE
  scriptProperties.setProperty('rawDataColIndices', JSON.stringify(headers).replace(/['"]+/g,""))

  let timestampColumnIndex = headers.indexOf("Timestamp")+1;
  scriptProperties.setProperty('timestampColumnIndex', JSON.stringify(timestampColumnIndex).replace(/['"]+/g,""));

  let dateColumnIndex = headers.indexOf("Date")+1;
  scriptProperties.setProperty('dateColumnIndex', JSON.stringify(dateColumnIndex).replace(/['"]+/g,""));

  let siteColumnIndex = headers.indexOf("Site")+1;
  scriptProperties.setProperty('siteColumnIndex', JSON.stringify(siteColumnIndex).replace(/['"]+/g,""));
  
  let justificationColumnIndex = headers.indexOf("Justification")+1;
  scriptProperties.setProperty('justificationColumnIndex', JSON.stringify(justificationColumnIndex).replace(/['"]+/g,""));
  
  let processColumnIndex = headers.indexOf("Process")+1;
  scriptProperties.setProperty('processColumnIndex', JSON.stringify(processColumnIndex).replace(/['"]+/g,""));
  
  let employeeTypeColumnIndex = headers.indexOf("Employee Type")+1;
  scriptProperties.setProperty('employeeTypeColumnIndex', JSON.stringify(employeeTypeColumnIndex).replace(/['"]+/g,""));
  
  let firstNameColumnIndex = headers.indexOf("First Name")+1;
  scriptProperties.setProperty('firstNameColumnIndex', JSON.stringify(firstNameColumnIndex).replace(/['"]+/g,""));
  
  let lastNameColumnIndex = headers.indexOf("Last Name")+1;
  scriptProperties.setProperty('lastNameColumnIndex', JSON.stringify(lastNameColumnIndex).replace(/['"]+/g,""));
  
  let IDColumnIndex = headers.indexOf("ID")+1;
  scriptProperties.setProperty('IDColumnIndex', JSON.stringify(IDColumnIndex).replace(/['"]+/g,""));

  let ShiftColumnIndex = headers.indexOf("Shift")+1;
  scriptProperties.setProperty('ShiftColumnIndex', JSON.stringify(ShiftColumnIndex).replace(/['"]+/g,""));
  
}
