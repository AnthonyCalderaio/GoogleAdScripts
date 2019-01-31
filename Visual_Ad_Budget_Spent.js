//This script is going to give us a visual representation of how much of the daily budget is being fulfilled by each campaign.


function main() {
  
    //                -----Choose 1. You cannot have both-----
  
    //Choice 1
    //var dateRange = "YESTERDAY"
    
    //Choice 2
    var from = "20190128"
    var to   = from
    
    //                 -----------------------------------------
    
    //IF BUDGETS CHANGE, CHANGE THESE
    var campaign_1_budget                           = 10.00;
    var return4_budget                              = 2.00;
    var hard_tag_images_budget                      = 6.00;
    var search_preowned_campaign_2_budget           = 5.50;
    var converting_campaign_budget                  = 21.00;
    var remarketing_search_budget                   = 11.00;
    var LB_82BC15_shopping_cart_remarketing_budget  = 4.00;
    var remarketing_webvisit_budget                 = 2.00;
    
    //Campaign Iterator
    var campaignIter = AdWordsApp.campaigns().withCondition("Status = 'ENABLED'").forDateRange(from, to).get();
    
    
    
    while(campaignIter.hasNext()){
        var campaign = campaignIter.next();
              //To decide which budget it belongs to
              var campaignBudget = 0;
                  //Set Campaign #1 budget
                  if (campaign.getName().toString() === "Campaign #1"){
                      campaignBudget = campaign_1_budget;
                  }
                  //Set Return 4 Budget 
                  if (campaign.getName().toString() === "Return 4 Campaign"){
                      campaignBudget = return4_budget;
                  }
                  //Set Hard Tag Images Budget
                  if (campaign.getName().toString() === "Hard Tag Images"){
                      campaignBudget = hard_tag_images_budget;
                  }
                  //Set Search-Preowned-Campaign #2 budget
                  if (campaign.getName().toString() === "Search-Preowned-Campaign #2"){
                      campaignBudget = search_preowned_campaign_2_budget
                  }
                  //Set Converting Campaign budget
                  if (campaign.getName().toString() === "Converting Campaign"){
                      campaignBudget = converting_campaign_budget;
                  }
                  //Set Remarketing Search budget
                  if (campaign.getName().toString() === "Remarketing (SEARCH)"){
                      campaignBudget = remarketing_search_budget;
                  }
                  //Set LB-82BC15 Shopping Cart Remarketing(GMAIL) budget
                  if (campaign.getName().toString() === "LB-82BC15 Shopping Cart Remarketing(GMAIL)"){
                      campaignBudget = LB_82BC15_shopping_cart_remarketing_budget;
                  }
                  //Set Remarketing - webvisit > 2 budget
                  if (campaign.getName().toString() === "Remarketing - WebVisit > 2"){
                      campaignBudget = remarketing_webvisit_budget;
                  }
      
      var statsCost = campaign.getStatsFor(from, to).getCost();
      
      //Create Budget Line length
      var i = 0.0;
      var line = ""
      while (i<campaignBudget){
          line = line + "-";
        i = i + 0.1
      }
      
      //Create Spent Line length
      var j = 0.0;
      var index = 0;
      var line2 = line;
      
      while (j<statsCost){
          line2 = line2.substr(0, index) + '+' + line.substr(index + 1);
          index = index + 1;
          j = j + 0.1
      }
   
      var printStatement = campaign.getName()+" spent: $"+statsCost+" out of $"+campaignBudget;
      //var printLength = (campaign.getName()+" spent: "+statsCost+" out of "+campaignBudget).length
      Logger.log(printStatement)
      Logger.log("Available Budget: "+line)
      Logger.log("Spent Budget    : "+line2)
      Logger.log("")
      Logger.log("")
      Logger.log("")
      Logger.log("")
    }
  }
  