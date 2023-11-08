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

/**
 * @typedef {{
*  pos: Vector
*  angle: Number
*  rotation: Number
*  speed: Number
* }} CutterSprite
*/

/**
 * @type {CutterSprite}
 */
let cutterSprite;

/**
 * @type {Boolean}
 */
let cutterIsRotating;

function update() {
  if (!ticks) {
    pizza = {
			pos: vec(50, 50)
		};

    cutter = {
      pos: vec(0, 50)
    };

    cutterSprite = {
      pos: vec(50, 5),
      angle: 0,
      rotation: 0,
      speed: 0.03,
    };

    cutterIsRotating = true;

    slices = [-2, 2];
  }

  generatePizza(pizza, slices)

  box(cutterSprite.pos, 6);

  if (cutterIsRotating){
    moveCutter(cutterSprite);
  }

  if (input.isJustPressed) {
    cutterIsRotating = false;
    slices.push(cutterSprite.angle);
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

function moveCutter(cutterSprite) {
  // Radius of outer edge is 40, angle spans from -pi to pi 
  cutterSprite.pos.x = pizza.pos.x + 40 * Math.cos(cutterSprite.angle);
  cutterSprite.pos.y = pizza.pos.y + 40 * Math.sin(cutterSprite.angle);
  
  //cutterSprite.angle = cutterSprite.pos.angleTo(pizza.pos);

  cutterSprite.angle += cutterSprite.speed;

  if (cutterSprite.angle > PI) {
    cutterSprite.angle = -PI;
  } else if (cutterSprite.angle < -PI) {
    cutterSprite.angle = PI;
  }
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