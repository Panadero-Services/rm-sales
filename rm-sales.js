// * * *     *       *   *       *   *   *   * *** *
// *    *       *     *      *   *       *   *     *
// *   NanoService module : rm-sales.js      * *   *
// *   Location : /modules/build/rm-sales  *       *
// *   Modified L.B.   *                 *         *
// *   Date:    27 mar 2025             *          *
// *   Version: v0.2.1.            *        *      *
// ** *     *       *   *       *   *   *   *     **
// * *  *       *     *      *   *       *  *  * * *

/** Default module properties */
const moduleName = "RM-Sales";
const moduleGit = "https://github.com/panadero-services//rm-sales";
const moduleVersion = "0.2.1";
const moduleDate = "28 mar 2025";
const moduleAuthor = "lpab@Rm";
const moduleTitle = "RM Sales redefined and reengineered... modular style!";

/** Default low level dependencies */
// import ".../RM-codebase/legacy.js";

/** *
* v0.1.0 Initial Commit
* RentMagic Class : Price Calculation ProtodiscountType
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
* * v01.4 Rename PriceCalculation to rm-sales
* - replaces grossPrice with factor.z (fixed value)
* 
* * v01.5 Add rentXgetY to rm-sales
* *  distinguish rent vs buy: 
*       _processDiscount --> _processDiscountBuy
*       <new rent>  --> _processDiscountRent
* - usded to define period Discount
* 
* v0.1.6 Specific RAW change call before deployment;
* added .../api/price-calculator
* !! prototype says: make it work for the sake of simplicity!! 
* 
* v0.2.1 Fix 2 decimals issue + modular recipe priceCalculation for additional recipes
* priceCalcRecipe1()
* OrderLineResetRedundant()
* _round2Decimals()
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

/** *
 *  Discount: 
{
    "line" : {
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
  ** */


const orderStatus = ['created', 'article', 'prepare', 'open', 'finish', 'end'];

