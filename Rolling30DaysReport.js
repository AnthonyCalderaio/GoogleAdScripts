function main() {
  
Logger.log("----- Regular Campaigns -----")  
Logger.log("")
Logger.log("")  
  
  
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
    
    		Logger.log("Campaign: "+campaign.getName());
    		Logger.log("Clicks: "+clicks);
    		Logger.log("Impressions: "+impressions);
    		Logger.log("Cost: "+cost);
    		Logger.log("Conversion: "+conversions);
    		Logger.log("");
    		Logger.log("");
    
  }
  				Logger.log("Regular Campaigns")
      			Logger.log("--- Total: "+clicksTotal)
      			Logger.log("--- Total: "+impTotal)
      			Logger.log("--- Total: "+costTotal)
      			Logger.log("--- Total: "+conversionTotal)
  				Logger.log("");
    			Logger.log("");
  
Logger.log("----- Shopping Campaigns -----")
Logger.log("")
Logger.log("") 
  
  var ShoppingCampaignIter = AdsApp.shoppingCampaigns().withCondition("Status = 'ENABLED'").forDateRange("LAST_30_DAYS").get();
  var ShoppingclicksTotal = 0;
  var ShoppingimpTotal = 0;
  var ShoppingcostTotal = 0;
  var ShoppingconversionTotal = 0;
  
  while(ShoppingCampaignIter.hasNext()){
  	var Shoppingcampaign = ShoppingCampaignIter.next();
    var Shoppingstats = Shoppingcampaign.getStatsFor("LAST_30_DAYS");
    
    	var Shoppingclicks = Shoppingstats.getClicks();
    		ShoppingclicksTotal = (parseInt(ShoppingclicksTotal)+parseInt(Shoppingclicks))
    	var Shoppingimpressions = Shoppingstats.getImpressions();
    		ShoppingimpTotal = (parseInt(ShoppingimpTotal)+parseInt(Shoppingimpressions))
    	var Shoppingcost = Shoppingstats.getCost();
    		ShoppingcostTotal = (parseInt(ShoppingcostTotal)+parseInt(Shoppingcost))
    	var Shoppingconversions = Shoppingstats.getConversions();
    		ShoppingconversionTotal = (parseInt(ShoppingconversionTotal)+parseInt(Shoppingconversions))
    
    		Logger.log("ShoppingCampaign: "+Shoppingcampaign.getName());
    		Logger.log("ShoppingClicks: "+Shoppingclicks);
    		Logger.log("ShoppingImpressions: "+Shoppingimpressions);
    		Logger.log("ShoppingCost: "+Shoppingcost);
    		Logger.log("ShoppingConversion: "+Shoppingconversions);
    		Logger.log("");
    		Logger.log("");
    
  }
  				Logger.log("Shopping Campaigns")
      			Logger.log("--- Shopping Total: "+ShoppingclicksTotal)
      			Logger.log("--- Shopping Total: "+ShoppingimpTotal)
      			Logger.log("--- Shopping Total: "+ShoppingcostTotal)
      			Logger.log("--- Shopping Total: "+ShoppingconversionTotal)
  				Logger.log("");
    			Logger.log("");
  
}
