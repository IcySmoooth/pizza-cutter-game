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
 * @type {Array<number>} 
 */
let slices;

/**
 * @typedef {{
*     pos: Vector
*     angle: Number
*     rotation: Number
*     speed: Number
*   }} Cutter
*/

/**
 * @type {Cutter}
 */
let cutter;

/**
 * @type {Boolean}
 */
let cutterIsRotating;

function update() {
  if (!ticks) {
    pizza = {
			pos: vec(50, 55)
		};
    pepperoni = [{
      pos: vec(60, 40)
		}];
    olive = [{
			pos: vec(40, 50)
		}];

    cutter = {
      pos: vec(50, 5),
      angle: 0,
      rotation: 0,
      speed: 0.03,
    };

    cutterIsRotating = true;

    slices = [-1, 1];
  }
  
  generatePizza(pizza, pepperoni, olive, slices);

  color("light_black");
  char("a", cutter.pos, {rotation: cutter.rotation});

  if (cutterIsRotating){
    moveCutter(cutter);
  }

  console.log(cutter.pos.angleTo(pizza.pos), " or ", pizza.pos.angleTo(cutter.pos));
  if (input.isJustPressed) {
    cutterIsRotating = false;
    slices.push(pizza.pos.angleTo(cutter.pos));
    console.log(cutter.pos);
  }
}

/**
 * @param {Pizza} pizza
 * @param {Array<Pepperoni>} pepperoni
 * @param {Array<Olive>} olive
 * @param {Array<number>} slices 
 */

function generatePizza(pizza, pepperoni, olive, slices) {
  slices.sort();

  /**
   * @type {Color}
   */
  let colors = "yellow";
  /**
   * @type {Color}
   */
  let lightColor = "light_yellow";

  color("light_yellow");
  arc(pizza.pos, 10, 33, -PI, PI);

  color("yellow");
  arc(pizza.pos, 30, 7, -PI, PI);

  color("red");
	arc(pepperoni[0].pos, 3, 4.5, 0, 3);
	arc(pepperoni[0].pos, 3, 4.5, 0, -3.2);

  color("black");
	char("b", olive[0].pos);


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
 * @param {Cutter} cutter
 */
function moveCutter(cutter) {
  // Radius of outer edge is 40, angle spans from -pi to pi 
  cutter.pos.x = pizza.pos.x + 40 * Math.cos(cutter.angle);
  cutter.pos.y = pizza.pos.y + 40 * Math.sin(cutter.angle);
  
  cutter.angle += cutter.speed;
  // Added a speed modifier and an angle offset to the cutter's rotation, I have no idea why this works but it actually works
  cutter.rotation = (cutter.pos.angleTo(pizza.pos) * 0.65) + 1;

  if (cutter.angle > PI){
    cutter.angle = -PI;
  } 
  else if (cutter.angle < -PI){
    cutter.angle = PI;
  }
}

function createLineFromCutter() {
  // Calculate the endpoint of the line using the cutter's position and angle
  /**
  * @type {Number}
  */
  const endPointX = cutter.pos.x + 50 * Math.cos(cutter.angle); // Adjust line length (50) as needed
  /**
  * @type {Number}
  */
  const endPointY = cutter.pos.y + 50 * Math.sin(cutter.angle); // Adjust line length (50) as needed

  color("red"); // Change color as desired
  line(cutter.pos, vec(endPointX, endPointY));
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