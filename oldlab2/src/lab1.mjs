'use strict';
/**
 * Reflection question 1
 * False by default. Finns inte => 0 => Falsey
 */

import { v4 as uuidv4 } from 'uuid';
import inventory from './inventory.mjs';

class Salad {
  static #instanceCounter = 0;

  constructor(arg) {
    if (arg instanceof Salad) {
      this.ingredients = { ...arg.ingredients };
    } else {
      this.ingredients = {};
    }
    this.id = 'salad_' + Salad.#instanceCounter++;
    const uuid = uuidv4();
    this.uuid = uuid;
  }

  add(name, properties) {
    this.ingredients[name] = { ...properties, size: properties.size || 1 };
    return this;
  }

  remove(name) {
    delete this.ingredients[name];
    return this;
  }

  static parse(json) {
    const data = JSON.parse(json);
    if (Array.isArray(data)) {
      return data.map((salad) => {
        const arraySalad = new Salad();
        arraySalad.ingredients = salad.ingredients;
        arraySalad.uuid = salad.uuid;
        return arraySalad;
      });
    } else {
      const singleSalad = new Salad();
      singleSalad.ingredients = { ...data.ingredients };
      singleSalad.uuid = data.uuid;
      return singleSalad;
    }
  }
}

Salad.prototype.getPrice = function () {
  return Object.values(this.ingredients).reduce(
    (total, ingredient) => total + ingredient.price * ingredient.size,
    0
  );
};

Salad.prototype.count = function (property) {
  return Object.values(this.ingredients).filter(
    (ingredient) => ingredient[property]
  ).length;
};

export default Salad;
