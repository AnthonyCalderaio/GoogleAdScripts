function main() {

  
    function validItem(input){
    	if(input.toString() === "addtocart"){
        	return false;
        }
      	if(input.toString() === "quest-checkout"){
        	return false;
        }
      	if(input.toString() === "quote-order"){
        	return false;
        }
      	if(input.toString() === "place-order"){
        	return false;
        }
      	if(input.toString() === "sign-in"){
        	return false;
        }
      	if(input.toString() === "add-to-cart"){
        	return false;
        }
      	if(input.toString() === "create-account"){
        	return false;
        }
      	if(input.toString() === "Reorder"){
        	return false;
        }
      	if(input.toString() === "Big-5_Stuff"){
        	return false;
        }
      	if(input.toString() === "AgriPackage-addtocart_6027"){
        	return false;
        }
      	if(input.toString() === "guest-checkout"){
        	return false;
        }
        
        else{
        	return true;
        }
    }
  
    //Sheet to GET from
  	//!Sensitive
    var SPREADSHEET_URL = '';
    var SHEET_NAME1 = 'AllTimeCount';
    var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    var sheet = ss.getSheetByName(SHEET_NAME1);
  
  	//Sheet to PUT to
  	//!Sensitive
  	var SPREADSHEET_URL2 = '';
    var SHEET_NAME2 = 'Products';
    var ss2 = SpreadsheetApp.openByUrl(SPREADSHEET_URL2);
    var sheet2 = ss2.getSheetByName(SHEET_NAME2);
  	sheet2.clearContents();
  	sheet2.appendRow(["Frequency","SKU","Action","Date Modified","URL"]);
  
  	var range = sheet.getRange('A1:F7000');
	var values = range.getValues();
    
    Logger.log("Values.length = "+values.length)
    //Iterate each row of Analytics Event page 1
    for (var i = 0; i < values.length; i++) 
             {
               			//Stop when at the end
						if(values[i][0]===""){
                        //Logger.log("Empty")
                          break;
                        }
                        
						var value1 = values[i][0].toString();
               			var value2 = values[i][1].toString();
               			var value3 = values[i][2].toString();
               			var value4 = values[i][3].toString();
               			var value5 = values[i][4].toString();
                        //Logger.log(value1+"---"+value2+"---"+value3+"---"+value4+"---"+value5)
               			
               				//Write to page 2
               				if(validItem(value1.toString())===true){
                            	//var values2 = [
                                  //[value1,value2,value3,value4,value5]
                                //];
                                //var range2 = sheet2.getRange('A'+(i+1)+':E'+(i+1));
                              	
                                //range2.setValues(values2);
                              	sheet2.appendRow([value3,value1,value4,value5,value2]);
                            }	

               
  			 }
    
    
   sheet2.sort(1, false);
  
  
  
  
}
