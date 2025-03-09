// Voorbeeld gebruik:
import * as rm from '../rm-pricecalculation.js';
//console.log(rm);

const _rmOrder = new rm.rmOrder();
console.log(_rmOrder);


async function f1() {
  return new Promise(resolve => {
    const check = async () => {
      try {
        // Getting list of open orders
          //await callModule();
          resolve();
      } catch (err) {
        console.log('errrrror.. pricecalculation....',err); 
        process.exit(1);
      }
    }
    check();
  });
}



f1();

