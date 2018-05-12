

(function ($) {
    $(document).ready(function () {

        $(".videoInfo").attr("readonly", "readonly");

        $("#saveEditButton").hide();
        $("#cancelEditButton").hide();

       

        $(function(){
            url = location.pathname;
            console.log(url)
            if(url == "/"){
                $("#navbar-main").addClass("mainNav")
                $(".topSearch").addClass("mainNavSearch")
            }
        })

        $('.jarallax').jarallax({
            speed: 0.2
        });

        // fade in .navbar
        $(function () {
            $(window).scroll(function () {
                // set distance user needs to scroll before we start fadeIn
                if ($(this).scrollTop() > 500) {
                    $(".navbar-inverse").addClass("navbarcolour");
                } else {

                    $(".navbar-inverse").removeClass("navbarcolour");
                }
            });
        });

    });
}(jQuery));

$("#editButton").click(function(){
    $(".videoInfo").addClass("videoInfoEditable");
    $(".videoInfo").removeAttr("readonly", "readonly");
    $("#editButton").hide();
    $("#saveEditButton").show();
    $("#cancelEditButton").show();

});

$("#cancelEditButton").click(function(){
    $(".videoInfo").removeClass("videoInfoEditable");
    $(".videoInfo").attr("readonly", "readonly");
    $("#editButton").show();
    $("#saveEditButton").hide();
    $("#cancelEditButton").hide();
});


$(function () {
    $('#videoDateTimepicker').datetimepicker();
});
$("#modal_trigger").leanModal({
    top: 100,
    overlay: 0.6,
    closeButton: ".modal_close"
});

$("#modal_trigger").click(function () {
    $(".user_login").show();
});


$("#modal_trigger_buy").leanModal({
    top: 100,
    overlay: 0.6,
    closeButton: ".modal_close"
});


$("#modal_trigger_buy").click(function () {
    $(".buyModal").show();
});

$("#modal_trigger2").leanModal({
    top: 100,
    overlay: 0.6,
    closeButton: ".modal_close"
});
$("#modal_trigger2").click(function () {
    $(".video_map").show();
    map.invalidateSize();
});
$(window).scroll(function () {
    $(".top").css("opacity", 1 - $(window).scrollTop() / 500);
});

$(window).scroll(function () {
    $(".mainNavSearch").css("opacity", 0 + $(window).scrollTop() / 550);
});

$(function () {
    $('#datetimepicker1').datetimepicker();
});
