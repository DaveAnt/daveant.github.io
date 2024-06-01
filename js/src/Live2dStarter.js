var thisRef = this;

window.onerror = function(msg, url, line, col, error) {
    var errmsg = "file:" + url + "<br>line:" + line + " " + msg;
    l2dError(errmsg);
}

function liveAwake()
{
    this.platform = window.navigator.platform.toLowerCase();
    
    this.live2DMgr = new LAppLive2DManager();

    this.isDrawStart = false;
    this.isModelShown = true;

    this.gl = null;
    this.canvas = null;
    
    this.dragMgr = null; /*new L2DTargetPoint();*/ 
    this.viewMatrix = null; /*new L2DViewMatrix();*/
    this.projMatrix = null; /*new L2DMatrix44()*/
    this.deviceToScreen = null; /*new L2DMatrix44();*/
    
    this.drag = false; 
    this.oldLen = 0;    
    
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    
    init_canvas("glCanvas");
    start_up();
}


function init_canvas(canvasId)
{
    if(this.canvas == null)
    {
        this.canvas = document.createElement('canvas');
        this.canvas.height = 500;
        this.canvas.width = 300; 
        this.canvas.setAttribute('style', 'position:fixed;right:0px;bottom:-20px;z-index: 99;'); 
        this.canvas.setAttribute('id', canvasId);
        document.getElementsByTagName('body')[0].appendChild(this.canvas);
    }
    else
    {
        this.canvas.height = 500;
        this.canvas.width = 300; 
    }

    var passiveSupported = true;
    if(this.canvas.addEventListener) {
        this.canvas.addEventListener("mousewheel", mouseEvent, passiveSupported? { passive: true } : false);
        this.canvas.addEventListener("click", mouseEvent, false);
        
        this.canvas.addEventListener("mousedown", mouseEvent, false);
        this.canvas.addEventListener("mousemove", mouseEvent, false);
        
        this.canvas.addEventListener("mouseup", mouseEvent, false);
        this.canvas.addEventListener("mouseout", mouseEvent, false);
                    
        this.canvas.addEventListener("touchstart", touchEvent, passiveSupported? { passive: true } : false);
        this.canvas.addEventListener("touchend", touchEvent, false);
        this.canvas.addEventListener("touchmove", touchEvent, passiveSupported? { passive: true } : false);
    }
}


function start_up()
{    
    
    var width = this.canvas.width;
    var height = this.canvas.height;
    
    this.dragMgr = new L2DTargetPoint();

    
    var ratio = height / width;
    var left = LAppDefine.VIEW_LOGICAL_LEFT;
    var right = LAppDefine.VIEW_LOGICAL_RIGHT;
    var bottom = -ratio;
    var top = ratio;

    this.viewMatrix = new L2DViewMatrix();

    
    this.viewMatrix.setScreenRect(left, right, bottom, top);
    
    
    this.viewMatrix.setMaxScreenRect(LAppDefine.VIEW_LOGICAL_MAX_LEFT,
                                     LAppDefine.VIEW_LOGICAL_MAX_RIGHT,
                                     LAppDefine.VIEW_LOGICAL_MAX_BOTTOM,
                                     LAppDefine.VIEW_LOGICAL_MAX_TOP); 

    this.viewMatrix.setMaxScale(LAppDefine.VIEW_MAX_SCALE);
    this.viewMatrix.setMinScale(LAppDefine.VIEW_MIN_SCALE);

    this.projMatrix = new L2DMatrix44();
    this.projMatrix.multScale(1, (width / height));

    
    this.deviceToScreen = new L2DMatrix44();
    this.deviceToScreen.multTranslate(-width / 2.0, -height / 2.0);
    this.deviceToScreen.multScale(2 / width, -2 / width);
    
    
    
    this.gl = getWebGLContext();
    if (!this.gl) {
        l2dError("Failed to create WebGL context.");
        return;
    }

    
    this.gl.clearColor(0.0, 0.0, 0.0, 0.0);

    this.live2DMgr.changeModel(this.gl);
    
    startDraw();
}

