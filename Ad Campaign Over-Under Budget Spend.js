//Script Name: Report: Ad Campaign Over/Under Budget Spend
//Written By Anthony Joseph Calderaio Jr.
//Date: 11/21/2018 @ 11:39 AM
//
//Summary: 
//			This script emails what differences of what campaigns overspent 
//			and their amounts as well as which campaigns underspent and their
//			amount.
//

function main() {
  
  			          //////////////////////////////////////////////////////////////////////
                     /////////////Report: Ad Campaign Over/Under Budget Spend//////////////
                    //////////////////////////////////////////////////////////////////////
  
  
	// Create a variable that is "iterable" that represents all campaigns that are:
    // 1) Enabled
	var campaignIter = AdWordsApp.campaigns().withCondition('Status = ENABLED').forDateRange("YESTERDAY").get();
  
  	  //Today's Overspend
      	var totalOverspend = 0;
      
      //Today's Underspend
      	var totalUnderspend = 0;
  
    //iterate the iterable campaign object
  	while(campaignIter.hasNext()){
      
      
      
        //Fetch a reference to the campaign
    	var campaign = campaignIter.next();
      
      	//Place the campaign name in a var from the campaign reference
      	var campaignName = campaign.getName();
      
      	//Place the campaign budget in a var from the campaign refrence
      	var campaignBudget = campaign.getBudget();
         
      	//Get a @unique 'stats' object to reference in the future
      	var stats = campaign.getStatsFor("YESTERDAY");
      
      	//Place the cost selector value in var cost from the "stats" object
        var cost = stats.getCost();
		
      	//The difference variable is the campaign budget - the cost.
        // In other words, the value of what was UNDERSPENT in a campaign that day
      	var difference = campaignBudget - cost
        
        //The difference variable is the campaign budget - the cost.
        // In other words, the value of what was  OVERSPENT in a campaign that day
        var overDiff = cost - campaignBudget
      	
        //If the cost was less than campaign budget, the campaign UNDERSPENT
      	if (cost < campaignBudget){
          
          	totalUnderspend = totalUnderspend + difference;
          	//UNCOMMENT the below code to print the results
        	//Logger.log( "didnt spend "+difference+" yesterday          "+"\""+campaignName+"\"    ");
          
          	//MailApp.sendEmail(
              				   //!Sensitive Email to send to
              				  //'xxxxx@xxxxx.com',
              				   //Subject Field Test
                    		  //'Budget Report',
              				   //Body of the email
                              // "\""+campaignName+"\"    "+"didnt spend $"+difference+" yesterday");
        }
      	
      	//If the campaign budget was less than cost, the campaign OVERSPENT
      	if (cost > campaignBudget){
          
          	totalOverspend = totalOverspend + overDiff;
          
            //UNCOMMENT the below code to print the results
        	//Logger.log( "Spent "+overDiff+" over budget yesterday          "+"\""+campaignName+"\"    ");
          
          	//MailApp.sendEmail(
              				   //!Sensitive Email to send to
              				  //'xxxxx@xxxxx.com',
              				   //Subject Field Test
                    		  //'Budget Report',
              				   //Body of the email
                              // "\""+campaignName+"\"    "+"spent $"+overDiff+" over budget yesterday");
        }
      
      	
      
      
      
    //End of while loop
    }
  		if (totalOverspend > totalUnderspend ){
              MailApp.sendEmail(
              				   //!Sensitive Email to send to
              				  'xxxxx@xxxxx.com',
              				   //Subject Field Test
                    		  'YESTERDAY: Overspent report',
              				   //Body of the email
                               "Yesterday we went over budget by: $"+((totalOverspend - totalUnderspend).toFixed(2)))
     
        
     							Logger.log("Yesterday we went over budget by: $"+(totalOverspend - totalUnderspend).toFixed(2))
     	}
  
  
  
  
  	 if (totalUnderspend > totalOverspend ){
       	 	MailApp.sendEmail(
              				   //!Sensitive Email to send to
              				  'xxxxx@xxxxx.com',
              				   //Subject Field Test
                    		  'YESTERDAY: Underspent report',
              				  //Body of the email
              				  "Yesterday we went under budget by: $"+((totalUnderspend - totalOverspend).toFixed(2)))
              
     	Logger.log("Yesterday we went under budget by: $"+(totalUnderspend - totalOverspend).toFixed(2))
    }
  
  			//Logger.log("Yesterday's total Overspend: "+totalOverspend+"\n"+
        					   //"Yesterdays's total Underspend: "+ totalUnderspend+"\n")
}
