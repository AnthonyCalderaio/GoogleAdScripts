//For every event we want to search the whole "AllTimeCount" sheet.
//   In that loop, if we are in that events category, if that category begins with addtocart_ than if that value === that cell exactly, than in the frequency column we want to increase by one and change the bool to recorded
//   If you run out of cells that are in the document then appendRow(["SHEETCategory","SHEETAction","1","Date"]) and change the bool to recorded

function main() {
  
  
   //Get today's date in following format: ---Wed Nov 28 2018 10:44:42 GMT-0800 (PST)---
  	//You cannot print this unless you turn it into a String like the "stringNow" variable 
  	//under "Variables"
  	var now = new Date();
  
 	//We need to specify a Time Zone to get a today variable
  	var timeZone = AdsApp.currentAccount().getTimeZone();
  	
  	//Set the variable 'today' to pioint to todays date 
    var today = Utilities.formatDate(now, timeZone, 'yyyyMMdd');
  
    //Date Varibales
  
  	//Now in String form
  	var stringNow = now.toString();
  	
    //Today in String form
  	var todayString = today.toString();
	
    //Year date in YYYY format
  	var year = todayString.slice(0,4);
  
  	//Month date in MM format
  	var monthDig = todayString.slice(4,6);
 
  	//Day date in DD format
    var todaysNumberDate = stringNow.slice(8,10);
  	
  		//Number date turned to integer
  		var numberDate = Number(todaysNumberDate);
  		numberDate = Math.round(numberDate);
  
   if(
    stringNow.slice(16,18).toString() === "21"
  //1<2
  ){
  Logger.log("StringNow: "+stringNow)
  function getNamedRange() {
  var SPREADSHEET_URL = 'INSERT_SPREADSHEET_URL_HERE';
  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);

  // Log the number of columns for the range named 'TaxRates' in the
  // spreadsheet.
  var range = ss.getRangeByName('TaxRates');
  if (range) {
    Logger.log(range.getNumColumns());
  }
}
  
  function sortSheet(url,sheetname) {
  var SPREADSHEET_URL = url;
  // Name of the specific sheet in the spreadsheet.
  var SHEET_NAME = sheetname;

  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = ss.getSheetByName(SHEET_NAME);

  // Sorts the sheet by the first column, descending.
  sheet.sort(1, false);
}
  
  
  var SPREADSHEET_URL = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  var SHEET_NAME = "ALLTIMECOUNT"
  
  
  function checkSheet(category, action){
        Logger.log("Checking Sheet...")
		  var thisCategory = category;
    	  var thisAction = action;
    
    	  //Logger.log("ThisCategory-"+thisCategory.toString()+"-")
    	  //Logger.log("ThisCategory-"+thisAction.toString()+"-")
    	  var finished = false;
          var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
          var sheet = ss.getSheetByName(SHEET_NAME);
             //Logger.log(allCampaigns[k]);
             var range = sheet.getRange('A1:F700');

             var values = range.getValues();

    		//CHECK WHOLE SHEET
             for (var i = 0; i < values.length; i++) 
             {
               		//If there was a match, do this
               		//if (values[i][0].toString() === thisCategory.toString() && values[i][1].toString() === thisAction.toString())
               		  if (values[i][0].toString() === thisCategory.toString())
                    {
                      //Logger.log("Something should happen");
                    	var holder = values[i][2];
                        var holderNum = Number(holder);
                        var newVal = holderNum + 1;
                        //values[i][2] = holderNum++;
                        var values = [
                          [newVal.toString(),"Updated",stringNow]
                        ];

                        var range = sheet.getRange('C'+(i+1)+':E'+(i+1));
                        range.setValues(values);
                      Logger.log("Match. Returning"+"Row: "+i)
                        return;
                    }
  			 }
     Logger.log("Wasnt found. Adding New")
     sheet.appendRow([thisCategory.toString(),thisAction.toString(),1,"added",stringNow])
    return;
    
    
    
  }
  
  
  
  var CategoryArray = []
  var ActionArray = []
  
  function checkProduct(input){
    
    if(input.toString() === "addtocart_35"){
    	return "DET-MAGBOLT";
    }
    if(input.toString() === "addtocart_37"){
    	return "DET-MAGNL";
    }
    if(input.toString() === "addtocart_63"){
    	return "LB-USP"
    }
    if(input.toString() === "addtocart_84"){
    	return "T-82BT";
    } 
    if(input.toString() === "addtocart_115"){
    	return "BACK-CONEBG";
    }
    if(input.toString() === "addtocart_118"){
    	return "BACK-NIP";
    }
    if(input.toString() === "addtocart_145"){
    	return "DET-HDGR";
    }
    if(input.toString() === "addtocart_181"){
    	return "LB-82BC15"
    }
    if(input.toString() === "addtocart_218"){
    	return "P-FHS";
    }
    if (input.toString() === "addtocart_290"){
    	return "T-MW-MICBG PO";
    }
    if(input.toString() === "addtocart_291"){
    	return "T-MICWH PO"
    }
    if (input.toString() === "addtocart_928"){
    	return "DEAC-CPPD PO";
    }
    if(input.toString() === "addtocart_1189"){
    	return "LY-8DWW";
    }
    if(input.toString() === "addtocart_1471"){
    	return "LB-58WARN";
    }
    if(input.toString() === "addtocart_2334"){
    	return "INK-58SMARTIV PO";
    }
    if (input.toString() === "addtocart_2456"){
    	return "LB-58SEALS-NA W/SEC DECT"
    }
    if(input.toString() === "addtocart_3513"){
    	return "INK-58SVGS RECTANGLE"
    }
    if(input.toString() === "addtocart_3621"){
    	return "ANT-ULEXIT M PO";
    }
    if(input.toString() === "addtocart_3622"){
    	return "ANT-ULEXIT R PO";
    }
    if(input.toString() === "addtocart_3642"){
    	return "LB-58PLRL";
    }
    if(input.toString() === "addtocart_3651"){
    	return "LB-82BSISUPBC30"
    }
    if(input.toString() === "addtocart_4989"){
    	return "LB-58BCRLQ-1.7K";
    }
    if(input.toString() === "addtocart_5273"){
    	return "ANT-ULM VI PO";
    }
    if(input.toString() === "addtocart_5289"){
    	return "INK-58DVR G PO";
    }
    if(input.toString() === "addtocart_5781"){
    	return "Big5Sporting-addtocart_5781";
    }
    if(input.toString() === "addtocart_5856"){
    	return "AgriPackage-addtocart_5856";
    }
    if(input.toString() === "addtocart_5989"){
    	return "AgriPackage-addtocart_5989";
    }
    if(input.toString() === "addtocart_6024"){
    	return "AgriPackage-addtocart_6024";
    }
    if(input.toString() === "addtocart_6025"){
    	return "AgriPackage-addtocart_6025";
    }
    if(input.toString() === "addtocart_6028"){
    	return "AgriPackage-addtocart_6028";
    }
    else{
    	return input;
    }
  }
  
 
  var emailString = "" 
  
  function filterStats() {
  var profileId = 'xxxxxxxxx';
    
  //var startDate = "2018-11-01"
  //var endDate  = "2018-11-29"
  
  
  var thisMonthDynamicStartDate = year + "-" + monthDig + "-" + todaysNumberDate
    //var thisMonthDynamicStartDate = year + "-" + 02 + "-" + 10
  Logger.log("Start date: "+thisMonthDynamicStartDate)
    
  var thisMonthDynamicEndDate = year + "-" + monthDig + "-" + todaysNumberDate
    //var thisMonthDynamicEndDate = year + "-" + 02 + "-" + 27
  
var totalEvents = Analytics.Data.Ga.get(
      'ga:' + profileId,
      thisMonthDynamicStartDate,  // Start date in yyyy-mm-dd format.
      thisMonthDynamicEndDate,  // End date in yyyy-mm-dd format.
       'ga:totalEvents', // List of all metrics to retrieve.
      {
       //'dimensions':'ga:eventCategory'
      }
    );
  

    
    var NewUserSession = Analytics.Data.Ga.get(
      'ga:' + profileId,
      thisMonthDynamicStartDate,  // Start date in yyyy-mm-dd format.
      thisMonthDynamicEndDate,  // End date in yyyy-mm-dd format.
       'ga:eventValue', // List of all metrics to retrieve.
      {
       'dimensions':'ga:eventCategory, ga:eventAction'
      }
    );

 
	var categoryOrAction = ""
  
    
    //'ga:visitors'
    
    
    try{
      var i = 0;
      while (i< totalEvents.rows[0][0]){
      //Iterate through every event
        var SHEETCategory = '';
        var SHEETAction = '';
      for(var j = 0; j<2; j++){
        var AllUsersNum =  NewUserSession.rows[i][j]
        

        
        //Category Extraction
        if(j===0){
        	categoryOrAction="Category"
            
          //if(AllUsersNum.toString().indexOf("http:") !== -1){
              AllUsersNum = checkProduct(AllUsersNum);
          	  SHEETCategory = AllUsersNum;
              emailString = emailString.toString() + (categoryOrAction+":  "+AllUsersNum).toString()+"\n"
             CategoryArray.push(AllUsersNum)
              //Logger.log(categoryOrAction+":  "+AllUsersNum)
            //}
        }
        //Category Extraction
        
        
        
        //Action Extraction
        if(j===1){
        	categoryOrAction="  Action"
            SHEETAction = AllUsersNum;
          //if(AllUsersNum.toString().includes("addtocart")){
            	//emailString = emailString.concat(categoryOrAction+":  "+AllUsersNum);
          //Regex for end of link
           var isLink = false;
           isLink = /^http/.test(AllUsersNum);
          //Logger.log(isLink)
          var linkSuffix = '';
          //if(isLink===true){
           // try{linkSuffix=AllUsersNum.match('([^/]*)$');
               
                //Logger.log("Long Suffix Alert")
                //linkSuffix = linkSuffix.match('([^?]*)$')
                  //Logger.log("New Link Suffix"+linkSuffix)
                
                //Logger.log("Link Suffix-----"+linkSuffix+"-------")
            
               //}catch(err){
               //Logger.log("Err: "+err)
               //}
          	
            //Logger.log("Link Suffix")
          //}
          
          
          emailString = emailString.toString() + (categoryOrAction+":  "+AllUsersNum).toString()+"\n"
          ActionArray.push(AllUsersNum)
        }
        //Action Extraction Over
        
        
        //Logger.log(categoryOrAction+":  "+AllUsersNum)
      }
     // var AllUsersNum =  NewUserSession.rows[i][j]
  		//Logger.log(AllUsersNum)
       
        Logger.log("Check Sheet For: "+SHEETCategory+" and  "+SHEETAction.toString())	
        try{checkSheet(SHEETCategory, SHEETAction);}catch(err){}
       
       
        
      i++;
        //Next event
    }
    //End of events  
    }
    catch(err){}  
  }
  
  filterStats()
  
  Logger.log("\n"+"\n"+"Email String: "+"\n"+emailString)
  if(emailString === ""){
  	Logger.log("Email String empty. No email dispatched.")
  }
  
  ///  	-----------------------------------------------------------------------------------------------------------     
  	
/// 	 /////                           Emails					       					                       \\\\\\\													 
  else{
    //Logger.log("Email dispatched to "+"\""+"xxxxxxxxxxxxxxxxxx"+"\"")
    //Send an email to Anthony
  	//MailApp.sendEmail(
              				   //Recipient of email...
              				   //'xxxxxxxxxxxxxx',
      
              				   //Subject Field of email...
                    		   //'Daily Report',
      
              				   //Body of email...
      						   //"Events this hour: "+emailString);
  }
  Logger.log(stringNow)
  Logger.log(stringNow.slice(15,18))
  
  if(
    stringNow.slice(16,18).toString() === "21"
  //1<2
  ){
  //Start logging the frequency of each button click
    var SPREADSHEET_URL = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    var SHEET_NAME1 = 'AllDay';
    var SHEET_NAME2 = 'AllTimeCount';
    var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    var sheet = ss.getSheetByName(SHEET_NAME1);
    if (ActionArray.length != CategoryArray.length){
    	Logger.log("Categorys and Actons Array Lengths Don't Match");
    }else{
      var i = 0;
      sheet.appendRow(["Category","Action","Now"]);
      for (i;  i < ActionArray.length; i++){
          sheet.appendRow([CategoryArray[i],ActionArray[i],stringNow]);
      }
      sheet.appendRow([" "," "," "]);
      //Also Send an email of the days events
      MailApp.sendEmail(
              				   //Recipient of email...
              				   'xxxxxxxxxxxxxxxx',
      
              				   //Subject Field of email...
                    		   'Events-Today-',
      
              				   //Body of email...
      						   "Events this hour: "+emailString)
      
    }
    
    //Logger.log("true")
    //Logger.log(CategoryArray[1]+" - "+CategoryArray.length)
    //Logger.log(ActionArray+" - "+ActionArray.length)
    
  }
	
    
  //var variable = "addtocart_119";
  //Logger.log("Slice experiment: "+variable.slice(0,10))
  
  
  //sortSheet(SPREADSHEET_URL,SHEET_NAME);
  
   }
  
}
