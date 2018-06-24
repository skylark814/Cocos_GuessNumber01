var mainLayer = cc.Layer.extend({
    sprite: null,
    dx : 10,
    ctor: function () {   //建構式

        this._super();

        var title = new cc.LabelTTF("猜數字遊戲", "", 48);
        title.x = cc.winSize.width / 2;
        title.y = cc.winSize.height * 7 / 8;
        title.setColor(cc.color(255, 255, 0));
        this.addChild(title, 0, "mytitle");

        this.initLayout();
        this.scheduleUpdate();  //只會跑update()，而且update·不可改其他名字
        return true;
    },

    initLayout:function(){

    },


    update: function () {
        console.log("ok");
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

