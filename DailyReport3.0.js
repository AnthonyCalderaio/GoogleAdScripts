//Script Name: Report: Ad Campaign Over/Under Budget Spend
//Written By Anthony Joseph Calderaio Jr.
//Date Written: 11/28/2018 @ 11:39 AM
//Last Modified: 2/04/2018 @ 4:21 PM
//
//Summary: 
//			This script emails what differences of what campaigns overspent 
//			and their amounts as well as which campaigns underspent and their
//			amount.
//
//
//
//                      //////////////////////////////////////////////////////////////////////
//                     /////////////            Report: Daily Report           //////////////
//                    //////////////////////////////////////////////////////////////////////
//
//
// 															Technical Jargon 
//
// Regular Expression: A regular expression (regex or regexp for short) is a special text string for describing a search pattern. 
//					   You can think of regular expressions as wildcards on steroids. 
//					   You are probably familiar with wildcard notations such as *.txt to find all text files in a file manager. 
//				       The regex equivalent is ^.*\.txt$.
//
//
//
//
//
//
//
//
//


//Main Function
function main() {
  
    //////									API Referenced  Variables                                  \\\\\\\
    /////																							    \\\\\\\
   
    //Shopping Campaign Reference
    var CampaignIter = AdWordsApp.shoppingCampaigns().withCondition("Status = 'ENABLED'").get();
  
    //Shopping Campaign Var
  	var ShoppingCampaign = CampaignIter.next();
  
    //Shopping Campaign Stats
    var ShoppingStats = ShoppingCampaign.getStatsFor("TODAY");
    var MonthlyShoppingStats = ShoppingCampaign.getStatsFor("THIS_MONTH");
  
  	
    
  
	//Here we are pointing the stats for the entire month into the reference 'stats'
  	var stats = AdWordsApp.currentAccount().getStatsFor("THIS_MONTH");
  	
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
  
  //   /////// 				                                    \\\\\\\\\\\\\\\\\\	---									
  //  /////// 		Analytics Advanced  API Reporting			 \\\\\\\\\\\\\\\\\\ ---
  //  \\\\\\\										 			 ////////////////// ---
  //   \\\\\\\		START-START-START-START-START-START	 	   	//////////////////  ---
  
 
  
                          ////////////// -- Get Account by name FUNCTION
                            //function getAccountByName() {
                            //var accountName = 'Best Security Industries';
                           // var accounts = Analytics.Management.Accounts.list();
                            //var profiles = Analytics.Management.Profiles.list() 

                            //for (var i = 0; i < accounts.items.length; i++) {
                            //  if (accountName == accounts.items[i].name) {
                               // Logger.log('Account ID: %s, Name = %s', accounts.items[i].id,
//IGNORE                                  //  accounts.items[i].name);
                             // }
                            //}

                           // for (var i = 0; i < profiles.items.length; i++) {
                             //   Logger.log(profiles.items[i]);
                            //}    
                            //return; 
                          //}
                          ///////////////////
  
  
  
  function listAllProfiles() {
    
  	var accountId = '90544538';
  	var webPropertyId = 'UA-90544538-1';

  	var profiles = Analytics.Management.Profiles.list(accountId, webPropertyId);

      for (var i = 0; i < profiles.items.length; i++) {
        Logger.log('Profile ID: %s, Name: %s', profiles.items[i].id,
            profiles.items[i].name);
      }
  }
  
  
                          ////////////////////

                            //function runRealTimeReport() {
                            // See https://support.google.com/analytics/answer/1638635 to learn more about
                            // real-time reporting.

                            //var profileId = '138359559';

                            //var results = Analytics.Data.Realtime.get(
                              //'ga:' + profileId,
                              //'rt:activeUsers',
                             /// {
                                // 'dimensions': 'rt:medium'
                              //}
                            //);

                            //var headers = [];
//IGNORE                            //for (var i = 0; i < results.columnHeaders.length; i++) {
                             // headers.push(results.columnHeaders[i].name);
                          //  }
                           // Logger.log(headers.join(','));

                           // for (var i = 0; i < results.rows.length; i++) {
                           //   var rowData = [];

                            //  var row = results.rows[i];
                            //  for (var j = 0; j < row.length; j++) {
                            //    var cell = row[j];
                            //    rowData.push(cell);
                            //  }
                           //   Logger.log(rowData.join(','));
                           // }
                          //}
                          /////////////////////
  
  //Get Stats with an optional filter FUNCTION
  function filterStats() {
  var profileId = '138359559';
    
  //var startDate = "2018-11-01"
  //var endDate  = "2018-11-29"
  
  
  var thisMonthDynamicStartDate = year + "-" + monthDig + "-" + "01"
  Logger.log("Start date: "+thisMonthDynamicStartDate)
    
  var thisMonthDynamicEndDate = year + "-" + monthDig + "-" + todaysNumberDate
  
  //TESTINGPURPOSES
  //var thisMonthDynamicEndDate = year + "-" + monthDig + "-" + "30"
  //Logger.log("End Date: "+thisMonthDynamicEndDate)
  

  var results = Analytics.Data.Ga.get(
      'ga:' + profileId,
      thisMonthDynamicStartDate,  // Start date in yyyy-mm-dd format.
      thisMonthDynamicEndDate,  // End date in yyyy-mm-dd format.
      'ga:sessions', // List of all metrics to retrieve.
      //'ga:Users
      {
        // Filter for Firefox browser users in the USA. See
        // https://developers.google.com/analytics/devguides/reporting/core/v3/reference#filters
        // for filter syntax, and
        // https://developers.google.com/analytics/devguides/reporting/core/dimsmets
        // for the list of supported Dimensions and Metrics.
        //'filters': 'ga:browser==Firefox;ga:country==United States'
      }
  );
    
    var NewUserSession = Analytics.Data.Ga.get(
      'ga:' + profileId,
      thisMonthDynamicStartDate,  // Start date in yyyy-mm-dd format.
      thisMonthDynamicEndDate,  // End date in yyyy-mm-dd format.
       'ga:percentNewSessions', // List of all metrics to retrieve.
      {
       //'dimensions':'ga:30dayUsers'
      }
      
      
    );
    
    //var Users = Analytics.Data.Ga.get(
      //'ga:' + profileId,
      //thisMonthDynamicStartDate,  // Start date in yyyy-mm-dd format.
      //thisMonthDynamicEndDate,  // End date in yyyy-mm-dd format.
       //'ga:users', // List of all metrics to retrieve.
      //{
       //'dimensions':'ga:30dayUsers'
      //}  
    //);
    
    
    var newUsers = Analytics.Data.Ga.get(
      'ga:' + profileId,
       thisMonthDynamicStartDate,  // Start date in yyyy-mm-dd format.
      thisMonthDynamicEndDate,  // End date in yyyy-mm-dd format.
      'ga:newUsers', 
      
      // List of all metrics to retrieve.
      //'ga:Users
      {
        // Filter for Firefox browser users in the USA. See
        // https://developers.google.com/analytics/devguides/reporting/core/v3/reference#filters
        // for filter syntax, and
        // https://developers.google.com/analytics/devguides/reporting/core/dimsmets
        // for the list of supported Dimensions and Metrics.
        //'filters': 'ga:browser==Firefox;ga:country==United States'
      }
  );
    
     var AllUsers = Analytics.Data.Ga.get(
        'ga:' + profileId,
        thisMonthDynamicStartDate,  // Start date in yyyy-mm-dd format.
      thisMonthDynamicEndDate,  // End date in yyyy-mm-dd format.
        'ga:visitors', // List of all metrics to retrieve.
        //'ga:users',
      {
        // Filter for Firefox browser users in the USA. See
        // https://developers.google.com/analytics/devguides/reporting/core/v3/reference#filters
        // for filter syntax, and
        // https://developers.google.com/analytics/devguides/reporting/core/dimsmets
        // for the list of supported Dimensions and Metrics.
        //'filters': 'ga:browser==Firefox;ga:country==United States'
     }
    );
    
    var NewVisitors = Analytics.Data.Ga.get(
        'ga:' + profileId,
        thisMonthDynamicStartDate,  // Start date in yyyy-mm-dd format.
      thisMonthDynamicEndDate,  // End date in yyyy-mm-dd format.
        //'ga:newVisits', // List of all metrics to retrieve.
        'ga:newUsers',
      {
        // Filter for Firefox browser users in the USA. See
        // https://developers.google.com/analytics/devguides/reporting/core/v3/reference#filters
        // for filter syntax, and
        // https://developers.google.com/analytics/devguides/reporting/core/dimsmets
        // for the list of supported Dimensions and Metrics.
        //'filters': 'ga:browser==Firefox;ga:country==United States'
     }
    );
    
    var ReturningVisitors = Analytics.Data.Ga.get(
    	'ga:' + profileId,
      	 thisMonthDynamicStartDate,
      	 thisMonthDynamicEndDate,
      	'ga:users',
      {
        'dimensions':'ga:userType'
      }
    );
    
    
///   /////                           FOR TESTING PURPOSES					        \\\\\\\													 
///  /////   Uncomment the below logs and click "preview" in Google Ads scripts      \\\\\\\
/// /////              --Check the "Logs" section for the logged data--               \\\\\\\
    
    
 
    //Logger.log('View (Profile) Name: %s', results.profileInfo.profileName);
  	//Logger.log('Total Sessions: %s', results.rows[0][0]);
  	//var userNum = users.rows[0][0];
  	//var newUserNum = newUsers.rows[0][0];
  	//Logger.log('Total Users: %s', userNum);
  	//Logger.log('Total New Users: %s', newUserNum)
    
    //newUsers
    //returningUsers
    //newVisitors
    
    //var userss = users.rows[0][0]
    //Logger.log('userss: %s', userss)
   
    //'ga:visitors'
  	var AllUsersNum =  AllUsers.rows[0][0]
  	Logger.log('Correct - Total Users: %s', AllUsersNum )
    
    //'ga:newUsers'
    var NewVisitorNum = NewVisitors.rows[0][0]
    Logger.log('New Visitors : %s',NewVisitorNum)
    
    //'ga:users'
    var ReturningVisitorNum = ReturningVisitors.rows[1][1]
    Logger.log('Return Visitor : %s',ReturningVisitorNum)
    
    var returningVisitorPercent = (ReturningVisitorNum/NewVisitorNum)*100;
    returningVisitorPercent = parseFloat(returningVisitorPercent).toFixed(2);
    
    var ExplicitReturningVisitorsPercent = "Returning Visitors: "+numberWithCommas(ReturningVisitorNum)+" \/ "+"New Visitors: "+numberWithCommas(NewVisitorNum)+" = "+returningVisitorPercent+"%";
    Logger.log(ExplicitReturningVisitorsPercent);
    Logger.log(returningVisitorPercent);
    
    var R = Analytics.Data.Ga.get(
    	'ga:' + profileId,
      	 '2019-01-01',
      	 '2019-10-30',
      	'ga:percentNewSessions',
      {
        //'dimensions':'ga:sessionCount'
      }
    );
    
    Logger.log('8%?? '+R)
    
    //var UsersNum = Users.rows[0][0]
    //Logger.log('Visitors : %s',UsersNum)
    
    //var NewUserSessionPercent = NewUserSession.rows[0][0]
    //Logger.log('NewUser Session Percent: %s', NewUserSessionPercent)
    
    //var something = (AllUsersNum / parseFloat(NewUserSessionPercent).toFixed(2)) * 12.57
    //Logger.log('Something: %s', something)
    
    //var something = RetentionRate.rows[0][0]
    //Logger.log('Retention Rate: %s', something)
    
    
    
    
    
    
    //var sentPercent = NewVisitorNum/AllUsersNum 
    //Logger.log("Inverted Percent: %s",sentPercent)
    
    //var newNum = totalVisitors;
    
   	//var newVisitors = newVisitors.rows[0][0]
   	//Logger.log('CORRECT - New Visitors: %s', newVisitors)
    
    //var returningVisitorNum = totalVisitors - newVisitors;
    //Logger.log('returning visitor Number: %s',returningVisitorNum)
    
    //var returningVisitor = newVisitors / totalVisitors
    //Logger.log('Returning Visitors percent: %s', returningVisitor)
    
    
    
    
    //Logger.log("Returning Visitor: %s", returningVisitor*10)
    
///  \\\\\\                            FOR TESTING PURPOSES					           ///////												 
///   \\\\\\   Uncomment the below logs and click "preview" in Google Ads scripts     ///////
///    \\\\\\              --Check the "Logs" section for the logged data--          ///////
    
    
    
  //   /////// 				                                    \\\\\\\\\\\\\\\\\\	---	API @ https://developers.google.com/analytics/devguides/reporting/core/dimsmets								
  //  /////// 		Analytics Advanced  API Reporting			 \\\\\\\\\\\\\\\\\\ --- 
  //  \\\\\\\										 			 ////////////////// ---
  //   \\\\\\\			END-END-END-END-END-END	 	     		//////////////////  ---
    
    
///  	-----------------------------------------------------------------------------------------------------------    
    
  
  
///  	//////									Helper Functions                                          \\\\\\\
///    //////																							   \\\\\\\
  
    //1) 
    //This is a helper function that uses a Regular Expression*** to replace whatever number 
  	//we feed it with commas seperating the thousands. This is just a readability enhancement.
  	function numberWithCommas(x) {
    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
    
  	//2) 
    //This helper function rounds the input to two decimal places.
    function roundFunction(x) {
  		return parseFloat(x * 10).toFixed(2);
	}
    //3)
    //This rounds up to the decimal point specified.
    //Example: Turns "roundUp((0.882 * 100),3)" to "0.88"
    function roundUp(num, precision) {
  	  precision = Math.pow(10, precision)
  	    return Math.ceil(num * precision) / precision
    }
///    \\\\\\									Helper Functions                                            ///////
///     \\\\\\																							   ///////    
  	

///  	-----------------------------------------------------------------------------------------------------------
  
  
///  	//////									    Variables                    							\\\\\\\
///    //////															          							 \\\\\\\
    
 //Attribute Variables
    
//- //SHOPPING STATS
        var shoppingConversionToday = false;
    
        //Shopping Clicks
        var shoppingClicks = ShoppingStats.getClicks();
        //Logger.log("shoppingClicks: "+shoppingClicks)

        //Shopping Ctr
        var shoppingCtr = roundUp((ShoppingStats.getCtr() * 100),2) + "%"
        //Logger.log("Shopping Ctr: "+shoppingCtr)
        
        var shoppingConversion = ShoppingStats.getConversions();
        Logger.log("Shopping Conversions today: "+shoppingConversion)
        
        var monthlyShoppingConversion = MonthlyShoppingStats.getConversions();
        Logger.log("Shopping Conversions tThis monthy: "+monthlyShoppingConversion)
    
        if (ShoppingStats.getConversions() > 0){
    	 shoppingConversionToday = true;
        }
    
//- //REGULAR CAMPAIGN STATS
  
        // Pulled clicks from stats variable
        var clicks = stats.getClicks();

        //Pulled impressions from stats variable
        var impress = stats.getImpressions();

        // Speaks for itself
        var dailyClicks = (clicks / numberDate);

        //Pulled CTR from stats variable
        var ctr = stats.getCtr();

        //Need to make out of 100%
        var ctrX100 = ctr * 100;

        //Pulling Cost from stats variable
        var cost = stats.getCost();
    
    //Round returning visitor to two decimal places.
    //returningVisitor = roundFunction(returningVisitor) 
  	
  	  
//- //Readbility enhancements
  
  		//Add commas with our helper function
  		clicks = numberWithCommas(clicks);
  
  		//Add commas with our helper function
  		impress = numberWithCommas(impress);
  
  		//Round up if given a decimal
    	dailyClicks = Math.round(dailyClicks);
  
        //Add commas with our helper function
    	cost = numberWithCommas(cost)
    
    
    
///    \\\\\\									    Variables                                                /////
///     \\\\\\																		                         /////  
  	
    
///  	-----------------------------------------------------------------------------------------------------------    
    
    
/// 	 /////                           FOR TESTING PURPOSES					       					      \\\\\\\													 
///     /////   Uncomment the below logs and click "preview" in Google Ads scripts      					   \\\\\\\
///    /////              --Check the "Logs" section for the logged data--               						\\\\\\\ 
    
                //Logger.log("Todays performance update");
                //Logger.log("Today is "+monthDig+"/"+todaysNumberDate+"/"+year);
                //Logger.log("-------------------------");
                //Logger.log("Clicks Per day: "+dailyClicks);
                //Logger.log("Clicks today:   "+clicks);
                //Logger.log("Impressions:    "+impress);
                //Logger.log("CTR:            "+ctrX100+"%");
                //Logger.log("Returning Customer Percent:  SEE GOOGLE ANALYTICS ");
                //Logger.log("Cart abandoment stats:       SEE NETSUITE REPORTS ");
    
///  \\\\\\                            FOR TESTING PURPOSES					             						 ///////												 
///   \\\\\\   Uncomment the below logs and click "preview" in Google Ads scripts       						///////
///    \\\\\\              --Check the "Logs" section for the logged data--            						   ///////

///  	-----------------------------------------------------------------------------------------------------------     
  	
/// 	 /////                           Emails					       					                       \\\\\\\													 

    //Send an email to Anthony
  	MailApp.sendEmail(
              				   //Recipient of email...
              				   'acalderaio@bestsecurityindustries.com',
      
              				   //Subject Field of email...
                    		   'Daily Report',
      
              				   //Body of email...
      						   "--SHOPPING CAMPAIGNS--"+"\n"+
      						   "Shopping Conversion Today: "+shoppingConversionToday+"\n"+
      						   "Shopping Clicks: "+shoppingClicks+"\n"+
      						   "Shopping Ctr: "+shoppingCtr+"\n"+
      						   "(Today)Shopping Conversions: "+shoppingConversion+"\n"+
      						   "(Month)Shopping Conversions: "+monthlyShoppingConversion+"\n"+"\n"+
      
      
      						   "--REGULAR CAMPAIGNS--"+"\n"+
							   "Clicks Per day: "+dailyClicks+"\n"+
      						   "Clicks(MTD):   "+clicks+"\n"+
      						   "Impressions(MTD):   "+impress+"\n"+
      						   "CTR:   "+ctrX100+"%"+"\n"+
      						   "Cost(MTD(All-Account)): $"+cost+"\n"+"\n"+
      						   "Returning Customer Percent: "+returningVisitorPercent+"% "+"\n"+
      						   "EXPLICIT Returning Customer Percent"+ExplicitReturningVisitorsPercent+"\n"+
      						   "Cart abandoment stats:       SEE NETSUITE REPORTS ");


	MailApp.sendEmail(
              				   //Recipient of email...
              				   'dcutherell@bestsecurityindustries.com',
      
                    		   //Subject Field of email...
                    		   'Daily Report',
      
              				   //Body of email...
      						   "--SHOPPING CAMPAIGNS--"+"\n"+
      						   "Shopping Conversion Today: "+shoppingConversionToday+"\n"+
      						   "Shopping Clicks: "+shoppingClicks+"\n"+
      						   "Shopping Ctr: "+shoppingCtr+"\n"+
      						   "(Today)Shopping Conversions: "+shoppingConversion+"\n"+
      						   "(Month)Shopping Conversions: "+monthlyShoppingConversion+"\n"+"\n"+
      
      
      						   "--REGULAR CAMPAIGNS--"+"\n"+
							   "Clicks Per day: "+dailyClicks+"\n"+
      						   "Clicks(MTD):   "+clicks+"\n"+
      						   "Impressions(MTD):   "+impress+"\n"+
      						   "CTR:   "+ctrX100+"%"+"\n"+
      						   "Cost(MTD(All-Account)): $"+cost+"\n"+"\n"+
      						   "Returning Customer Percent: "+returningVisitorPercent+"% "+"\n"+
      						   "EXPLICIT Returning Customer Percent"+ExplicitReturningVisitorsPercent+"\n"+
      						   "Cart abandoment stats:       SEE NETSUITE REPORTS ");



//Send an email to David
  	
    
    
  	
  
  
  
  
///     \\\\\\                            Emails					             						 ///////												 

  
  
///  	----------------------------------------------------------------------------------------------------------- 
///  	----------------------------------------------------------------------------------------------------------- 
///  	----------------------------------------------------------------------------------------------------------- 
  
  
  
                        //////////////////////////////////////////////////////////////////////
                       /////////////          EXPERIMENTAL CODE                //////////////
                      //////////////////////////////////////////////////////////////////////
  
  
  
  		//Honestly, found no use for this. if it works feel free to use it.
  		//////
      	//var d = new Date(Utilities.formatDate(new Date(), AdWordsApp.currentAccount().getTimeZone(), "MMM dd,yyyy HH:mm:ss"));
        //var daysSoFar = d.getDate() -1;
    	//var MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
  		///////
}
  
  ///////////////////////////////////////////
  //Calls the function
  //getAccountByName()
  listAllProfiles()
  //runRealTimeReport()
  filterStats()
  
  
  //
  
  
  
//End of program  
}
