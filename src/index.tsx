import { AstroFactory } from './services/AstroFactory';

const astroFactory = AstroFactory();
const system = astroFactory.createSystem('Solar System');
const Sun = astroFactory.createStar('Sun', 695510, 1.989e30);
const Earth = astroFactory.createPlanet('Earth', 6371, 5.972e24, 149598023, 123598023);

system.setStar(Sun);
system.addPlanet(Earth);

console.log(system);
