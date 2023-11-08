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
  * @type { Pizza [] }
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
