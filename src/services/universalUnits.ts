// Size
interface ISize {
    meters: number;
    kilometers: number;
    au: number;
}

export class Size implements ISize {
    private _size: number = 0;

    set meters(val: number) {
        this._size = val;
    }
    get meters(): number {
        return this._size
    }

    set kilometers(val: number) {
        this._size = val * 1000;
    }
    get kilometers(): number {
        return this._size / 1000;
    }

    set au(val: number) {
        this._size = val * 149597870700;
    }
    get au(): number {
        return this._size / 149597870700;
    }
}


// Time
interface ITime {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
}

export class Time implements ITime {
    private _time: number = 0;

    set seconds(val: number) {
        this._time = val;
    }
    get seconds() {
        return this._time;
    }

    set minutes(val: number) {
        this._time = val * 60;
    }
    get minutes() {
        return this._time / 60;
    }

    set hours(val: number) {
        this._time = (val * 60) * 60;
    }
    get hours() {
        return (this._time / 60) / 60;
    }

    set days(val: number) {
        this._time = ((val * 60) * 60) * 24;
    }
    get days() {
        return ((this._time / 60) / 60) / 24;
    }
}


// Mass
interface IMass {
    grams: number;
    kilograms: number;
    tons: number;
}

export class Mass implements IMass {
    private _mass: number = 0;

    set grams(val: number) {
        this._mass = val;
    }
    get grams(): number {
        return this._mass
    }

    set kilograms(val: number) {
        this._mass = val * 1000;
    }
    get kilograms(): number {
        return this._mass / 1000;
    }

    set tons(val: number) {
        this._mass = (val * 1000) * 1000;
    }
    get tons(): number {
        return (this._mass / 1000) / 1000;
    }
}
