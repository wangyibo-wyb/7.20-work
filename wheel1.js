function wheel(wins, opts, runOpts) {
    //参数初始化
    this.init(wins, opts, runOpts);
    //获取窗口
    this.getWin();
    //创建盒子
    this.createBox();
    //创建轮播图列表
    this.createList();
    //创建按钮列表
    this.createBtn();
    //自动轮播
    this.autoRun();
    //点击播放
    //this.clickRun();
}
//防止全局变量污染
wheel.prototype = {
    //参数初始化
    init(wins, opts, runOpts) {
        this.opts = opts;
        this.run0pts = runOpts;

        var wins = document.querySelector(wins);
        if (!(wins && wins.nodeType == 1)) {
            console.error("窗口元素not find");
            return;
        }
        this.wins = wins;
        //图片地址添加一个
        opts.imgs.push(opts.imgs[0]);
        //链接地址添加一个
        opts.links.push(opts.links[0]);
        //图片颜色添加一个
        opts.imgColor.push(opts.imgColor[0]);

        this.imgLength = opts.imgs.length;
        if (this.imgLength == 0) {
            console.error("没有传入相应的轮播内容");
            return;
        }

        this.imgSize = opts.imgSize;
        if (!(this.imgSize instanceof Array)) {
            console.error("请传入合法尺寸类型");
        }

        if (this.imgSize.length == 0) {
            this.imgSize[0] = document.documentElement.clientWidth;
            this.imgSize[1] = 400;
        }

        if (this.imgSize.some(function (val) {
            return val = 0;
        })) {
            for (var i = 0; i < imgSize.length; i++) {
                if (this.imgSize[i] == 0) {
                    this.imgSize[i] = 500;
                }
            }
        }
        //设置按钮
        this.btnColor = opts.btnColor || "green";
        this.btnActive = opts.btnActive || "red";
        this.btnPos = opts.btnPos || ["center", "20"];

        this.run0pts = runOpts || {};
        //图片轮播时间
        this.time = 0;
        if (runOpts.time) {
            this.time = runOpts.time * 1000;
        } else {
            this.time = 5000;
        }
        //每张图片过渡时间
        this.eachTime = 0;
        if (runOpts.eachTime) {
            this.eachTime = runOpts.eachTime * 1000;
        } else {
            this.eachTime = 500;
        }
        //图片轮播方式
        this.runStyle = null;
        if (runOpts.runStyle == "linear" || run0pts.runStyle) {
            this.runStyle = Tween.linear;
        } else if (run0pts.runStyle == "in") {
            this.runStyle = Tween.easein;
        } else if (run0pts.runStyle == "out") {
            this.runStyle = Tween.easeout;
        }
    },
    //获取窗口
    getWin() {
        this.wins.style.cssText = "width:100%;height:" + this.imgSize[1] + "px;overflow:hidden;position:relative;";
    },
    //创建盒子
    createBox() {
        this.box = document.createElement("div");
        this.box.style.cssText = "width:" + this.imgLength * 100 + "%;height:100%;"
        this.wins.appendChild(this.box);
    },
    //创建轮播图列表
    createList() {
        for (var i = 0; i < this.imgLength; i++) {
            var divList = document.createElement("div");
            divList.style.cssText = `float:left; width:${100 / this.imgLength}%;
            height: 100%;background:${this.opts.imgColor[i]}`;

            var link = document.createElement("a");
            link.href = this.opts.links[i];
            link.style.cssText = "width:" + this.imgSize[0] + "px;height:" + this.imgSize[1] + "px;display:block;margin:auto;background:url(" + this.opts.imgs[i] + ") no-repeat 0 0"

            divList.appendChild(link);
            this.box.appendChild(divList);
        }
    },
    //创建按钮列表
    createBtn() {
        var btnBox = document.createElement("div");
        btnBox.style.cssText = "width:150px;height:20px;position:absolute;left:0;right:0;margin:auto;bottom:" + this.btnPos[1] + "px";
        this.btns = [];

        for (var i = 0; i < this.imgLength - 1; i++) {
            if (i == 0) {
                var bgColor = this.btnActive;
            } else {
                var bgColor = this.btnColor;
            }
            var btn = document.createElement("div");
            btn.style.cssText = "width:10px;height:10px;background:" + bgColor + ";border-radius:50%;margin:0 20px;float:left;cursor:pointer;";
            btnBox.appendChild(btn);
            this.btns.push(btn);
        }
        this.wins.appendChild(btnBox);
    },
    //自动轮播
    autoRun() {
        var winW = parseInt(getComputedStyle(this.wins, null).width);
        num = 0;
        function move() {
            num++;
            if (num > this.imgLength-2) {
                animate(this.box, {
                    "margin-left": -num * winW
                }, this.eachTime, Tween.Linear, function () {

                    this.box.style.marginLeft = 0;
                })
                num = 0;

            } else {
                animate(this.box, {
                    "margin-left": -num * winW
                }, this.eachTime)
            }
            for (var i = 0; i < this.imglength-1; i++) {
                this.btns[i].style.background = "black";
            }
            this.btns[num].style.background = "red";
        }
        var t = setInterval(move, 3000)

        this.wins.onmouseover=function(){
            clearInterval(t);
        }
        this.wins.onmouseout=function(){
            t=setInterval(move,3000);
        }
    },
    //点击播放
    clickRun() {
        for (let i = 0; i < this.imgslength-1; i++) {

            this.btns[i].onclick = function () {
                num = i;
                animate(this.box, {
                    "margin-left": -num * winW
                }, this.eachTime)
                for (var j = 0; j < btns.length; j++) {
                    this.btns[j].style.background = "black";
                }
                this.btns[num].style.background = "red";
            }
        }
    }
}