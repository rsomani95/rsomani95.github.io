$(document).ready(function () {
    function CloseNav() {
        $(".choice-collapse").stop().animate({'height': 0},300, function () {
            $('.choice-collapse').removeClass('in').addClass("collapse");
        });
        $(".choice-btn").stop().removeClass('collapsed');
    }

    $('html').click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".choice-collapse").hasClass("choice-collapse in");
        if (_opened === true && !clickover.hasClass("choice-btn")) {
             $('.choice-btn').toggleClass('highlight');
            CloseNav();
        }

    });

    $('.choice-btn').click(function() {
      $(this).toggleClass('highlight').blur();
    });
});
