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
 * @param {Array<number>} slices 
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
   * @type{Vector}
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
 * @returns {Vector}
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

  return vec(x, y);
}
