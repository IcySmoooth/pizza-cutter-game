title = "Pizza Cutter";

description = `
`;

characters = [];

options = {};

/**
*@typedef {{
  *	 pos: Vector
  * }} Pizza
  */

    
  /**
  * @type { Pizza }
  */
  let pizza;

/**
 * @type {Array<number>} 
 */
let slices;

/**
 * @typedef {{
 *  pos: Vector
 * }} Cutter
 */

/**
 * @type {Cutter}
 */
let cutter;




function update() {
  if (!ticks) {
    pizza = {
			pos: vec(50, 50)
		};

    cutter = {
      pos: vec(0, 50)
    };

    slices = [-2, 2];
  }

  generatePizza(pizza, slices)

  if (input.isJustPressed) {
    slices.push(cutter.pos.angleTo(pizza.pos));
  }
}

/**
 * @param {Pizza} pizza
 * @param {Array<Number>} slices 
 */

function generatePizza(pizza, slices) {
  slices.sort();



  /**
   * @type {Color}
   */
  let colors = "yellow";
  /**
   * @type {Color}
   */
  let lightColor = "light_yellow";

  
  /*for (let i = -1; i < slices.length; i++) {
    let angle1;
    if (i == -1) {
      angle1 = -PI;
    } else {
      angle1 = slices[i];
    }
    
    let angle2;
    if (i == slices.length - 1) {
      angle2 = PI;
    } else {
      angle2 = slices[i + 1];
    }

    color(lightColor);
    arc(50, 50, 5, 50, angle1, angle2);

    color(colors);
    arc(50, 50, 30, 10, angle1, angle2);
  }*/

  color(lightColor);
  arc(pizza.pos, 10, 50, -PI, PI);

  color(colors);
  arc(pizza.pos, 40, 10, -PI, PI);


  generateCuts(pizza.pos.x, pizza.pos.y, 50, slices);
}
/**
 * @param {number} centerX
 * @param {number} centerY
 * @param {number} radius
 * @param {Array<number>} slices 
 */
function generateCuts(centerX, centerY, radius, slices) {
  /**
   * @type{{x: number, y: number}}
   */
  let point;
  slices.forEach(slice => {
    point = getPoint(radius, slice);
    color("black");
    line(centerX + point.x, centerY + point.y, centerX - point.x, centerY - point.y, 1);
  });
}
/**
 * 
 * @param {number} radius 
 * @param {number} angle 
 * @returns {{x: number, y:number}}
 */
function getPoint(radius, angle) {
  /**
   * @type {number}
   **/
  let x;
  /**
   * @type {number}
   **/
  let y;

  x = radius * sin(angle);
  y = radius * cos(angle);

  return {x: x, y: y}
}

