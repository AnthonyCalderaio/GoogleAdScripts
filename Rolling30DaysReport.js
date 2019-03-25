function main() {
  
  	  //Helper Function
      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
  
  

Logger.log("----- Regular Campaigns -----");  
Logger.log("");
Logger.log("");  
  
  
  var CampaignIter = AdWordsApp.campaigns().withCondition("Status = 'ENABLED'").forDateRange("LAST_30_DAYS").get();
  var clicksTotal = 0;
  var impTotal = 0;
  var costTotal = 0;
  var conversionTotal = 0;
  
  while(CampaignIter.hasNext()){
  	var campaign = CampaignIter.next();
    var stats = campaign.getStatsFor("LAST_30_DAYS");
    
    	var clicks = stats.getClicks();
    		clicksTotal = (parseInt(clicksTotal)+parseInt(clicks))
    	var impressions = stats.getImpressions();
    		impTotal = (parseInt(impTotal)+parseInt(impressions))
    	var cost = stats.getCost();
    		costTotal = (parseInt(costTotal)+parseInt(cost))
    	var conversions = stats.getConversions();
    		conversionTotal = (parseInt(conversionTotal)+parseInt(conversions))
    
    		Logger.log("Campai: "+campaign.getName());
    		Logger.log("Clicks: "+clicks);
    		Logger.log("Impres: "+impressions);
    		Logger.log("Cost  : $"+cost);
    		Logger.log("Conver: "+conversions);
    		Logger.log("");
    		Logger.log("");
    
  }
  				Logger.log("Regular Campaigns")
      		Logger.log("--- (Total) Clicks: "+numberWithCommas(clicksTotal));
      		Logger.log("--- (Total) Impres: "+numberWithCommas(impTotal));
      		Logger.log("--- (Total) Cost  : $"+numberWithCommas(costTotal));
      		Logger.log("--- (Total) Conver: "+numberWithCommas(conversionTotal));
  				Logger.log("");
    			Logger.log("");
  
Logger.log("----- Shopping Campaigns -----");
Logger.log("");
Logger.log(""); 
  
  var ShoppingCampaignIter = AdsApp.shoppingCampaigns().withCondition("Status = 'ENABLED'").forDateRange("LAST_30_DAYS").get();
  var ShoppingclicksTotal = 0;
  var ShoppingimpTotal = 0;
  var ShoppingcostTotal = 0;
  var ShoppingconversionTotal = 0;
  
  while(ShoppingCampaignIter.hasNext()){
  	var Shoppingcampaign = ShoppingCampaignIter.next();
    var Shoppingstats = Shoppingcampaign.getStatsFor("LAST_30_DAYS");
    
    	var Shoppingclicks = Shoppingstats.getClicks();
    		ShoppingclicksTotal = (parseInt(ShoppingclicksTotal)+parseInt(Shoppingclicks));
    	var Shoppingimpressions = Shoppingstats.getImpressions();
    		ShoppingimpTotal = (parseInt(ShoppingimpTotal)+parseInt(Shoppingimpressions));
    	var Shoppingcost = Shoppingstats.getCost();
    		ShoppingcostTotal = (parseInt(ShoppingcostTotal)+parseInt(Shoppingcost));
    	var Shoppingconversions = Shoppingstats.getConversions();
    		ShoppingconversionTotal = (parseInt(ShoppingconversionTotal)+parseInt(Shoppingconversions))
    
    		Logger.log("ShoppingCampai: "+Shoppingcampaign.getName());
    		Logger.log("ShoppingClicks: "+Shoppingclicks);
    		Logger.log("ShoppingImpres: "+Shoppingimpressions);
    		Logger.log("ShoppingCost  : $"+Shoppingcost);
    		Logger.log("ShoppingConver: "+Shoppingconversions);
    		Logger.log("");
    		Logger.log("");
    
  }
  				Logger.log("Shopping Campaigns");
      		Logger.log("--- (Total) Shopping Clicks: "+numberWithCommas(ShoppingclicksTotal));
      		Logger.log("--- (Total) Shopping Impres: "+numberWithCommas(ShoppingimpTotal));
      		Logger.log("--- (Total) Shopping Cost  : $"+numberWithCommas(ShoppingcostTotal));
      		Logger.log("--- (Total) Shopping Conver: "+numberWithCommas(ShoppingconversionTotal));
  				Logger.log("");
    			Logger.log("");
  
  
  				    //Send an email to Anthony
              MailApp.sendEmail(
                                //Recipient of email...
                                'abcdefg@hij.com',

                                //Subject Field of email...
                                'Monday Report(30DayRollingReport)',

                                //Body of email...
                      				  "Stats for the Last 30 Days..."+"\n"+"\n"+
                      				  "--Regular Campaigns--"+"\n"+
                                "--- (Total) Clicks: "+numberWithCommas(clicksTotal)+"\n"+
                                "--- (Total) Impres: "+numberWithCommas(impTotal)+"\n"+
                                "--- (Total) Cost  : $"+numberWithCommas(costTotal)+"\n"+
                                "--- (Total) Conver: "+numberWithCommas(conversionTotal)+"\n"+
                      				  "\n"+"\n"+
                      
                      
                      
                                "--SHOPPING CAMPAIGNS--"+"\n"+
                                "--- (Total) Shopping Clicks: "+numberWithCommas(ShoppingclicksTotal)+"\n"+
                                "--- (Total) Shopping Impres: "+numberWithCommas(ShoppingimpTotal)+"\n"+
                                "--- (Total) Shopping Cost  : $"+numberWithCommas(ShoppingcostTotal)+"\n"+
                                "--- (Total) Shopping Conver: "+numberWithCommas(ShoppingconversionTotal)
                    );
  
  
  
  
  
}
