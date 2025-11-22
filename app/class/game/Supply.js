const Player = require("./Player");

class Supply {
    x;
    y;
    vx;
    vy;
    t;
    takeable;
    takenBy;
    takeValue;
    collides;
    collidesWithTaker;
    rotation = 0;
    parachuteDeployed = true;
    parachuteRotation = 0;
    isCollidingWithPlatform = false;
    hue = 0;

    static start = 0;
    static frequency = 10000;
    static hideDelay = 20000;
    increment = 0.025;

    static width = 128;
    static height = 128;

    /**
     * @param {number} t
     * @constructor
     */
    constructor(t) {
        this.x = (Math.random() * 1260)
        this.y = -100;
        this.vx = Math.random() * 10 - 5;
        this.vy = 1;
        this.t = t;
        this.takeable = false;
        this.takenBy = -1;
        this.takeValue = 0;
        this.collides = false;
        this.collidesWithTaker = false;
        this.parachuteDeployed = true;
        this.parachuteRotation = 0;
        this.isCollidingWithPlatform = false;
        this.hue = Math.floor(Math.random() * 360);
    }

    /**
     * Update the supply.
     * @param {number} elapsed
     * @param {number} index
     * @returns {boolean} - `false` when the supply should be deleted.
     */
    update(elapsed) {
        let keep = true;

        this.y += this.vy;
        this.x += this.vx;

        for (const platform of Player.platforms) {
            if (this.x < platform.x + platform.w && this.x + Supply.width > platform.x &&
             this.y < platform.y + platform.h && this.y + Supply.height > platform.y) {
                this.vx = 0;
                this.vy = 0;
                this.isCollidingWithPlatform = true;
                break;
            }
        }

        this.takeable = true;
        // this.hue = Math.min((this.hue - .1), 0);
        if (elapsed - this.t >= Supply.hideDelay) {
            keep = false;
        }

        this.increment = 0.025; //Math.abs(this.vx) * 0.005; (
        // scrapped because sometimes it was imposible to collect the supply)
        if (this.parachuteDeployed) {
            if (this.isCollidingWithPlatform) {
                if (this.parachuteRotation > 0) {
                    this.parachuteRotation += 1;
                }else {
                    this.parachuteRotation -= 1;
                }
                if (Math.abs(this.parachuteRotation) >= 127) {
                    this.parachuteRotation = 0;
                    this.parachuteDeployed = false;
                }
            } else {
                this.parachuteRotation = this.vx * 10;
            }
        }

        if (this.collidesWithTaker) {
            this.takeValue = Math.min(1, this.takeValue + this.increment);
        }else {
            this.takeValue = Math.max(0, this.takeValue - this.increment / (this.collides ? 0.9 : 1.5));
        }

        if (this.takeValue === 1) keep = false;
        else if (this.takeValue <= 0) this.takenBy = -1;

        return keep;
    }
}

module.exports = Supply;
