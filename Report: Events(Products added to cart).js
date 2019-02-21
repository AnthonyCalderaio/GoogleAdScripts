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
  var emailString = "" 
  
  function filterStats() {
  var profileId = 'xxxxxxxxx';
    
  //var startDate = "2018-11-01"
  //var endDate  = "2018-11-29"
  
  
  var thisMonthDynamicStartDate = year + "-" + monthDig + "-" + todaysNumberDate
  Logger.log("Start date: "+thisMonthDynamicStartDate)
    
  var thisMonthDynamicEndDate = year + "-" + monthDig + "-" + todaysNumberDate
  
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
      for(var j = 0; j<2; j++){
        var AllUsersNum =  NewUserSession.rows[i][j]
        //Logger.log("i: "+i+"   j: "+j+"     "+AllUsersNum
        if(j===0){
        	categoryOrAction="Category"
          //if(AllUsersNum.toString().indexOf("http:") !== -1){
              emailString = emailString.toString() + (categoryOrAction+":  "+AllUsersNum).toString()+"\n"
              Logger.log(categoryOrAction+":  "+AllUsersNum)
            //}
        }
        if(j===1){
        	categoryOrAction="  Action"
          //if(AllUsersNum.toString().includes("addtocart")){
            	//emailString = emailString.concat(categoryOrAction+":  "+AllUsersNum);
          emailString = emailString.toString() + (categoryOrAction+":  "+AllUsersNum).toString()+"\n"
              Logger.log(categoryOrAction+":  "+AllUsersNum)
          	  //Logger.log("Index of addtocart"+AllUsersNum.includes("addtocart"))
            //}
        }
            
        	
        //Logger.log(categoryOrAction+":  "+AllUsersNum)
      }
     // var AllUsersNum =  NewUserSession.rows[i][j]
  		//Logger.log(AllUsersNum)
      i++;
    }}
    catch(err){}  
  }
  
  filterStats()
  
  Logger.log("\n"+"\n"+"Email String: "+emailString)
  if(emailString === ""){
  	Logger.log("Email String empty. No email dispatched.")
  }
  
  ///  	-----------------------------------------------------------------------------------------------------------     
  	
/// 	 /////                           Emails					       					                       \\\\\\\													 
  else{
    Logger.log("Email dispatched to "+"\""+"emailaddres@domain.com"+"\"")
    //Send an email to xxxxx
  	MailApp.sendEmail(
              				   //Recipient of email...
              				   'emailaddres@domain.com',
      
              				   //Subject Field of email...
                    		   'Daily Report',
      
              				   //Body of email...
      						   "Events this hour: "+emailString)
  }

  
}
