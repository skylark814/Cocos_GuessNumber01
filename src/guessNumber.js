var mainLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();

        return true;
    }
});

var mainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new mainLayer();
        this.addChild(layer);
    }
});