function startDraw() {
    if(!this.isDrawStart) {
        this.isDrawStart = true;
        (function tick() {
                if(this.isModelShown)
                {
                    draw();
                    var requestAnimationFrame = 
                        window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame || 
                        window.msRequestAnimationFrame;
                    
                    requestAnimationFrame(tick ,this.canvas);      
                }
                     
        })();
    }
}


function draw()
{
    MatrixStack.reset();
    MatrixStack.loadIdentity();
    
    this.dragMgr.update(); 
    this.live2DMgr.setDrag(this.dragMgr.getX(), this.dragMgr.getY());
    
    
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    
    MatrixStack.multMatrix(projMatrix.getArray());
    MatrixStack.multMatrix(viewMatrix.getArray());
    MatrixStack.push();
    
    for (var i = 0; i < this.live2DMgr.numModels(); i++)
    {
        var model = this.live2DMgr.getModel(i);

        if(model == null) return;
        
        if (model.initialized && !model.updating)
        {
            model.update();
            model.draw(this.gl);
            
            if (!this.isModelShown && i == this.live2DMgr.numModels()-1) {
                this.isModelShown = !this.isModelShown;
            }
        }
    }
    
    MatrixStack.pop();
}

function hideModel()
{
    this.isModelShown = false;
    this.canvas.height = 0;
    this.canvas.width = 0; 
}

function changeModel()
{    
    switch (this.live2DMgr.modelIdx)
    {
        case 0:
            showMessage('主人一直和我说他<span style="color:#0099cc;">唱歌</span>比我厉害,但我发现他是吹牛的...', 4000, true);
            this.live2DMgr.modelIdx = 1;
            break;
        case 1:
            showMessage('我和主人每天会聊点编程、电影、游戏相关的东西,不知道以后他能不能找到意中人聊天,而不需要我了。', 4000, true);    
            this.live2DMgr.modelIdx = 2;
            break;
        case 2:
        case 3:
        case 4:
            showMessage('也许我出身无法改变,但是灵魂属于我自己,我的命运由我自己主宰,遇到事情绝不坐以待毙。', 4000, true);    
            this.live2DMgr.modelIdx = 5;
            break;
        case 5:
        case 6:
        case 7: 
            showMessage('什么时候你们可以帮我问一下我的老大喜欢吃？我有点不好意思问呢。', 2200, true);
            this.live2DMgr.modelIdx = 8;
            break;
        case 8:
        case 9:
        case 10:
            showMessage('老大说了让我好好招待你们,但是我只会打架~~~~', 2200, true);
            this.live2DMgr.modelIdx = 11;
            break;
        case 11:
        case 12:
        case 13:
        case 14: 
            showMessage('御姐？请叫我女王大人,网站形象代言人就是我~~~', 2200, true);
            this.live2DMgr.modelIdx = 15;
            break;
        case 15:
        case 16:
            showMessage('你们很可疑！过来和博主大大讨论技术的,还是过来看美女的~~~', 2200, true);
            this.live2DMgr.modelIdx = 17;
            break;
        case 17:
        case 18:
        case 19:
            showMessage('小埋我来了,其他人全部给我闪开啊~~~~', 2200, true);
            this.live2DMgr.modelIdx = 0;
            break;
        default:
            showMessage('警报~警报~出现异常BUG了', 2200, true);
            this.live2DMgr.modelIdx = 0;
            break;
    }

    this.live2DMgr.modelName = ModelsDefine[this.live2DMgr.modelIdx];
    this.live2DMgr.changeModel(this.gl);
    localStorage.setItem("modelIdx",this.live2DMgr.modelIdx+"");
}

