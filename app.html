<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

    <style>
      .nav-link {
        cursor:pointer;
      }

      #loading {
        position:fixed;
        top:0;
        left:0;
        z-index:10000;
        width:100vw;
        height:100vh;
        background-color: rgba(255,255,255,.70);
      }

    </style>

  </head>
  <body>

    <div class="container">

      <nav id="navigation" class="mb-3">

        <ul class="nav nav-tabs main-nav">

          <li class="nav-item">
            <div class="nav-link active" id="CRM-search-link">Find a person</div>
          </li>

          <li class="nav-item">
            <div class="nav-link" id="CRM-help-link">Help</div>
          </li>

        </ul>

      </nav>

      <div id="crm-app"></div>
      <!-- Content here -->
      </div>

      <div id="loading" class="d-flex justify-content-center align-items-center invisible">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>

    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js" integrity="sha384-eMNCOe7tC1doHpGoWe/6oMVemdAVTMs2xqW4mwXrXsW0L84Iytr2wi5v2QjrP/xp" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js" integrity="sha384-cn7l7gDp0eyniUwwAZgrzD06kc/tftFf19TOAs2zVinnD/C7E91j9yyk5//jjpt/" crossorigin="anonymous"></script>
    -->
    <script>
      let CRMData;

      function loadView(options){
        let id = typeof options.id === "undefined" ? "crm-app" : options.id;
        let cb = typeof options.callback === "undefined" ? function(){} : options.callback;
        // ACTIVATE LOADING MODAL
        loadingStart();
        google.script.run.withSuccessHandler(function(html){
          document.getElementById(id).innerHTML = html;
          // DEACTIVATE LOADING MODAL
          loadingEnd();
          typeof options.params === "undefined" ? cb(): cb(options.params);
        })[options.func]();
      }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // LOAD CRM SEARCH TAB
      function loadCRMSearchView(){
        // PLACE THIS AFTER SEARCHVIEW BELOW IF PASSING PARAMS - , callback: otherFunc, params: {title: "You have executed ANOTHER search!"}
        loadView({func: "loadCRMSearchView", callback: setCRMDataForSearch});
        document.getElementById("CRM-search-link").textContent = "Lookup";
        
      }

      // LOAD CRM RECORDS ONLY INTO MEMORY FOR EASY SEARCH IN FUNC ABOVE
      function setCRMDataForSearch(){
        // ACTIVATE LOADING MODAL
        loadingStart();

        google.script.run.withSuccessHandler(function(CRMDataForSliceReturned){
          CRMData = CRMDataForSliceReturned.slice();
          // DEACTIVATE LOADING MODAL
          loadingEnd();
        }).getCRMDataForSearch();
        
      }

      function searchCRM(){
        let searchCRMInput = document.getElementById("searchCRMInput").value.toString().toLowerCase();
        let searchCRMWords = searchCRMInput.split(/\s+/);
        // COL INDICES SELECTED BELOW FOR ONLY COLUMNS/FIELDS THAT CONTAIN DATA THAT YOU WANT TO BE SEARCHED
        let CRMSearchColumns = [0,1,2,3,4,5,6,7];
        let CRMResultsArray = searchCRMInput === "" ? [] : CRMData.filter(function(r){
          return searchCRMWords.every(function(word){
            return CRMSearchColumns.some(function(colIndex){
              return r[colIndex].toString().toLowerCase().indexOf(word) !== -1;
            });
          });
        });

        let CRMRecordCount = searchCRMInput === "" ? "" : "Record Count: " + CRMResultsArray.length;
        document.getElementById("searchCounter").textContent = CRMRecordCount;
        let CRMSearchResultsBox = document.getElementById("CRMSearchResults");
        let CRMTemplateBox = document.getElementById("CRMRowTemplate");
        let CRMTemplate = CRMTemplateBox.content;
        CRMSearchResultsBox.innerHTML = "";
        CRMResultsArray.forEach(function(r){
          let CRMRow = CRMTemplate.cloneNode(true);
          // RECORD ID BELOW NEEDS TO BE UNIQUE, TYPICALLY TIMESTAMP OF DATA CREATION
          let recordIDColumn = CRMRow.querySelector(".recordID");
          let fnameColumn = CRMRow.querySelector(".fname");
          let lnameColumn = CRMRow.querySelector(".lname");
          let phoneNumberColumn = CRMRow.querySelector(".phoneNumber");
          let jobTitleColumn = CRMRow.querySelector(".jobTitle");
          let companyeColumn = CRMRow.querySelector(".company");
          let addressColumn = CRMRow.querySelector(".company");
          let leadTypeColumn = CRMRow.querySelector(".company");
          let deleteButton = CRMRow.querySelector(".delete-button");
          let editButton = CRMRow.querySelector(".edit-button");

          recordIDColumn.textContent = r[0];
          deleteButton.dataset.recordID = r[0];
          editButton.dataset.recordID = r[0];

          // BELOW INDICES NEED TO MATCH [PROJECT NAME]SearchColumns VAR LISTED ABOVE EXACTLY
          fnameColumn.textContent = r[1];
          lnameColumn.textContent = r[2];
          phoneNumberColumn.textContent = r[3];
          jobTitleColumn.textContent = r[4];
          companyeColumn.textContent = r[5];
          addressColumn.textContent = r[6];
          leadTypeColumn.textContent = r[7];

          CRMSearchResultsBox.appendChild(CRMRow).withFailureHandler(failedSearch());
        });
      }

      function deleteCRMRecord(e){
        let CRMRecordId = e.target.dataset.recordID;
        // ACTIVATE LOADING MODAL
        loadingStart();
        google.script.run.withSuccessHandler(function(){
          e.target.closest(".CRM-result-box").remove();
          let CRMIds = CRMData.map(function(r){ return r[0].toString().toLowerCase() });
          let index = CRMIds.indexOf(CRMRecordId.toString().toLowerCase());
          CRMData.splice(index,1);
          // DEACTIVATE LOADING MODAL
          loadingEnd();
        }).deleteCRMDataByID(CRMRecordId);
      }

      function afterEditViewLoads(params){
        // FILLS THE EDIT FORM WITH THE EXISTING DATA IN THE SHEET

        // ACTIVATE LOADING MODAL
        loadingStart();

        // FILLS EDIT FORM WITH CRM RECORD ID ONLY
        document.getElementById("recordID").value = params.recordID;

        // GET ENTIRE ROW OF DATA
        google.script.run.withSuccessHandler(function(CRMRecordInfo){
          document.getElementById("date").value = CRMRecordInfo.date;
          document.getElementById("site").value = CRMRecordInfo.site;
          document.getElementById("process").value = CRMRecordInfo.process;
          document.getElementById("shift").value = CRMRecordInfo.shift;
          document.getElementById("justification").value = CRMRecordInfo.justification;
          document.getElementById("employeeType").value = CRMRecordInfo.employeeType;
          document.getElementById("fname").value = CRMRecordInfo.fname;
          document.getElementById("lname").value = CRMRecordInfo.lname;
          document.getElementById("EUID").value = CRMRecordInfo.EUID;
          document.getElementById("securityProfessional").value = CRMRecordInfo.securityProfessional + ' | ' + CRMRecordInfo.formCertification + ' | SIGNED: ' + CRMRecordInfo.timestamp;
          document.getElementById("securityProfessionalEmail").value = CRMRecordInfo.securityProfessionalEmail;
          document.getElementById("managementReview").value = CRMRecordInfo.managementReview;
          // DEACTIVATE LOADING MODAL
          loadingEnd();
        }).getCRMRecordById(params.recordID);

        document.getElementById("CRM-search-link").textContent = "Back";
      }

      function editCRMRecord(){
        // ACTIVATE LOADING MODAL
        loadingStart();

        // GRAB ALL ROW DATA FROM EDIT FORM AND RUN BACKEND SERVER FUNC
        let CRMRecordInfo = {};
        CRMRecordInfo.date = document.getElementById("date").value;
        CRMRecordInfo.site = document.getElementById("site").value;
        CRMRecordInfo.process = document.getElementById("process").value;
        CRMRecordInfo.shift = document.getElementById("shift").value;
        CRMRecordInfo.justification = document.getElementById("justification").value;
        CRMRecordInfo.employeeType = document.getElementById("employeeType").value;
        CRMRecordInfo.fname = document.getElementById("fname").value;
        CRMRecordInfo.lname = document.getElementById("lname").value;
        CRMRecordInfo.EUID = document.getElementById("EUID").value;
        CRMRecordInfo.managementReview = document.getElementById("managementReview").value;        

        // idForEdit NOT PART OF PREVIOUS OBJECT
        let CRMIdForEdit = document.getElementById("recordID").value;

        google.script.run.withSuccessHandler(function(res){
          document.getElementById("save-success-message").classList.remove("invisible");
          setTimeout(function(){
            document.getElementById("save-success-message").classList.add("invisible")
          },2000);
          setTimeout(function(){loadCRMSearchView()},1500);
          // DEACTIVATE LOADING MODAL
          loadingEnd();          
        }).editCRMRecordById(CRMIdForEdit,CRMRecordInfo);
      }

      function loadCRMEditView(e){
        loadView({func: "loadCRMEditView", callback: afterEditViewLoads, params: {recordID: e.target.dataset.recordID} });
      }


      function loadCRMHelpView(){
        loadView({func: "loadCRMHelpView"});
      }

      function activeTabChange(e){
        let navLinks = document.querySelectorAll(".main-nav .nav-link");

        navLinks.forEach(function(linkEl){
          linkEl.classList.remove("active");
        });
        e.target.classList.add("active");
      }

      function loadingStart(){
        document.getElementById("loading").classList.remove("invisible");
        
      }

      function loadingEnd(){
        document.getElementById("loading").classList.add("invisible");
        
      }

      document.getElementById("CRM-search-link").addEventListener("click",loadCRMSearchView);
      document.getElementById("CRM-help-link").addEventListener("click",loadCRMHelpView);

      function CRMInputEventHandler(e){
        if(e.target.matches("#searchCRMInput")){
          searchCRM();
        }
      }

      function clickDeleteEventHandler(e){
        if(e.target.matches(".delete-button")){
          deleteCRMRecord(e);
        }
        if(e.target.matches(".edit-button")){
          loadCRMEditView(e);
        }

        if(e.target.matches("#save-changes")){
          editCRMRecord();
        }

        if(e.target.matches("#cancel-changes")){
          loadCRMSearchView();
        }

      }

      function navClickEventHandler(e){
        if(e.target.matches(".nav-link")){
          activeTabChange(e);
        }

      }

      document.getElementById("crm-app").addEventListener("input",CRMInputEventHandler);
      document.getElementById("crm-app").addEventListener("click",clickDeleteEventHandler);
      document.getElementById("navigation").addEventListener("click",navClickEventHandler);
      document.addEventListener("DOMContentLoaded", loadCRMSearchView);

    </script>


  </body>
</html>
