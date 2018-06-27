let guess02Layer = cc.Layer.extend({
    sprite: null,
    dx: 4,
    ctor: function () {

        this._super();

        let title = new cc.LabelTTF("Guess Number", "", 48);
        title.x = cc.winSize.width / 2;
        title.y = cc.winSize.height * 7 / 8;
        title.setColor(cc.color(255, 127, 0));
        this.addChild(title, 0, "mytitle");


        this.scheduleUpdate();
        return true;


    },
    update: function () {
        let title = this.getChildByName("mytitle");
        if (title.x + title.width / 2 >= cc.winSize.width ||
            title.x - title.width / 2 <= 0) {
            this.dx *= -1;
        }
        title.x += this.dx;
    }
});

let guess02Scene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        let layer = new guess02Layer();
        this.addChild(layer);
    }
});

