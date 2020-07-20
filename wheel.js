/*
无缝轮播图
wins 要放入轮播图的窗口
opts json 实现轮播图各种选项
    imgs 数组 包含轮播图图片数组
    links 数组 图片链接地址
    imgColor Array 图片的颜色，用于全屏显示的颜色拼接
    imgSize 数组 第一个参数代表宽 第二个代表高
    btnColor String 按钮的颜色
    btnActive String 获得焦点的按钮颜色
    btnPos 数组 第一个参数代表x位置 第二个代表y位置
*/

function wheel(wins, opts, runOpts) {
    //数据初始化
    var wins = document.querySelector(wins);
    if (!(wins && wins.nodeType == 1)) {
        console.error("窗口元素not find");
        return;
    }
    //图片地址添加一个
    opts.imgs.push(opts.imgs[0]);
    //链接地址添加一个
    opts.links.push(opts.links[0]);
    //图片颜色添加一个
    opts.imgColor.push(opts.imgColor[0]);
    
    var imgLength = opts.imgs.length;
    if (imgLength == 0) {
        console.error("没有传入相应的轮播内容");
        return;
    }

    var imgSize = opts.imgSize;
    if (!(imgSize instanceof Array)) {
        console.error("请传入合法尺寸类型");
    }

    if (imgSize.length == 0) {
        imgSize[0] = document.documentElement.clientWidth;
        imgSize[1] = 400;
    }

    if (imgSize.some(function (val) {
        return val = 0;
    })) {
        for (var i = 0; i < imgSize.length; i++) {
            if (imgSize[i] == 0) {
                imgSize[i] = 500;
            }
        }
    }
    //设置按钮
    var btnColor = opts.btnColor || "green";
    var btnActive = opts.btnActive || "red";
    var btnPos = opts.btnPos || ["center", "20"];

    var run0pts = runOpts||{};
    //图片轮播时间
    var time=0;
    if(runOpts.time){
        time=runOpts.time*1000;
    }else{
        time=5000;
    }
    //每张图片过渡时间
    var eachTime=0;
    if(runOpts.eachTime){
        eachTime=runOpts.eachTime*1000;
    }else{
        eachTime=500;
    }
    //图片轮播方式
    var runStyle=null;
    if(runOpts.runStyle=="linear"||run0pts.runStyle){
        runStyle=Tween.linear;
    }else if(run0pts.runStyle=="in"){
        runStyle=Tween.easein;
    }else if(run0pts.runStyle=="out"){
        runStyle=Tween.easeout;
    }

    //创建HTML结构和样式
    //1.win样式
    wins.style.cssText = "width:100%;height:" + imgSize[1] + "px;overflow:hidden;position:relative;";
    //2.添加容器
    var box = document.createElement("div");
    box.style.cssText = "width:" + imgLength * 100 + "%;height:100%;"
    wins.appendChild(box);
    //3.创建每一个轮播图
    for (var i = 0; i < imgLength; i++) {
        var divList = document.createElement("div");
        divList.style.cssText = `float:left; width:${100/imgLength}%;
        height: 100%;background:${opts.imgColor[i]}`;
        
        var link = document.createElement("a");
        link.href = opts.links[i];
        link.style.cssText = "width:" + imgSize[0] + "px;height:" + imgSize[1] + "px;display:block;margin:auto;background:url(" + opts.imgs[i] + ") no-repeat 0 0"

        divList.appendChild(link);
        box.appendChild(divList);
    }
    //创建按钮
    var btnBox = document.createElement("div");
    btnBox.style.cssText = "width:150px;height:20px;position:absolute;left:0;right:0;margin:auto;bottom:" + btnPos[1] + "px";
    var btns=[];

    for(var i=0;i<imgLength-1;i++){
        if(i==0){
            var bgColor = btnActive;
        }else{
            var bgColor = btnColor;
        }
        var btn=document.createElement("div");
        btn.style.cssText = "width:10px;height:10px;background:" + bgColor + ";border-radius:50%;margin:0 20px;float:left;cursor:pointer;";
        btnBox.appendChild(btn);
        btns.push(btn);
    }
    wins.appendChild(btnBox);

    //实现自动轮播
    //获得窗口大小
    var winW = parseInt(getComputedStyle(wins, null).width);
    var num = 0;
    function move() {
        num++;
        if (num > btns.length - 1) {
            animate(box, {
                "margin-left": -num * winW
            }, eachTime, Tween.Linear, function () {
                
                box.style.marginLeft = 0;
            })
            num = 0;

        } else {
            animate(box, {
                "margin-left": -num * winW
            }, eachTime)
        }
        for (var i = 0; i < btns.length; i++) {
            btns[i].style.background = "black";
        }
        btns[num].style.background = "red";
    }
    var t = setInterval(move, 3000)
    
    //实现点击播放
    for (let i = 0; i < btns.length; i++) {

        btns[i].onclick = function () {
            num = i;
            animate(box,{
                "margin-left": -num * winW
            },eachTime)
            for (var j = 0; j < btns.length; j++) {
                btns[j].style.background = "black";
            }
            btns[num].style.background = "red";
        }
    }

    wins.onmouseover=function(){
        clearInterval(t);
    }
    wins.onmouseout=function(){
        t=setInterval(move,3000);
    }

}

        