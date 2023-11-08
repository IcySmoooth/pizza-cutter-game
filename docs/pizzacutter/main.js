title = "Pizza Cutter";

description = `
`;

characters = [
  `
  l
  l
 lll
 lll
lllll
lllll
  `,
  `
 ll
l  l
l  l
 ll
  `
];

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
*@typedef {{
  *	 pos: Vector
  * }} Pepperoni
  */
  
  /**
  * @type { Pepperoni [] }
  */
  let pepperoni;
  /**
*@typedef {{
  *	 pos: Vector
  * }} Olive
  */
  
  /**
  * @type { Olive [] }
  */
  let olive;
  
  /**
 * @typedef {{
 * pos: Vector,
  * }} Cutter
  */
 
 /**
  * @type { Cutter }
  */
 let cutter;
  

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
			pos: vec(50, 55)
		};
    pepperoni = {
			pos: vec(60, 40)
		};
    olive = {
			pos: vec(40, 50)
		};
    cutter = {
      pos: vec(50, 95)
  };
  }
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
  color("light_yellow");
	arc(pizza.pos, 10, 33, 0, 3);
	arc(pizza.pos, 10, 33, 0, -3.2);

	color("yellow");
	arc(pizza.pos, 30, 7, 0, 3);
	arc(pizza.pos, 30, 7, 0, -3.2);

  color("red");
	arc(pepperoni.pos, 3, 4.5, 0, 3);
	arc(pepperoni.pos, 3, 4.5, 0, -3.2);

  color("black");
	char("b", olive.pos);

  color("light_black");
  char("a", cutter.pos);
}
