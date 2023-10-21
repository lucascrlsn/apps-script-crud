function setProperties() {
  let scriptProperties = PropertiesService.getScriptProperties();

  // SET WORKSHEET ID
  let SpreadsheetID = "1ASSelzFhN32EU--JyhYspcy3ZNDZmLWq1Q7Zgupdus4";
  scriptProperties.setProperty('SpreadsheetID', JSON.stringify(SpreadsheetID).replace(/['"]+/g,""));

  // SET COLUMN HEADER INDEXS IN THE BACKGROUND
  let ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SpreadsheetID')),
  ws = ss.getSheetByName("main"),
  headers = ws.getDataRange().getValues().shift();
  
  // SET HEADER INDICES PROPERTY FOR LATER USE
  scriptProperties.setProperty('rawDataColIndices', JSON.stringify(headers).replace(/['"]+/g,""))

  // CALL PROPERTY BY: PropertiesService.getScriptProperties().getProperty('rawDataColIndices')

  dateAddedColumnIndex = headers.indexOf("Date Added")+1,
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
}
