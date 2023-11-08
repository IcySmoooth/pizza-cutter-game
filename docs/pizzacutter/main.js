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

function update() {
  if (!ticks) {
    pizza = {
			pos: vec(50, 75)
		};
  }

  color("light_yellow");
	arc(pizza.pos, 10, 50, 0, 3);
	arc(pizza.pos, 10, 50, 0, -3.2);

	color("yellow");
	arc(pizza.pos, 40, 10, 0, 3);
	arc(pizza.pos, 40, 10, 0, -3.2);
}
