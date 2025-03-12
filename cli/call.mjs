// Voorbeeld gebruik:
import * as rm from '../rm-sales.js';
//console.log(rm);

const _rmOrder = new rm.Order();
console.log(_rmOrder);


async function f1() {
  return new Promise(resolve => {
    const check = async () => {
      try {
        // Getting list of open orders
          //await callModule();
          resolve();
      } catch (err) {
        console.log('errrrror.. rm-sales....',err); 
        process.exit(1);
      }
    }
    check();
  });
}



f1();

