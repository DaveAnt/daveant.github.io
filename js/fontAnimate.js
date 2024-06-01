var a_idx = 0;
jQuery(document).ready(function ($) {
  $("body").click(function (e) {
    var a = new Array("向死而生,背水一战","众将军听令,抬棺死战","愿与将军共图王之霸业","统领江南指日可待","贼将无胆何不早降","待敌动而后发制人","为将者,定当尽忠尽职","黄口竖子,何必上阵送命", "大将军岂可有勇无谋", "继丞相之志,臣竭力而为", "八面威风杀气飘", "为上位者,当至无情","一骑闯天下,何有所惧", "大丈夫当带三尺之剑,立不世之功", "单骑持剑开天门", "继丞相之遗志,讨篡汉之逆贼");
    var $i = $("<span/>").text(a[a_idx]);
    a_idx = (a_idx + 1) % a.length;
    var x = e.pageX,
      y = e.pageY;
    $i.css({
      "z-index": 9999999,
      "top": y - 20,
      "left": x,
      "position": "absolute",
      "font-weight": "bold",
      "color": "#ff0000"
    });
    $("body").append($i);
    $i.animate({
      "top": y - 180,
      "opacity": 0
    }, 1800, function () {
      $i.remove();
    });
  });
});