const orderFormat = {
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

   constructor(_order = orderFormat) {
      this.orderNr = this.generateOrderNr();
      this.initBy = this.generateName();
      this.order = _order;
   }

   getOrder() {
      return this.order;
   }

   addItem(_order = orderFormat) {
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
const orderLineStatus = ['created', 'article', 'prepare', 'open', 'finish', 'end'];
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
        applyDiscount(this.line, this.discount ); // 10% off
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

/*
    applyDiscountTemplate(category) {
        const discountTemplates = {
            'electronics': { discountType: 'percentage', factor: { x: 3, y: 1 } },
            'grabbelbak': { discountType: 'fixed', factor: { x: 20 } },
            'fashion': { discountType: 'flat', factor: { x: 25 } },
            'groceries': { discountType: 'buyXgetY', factor: { x: 2, y: 1 } },
        };

        if (!discountTemplates[category]) {
            throw new Error('Invalid category for discount template');
        }

        const { discountType, factor } = discountTemplates[category];
        this.applyDiscount(discountType, factor);
    }
*/
    updateStatus(newStatus) {
        if (!OrderItemStatus.includes(newStatus)) {
            throw new Error('Invalid status');
        }
        this.status = newStatus;
    }
}

 const _errorLog =  (_err, _line, _statusCode, _msg ) => {
    _err.statusCode = -_statusCode;
    _err.rejected = _msg
    _line.error = _err;
    console.log(_line);
}

/**
* _processDiscountBuy
* calculate _item.grossPrice based on 1 discountLine
* flat means... item.grossPrice - 50 (factor.x)
* fixed means... item.grossPrice equals factor.z
* percentage means... item.grossPrice -= 5% (factor.x)
* buyXgetY means... 3 halen 2 betalen (factor.x) (factor.y)
* @param _item ( object)
* @param _discount (object)
* @returns overRides _item
* */
function _processDiscountBuy(_line, _discount) {
//    return new Promise( async (resolve, reject) => {
        try {
            const { pricePerUnit, qty } = _line;
            const { discountType, factor } = _discount;
            switch (discountType) {
                case 'percentage':
                    _line.grossPrice -= (_line.grossPrice * factor.x) / 100;
                    break;
                case 'flat':
                    _line.grossPrice -= factor.x;
                    break;
                case 'fixed':
                    _line.grossPrice = factor.z;
                    break;
                case 'buyXgetY':
                    // nubmer of items NOT PART of discount offer
                    const restItems = Math.min(qty % factor.y, factor.x);
                    
                    // number of items PART OF discount offer 
                    const discountItems  = (Math.floor(qty / factor.y)*factor.x);

                    // calculate itemsToPay
                    _line.itemsToPay = restItems + discountItems;

                       // _line.rest = qty % factor.x; // Je betaalt slechts voor 4(x) van elke (y)
                    _line.grossPrice = _line.itemsToPay* pricePerUnit;
                    break;
                default:
                    _errorLog({}, _line, -200, "discountType undefined correct: "+discountType);
                    return(_line);
            }
        } catch (err) { // logging.... shutdown gracefully... do not reject
            _errorLog({}, _line, -210, "nanoService._processDiscount() rejected!!... ");
            return(_line);
        }
}

/**
* _processDiscountRent
* calculate _item.grossPrice based on 1 discountLine
* flat means... item.grossPrice - 50 (factor.x)
* fixed means... item.grossPrice equals factor.z
* percentage means... item.grossPrice -= 5% (factor.x)
* buyXgetY means... 3 halen 2 betalen (factor.x) (factor.y)
* rentXgetY means... 3 periods huur 2 betalen (factor.x) (factor.y)
* @param _item ( object)
* @param _discount (object)
* @returns overRides _item
* */
function _processDiscountRent(_line, _discount) {
//    return new Promise( async (resolve, reject) => {
        try {
            const { pricePerUnit, qty, periods } = _line;
            const { discountType, factor } = _discount;
            switch (discountType) {
                case 'percentage':
                    _line.grossPrice -= (_line.grossPrice * factor.x) / 100;
                    break;
                case 'flat':
                    _line.grossPrice -= factor.x;
                    break;
                case 'fixed':
                    _line.grossPrice = factor.z;
                    break;
                case 'buyXgetY':
                    // nubmer of items NOT PART of discount offer
                    const restItems = Math.min(qty % factor.y, factor.x);
                    
                    // number of items PART OF discount offer 
                    const discountItems  = (Math.floor(qty / factor.y)*factor.x);

                    // calculate itemsToPay
                    _line.itemsToPay = restItems + discountItems;

                       // _line.rest = qty % factor.x; // Je betaalt slechts voor 4(x) van elke (y)
                    _line.grossPrice = _line.itemsToPay* pricePerUnit;
                case 'rentXgetY':
                    // nubmer of items NOT PART of discount offer
                    const restPeriods = Math.min(periods % factor.y, factor.x);
                    
                    // number of items PART OF discount offer 
                    const discountPeriods  = (Math.floor(periods / factor.y)*factor.x);

                    // calculate itemsToPay
                    _line.itemsToPay = restPeriods + discountPeriods;

                       // _line.rest = qty % factor.x; // Je betaalt slechts voor 4(x) van elke (y)
                    _line.grossPrice = _line.itemsToPay* pricePerUnit;
                    break;
                default:
                    _errorLog({}, _line, -200, "discountType undefined correct: "+discountType);
                    return(_line);
            }
        } catch (err) { // logging.... shutdown gracefully... do not reject
            _errorLog({}, _line, -210, "nanoService._processDiscount() rejected!!... ");
            return(_line);
        }
}


/**
* _applyDiscount
* calculate discount based on discountType 'percentage', 'flat', 'fixed', 'buyXgetY'
* passes multiple lines
* @param _line ( object)
* @param _discountLines (object)
* @returns overRides _line
* */
const applyDiscount = async (_line, _discountLines) => {
    return new Promise( async (resolve, reject) => {
        try {
            const { pricePerUnit, qty } = _line;
          
            // calculate basePrice
            _line.grossPrice  = pricePerUnit * qty;

            // loop discountLines
            Object.entries(_discountLines).forEach(([key, discount]) => {
                if (_line.lineType=="buy") _processDiscountBuy(_line, discount);
                if (_line.lineType=="rent") _processDiscountRent(_line, discount);
            });

            // resolving .... 
            resolve(_line);
        } catch (err) { // logging.... shutdown gracefully... do not reject
            _errorLog(err, _line, -200, "nanoService.applyDiscount() error caught!!... ");
            resolve(_line);
        }
    });
}

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


    // this helper function forces float 2 decimals
    const _round2Decimals = (_val) => { return Math.round(_val * 100)/100; }

    /** *
    * call:
    * @param {object} _load : OrderLoad --> {RentalObjectID, Contract, RentalLines} !! By Reference
    * @param {sting} _id : RentalObjectID --> "O0014"
    * @param {string} _contract : Contract --> null
    * 
    * @description this is the altered priceCalculation routine for the initial prototype deployment
    * @returns object entity By Reference
    ** */
    const priceCalculator = async (_load) => {
        return new Promise( async (resolve, reject) => {
            try {
                const VAT = 0.21;
                _load.totalExcVAT = 0;
                _load.totalVAT = 0;
                _load.totalIncVAT = 0;

                // loop RentalLines
                Object.entries(_load.RentalLines).forEach(([key, line]) => {

                    // recipe1 (...more recipes to follow...)
                    priceCalcRecipe1(line, VAT);

                    // update orderTotals 
                    _load.totalExcVAT = _round2Decimals(_load.totalExcVAT + line.totalExcVAT);
                    _load.totalVAT = _round2Decimals(_load.totalVAT + line.totalVAT);
                    _load.totalIncVAT = _round2Decimals(_load.totalIncVAT + line.totalIncVAT);
                });

                // resolving .... 
                resolve();
            } catch (err) { // logging.... shutdown gracefully... do not reject
                _errorLog(err, _load, -500, "nanoService.priceCalculator() error caught!!... ");
                resolve();
            }
        });
    }


    /** *
    * call:
    * @param {object} _line : OrderLoad. --> {RentalLine} !! By Reference
    * @description this is the RentalLine that will be processed 
    * @returns object entity By Reference
    ** */
    const priceCalcRecipe1 = async (_line, _vat) => {
        return new Promise(  (resolve, reject) => {
            try {

                // periods calculation
                var _start = new Date(_line.DateTimeStart);
                var _end = new Date(_line.DateTimeEnd);
                var _periods = (_end - _start)/86_400_000;

                // calculate weeks/days
                var _weeks = Math.round(Math.min(_periods / 7));
                var _days = Math.min(_periods % 7);
                
                // calculate values base on #weeks and #days
                var _weekPrice = _weeks * _line.ItemPeriods.filter(_period => _period.PeriodID === "Week")[0].PriceValue;
                var _dayPrice = _days * _line.ItemPeriods.filter(_period => _period.PeriodID === "Dag")[0].PriceValue;
                var _discountFactor = parseFloat(1+_line.Discount);

                // update orderLine
                _line.price = _round2Decimals(_weekPrice + _dayPrice);
                _line.totalExcVAT = _round2Decimals(_line.Amount * (_weekPrice + _dayPrice) * _discountFactor);
                _line.totalVAT =  _round2Decimals(_line.totalExcVAT * _vat);
                _line.totalIncVAT = _round2Decimals(_line.totalExcVAT+_line.totalVAT);
                _line.priceCalcReason = generateReason();

                // resolving .... 
                resolve();
            } catch (err) { // logging.... shutdown gracefully... do not reject
                _errorLog(err, _line, -500, "nanoService.priceCalcRecipe1() error caught!!... ");
                resolve();
            }
        });
    }

    /** *
    * call:
    * @param {object} _line : OrderLoad. --> {RentalLine} !! By Reference
    * @description this routine removes redundant parameters
    * @returns object entity By Reference
    ** */
    const OrderLineResetRedundant = async (_line) => {
        // redundant parameters 
        // delete _line['periods']; 
        delete _line['ItemPeriods']; 
        delete _line['ItemID']; 
        delete _line['Amount']; 
        delete _line['Discount']; 
        delete _line['DateTimeStart']; 
        delete _line['DateTimeEnd']; 
    }

   /**
    * generateReason
    * generates a reason based on randoms
    * @param 
    * @returns Reason
    * */
    const generateReason = () =>  {
     let f = ["Standard daily rate", "Additional equipment",  "Service fee", "Whatever happened", "Unknown reason", "Random generated"];
     let rf = Math.floor(Math.random()*f.length);
     return f[rf];
   }


export { moduleName, moduleGit, moduleVersion, moduleDate, moduleAuthor, moduleTitle, Order, OrderLine, orderStatus, orderLineStatus, applyDiscount, priceCalculator };