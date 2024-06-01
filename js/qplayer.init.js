window.q = window.QPlayer;
window.$ = q.$;
$(function () {
    $('#js').val($('#js-code').text());
});
function execute() {
    eval($('#js').val());
}
$.ajax({
  url: 'https://api.i-meto.com/meting/api',
  data: {
      server: 'netease',
      type: 'playlist',
      id: '747595306'
  },
  success: function (data) {
      var length = data.length;
      for (var i = 0; i <length; ++i) {
          var item = data[i];
          item.name = item.title;
          item.artist = item.author;
          item.audio = item.url;
          item.cover = item.pic;
          delete item.title;
          delete item.author;
          delete item.url;
          delete item.pic;
          var lrc = item.lrc;
          delete item.lrc;
          item.lrc = lrc;
      }
      QPlayer.list = data
  }
});