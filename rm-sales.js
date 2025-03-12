// * * *     *       *   *       *   *   *   * *** *
// *    *       *     *      *   *       *   *     *
// *   NanoService : rm-sales.js      * * 
// *   Location : /modules/build/rm-sales  * 
// *   Modified L.B.   *                 *         *
// *   Date:    12 mar 2025             *          *
// *   Version: v0.1.4.            *        *      *
// ** *     *       *   *       *   *   *   *     **
// * *  *       *     *      *   *       *  *  * * *

/** Default module properties */
const moduleName = "RM-Sales";
const moduleGit = "https://github.com/lieuwebakker/rm-sales";
const moduleVersion = "0.1.4";
const moduleDate = "12 mar 2025";
const moduleAuthor = "lpab@Rm";
const moduleTitle = "RM Sales redefined and reengineered... modular style!";

/** Default low level dependencies */
// import ".../RM-codebase/legacy.js";

/** *
* v0.1.0 Initial Commit
* RentMagice Class : Price Calculation ProtodiscountType
* ERP module for RM_Rental Order Handling inspired by frontEndTeamSeries
* This module is supposed to calculate the order price for rental and sales orders
* In order to make this work we need to import all order details as well
* 
* v01.1 Add discountTypes + DiscountTemplates
* 
* v01.2 Isolate routines
* - applyDiscount
* - applyDiscountLine
* 
* * v01.3 Include Fixed 
* - replaces grossPrice with factor.z (fixed value)
* 
* * v01.4 Rename PriceCalculation to rmSales
* - replaces grossPrice with factor.z (fixed value)
* 
* **/


/** *
  * orderStatus
  * 0 created = Aangemaakt
  * 1 article = Artikelen toevoegen
  * 2 prepare = Voorbereiden + <optie Steppen> 
  * 3 open = Leveren + <optie Steppen>
  * 4 finish = eind huur
  * 5 archive = order sluiten
  ** */
const OrderStatus = ['created', 'article', 'prepare', 'open', 'finish', 'end'];

