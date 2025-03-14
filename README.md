# rm-sales.pricecalculation
 RentMagic rm-sales.Pricecalculation Prototype Isolated Module NanoService


## Supported Versions

These are the latest version as tested with both CLI and Postman
If you do require a version outside of this chart updated with patch fix,
please [contact me](mailto:lieuwe@panaderos.nl).

| Version | Tested                      | Initial Release   |
| ------- | ------------------------------------------ | ----------------- |
| 0.1.4   | :white_check_mark: 	    	| 2025-03-12   |
| 0.1.3   | :white_check_mark:          | 2025-03-11   |
| 0.1.2   | :white_check_mark:          | 2025-02-29   |

## 

/* 
const OrderStatus = ['created', 'article', 'prepare', 'open', 'finish', 'end'];
const Order = {
      id : 1,
      orderNr : "RM-000000",
      initBy : "Unknown Primate",
      grossCost : 0,
      statusId : 0,
      orderItems : [],
      nextItemId : 1,
      grossPrice : 0,
      grossPackageDiscount : 0,
      nettPrice : 0,
};

const OrderRowStatus = ['created', 'article', 'prepare', 'open', 'finish', 'end'];
const Row = {
     id : 1,
     type : "rent",
     itemName: "drillMachine",
     pricePerUnit: 25,
     qty: 50, 
     status: "created", 
     grossPrice: 0, 
     nettPrice: 0, 
     vat : 0.19
}*/
Create:
RentMagic Class : Order
const order = new Order(  );




/** *
* v0.1.0 Initial Commit
* RentMagice Class : Price Calculation Prototype
* ERP module for RM_Rental Order Handling inspired by frontEndTeamSeries
* This module is supposed to calculate the order price for rental and sales orders
* In order to make this work we need to import all order details as well
* 
* v01.1 Add DiscountTypes + DiscountTemplates
* 
* v01.2 Isolate routines
* - applyDiscount
* - applyDiscountLine
* 
* * v01.3 Include Fixed 
* - replaces grossPrice with factor.z (fixed value)
* *
* * v01.4 rm-sales 
* - change item -> row
* 
* **/

- - -

CLI interaction

| Call.js | Testversion                                  | Initial Release   |
| ------- | ------------------------------------------ | ----------------- |
| 0.1.0   | :white_check_mark:   | 2025-03-07          |


{call multiLineDiscount

* _processDiscount
* calculate _item.grossPrice based on 1 discountLine
* flat means... item.grossPrice - 50 (factor.x)
* fixed means... item.grossPrice equals factor.z
* percentage means... item.grossPrice -= 5% (factor.x)
* buyXgetY means... 3 halen 2 betalen (factor.x) (factor.y)
* @param _item ( object)

{
    "row" : {
         "id" : 1,
         "type" : "buy",
         "itemName": "drillMachine",
         "pricePerUnit": 25,
         "qty": 7, 
         "status": "created", 
         "grossPrice": 0, 
         "nettPrice": 0, 
         "vat" : 0.19
      },
        
    "discount" : {
        "discountline1":{
            "type" : "buyXgetY", 
            "factor" : 
                {   "x" : 4,
                    "y" : 6,
                    "z" : 0
                }
        }, 
        "discountline2":{
        "type" : "flat", 
        "factor" : 
            {   "x" : 12,
                "y" : 6,
                "z" : 0
            }
        },
        "discountline3":{
        "type" : "fixed", 
        "factor" : 
            {   "x" : 0,
                "y" : 0,
                "z" : 320
            }
        },        
        "discountline4":{
        "type" : "percentage", 
        "factor" : 
            {   "x" : 2,
                "y" : 6,
                "z" : 0
            }
        }  
    }
}