function changeStyle()
{  
    switch (this.live2DMgr.modelIdx)
    {
        case 0:
            showMessage('😭主人没有给小埋我买新衣服,哭了~~~,如果看到明了,赶紧和他说一下我要买衣服。', 2400, true);
            break;
        case 1:
            showMessage('你说换就换？首先经过我主人的同意,再来问问我😡', 2400, true);
            break;
        case 2:
            showMessage('嘿！我的新衣服好看嘛~~~', 2400, true);
            this.live2DMgr.modelIdx = 3;
            break;
        case 3:
            showMessage('这件衣服是我比较喜欢的,你呢？', 2400, true);
            this.live2DMgr.modelIdx = 4;
            break;
        case 4:
            showMessage('学会长大,学会承受,学会哭过之后,还可以微笑地拥抱爸爸妈妈。', 2400, true);
            this.live2DMgr.modelIdx = 2;
            break;
        case 5:
            showMessage('谁都无法成为谁的替代。所以心痛,总是伴随着离别的人。', 2400, true);
            this.live2DMgr.modelIdx = 6;
            break;
        case 6:
            showMessage('夏天适合泳装,就决定是它了~~~', 2400, true);
            this.live2DMgr.modelIdx = 7;
            break;
        case 7:
            showMessage('爱上他,不如先习惯他！', 2400, true);
            this.live2DMgr.modelIdx = 5;
            break;
        case 8:
            showMessage('只有阳光而无阴影,只有欢乐而无痛苦,那就不是人生。', 2400, true);
            this.live2DMgr.modelIdx = 9;
            break;
        case 9:
            showMessage('花开莫须折,自有暗香来。刚刚初音未来和我说的', 2400, true);
            this.live2DMgr.modelIdx = 10;
            break;
        case 10:
            showMessage('如果樱花掉落的速度是每秒五厘米，那么两颗心要多久才能靠近？', 2400, true);
            this.live2DMgr.modelIdx = 8;
            break;
        case 11:
            showMessage('隐约雷鸣,阴霾天空,但盼风雨来,能留你在此。隐约雷鸣,阴霾天空,即使无风雨,我亦留此地。', 2400, true);
            this.live2DMgr.modelIdx = 12;
            break;
        case 12:
            showMessage('不管前方的路有多苦,只要走的方向正确,不管多么崎岖不平,都比站在原地更接近幸福。', 2400, true);
            this.live2DMgr.modelIdx = 13;
            break;
        case 13:
            showMessage('如果全世界都背叛你,我会站在你身后背叛全世界。', 2400, true);
            this.live2DMgr.modelIdx = 14;
            break;
        case 14:
            showMessage('幸福感就如沉积在悲哀之河底下,隐隐发光的金砂。', 2400, true);
            this.live2DMgr.modelIdx = 11;
            break;
        case 15:
            showMessage('我快要死了,但是还能成为你的眼睛继续看到未来————', 2400, true);
            this.live2DMgr.modelIdx = 16;
            break;
        case 16:
            showMessage('当你想做一件事,却无能为力的时候,是最痛苦的。', 2400, true);
            this.live2DMgr.modelIdx = 15;
            break;
        case 17:
            showMessage('就算看不到身影,就算离得再远。我永远都看着你,永远都守护着你！', 2400, true);
            this.live2DMgr.modelIdx = 18;
            break;
        case 18:
            showMessage('我们都在梦中,一个叫青春的梦里。梦总有一天会醒来,而回忆会一直闪烁。', 2400, true);
            this.live2DMgr.modelIdx = 19;
            break;
        case 19:
            showMessage('快乐总会有终结的时候,教室便是这样一个地方。', 2400, true);
            this.live2DMgr.modelIdx = 17;
            break;
        default:
            showMessage('虽然不知道你是这么点出来的,但是已经被我修复好了~', 2400, true);
            this.live2DMgr.modelIdx = 1;
            break;
    }
    
    this.live2DMgr.modelName = ModelsDefine[this.live2DMgr.modelIdx];
    this.live2DMgr.changeModel(this.gl);
    localStorage.setItem("modelIdx",this.live2DMgr.modelIdx+"");
}

function modelScaling(scale)
{   
    var isMaxScale = thisRef.viewMatrix.isMaxScale();
    var isMinScale = thisRef.viewMatrix.isMinScale();
    
    thisRef.viewMatrix.adjustScale(0, 0, scale);

    
    if (!isMaxScale)
    {
        if (thisRef.viewMatrix.isMaxScale())
        {
            thisRef.live2DMgr.maxScaleEvent();
        }
    }
    
    if (!isMinScale)
    {
        if (thisRef.viewMatrix.isMinScale())
        {
            thisRef.live2DMgr.minScaleEvent();
        }
    }
}