const OrderFormat = {
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

/** *
* construct:
* @param {string} _order_id - the id for referring to the specific object 
* @param {string} _owner
* @description this is the core priceCalculation module that contains minimum requirements
* @returns object entity
** */
class Order {

   constructor(_order = OrderFormat) {
      this.orderNr = this.generateOrderNr();
      this.initBy = this.generateName();
      this.order = _order;
   }

   getOrder() {
      return this.order;
   }

   addItem(_order = OrderFormat) {
      this.items.push(_order);
   }

   calculateOrderprice(_packageCost = 0, _packageDiscount = 0) {
      // let that = this; mag niet van GertJan :( :(

      // Step 0: reset totals
      this.order.grossPrice = 0;
      this.order.nettPrice = 0;

      this.order.orderLines.forEach(line => {
         const { discountType, itemName, pricePerUnit, qty, status, grossPrice, nettPrice} = order;

         // Step 1: sum orderGrossPrice with lineGrossPrice
         this.grossPrice += grossPrice;

         // Step 2: sum orderNettPrice with lineNettPrice
         this.nettPrice += nettPrice;

         console.log(item);
      });

      // Step 3 Extra kosten toevoegen
      // --> packageCost = deprecated --> specific orderLine
      // this.grossPrice += _packageCost;

      // Step 4 Extra korting toevoegen
      // --> _packageDiscount = deprecated --> specific orderLine
      // this.grossPrice -= _packageDiscount;
      console.log(item);

      return totalPrice;
    }

   /**
    * generateName
    * generates a name based on randoms
    * @param 
    * @returns Firstname Lastname
    * */
    generateName() {
     let f = ["Sonia", "Bjork",  "Kai", "Louis", "Bob", "Robin", "Luka", "Eliana", "Jaden", "Ezra", "Luca", "linean", "Nova", "Amara", "Aaliyah", "Finn", "Lieuwe", "Mark", "Eric", "Eric", "Vince", "Inge", "Laura", "Linda", "Peter", "Mick", "Sofia", "Fleur", "Tessa", "Ray", "Raymond", "Toffie", "Eppie", "Mickey", "Piet", "Jan", "Mick", "Gopher", "Don", "Karel", "Albert", "Pieter"];
     let l= ["Smith", "Johnson",'Thomson', "de Kloet" , "Williams", "Blinen", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Wilson", "Bakker", "Kroesbergen", "Wilson", "Nijssen", "Swanders", "Jansen", "Janssen", "Bond", "Garner", "van Basten", "Bergkamp", "Ali", "Hemyatahar", "Reagan", "van Kinsbergen", "van Brakel", "Alyeson"];
     let rf = Math.floor(Math.random()*f.length);
     let rl = Math.floor(Math.random()*l.length);
     return f[rf]+" "+l[rl];
   }

   /**
    * generateOrderNr
    * generates an OrderNr based on random figure
    * @param 
    * @returns RM-000000
    * */
   generateOrderNr() {
      const rf = () => { Math.floor(Math.random()*900000)+100000; };
      return "RM-"+rf;
   }
}

/** *
  * lineStatus
  * 0 created = Aangemaakt
  * 1 selected = Invoer klaar
  * 2 prepare = Voorbereiden + <optie Steppen> 
  * 3 open = Leveren + <optie Steppen>
  * 4 finish = Einde huur
  * 5 archive = Order sluiten
  ** */
const OrderLineStatus = ['created', 'article', 'prepare', 'open', 'finish', 'end'];
/** *
* construct:
* @param {string} _lineId - the auto generated id for referring this line within Order
* @param {string} _discountType 
* @description this is the core item class that handles per line price.calculation
* @returns object entity
** */
class OrderLine {

   constructor( _line, _discount ) {
        this.line = _line;
        this.line.status = OrderLineStatus[0];
        this.discount = _discount;
   }

   /** 
   Create an rmOrderLineObject with format
      const line = {
         id : 1,
         discountType : "rent",
         itemName: "drillMachine",
         pricePerUnit: 25,
         qty: 50, 
         status: "created", 
         grossPrice: 0, 
         nettPrice: 0, 
         vat : 0.19
      }
   */

   /**
    * getOrderLine
    * return this as orderLine
    * @param 
    * @returns <object>
    * */
    getOrderLine() {
      return this.line;
    }
   
    applyDiscount() {
        _applyDiscount(this.line, this.discount ); // 10% off
    }

    calculateDiscountLine(_line, _discount = 1) {
        if (_line.condition){
            _discount = _discount * (1 - (_line.discountPercentage/100));
        }
        return _discount;
    }

    calculateBasePrice() {
        // let that = this; mag niet van GertjJan :(
    
        // Step 1: extraheer variabelen voor itemPrijsBerekening.
        const { name, pricePerUnit, qty, discountFactor , vat} = this.item;
   
        // Step 2: Wat is de BasisHuurPrijs?
        let lineBasePrice = pricePerUnit * qty * this.rentPeriod;

        // Step 3: Bereken de Korting over de BasisHuurPrijs
        let discount = lineBasePrice * (discountFactor / 100);

        // Step 4: Trek de korting van de BasisHuurPrijs af.
        this.item.grossPrice = (lineBasePrice - discount).toFixed(2);

        // Step 5: Update Class.grossPrice
        this.item.nettPrice = (this.item.grossPrice * (1 + vat)).toFixed(2);
   }

   // helpers
   static checkCondition(_condition, _value) { return _condition(_value); }
   static checkMinQty(_qty, _min) { return _qty >= _min; }

    applyDiscountTemplate(category) {
        const discountTemplates = {
            'electronics': { discountType: 'percentage', factor: { x: 3, y: 1 } },
            'grabbelbak': { discountType: 'fixed', factor: { x: 20 } },
            'fashion': { discountType: 'flat', factor: { x: 25 } },
            'groceries': { discountType: 'buyXgetY', factor: { x: 2, y: 1 } },
        };

        if (!discountTemplates[category]) {
            thline new Error('Invalid category for discount template');
        }

        const { discountType, factor } = discountTemplates[category];
        this.applyDiscount(discountType, factor);
    }

    updateStatus(newStatus) {
        if (!OrderItemStatus.includes(newStatus)) {
            thline new Error('Invalid status');
        }
        this.status = newStatus;
    }
}

/*
call multiLineDiscount
{
    "item" : {
         "id" : 1,
         "discountType" : "buy",
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
            "discountType" : "buyXgetY", 
            "factor" : 
                {   "x" : 4,
                    "y" : 6,
                    "z" : 0
                }
        }, 
        "discountline2":{
        "discountType" : "flat", 
        "factor" : 
            {   "x" : 12,
                "y" : 6,
                "z" : 0
            }
        },
        "discountline3":{
        "discountType" : "fixed", 
        "factor" : 
            {   "x" : 0,
                "y" : 0,
                "z" : 320
            }
        },        
        "discountline4":{
        "discountType" : "percentage", 
        "factor" : 
            {   "x" : 2,
                "y" : 6,
                "z" : 0
            }
        }  
    }
}
*/





/**
* _processDiscount
* calculate _item.grossPrice based on 1 discountLine
* flat means... item.grossPrice - 50 (factor.x)
* fixed means... item.grossPrice equals factor.z
* percentage means... item.grossPrice -= 5% (factor.x)
* buyXgetY means... 3 halen 2 betalen (factor.x) (factor.y)
* @param _item ( object)
* @param _discount (object)
* @returns overRides _item
* */
function _processDiscount(_item, _discount) {
        const { pricePerUnit, qty } = _item;
    const { discountType, factor } = _discount;
        switch (discountType) {
            case 'percentage':
                _item.grossPrice -= (_item.grossPrice * factor.x) / 100;
                break;
            case 'flat':
                _item.grossPrice -= factor.x;
                break;
            case 'fixed':
                _item.grossPrice = factor.z;
                break;
            case 'buyXgetY':
                    // nubmer of items NOT PART of discount offer
                    const restItems = Math.min(qty % factor.y, factor.x);
                    
                    // number of items PART OF discount offer 
                    const discountItems  = (Math.floor(qty / factor.y)*factor.x);

                    // calculate itemsToPay
                    _item.itemsToPay = restItems + discountItems;

                       // _item.rest = qty % factor.x; // Je betaalt slechts voor 4(x) van elke (y)
                    _item.grossPrice = _item.itemsToPay* pricePerUnit;
                break;
            default:
                let _err={};
                _err.errorStatus = -100;
                _err.errorMsg = "disountdiscountType undefined correct: "+discountType;
                _item.error = err;
                console.log(err);
                resolve(_item);
        }
}

/**
* applyDiscountLine
* calculate discount based on discountType 'percentage', 'flat', 'fixed', 'buyXgetY'
* passes 1 line
* @param _line ( object)
* @param _discount (object)
* @returns overRides _line
* */
const _applyDiscountLine = async (_item, _discountLine) => {
    return new Promise( async (resolve, reject) => {
        try {
            const { pricePerUnit, qty } = _line;
          
            // calculate basePrice
            _line.grossPrice  = pricePerUnit * qty;

            // processes discountLine
            _processDiscount(_line, _discountLine)

            // responds _line...
            resolve(_line);

        } catch (err) {
            err.statusCode = -200;
            err.rejected = -"nanoService.applyDiscountLine() rejected!!... ";
            _line.error = err;
            console.log(err);
            resolve(_line);
      }
    });
}

/**
* _applyDiscount
* calculate discount based on discountType 'percentage', 'flat', 'fixed', 'buyXgetY'
* passes multiple lines
* @param _line ( object)
* @param _discount (object)
* @returns overRides _line
* */
 const _applyDiscount = async (_line, _discountLines) => {
    return new Promise( async (resolve, reject) => {
        try {
            const { pricePerUnit, qty } = _line;
          
            // calculate basePrice
            _line.grossPrice  = pricePerUnit * qty;

            // loops all discountLines
            Object.entries(_discountLines).forEach(([key, discount]) => {
                // processes discountLine
                _processDiscount(_line, discount)
            });

            // responds _line...
            resolve(_line);
        } catch (err) {
            err.statusCode = -200;
            err.rejected = -"nanoService.applyDiscount() rejected!!... ";
            _ite_linem.error = err;
            console.log(err);
            resolve(_line);
      }
    });
}




const colors = ['red','gray','white','yellow','magenta','green','blue','cyan','purple','teal'];

/**
 * initData
 * seed data constructor
 * */
/*
async initData() {
   var that = this;
}   
*/

export { moduleName, moduleGit, moduleVersion, moduleDate, moduleAuthor, moduleTitle, colors, rmOrder, rmOrderLine, OrderStatus, OrderItemStatus, applyDiscountLine, applyDiscount };