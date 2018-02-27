
$(function () {
                $('#videoDateTimepicker').datetimepicker();
            });
$("#modal_trigger").leanModal({
    top: 100,
    overlay: 0.6,
    closeButton: ".modal_close"
});

$("#modal_trigger").click(function(){
    $(".user_login").show();
});
$("#modal_trigger2").leanModal({
    top: 100,
    overlay: 0.6,
    closeButton: ".modal_close"
});
$("#modal_trigger2").click(function () {
    $(".video_map").show();
});
$(window).scroll(function(){
    $(".top").css("opacity", 1 - $(window).scrollTop() / 500);
  });

$(window).scroll(function(){
    $(".topSearch").css("opacity", 0 + $(window).scrollTop() / 250);
  });


