'use strict';
/**
 * Reflection question 1
 * False by default. Finns inte => 0 => Falsey
 */

import { v4 as uuidv4 } from 'uuid';
import inventory from './inventory.mjs';
console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);
 names
   .toSorted((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
   .forEach(name => console.log(name));

console.log('\n--- for ... in ---------------------------------------')
for (const name in inventory) {
  console.log(name);
}
/**
 * Reflection question 2
 * for .. in besöker enumerables own och inherited men inte non-enumerables.
 * .keys besöker enumerable own men inget annat.
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  return Object.keys(inv)
  .toSorted((a,b) => a.localeCompare(b, "sv"), { sensitivity: 'case' })
  .filter((key) => inv[key][prop])
  .map((key) => `<option value="${key}" key="${key}"> ${key} ${inv[key].price} kr</option>`);
}

console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {
  static #instanceCounter = 0;

  constructor(arg) {
    if (arg instanceof Salad) {
      this.ingredients = {...arg.ingredients};
    } else {
      this.ingredients = {};
    }
    this.id = 'salad_' + Salad.#instanceCounter++;
    const uuid = uuidv4();
    this.uuid = uuid;
  }

  add(name, properties) {
    this.ingredients[name] = {...properties, size: properties.size || 1};
    return this;
  }

  remove(name) {
    delete this.ingredients[name];
    return this;
   }

  static parse(json) {
    const data = JSON.parse(json);
    if (Array.isArray(data)) {
      return data.map(salad => {
        const arraySalad = new Salad();
        arraySalad.ingredients = salad.ingredients ;
        arraySalad.uuid = salad.uuid;
        return arraySalad;
      });
    } else {
      const singleSalad = new Salad();
      singleSalad.ingredients = {...data.ingredients};
      singleSalad.uuid = data.uuid;
      return singleSalad;
    }
  }
}

  let myCaesarSalad = new Salad()
    .add('Sallad', inventory['Sallad'])
    .add('Kycklingfilé', inventory['Kycklingfilé'])
    .add('Bacon', inventory['Bacon'])
    .add('Krutonger', inventory['Krutonger'])
    .add('Parmesan', inventory['Parmesan'])
    .add('Ceasardressing', inventory['Ceasardressing'])
    .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')
Salad.prototype.getPrice = function() {
  return Object.values(this.ingredients)
  .reduce((total, ingredient) => total + ingredient.price * ingredient.size, 0);
}

Salad.prototype.count = function(property) {
    return Object.values(this.ingredients)
    .filter((ingredient) => ingredient[property])
    .length
}



console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör


console.log('\n--- reflection question 3 ---------------------------------------')
// De representeras genom att använda prototype-klasserna. Detta är bra eftersom vi sparar på minnet som behövs användas för att skapa funktioner.
console.log('typeof Salad: ' + typeof Salad); // Function
console.log('typeof Salad.prototype: ' + typeof Salad.prototype); //Object
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype); //Undefined
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad); //Object
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype); //Undefined
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad))); //False
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad))); //True
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype))); //True

console.log('\n--- Assignment 4 ---------------------------------------')

const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')
class GourmetSalad extends Salad {
}

GourmetSalad.prototype.add = function(name, properties, size = 1) {
  if (this.ingredients[name]) {
    this.ingredients[name].size += size;
  } else {
    this.ingredients[name] = {...properties, size};
  }
  return this;
}


let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);


/**
 * Reflection question 4
 * De sparas i klassen istället för i instansen.
 */
/**
 * Reflection question 5
 * Ha const och static samtidigt?
 * Freeze? Går det att frysa statics eller är det enbart object.
 * defineProperty? Samma som ovan.
 */
/**
 * Reflection question 6
 * Ja med #,
 * i.e.
 * #privateProperty
 * this.#privateProperty = 42 funkar inom sin egna class men inte utanför.
 */

console.log("---- Assignment 7 --------------------");
const salad1 = new Salad()
    .add('Kycklingfilé', inventory['Kycklingfilé'])
    .add('Krutonger', inventory['Krutonger']);

const salad2 = new Salad(salad1);
console.log(salad1.uuid !== salad2.uuid); // True
let salad2UUIDbefore = salad2.uuid;
salad2.add('Bacon', inventory['Bacon']);
console.log(`Before: ${salad2UUIDbefore}, after: ${salad2.uuid}`);
console.log(salad2.uuid === salad2UUIDbefore); // True

console.log(`Before parse: ${myCaesarSalad.uuid}, after: ${singleCopy.uuid}`)
console.log(myCaesarSalad.uuid === singleCopy.uuid);
