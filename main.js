(function() {
    // image slideshow
    var slides = [
        "https://i0.wp.com/wheatlandwizards.org/wp-content/uploads/2021/07/308A6286-1-scaled.jpg?fit=2560%2C1111&ssl=1",
        "https://simplifaster.com/wp-content/uploads/2019/05/daryrl-2.jpg",
        "https://simplifaster.com/wp-content/uploads/2019/05/Daryyl-Wong-Court.jpg",
        "https://simplifaster.com/wp-content/uploads/2019/05/Darryl-Wong-Action.jpg"
    ];

    var current = 0;
    var timer = null;
    var width = $("#slideshow").width() + 16
    var count = slides.length;
    var last = count - 1;

    function createSlides() {
        var html = "<div id='slide-images'>";        
        for (var i = 0; i < count; i++) {
            var x = i == count - 1 ? -width: width * i;
            var cls = i == 0 ? " active" : "";
            html += '<div style="transform:translate3d(' + x + 'px, 0, 0)" id="slide-' + i + '" class="slide' 
                + cls + '" onclick="slideTo(' + i + ')"><div class="slide-image" style="background-image:url(' + slides[i] 
                + ')"></div></div>';
        }
        html += '</div><div class="dots">';
        for (var i = 0; i < count; i++) {
            var cls = i == 0 ? " active" : "";
            html += '<div id="dot-' + i + '" class="dot' + cls + '" onclick="slideTo(' + i + ')"></div>';
        }
        html += '</div>';
        $("#slideshow").html(html);

        timer = setTimeout(next, 5000);
    }

    function next() {
        timer != null && clearTimeout(timer);
        timer = setTimeout(function() {
            slideTo(current == last ? 0 : current + 1);
        }, 5000);        
    }

    window.onresize = function() {
        setTimeout(function() {
            for (var i = 0; i < count; i++) {
                var x = i == count - 1 ? -width: width * i;
                $("#slide-" + last).animate({transform: 'translate3d(' + x + 'px, 0, 0)'}, 0);
            }
            slideTo(0);
        }, 0);        
    };

    window.slideTo = function(index) {
        if (index == current) {
            return;
        }

        $(".slide").removeClass("active");
        $("#slide-" + index).addClass("active");

        $(".dot").removeClass("active");
        $("#dot-" + index).addClass("active");

        if (index == 0 && current == last) {
            $("#slide-images").animate({transform: "translate3d(-" + (last + 1) * width + "px, 0, 0)"}, 300);
        } else if (index == last && current == 0) {
            $("#slide-images").animate({transform: "translate3d(" + width + "px, 0, 0)"}, 300);
        } else {
            $("#slide-images").animate({transform: "translate3d(-" + index * width + "px, 0, 0)"}, 300);
        }

        setTimeout(function() {
            if (index == 0) {
                $("#slide-" + last).animate({transform: "translate3d(-" + width  + "px, 0, 0)"}, 0);
                $("#slide-images").animate({transform: "translate3d(0, 0, 0)"}, 0);
            } else {            
                $("#slide-" + last).animate({transform: "translate3d(" + last * width + "px, 0, 0)"}, 0);
                $("#slide-images").animate({transform: "translate3d(-" + index * width + "px, 0, 0)"}, 0);
            }

            if (index == last) {
                $("#slide-0").animate({transform: "translate3d(" + (last + 1) * width + "px, 0, 0)"}, 0);
            } else {
                $("#slide-0").animate({transform: "translate3d(0, 0, 0)"}, 0);
            }
        }, 300);

        current = index;        
        next();        
    };

    createSlides();

    window.toggleLinks = function() {
        var links = document.getElementById("links");
        links.style.display = links.style.display != "block" ? "block" : "none";
      }
})();