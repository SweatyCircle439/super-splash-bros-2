class Geyser {
    static width = 300;

    //x and y position, a = alpha, d = deadly, s = came from squash
    x;
    y;
    a;
    d = false;
    s = false;
    speed = 50;

    /**
     * @constructor
     * @param {number} cx
     * @param {boolean} fS - Whether the geyser is from a squash.
     * @param {number} floodLevel
     */
    constructor(cx, fS = false, floodLevel = 0) {
        this.x = cx - Geyser.width / 2;
        this.y = 700;
        this.a = 1;
        this.s = fS;
        // from squash, always deadly, else 30-80% chance
        if (fS || Math.random() <= 0.8 + (0.3 - 0.8) * ((floodLevel + 625) / 625)) {
            this.d = true;
            this.speed = 1;
        }else {
            this.d = false;
            this.speed = 50;
        }
    }

    /**
     * Update the geyser.
     * @returns {boolean} - `false` when the geyser should be deleted, `true` otherwise.
     */
    update() {
        
        this.y -= this.speed;
        if (this.d) {
            this.speed += 0.5;
        }
        if (this.y < -500) this.a = Math.max(0, this.a - 0.012);

        return (this.a > 0);
    }
}

module.exports = Geyser;
