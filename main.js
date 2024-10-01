(function() {
    // image slideshow
    var slides = [                
        "https://i.ibb.co/V9h2Df4/Benjamin-Sean-and-Austin-082024.jpg",    
        "https://i.ibb.co/yfvxRDH/Copy-of-18a7350e4575207569591f5914653e03.jpg",
        "https://i.ibb.co/9GW0ggn/Copy-of-Image-20231120234034.jpg",
        "https://i.ibb.co/17xj319/Copy-of-IMG-1080.jpg",
        "https://i.ibb.co/wcHwbnL/Copy-of-IMG-1089.jpg",
        "https://i.ibb.co/XX6C6wn/Copy-of-IMG-1161.jpg",
        "https://i.ibb.co/5xrn8W9/Copy-of-IMG-5676.jpg",
        "https://i.ibb.co/941cg7f/Copy-of-IMG-6274.jpg",
        "https://i.ibb.co/bvDpW6W/Image-20240528160655.jpg",
        "https://i.ibb.co/M6Jm2XJ/Image-20240528160706.jpg",
        "https://i.ibb.co/280Kk8k/IMG-5255.jpg",
        "https://i.ibb.co/XJvp7Ds/Owen-and-Isaac-082024.jpg",
        "https://i.ibb.co/T4M7gL2/Pre-K-card-2024.jpg",
        "https://i.ibb.co/y6sbNBR/28c57756c2565b287584d59a3b06cf9e.jpg",
        "https://i.ibb.co/dk3WjxT/IMG-1080.jpg",
        "https://i.ibb.co/ngRnnWM/IMG-6280.jpg",        
        "https://i.ibb.co/zPJxxB8/IMG-6286.jpg",
        "https://i.ibb.co/SxbG1k8/IMG-5421.jpg",
        "https://i.ibb.co/gt4xLy9/IMG-1156.jpg"
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
                + cls + '" onclick="slideTo(ß' + i + ')"><div class="slide-image" style="background-image:url(' + slides[i] 
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

