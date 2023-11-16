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

/**
 * @type {Boolean}
 */
let cutterCollisionExecuted = false;

/**
 * @type {Number}
 */
let endTimerTimeLimit = 60;

/**
 * @type {Number}
 */
let endTimerElapsedTime = 0;

function update() {
  if (!ticks) {
    cutter = {
      pos: vec(50, 5),
      angle: 0,
      rotation: 0,
      speed: 0.03,
    };
    initializePizza();
    cutterIsRotating = true;

    slices = [-1, 1];
  }
  
  generatePizza(pizza, pepperoni, olive, slices);

  color("light_black");
  char("a", cutter.pos, {rotation: cutter.rotation});

  if (cutterIsRotating){
    moveCutter();
  }

  if (input.isJustPressed && cutterIsRotating) {
    // Reset timer to start anew
    endTimerElapsedTime = 0
    cutterIsRotating = false;
  }

  // If the timer at end of level is finished
  if (!cutterIsRotating && endTimerElapsedTime >= endTimerTimeLimit) {
    initializePizza();
  }
  else if (!cutterIsRotating && endTimerElapsedTime < endTimerTimeLimit) {
    endTimerElapsedTime++;
  }
}

function initializePizza() {
  pizza = {
    pos: vec(50, 55)
  };
  pepperoni = [{
    pos: vec(60, 40)
  }];
  olive = [{
    pos: vec(40, 50)
  }];

  cutterCollisionExecuted = false;
  cutterIsRotating = true;
}

/**
 * @param {Pizza} pizza
 * @param {Array<Pepperoni>} pepperoni
 * @param {Array<Olive>} olive
 * @param {Array<number>} slices 
 */

function generatePizza(pizza, pepperoni, olive, slices) {
  slices.sort();

  color("light_yellow");
  arc(pizza.pos, 10, 33, -PI, PI);

  color("yellow");
  arc(pizza.pos, 30, 7, -PI, PI);

  generateCuts(pizza.pos.x, pizza.pos.y, 50, slices);
  generateToppings(pepperoni, olive)
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

  // I unfortunately could not get the cutter line to work with the getPoint function, so I offer my own implementation
  if (!cutterIsRotating) {
    let oliveCollision = line(cutter.pos.x, cutter.pos.y, 2 * centerX - cutter.pos.x, 2 * centerY - cutter.pos.y, 1).isColliding.char.b;
    let pepperoniCollision = line(cutter.pos.x, cutter.pos.y, 2 * centerX - cutter.pos.x, 2 * centerY - cutter.pos.y, 1).isColliding.rect.red;
    
    // Check if the cutter collided with any objects and if cutter collided logic hasn't happened yet
    if (!cutterCollisionExecuted) {
      cutterCollisionCheck(oliveCollision || pepperoniCollision);
      cutterCollisionExecuted = true;
    }
  }
}

function moveCutter() {
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
 * @param {Boolean} cutterCollided
 */
// Cutter collided is set to true if it has collided with any toppings
function cutterCollisionCheck(cutterCollided) {
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

function generateToppings(pepperoni, olive){
  //manual setting of location, can change to random in future
  //or change hardcoded locations of toppings
  color("red");
  arc(pepperoni.pos, 3, 4.5, 0, 3);
  arc(pepperoni.pos, 3, 4.5, 0, -3.2);
  pepperoni.pos = vec(40,30);
  arc(pepperoni.pos, 3, 4.5, 0, 3);
  arc(pepperoni.pos, 3, 4.5, 0, -3.2);
  pepperoni.pos = vec(60,30);
  arc(pepperoni.pos, 3, 4.5, 0, 3);
  arc(pepperoni.pos, 3, 4.5, 0, -3.2);
  pepperoni.pos = vec(30,50);
  arc(pepperoni.pos, 3, 4.5, 0, 3);
  arc(pepperoni.pos, 3, 4.5, 0, -3.2);
  pepperoni.pos = vec(70,60);
  color("black");
  olive.pos = vec(45,45);
	char("b", olive.pos);
  olive.pos = vec(40,30);
	char("b", olive.pos);
  olive.pos = vec(36,70);
	char("b", olive.pos);
}