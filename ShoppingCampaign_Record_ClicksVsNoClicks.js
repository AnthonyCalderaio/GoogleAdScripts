function main() {
  
  var testingMode = true
  Logger.log("WARNING: Never run in production mode while testing. This will cause redundant data in the database.")
  //"Purpose: The purpose of this script is to extract all the products of the shopping campain with no clicks and to record them to a google sheet database. Ideally, this script runs every day at the same time to pull the products for the last 30 days up to that day."
  if(testingMode===true){
      Logger.log("You are running in TESTING MODE")
      Logger.log("INSTRUCTIONS: To run in Production Mode: Edit the variable called "+"\""+"testingMode"+"\""+" at the top of this script and change it to"+"\""+"false"+"\""+". Also Make sure you set the script to run daily at a regular time."+"\n")
      Logger.log("\n")
  }
  if (testingMode === false){
      Logger.log("You are running in PRODUCTION MODE")
      Logger.log("INSTRUCTIONS: To run in Test Mode: Edit the variable called "+"\""+"testingMode"+"\""+" at the top of this script and change it to"+"\""+"true\""+" and run with the"+"\""+"PREVIEW"+"\""+" button."+"\n")
      Logger.log("\n")
  }
  
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
  
  //!sensitive
  var campaignName = "CAMPAIGN_NAME";
  
  var ShoppingCampaign = AdWordsApp.shoppingCampaigns().withCondition("CampaignName = '" + campaignName + "'").get();
   	
  var productArray = []
  
  var getClicksArray = []

  //!sensitive
  var SPREADSHEET_URL = 'SPREADSHEET_URL';
  
  var SHEET_NAME = 'Clickless';

  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  
  var sheet = ss.getSheetByName(SHEET_NAME);

  //If you get some weird product names, add them to this list to ignore them
  function isProduct(input) 
  {
    if (input.getValue() === null ||
        input.getValue() === "am tags" ||
        input.getValue() === "am labels" ||
        input.getValue() === "rf tags" ||
        input.getValue() === "rf labels" ||
        input.getValue() === "am" ||
        input.getValue() === "lanyard" ||
        input.getValue() === "rf" ||
        input.getValue() === "soft tags/labels" ||
        input.getValue() === "products" ||
        input.getValue() === "ink" ||
        input.getValue() === "hard tags" ||
        input.getValue() === "OtherCase")
    {
    	return false;
    }else{
    	return true;
    }
  }
  var counter = 0;
  var productGroups = AdsApp.productGroups().get();
  //Utility
  //sheet.clearContents();
  if (testingMode===false)
  {
  	sheet.appendRow(["Product","Impressions","Date","Counter","Changes"]);
  }
  if(testingMode === true)
  {
  	Logger.log("---Testing Mode---")
    Logger.log("The following are shopping campaign products with no clicks for the past 30 days...")
    Logger.log("\n")
  }
  if(testingMode === false)
  {
  	Logger.log("---Production Mode---")
    Logger.log("I hope you know what you are doing!")
    Logger.log("\n")
  }
  ///////////////////////////////////////////////////No CLicks
  var noClickCounter = 0;
  while (productGroups.hasNext()) {
    var productGroup = productGroups.next();
    	if(isProduct(productGroup)===false)
       {
         //Testing Purposes
      	 //Logger.log(productGroup.getValue()+" is NOT a product")
       }else
       {
         	productArray.push(productGroup.getValue())
         	if(testingMode === false){
            	Logger.log("Writing Data To Database...")
            }
         	if (productGroup.getStatsFor("LAST_30_DAYS").getClicks()<1)
            {
              noClickCounter++;
              if (testingMode===true)
              {
                    //Logger.log("Product: "+counter)
                    Logger.log(noClickCounter+"  Product: "+"  \""+productGroup.getValue()+"\"")
                    Logger.log("	-Conversions: "+productGroup.getStatsFor("LAST_30_DAYS").getConversions())
                    Logger.log("	-Imp: "+productGroup.getStatsFor("LAST_30_DAYS").getImpressions())
                    Logger.log("	-Clicks: "+productGroup.getStatsFor("LAST_30_DAYS").getClicks())
                    Logger.log("	-Average Position: "+productGroup.getStatsFor("LAST_30_DAYS").getAveragePosition())
               }                                             
              if (testingMode === false)
              {
              sheet.appendRow([productGroup.getValue(), productGroup.getStatsFor("LAST_30_DAYS").getImpressions(), monthDig+"\/"+todaysNumberDate, noClickCounter]);
              }

            }
            

         }
            
    		counter++
       }
     ///////////////////////////////////////////////////Has Clicks
  var SHEET_CLICKED = 'Clicked';
  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = ss.getSheetByName(SHEET_CLICKED);
  var rating = "";
  
  if (testingMode===false)
  {
  	sheet.appendRow(["Product","Clicks","Date","Counter","Changes","Rating"]);
  }
  
  	 Logger.log("\n"+"\n")
  Logger.log("----Products With Clicks---")
  
     var ShoppingClickCampaignIter = AdsApp.productGroups().get()
     var clickedCounter = 0;
     while (ShoppingClickCampaignIter.hasNext()) {
     var productGroup2 = ShoppingClickCampaignIter.next();
       //Logger.log(productGroup2)
    	if(isProduct(productGroup2)===false)
       {
         //Testing Purposes
      	 //Logger.log(productGroup.getValue()+" is NOT a product")
       }else
       {
         	
         	if(testingMode === false){
            	Logger.log("Writing Data To Database...")
            }
         	if (productGroup2.getStatsFor("LAST_30_DAYS").getClicks()>1)
            {
              if (testingMode===true)
              {
                    //Logger.log("Product: "+counter)
                    Logger.log(clickedCounter+"  Product: "+"  \""+productGroup2.getValue()+"\"")
                    Logger.log("	-Clicks: "+productGroup2.getStatsFor("LAST_30_DAYS").getClicks())
                    if (productGroup2.getStatsFor("LAST_30_DAYS").getClicks()<10){
                     	rating = "GARBAGE";
                    }
                	if (productGroup2.getStatsFor("LAST_30_DAYS").getClicks()>=10 && productGroup2.getStatsFor("LAST_30_DAYS").getClicks()<=30){
                        rating = "MEH";
                    }
                    if (productGroup2.getStatsFor("LAST_30_DAYS").getClicks()>=50 && productGroup2.getStatsFor("LAST_30_DAYS").getClicks()<90){
                      	rating = "DECENT";
                    }
                	if (productGroup2.getStatsFor("LAST_30_DAYS").getClicks()>=90){
                      	rating= "GOOD";
                    }
                	Logger.log("	-Rating: "+rating)
                    
                
                Logger.log("\n")
                   
               }
              if (productGroup2.getStatsFor("LAST_30_DAYS").getClicks()<10){
                     	rating = "GARBAGE";
                    }
                	if (productGroup2.getStatsFor("LAST_30_DAYS").getClicks()>=10 && productGroup2.getStatsFor("LAST_30_DAYS").getClicks()<=30){
                        rating = "MEH";
                    }
                    if (productGroup2.getStatsFor("LAST_30_DAYS").getClicks()>=50 && productGroup2.getStatsFor("LAST_30_DAYS").getClicks()<90){
                      	rating = "DECENT";
                    }
                	if (productGroup2.getStatsFor("LAST_30_DAYS").getClicks()>=90){
                      	rating= "GOOD";
                    }
               clickedCounter++
               if (testingMode === false)
               {
                   sheet.appendRow([productGroup2.getValue(), productGroup2.getStatsFor("LAST_30_DAYS").getClicks(), monthDig+"\/"+todaysNumberDate, clickedCounter,"",rating]);
               }
                       
              
              

            }
            

         }
            
    		
       }
     
     
     
     if(testingMode === false){
       Logger.log("\n")
       Logger.log("\n")
       Logger.log("Data file completed."+"\n")
       Logger.log("You may view the results at: "+SPREADSHEET_URL)
       Logger.log("If the above link does not work, make sure you have shared priveleges. Try this: "+"https://docs.google.com/spreadsheets/d/131uTk3lTVuf4UrTYvJwxjyvpjlgogRRZLQlFXwHnPFw/edit?usp=sharing")
     }
     if(testingMode === true){
        Logger.log("\n")
       	Logger.log("\n")
     	Logger.log("Testing Mode complete. No Writing Took place.")
     }
     Logger.log("\n")
 	 Logger.log("\n")
     Logger.log("-Products on merchant center: "+counter)
  //End of main
  }
