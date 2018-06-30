var guess02Layer = cc.Layer.extend({
    sprite:null,
    nums: new Array(10),
    rects : new Array(10),
    back: null,
    backRect: null,
    enter: null,
    enterRect: null,
    input: null,
    mesg: null,
    guess: "",
    dx : 4,
    answer: createAnswer(3),
    ctor:function () {
        this._super();

        var title = new cc.LabelTTF("猜數字遊戲","",48);
        title.x = cc.winSize.width / 2;
        title.y = cc.winSize.height *7/8;
        title.setColor(cc.color(255,255,0));
        this.addChild(title,0,"mytitle");

        this.initLayout();
        this.setUpmymouse(this);

        this.scheduleUpdate();  // update()

        return true;
    },

    initLayout: function(){
        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.number_plist, res.number_png);

        // number key
        var px, py;
        for (i = 0; i<this.nums.length; i++){
            this.nums[i] = new cc.Sprite("#number" + i + ".png");

            if (i==0){
                px = 3;
                py = 1;
            }else{
                px = (i-1) % 3 + 2;
                py = parseInt((i-1) / 3) + 2;
            }
            this.nums[i].x = cc.winSize.width * px /6;
            this.nums[i].y = cc.winSize.height * py /8;

            this.rects[i] = new cc.Rect(
                this.nums[i].x - this.nums[i].width/2,
                this.nums[i].y - this.nums[i].height/2,
                this.nums[i].width,
                this.nums[i].height
            );


            this.addChild(this.nums[i]);
        }

        // enter key
        this.enter = new cc.Sprite(res.enter_png);
        this.enter.x = cc.winSize.width * 4 / 6;
        this.enter.y = cc.winSize.height * 1 / 8;
        this.enterRect = new cc.Rect(
            this.enter.x - this.enter.width/2,
            this.enter.y - this.enter.height/2,
            this.enter.width,
            this.enter.height
        );
        this.addChild(this.enter);

        // back key
        this.back = new cc.Sprite(res.back_png);
        this.back.x = cc.winSize.width * 2 / 6;
        this.back.y = cc.winSize.height * 1 / 8;
        this.backRect = new cc.Rect(
            this.back.x - this.back.width/2,
            this.back.y - this.back.height/2,
            this.back.width,
            this.back.height
        );

        this.addChild(this.back);

        this.input = new cc.LabelTTF("","", 48);
        this.input.x = cc.winSize.width * 3 / 6;
        this.input.y = cc.winSize.height * 6 / 8;
        this.addChild(this.input);

        this.mesg = new cc.LabelTTF("輸入三位數","", 48);
        this.mesg.x = cc.winSize.width * 3 / 6;
        this.mesg.y = cc.winSize.height * 5 / 8;
        this.addChild(this.mesg);


    },

    setUpmymouse: function(layer){
        if ('mouse' in cc.sys.capabilities){
            // define listener object
            var mouseListener = {
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    var x = event.getLocationX();
                    var y = event.getLocationY();
                    var point = new cc.Point(x,y);

                    if (layer.guess.length>0){
                        // back
                        if (cc.rectContainsPoint(layer.backRect, point)){
                            layer.guess =
                                layer.guess.substr(0,layer.guess.length-1);
                            layer.input.setString(layer.guess);
                            return;
                        }

                    }

                    if (layer.guess.length == 3){
                        // enter
                        if (cc.rectContainsPoint(layer.enterRect, point)){
                            cc.log("==> " + layer.guess);
                        }
                    }else{
                        // number
                        for (var i=0; i<layer.rects.length; i++){
                            if (cc.rectContainsPoint(layer.rects[i],point)){
                                console.log("press: " + i);
                                layer.guess += i;
                                layer.input.setString(layer.guess);

                                break;
                            }
                        }
                    }





                },
            };
            cc.eventManager.addListener(mouseListener,this);
        }
    },

    update: function(){
        var title = this.getChildByName("mytitle");
        if (title.x + title.width/2>= cc.winSize.width ||
            title.x - title.width/2<=0){
            this.dx *= -1;
        }
        title.x += this.dx;
    }

});

var guess02Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new guess02Layer();
        this.addChild(layer);
    }
});

function myLottery() {
    var n = new Array(49);
    for (var i=0; i<n.length; i++) n[i] = i+1;
    n = shuffle(n);
    var r = '';
    for (var i=0; i<6; i++){
        r += n[i] + ",";
    }
    return r;
}

function createAnswer(d){
    var n = [0,1,2,3,4,5,6,7,8,9];
    n = shuffle(n);
    var r = '';
    for (var i=0; i<d; i++){
        r += n[i];
    }
    return r;
}

function shuffle(a){
    var i,j,x;

    for (i=a.length; i; i--){
        j = parseInt(Math.random()*i);  // 0-9
        x = a[i-1];
        a[i-1] = a[j];
        a[j] = x;
    }
    return a;
}
