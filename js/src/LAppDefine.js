var LAppDefine = {
    
    
    DEBUG_LOG : false,
    DEBUG_MOUSE_LOG : false, 
    // DEBUG_DRAW_HIT_AREA : false, 
    // DEBUG_DRAW_ALPHA_MODEL : false,  
    VIEW_MAX_SCALE : 2,
    VIEW_MIN_SCALE : 0.8,

    VIEW_LOGICAL_LEFT : -1,
    VIEW_LOGICAL_RIGHT : 1,

    VIEW_LOGICAL_MAX_LEFT : -2,
    VIEW_LOGICAL_MAX_RIGHT : 2,
    VIEW_LOGICAL_MAX_BOTTOM : -2,
    VIEW_LOGICAL_MAX_TOP : 2,
    
    
    PRIORITY_NONE : 0,
    PRIORITY_IDLE : 1,
    PRIORITY_NORMAL : 2,
    PRIORITY_FORCE : 3,
    
    MOTION_GROUP_IDLE : "idle", 
    MOTION_GROUP_TAP_BODY : "tap_body", 
    MOTION_GROUP_FLICK_HEAD : "flick_head", 
    MOTION_GROUP_PINCH_IN : "pinch_in", 
    MOTION_GROUP_PINCH_OUT : "pinch_out", 
    MOTION_GROUP_SHAKE : "shake", 

    
    HIT_AREA_HEAD : "head",
    HIT_AREA_BODY : "body"
    
};
var ModelsDefine = new Array();
ModelsDefine[0] = "live-2d/small_master/index.json";

ModelsDefine[1] = "live-2d/miku/index.json";

ModelsDefine[2] = "live-2d/blanc_normal/index.json";
ModelsDefine[3] = "live-2d/blanc_classic/index.json";
ModelsDefine[4] = "live-2d/blanc_swimwear/index.json";

ModelsDefine[5] = "live-2d/nepgear_normal/index.json";
ModelsDefine[6] = "live-2d/nepgear_extra/index.json";
ModelsDefine[7] = "live-2d/nepgear_swimwear/index.json";

ModelsDefine[8] = "live-2d/neptune_maid/index.json";
ModelsDefine[9] = "live-2d/neptune_santa/index.json";
ModelsDefine[10] = "live-2d/neptune_normal/index.json";

ModelsDefine[11] = "live-2d/noir_normal/index.json";
ModelsDefine[12] = "live-2d/noir_classic/index.json";
ModelsDefine[13] = "live-2d/noir_santa/index.json";
ModelsDefine[14] = "live-2d/noir_swimwear/index.json";

ModelsDefine[15] = "live-2d/vert_normal/index.json";
ModelsDefine[16] = "live-2d/vert_swimwear/index.json";

ModelsDefine[17] = "live-2d/mashiro/ryoufuku.model.json";
ModelsDefine[18] = "live-2d/mashiro/seifuku.model.json";
ModelsDefine[19] = "live-2d/mashiro/shifuku.model.json";