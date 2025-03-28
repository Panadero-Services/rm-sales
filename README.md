# rm-sales.pricecalculation
 RentMagic rm-sales.Pricecalculation Prototype Isolated Module NanoService


## Supported Versions

These are the latest version as tested with both CLI and Postman
If you do require a version outside of this chart updated with patch fix,
please [contact me](mailto:lieuwe@panaderos.nl).

| Version | Tested                      | Initial Release   |
| ------- | ------------------------------------------ | ----------------- |
| 0.2.1   | :white_check_mark:          | 2025-03-27   |
| 0.1.4   | :white_check_mark:          | 2025-03-12   |
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
* v0.2.1 Fix 2 decimals issue + modular recipe priceCalculation for additional recipes
* priceCalcRecipe1()
* OrderLineResetRedundant()
* _rmRound() rounds x decimals
* _rmCeil() ceils x decimals
* _rmFloor() floors x decimals
* 
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


/** *
* payload call priceCalculation()
{
    "RentalObjectID": "O0014",
    "Contract": null,
    "RentalLines": [
        {
            "RentalLineID": "5",
            "ItemID": "101",
            "Amount": 2.0,
            "Discount": -0.1,
            "DateTimeStart": "2025-03-27T00:00:00Z",
            "DateTimeEnd": "2025-03-30T00:00:00Z",
            "ItemPeriods": [
                {
                    "PeriodID": "Week",
                    "PriceType": "Fixed",
                    "PriceValue": 40
                },
                {
                    "PeriodID": "Dag",
                    "PriceType": "Fixed",
                    "PriceValue": 15.2322
                }
            ]
        },
        {
            "RentalLineID": "5",
            "ItemID": "102",
            "Amount": 2.0,
            "Discount": -0.11111,
            "DateTimeStart": "2025-02-27T00:00:00Z",
            "DateTimeEnd": "2025-03-30T00:00:00Z",
            "ItemPeriods": [
                {
                    "PeriodID": "Dag",
                    "PriceType": "Fixed",
                    "PriceValue": 3.5
                },
                {
                    "PeriodID": "Week",
                    "PriceType": "Fixed",
                    "PriceValue": 15.00
                }
            ]
        }
    ]
}
*/