function modelTurnHead(event)
{
    thisRef.drag = true;
    
    var rect = event.target.getBoundingClientRect();
    
    var sx = transformScreenX(event.clientX - rect.left);
    var sy = transformScreenY(event.clientY - rect.top);
    var vx = transformViewX(event.clientX - rect.left);
    var vy = transformViewY(event.clientY - rect.top);
    
    if (LAppDefine.DEBUG_MOUSE_LOG)
        l2dLog("onMouseDown device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");

    thisRef.lastMouseX = sx;
    thisRef.lastMouseY = sy;

    //thisRef.dragMgr.setPoint(vx, vy);    
    thisRef.live2DMgr.tapEvent(vx, vy);
}

function followPointer(event)
{   
    thisRef.drag = true;//新添加 => 让其有效
    var rect = event.target.getBoundingClientRect();
    
    var sx = transformScreenX(event.clientX - rect.left);
    var sy = transformScreenY(event.clientY - rect.top);
    var vx = transformViewX(event.clientX - rect.left);
    var vy = transformViewY(event.clientY - rect.top);
    
    if (LAppDefine.DEBUG_MOUSE_LOG)
        l2dLog("onMouseMove device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");

    if (thisRef.drag)
    {
        thisRef.lastMouseX = sx;
        thisRef.lastMouseY = sy;

        thisRef.dragMgr.setPoint(vx, vy); 
    }
}

function lookFront()
{   
    if (thisRef.drag)
    {
        thisRef.drag = false;
    }

    thisRef.dragMgr.setPoint(0, 0);
}

function mouseEvent(e)
{
    if (e.type == "mousewheel") {
        if (e.clientX < 0 || thisRef.canvas.clientWidth < e.clientX || 
        e.clientY < 0 || thisRef.canvas.clientHeight < e.clientY)
        {
            return;
        }     
        if (e.wheelDelta > 0) modelScaling(1.1); 
        else modelScaling(0.9);     
    } 
    else if (e.type == "mousedown") {      
        if("button" in e && e.button != 0) return;        
        modelTurnHead(e);      
    } 
    else if (e.type == "mousemove") {      
        followPointer(e);        
    } 
    else if (e.type == "mouseout") {        
        lookFront();     
    }
}

function touchEvent(e)
{
    e.preventDefault();
    
    var touch = e.touches[0];
    
    if (e.type == "touchstart") {
        if (e.touches.length == 1) modelTurnHead(touch);
        // onClick(touch);
        
    } else if (e.type == "touchmove") {
        followPointer(touch);
        
        if (e.touches.length == 2) {
            var touch1 = e.touches[0];
            var touch2 = e.touches[1];
            
            var len = Math.pow(touch1.pageX - touch2.pageX, 2) + Math.pow(touch1.pageY - touch2.pageY, 2);
            if (thisRef.oldLen - len < 0) modelScaling(1.025); 
            else modelScaling(0.975); 
            
            thisRef.oldLen = len;
        }
        
    } else if (e.type == "touchend") {
        lookFront();
    }
}

function transformViewX(deviceX)
{
    var screenX = this.deviceToScreen.transformX(deviceX); 
    return viewMatrix.invertTransformX(screenX); 
}

function transformViewY(deviceY)
{
    var screenY = this.deviceToScreen.transformY(deviceY); 
    return viewMatrix.invertTransformY(screenY); 
}

function transformScreenX(deviceX)
{
    return this.deviceToScreen.transformX(deviceX);
}

function transformScreenY(deviceY)
{
    return this.deviceToScreen.transformY(deviceY);
}

function getWebGLContext()
{
    var NAMES = [ "webgl" , "experimental-webgl" , "webkit-3d" , "moz-webgl"];
    
    for( var i = 0; i < NAMES.length; i++ ){
        try{
            var ctx = this.canvas.getContext(NAMES[i], {premultipliedAlpha : true});
            if(ctx) return ctx;
        } 
        catch(e){}
    }
    return null;
};

function l2dLog(msg) {
    if(!LAppDefine.DEBUG_LOG) return;
    
   
    console.log(msg);
}

function l2dError(msg)
{
    if(!LAppDefine.DEBUG_LOG) return;
    
    l2dLog( "<span style='color:red'>" + msg + "</span>");
    
    console.error(msg);
};