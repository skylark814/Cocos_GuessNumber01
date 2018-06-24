var mainLayer = cc.Layer.extend({
    sprite: null,
    nums: new Array(10),
    back: null,
    enter: null,
    dx: 4,
    ctor: function () {
        this._super();

        var title = new cc.LabelTTF("猜數字遊戲", "", 48);
        title.x = cc.winSize.width / 2;
        title.y = cc.winSize.height * 7 / 8;
        title.setColor(cc.color(255, 255, 0));
        this.addChild(title, 0, "mytitle");

        this.initLayout();


        this.scheduleUpdate();  // update()

        return true;
    },

    initLayout: function () {
        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.number_plist, res.number_png);

        // number key
        var px, py;
        for (i = 0; i < this.nums.length; i++) {
            this.nums[i] = new cc.Sprite("#number" + i + ".png");

            if (i === 0) {
                px = 3;
                py = 1;
            } else {
                px = (i - 1) % 3 + 2;
                py = parseInt((i - 1) / 3) + 2;
            }

            this.nums[i].x = cc.winSize.width * px / 6;
            this.nums[i].y = cc.winSize.height * py / 8;

            this.addChild(this.nums[i]);
        }

        // enter key
        this.enter = new cc.Sprite(res.enter_png);
        this.enter.x = cc.winSize.width * 4 / 6;
        this.enter.y = cc.winSize.height * 1 / 8;
        this.addChild(this.enter);

        // back key
        this.back = new cc.Sprite(res.back_png);
        this.back.x = cc.winSize.width * 2 / 6;
        this.back.y = cc.winSize.height * 1 / 8;
        this.addChild(this.back);


    },

    update: function () {
        var title = this.getChildByName("mytitle");
        if (title.x + title.width / 2 >= cc.winSize.width ||
            title.x - title.width / 2 <= 0) {
            this.dx *= -1;
        }
        title.x += this.dx;
    }

});

var mainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new mainLayer();
        this.addChild(layer);
    }
});

