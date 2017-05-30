function Button(id, canvas, ctx) {
    this._state = Button.DEACTIVATED;
    this._spriteLoaded = false;

    this._x;
    this._y;
    this._width;
    this._height;
    this._sprite;
    this._spriteWidth = 0;
    this._spriteHeight = 0;

    this.getState = function() {
        return this._state;
    };

    this._draw = function() {
        ctx.drawImage(that._sprite, that._state * that._spriteWidt, 0, that._spriteWidth, that._spriteHeight,
        that._x, that._y, that._width, that._height);
    };

    this._initView = function(view) {
        this._x = view.x;
        this._y = view.y;
        this._width = view.width;
        this._height = view.height;
        this._sprite = new Image();
        this._sprite.src = view.sprite;
        this._sprite.onload = function() {
            that._spriteLoaded = true;
            that._spriteWidth = that._sprite.width / 3; //state number
            that._spriteHeight = that._sprite.height;
        };
    };

    this._id = id;
    this._getId = function() {

    };
}

Button.DEACTIVATED = -1;
Button.INACTIVE = 0;
Button.HOVER = 1;
Button.ACTIVE = 2;

