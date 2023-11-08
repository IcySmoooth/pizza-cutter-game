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
  

function update() {
  if (!ticks) {
    pizza = {
			pos: vec(50, 75)
		};
    pepperoni = {
			pos: vec(60, 60)
		};
  }

  color("light_yellow");
	arc(pizza.pos, 10, 50, 0, 3);
	arc(pizza.pos, 10, 50, 0, -3.2);

	color("yellow");
	arc(pizza.pos, 40, 10, 0, 3);
	arc(pizza.pos, 40, 10, 0, -3.2);

  color("red");
	char("a", pepperoni.pos);
	arc(pepperoni.pos, 4, 5, 0, 3);
	arc(pepperoni.pos, 4, 5, 0, -3.2);
}
