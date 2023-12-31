(function() {
    // image slideshow
    var slides = [        
        "https://i.ibb.co/y6sbNBR/28c57756c2565b287584d59a3b06cf9e.jpg",
        "https://i.ibb.co/dk3WjxT/IMG-1080.jpg",
        "https://i.ibb.co/PzCY9zP/35f5c531cf48b232961160e57c1b5606.jpg",
        "https://i.ibb.co/2nZDxYg/IMG-1225.jpg",
        "https://i.ibb.co/ngRnnWM/IMG-6280.jpg",        
        "https://i.ibb.co/fvJMjL8/IMG-6277.jpg",
        "https://i.ibb.co/Fwz2J4V/8f64eac9e840975f89d8828e4d8c7eb8.jpg",
        "https://i.ibb.co/zPJxxB8/IMG-6286.jpg",
        "https://i.ibb.co/SxbG1k8/IMG-5421.jpg",
        "https://i.ibb.co/gt4xLy9/IMG-1156.jpg",
        "https://i.ibb.co/9qkwZtQ/IMG-4897.jpg",
        "https://i.ibb.co/N6VXqtr/Image-20231120231904.jpg",
        "https://i.ibb.co/8zRkJhX/Image-20231120232956.jpg",
        "https://i.ibb.co/KLyXWb9/Image-20231120233035.jpg",
        "https://i.ibb.co/wLS0p7n/Image-20231120233044.jpg",
        "https://i.ibb.co/DQsdKQm/Image-20231120234116.jpg",
        "https://i.ibb.co/tL3Q809/IMG-1621.jpg",
        "https://i.ibb.co/vPWfVQ0/IMG-1624.jpg",    
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

