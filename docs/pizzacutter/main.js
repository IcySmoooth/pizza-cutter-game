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




function update() {
  if (!ticks) {
    pizza = {
			pos: vec(50, 50)
		};

    slices = [-2, 0, -2];
  }

  generatePizza(pizza, slices)
}

/**
 * @param {Pizza} pizza
 * @param {Array<Number>} slices 
 */

function generatePizza(pizza, slices) {
  slices.sort();
  generateCuts(slices);


  /**
   * @type {Color}
   */
  let colors = "yellow";
  /**
   * @type {Color}
   */
  let lightColor = "light_yellow";

  
  for (let i = -1; i < slices.length; i++) {
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
  }
}
/**
 * @param {Array<Number>} slices 
 */
function generateCuts(slices) {
  /**
   * @type{{x: number, y: number}}
   */
  let point;
  slices.forEach(slice => {
    point = getPoint(50, 50, 40, slice);
    color("black");
    console.log(point);
    line(point.x, point.y, -point.x, -point.y, 1);
  });
}
/**
 * 
 * @param {number} centerX 
 * @param {number} centerY 
 * @param {number} radius 
 * @param {number} angle 
 * @returns {{x: number, y:number}}
 */
function getPoint(centerX, centerY, radius, angle) {
  /**
   * @type {number}
   **/
  let x;
  /**
   * @type {number}
   **/
  let y;

  x = centerX + radius * sin(angle);
  y = centerY + radius * cos(angle);

  return {x: x, y: y}
}

