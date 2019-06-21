import { Size, Mass, Time } from './universalUnits';

const DEF_SIZE = 'kilometers';

interface IOrbit {
    semiMajorAxis: Size;
    semiMinorAxis: Size;
    focus: Size;
}

interface ISpaceBody {
    name: string;
    size: Size;
    mass: Mass;
}

export function AstroFactory() {
    // utils
    const G: number = 6.67 * Math.pow(10, -11);

    const getAngle = function(n: number): number {
        return ((Math.PI * 2) / 360) * n;
    };

    const getVelocity = function(m1: number, m2: number, r: number): number {
        return Math.sqrt((G * (m1 + m2)) / r)
    };

    abstract class SpaceBody implements ISpaceBody {
        orbit: any;

        constructor(
            public name: string,
            public mass: Mass,
            public size: Size,
            semiMajorAxis?: Size,
            semiMinorAxis?: Size
        ) {
            if(semiMajorAxis && semiMinorAxis) {
                this.orbit = new Orbit(semiMajorAxis, semiMinorAxis, this);
            }
        }
    }

    const API = {
        createSystem: (name?: string): System => {
            return new System(name);
        },
        createStar: (name: string, sizeKM: number, massKG: number): Star => {
            const starSize = new Size();
            starSize[DEF_SIZE] = sizeKM;

            const starMass = new Mass();
            starMass.kilograms = massKG;

            return new Star(name, starMass, starSize, new Size(), new Size())
        },
        createPlanet: (name: string, sizeKM: number, massKG: number, semiMajorAxis: number, semiMinorAxis: number): Planet => {
            const planetMass = new Mass();
            planetMass.kilograms = massKG;

            const planetSize = new Size();
            planetSize[DEF_SIZE] = sizeKM;

            const planetSemiMajorAxis = new Size();
            planetSemiMajorAxis[DEF_SIZE] = semiMajorAxis;

            const planetSemiMinorAxis = new Size();
            planetSemiMinorAxis[DEF_SIZE] = semiMinorAxis;

            return new Planet(name, planetMass, planetSize, planetSemiMajorAxis, planetSemiMinorAxis)
        }
    };


    // classes
    class Star extends SpaceBody {
        type: string = 'Star';
    }

    class Planet extends SpaceBody {
        type: string = 'Planet';
        system: System;

        setToSystem(system: System) {
            this.system = system;
        }
    }

    class Moon extends SpaceBody {
        type: string = 'Moon';
    }

    class System {
        centralBody: Star;
        planets: Planet[] = [];

        constructor(public name: string = 'unnamed') {

        }

        public setStar(star: Star): void {
            this.centralBody = star;
        }

        public addPlanet(planet: Planet): void {
            planet.setToSystem(this);
            this.planets.push(planet)
        }
    }

    class Orbit implements IOrbit {
        focus = new Size();
        orbitPosition: OrbitPosition;

        constructor(public semiMajorAxis: Size, public semiMinorAxis: Size, public orbitBody: SpaceBody) {
            this.focus[DEF_SIZE] = Math.sqrt((this.semiMajorAxis[DEF_SIZE] * 2) - (this.semiMinorAxis[DEF_SIZE] * 2));
            this.orbitPosition = new OrbitPosition(this);
        }
    }

    class OrbitPosition {
        x: Size = new Size();
        y: Size = new Size();
        t: number = 0;

        constructor(public orbit: Orbit) {
            this.x[DEF_SIZE] = this.orbit.semiMajorAxis[DEF_SIZE] * Math.cos(0);
            this.y[DEF_SIZE] = this.orbit.semiMinorAxis[DEF_SIZE] * Math.sin(0);
        }

        updateAngle(n: number) {
            this.t = getAngle(n);
            this.x[DEF_SIZE] = this.orbit.semiMajorAxis[DEF_SIZE] * Math.cos(this.t);
            this.y[DEF_SIZE] = this.orbit.semiMinorAxis[DEF_SIZE] * Math.sin(this.t);
        }
    }

    return API;
}
