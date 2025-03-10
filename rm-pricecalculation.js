// * * *     *       *   *       *   *   *   * *** *
// *    *       *     *      *   *       *   *     *
// *   NanoService : rm-pricecalculation.js      * * 
// *   Location : /modules/build/pricecalculation  * 
// *   Modified L.B.   *                 *         *
// *   Date:    02 mar 2025             *          *
// *   Version: v0.1.2.            *        *      *
// ** *     *       *   *       *   *   *   *     **
// * *  *       *     *      *   *       *  *  * * *

/** Default module properties */
const moduleName = "RM-PriceCalculation";
const moduleGit = "https://github.com/lieuwebakker/rm-pricecalculation";
const moduleVersion = "0.1.1";
const moduleDate = "02 mar 2025";
const moduleAuthor = "lpab@Rm";
const moduleTitle = "RM RentalPriceCalculation redefined and reengineered... modular style!";

/** Default low level dependencies */
// import ".../RM-codebase/legacy.js";

/** *
* v0.1.0 Initial Commit
* RentMagice Class : Price Calculation Prototype
* ERP module for RM_Rental Order Handling inspired by frontEndTeamSeries
* This module is supposed to calculate the order price for rental and sales orders
* In order to make this work we need to import all order details as well
* 
* v01.1 Add DiscountTypes + DiscountTemplates
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

/** *
* construct:
* @param {string} _order_id - the id for referring to the specific object 
* @param {string} _owner
* @description this is the core priceCalculation module that contains minimum requirements
* @returns object entity
** */
class rmOrder {

   constructor(_order = Order) {
      this.orderNr = this.generateOrderNr();
      this.initBy = this.generateName();
      this.order = _order;
   }

   getOrder() {
      return this.order;
   }

   addItem(_order = Order) {
      this.items.push(_order);
   }

   calculateOrderprice(_packageCost = 0, _packageDiscount = 0) {
      let that = this;

      // Step 0: reset totals
      that.order.grossPrice = 0;
      that.order.nettPrice = 0;

      that.order.orderItems.forEach(item => {
         const { type, itemName, pricePerUnit, qty, status, grossPrice, nettPrice} = item;

         // Step 1: sum orderGrossPrice with rowGrossPrice
         that.grossPrice += grossPrice;

         // Step 2: sum orderNettPrice with rowNettPrice
         that.nettPrice += nettPrice;

         console.log(item);
      });

      // Step 3 Extra kosten toevoegen
      // --> packageCost = deprecated --> specific orderRow
      // that.grossPrice += _packageCost;

      // Step 4 Extra korting toevoegen
      // --> _packageDiscount = deprecated --> specific orderRow
      // that.grossPrice -= _packageDiscount;
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
     let f = ["Sonia", "Bjork",  "Kai", "Louis", "Bob", "Robin", "Luka", "Eliana", "Jaden", "Ezra", "Luca", "Rowan", "Nova", "Amara", "Aaliyah", "Finn", "Lieuwe", "Mark", "Eric", "Eric", "Vince", "Inge", "Laura", "Linda", "Peter", "Mick", "Sofia", "Fleur", "Tessa", "Ray", "Raymond", "Toffie", "Eppie", "Mickey", "Piet", "Jan", "Mick", "Gopher", "Don", "Karel", "Albert", "Pieter"];
     let l= ["Smith", "Johnson",'Thomson', "de Kloet" , "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Wilson", "Bakker", "Kroesbergen", "Wilson", "Nijssen", "Swanders", "Jansen", "Janssen", "Bond", "Garner", "van Basten", "Bergkamp", "Ali", "Hemyatahar", "Reagan", "van Kinsbergen", "van Brakel", "Alyeson"];
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
  * itemStatus
  * 0 created = Aangemaakt
  * 1 selected = Invoer klaar
  * 2 prepare = Voorbereiden + <optie Steppen> 
  * 3 open = Leveren + <optie Steppen>
  * 4 finish = Einde huur
  * 5 archive = Order sluiten
  ** */
const OrderItemStatus = ['created', 'article', 'prepare', 'open', 'finish', 'end'];
/** *
* construct:
* @param {string} _itemId - the auto generated id for referring this item within Order
* @param {string} _itemType 
* @description this is the core item class that handles per item priceCalculation
* @returns object entity
** */
class rmOrderItem {

   constructor( _item ) {
      this.item = _item;
      this.item.status = OrderItemStatus[0];
   }

   /** 
   Create an rmItemObject with format
      const item = {
         id : 1,
         type : "rent",
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
    * getItem
    * return this as item
    * @param 
    * @returns <object>
    * */
   getItem() {
      return this.item;
   }

   /** 
   Create an rmRowDiscountObject with format
      const discountLine = {
         id : 1,
         type : "fn",
         condition : checkMinQty(5, 3),
         condition : checkCondition((x) => x > 50, 60)
         discountPercentage :  10
      }
   */

   /**
    * applyDiscount
    * calculate discount based on type 'percentage', 'flat', 'buyXgetY'
    * buyXgetY means... 3 halen 2 betalen
    * @param discountType ( 'percentage', 'flat', 'buyXgetY')
    * @param value (number)
    * @returns 
    * */
    applyDiscount(discountType, value) {
        switch (discountType) {
            case 'percentage':
                this.total -= (this.total * value) / 100;
                break;
            case 'flat':
                this.total -= value;
                break;
            case 'buyXgetY':
                this.items.forEach(item => {
                    if (item.quantity >= value.x) {
                        let freeItems = Math.floor(item.quantity / value.x) * value.y;
                        this.total -= freeItems * item.price;
                    }
                });
                break;
            default:
                throw new Error('Invalid discount type');
        }
    }

   calculateDiscountLine(_line, _discount = 1) {
      if (_line.condition){
         _discount = _discount * (1 - (_line.discountPercentage/100));
      }
      return _discount;
   }

   calculateBasePrice() {
      let that = this;
      // Step 1: extraheer variabelen voor itemPrijsBerekening.
      const { name, pricePerUnit, qty, discountFactor , vat} = that.item;
   
      // Step 2: Wat is de BasisHuurPrijs?
      let rowBasePrice = pricePerUnit * qty * that.rentPeriod;

      // Step 3: Bereken de Korting over de BasisHuurPrijs
      let discount = rowBasePrice * (discountFactor / 100);

      // Step 4: Trek de korting van de BasisHuurPrijs af.
      that.item.grossPrice = (rowBasePrice - discount).toFixed(2);

      // Step 5: Update Class.grossPrice
      that.item.nettPrice = (that.item.grossPrice * (1 + vat)).toFixed(2);
   }

   // helpers
   static checkCondition(_condition, _value) { return _condition(_value); }
   static checkMinQty(_qty, _min) { return _qty >= _min; }

   applyDiscountTemplate(category) {
        const discountTemplates = {
            'electronics': { type: 'percentage', value: 10 },
            'fashion': { type: 'flat', value: 20 },
            'groceries': { type: 'buyXgetY', value: { x: 3, y: 1 } },
        };

        if (!discountTemplates[category]) {
            throw new Error('Invalid category for discount template');
        }

        const { type, value } = discountTemplates[category];
        this.applyDiscount(type, value);
    }

    updateStatus(newStatus) {
        if (!OrderItemStatus.includes(newStatus)) {
            throw new Error('Invalid status');
        }
        this.status = newStatus;
    }


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

export { moduleName, moduleGit, moduleVersion, moduleDate, moduleAuthor, moduleTitle, colors, rmOrder, rmOrderItem, OrderStatus, OrderItemStatus }; 