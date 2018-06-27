let guess02Layer = cc.Layer.extend({
    sprite: null,
    nums: new Array(10),
    rects: new Array(10),
    enter: null,
    back: null,
    input: null,
    mesg: null,
    backRect: null,
    enterRect: null,
    guess: "",
    playerGuess:"",
    dx: 4,
    ctor: function () {

        this._super();
        let title = new cc.LabelTTF("Guess Number", "", 48);
        title.x = cc.winSize.width / 2;
        title.y = cc.winSize.height * 7 / 8;
        title.setColor(cc.color(255, 255, 0));
        this.addChild(title, 0, "mytitle");


        this.init();
        this.setUpmymouse(this);
        this.scheduleUpdate();
        return true;
    },
    init: function () {
        let frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.number_plist, res.number_png);

        let px, py;
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

            this.rects[i] = new cc.Rect(
                this.nums[i].x - (this.nums[i].width / 2),
                this.nums[i].y - (this.nums[i].height / 2),
                this.nums[i].width,
                this.nums[i].height
            );


            this.addChild(this.nums[i]);
        }
        //enter
        this.enter = new cc.Sprite(res.enter2_png);
        this.enter.x = cc.winSize.width * 4 / 6;
        this.enter.y = cc.winSize.height / 8;
        this.enterRect = new cc.Rect(
            this.enter.x - (this.enter.width / 2),
            this.enter.y - (this.enter.height / 2),
            this.enter.width,
            this.enter.height
        );
        this.addChild(this.enter);
        //back
        this.back = new cc.Sprite(res.back2_png);
        this.back.x = cc.winSize.width * 2 / 6;
        this.back.y = cc.winSize.height / 8;
        this.backRect = new cc.Rect(
            this.back.x - (this.back.width / 2),
            this.back.y - (this.back.height / 2),
            this.back.width,
            this.back.height
        );
        this.addChild(this.back);
        //input
        this.input = new cc.LabelTTF("", "", 48);
        this.input.x = cc.winSize.width * 3 / 6;
        this.input.y = cc.winSize.height * 6 / 8;
        this.addChild(this.input);
        //mesg
        this.mesg = new cc.LabelTTF("請輸入三位數", "", 48);
        this.mesg.x = cc.winSize.width * 3 / 6;
        this.mesg.y = cc.winSize.height * 5 / 8;
        this.addChild(this.mesg);


    },
    setUpmymouse: function (layer) {
        if ('mouse' in cc.sys.capabilities) {


            let mouseListener = {
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    let x = event.getLocationX();
                    let y = event.getLocationY();
                    let point = new cc.Point(x, y);

                    for (i = 0; i < layer.rects.length; i++) {
                        if (cc.rectContainsPoint(layer.rects[i], point)) {
                            console.log("press " + i);
                            layer.guess += i;
                            layer.input.setString(layer.guess);
                            break;
                        }
                    }
                    if (layer.guess.length > 0) {
                        if (cc.rectContainsPoint(layer.backRect, point)) {
                            layer.guess = layer.guess.slice(0, layer.guess.length - 1);
                            layer.input.setString(layer.guess);
                        }
                    }

                    if (layer.guess.length === 3) {
                        if (cc.rectContainsPoint(layer.enterRect, point)) {
                            layer.playerGuess = layer.guess;
                            // layer.getChildByName("mttitle").setString(layer.playerGuess);
                            console.log(layer.playerGuess);
                            layer.guess = "";
                            layer.input.setString(layer.guess);
                        }
                    }
                }
            };
            cc.eventManager.addListener(mouseListener, this);
        }
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

