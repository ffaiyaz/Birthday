$(window).load(function(){
    $('.loading').fadeOut('fast');
    $('.container').fadeIn('fast');
    adjustLayout(); // Initial screen calculation
});

$('document').ready(function(){
    var vw, vh;

    // Master function for real-time vertical & horizontal responsiveness
    function adjustLayout() {
        vw = $(window).width();
        vh = $(window).height();

        // 1. Dynamic Vertical Centering & Scaling for the Cake
        var cakeHeight = 280;
        var cakeTop = Math.max(20, (vh - cakeHeight) / 2 - 30);
        
        if (vw < 600 || vh < 600) {
            $('.cake').css({
                'transform': 'scale(0.75)',
                'transform-origin': 'center center'
            });
        } else {
            $('.cake').css({
                'transform': 'scale(1)',
                'transform-origin': 'center center'
            });
        }
        
        $('.cake-cover').css({
            'position': 'relative',
            'top': cakeTop + 'px'
        });

        // 2. Dynamic Vertical & Horizontal Centering for the Story Message
        if ($('.message').is(':visible')) {
            var msgHeight = $('.message').outerHeight() || 220;
            var msgTop = Math.max(20, (vh - msgHeight) / 2 - 20);
            
            $('.message').css({
                'position': 'absolute',
                'left': '50%',
                'top': msgTop + 'px',
                'transform': 'translateX(-50%)',
                'width': (vw < 600 ? '90%' : '500px'),
                'max-height': '70vh',
                'overflow-y': 'auto'
            });
        }

        // 3. Keep balloons dynamically aligned if in line-up state
        if ($('#b11').length > 0 || $('#b1').length > 0) {
            arrangeBalloons();
        }
    }

    // Dynamically calculate balloon positions relative to current screen dimensions
    function arrangeBalloons() {
        var currentVw = $(window).width() / 2;
        var currentVh = $(window).height();
        var spacing = Math.min(75, $(window).width() / 8);
        var balloonTop = Math.max(50, currentVh * 0.15); // Dynamic vertical position

        var b1 = $('#b11').length ? '#b11' : '#b1';
        var b2 = $('#b22').length ? '#b22' : '#b2';
        var b3 = $('#b33').length ? '#b33' : '#b3';
        var b4 = $('#b44').length ? '#b44' : '#b4';
        var b5 = $('#b55').length ? '#b55' : '#b5';
        var b6 = $('#b66').length ? '#b66' : '#b6';
        var b7 = $('#b77').length ? '#b77' : '#b7';

        $(b1).animate({top: balloonTop, left: currentVw - (spacing * 3)}, 500);
        $(b2).animate({top: balloonTop, left: currentVw - (spacing * 2)}, 500);
        $(b3).animate({top: balloonTop, left: currentVw - spacing}, 500);
        $(b4).animate({top: balloonTop, left: currentVw - 15}, 500);
        $(b5).animate({top: balloonTop, left: currentVw + spacing - 15}, 500);
        $(b6).animate({top: balloonTop, left: currentVw + (spacing * 2) - 15}, 500);
        $(b7).animate({top: balloonTop, left: currentVw + (spacing * 3) - 15}, 500);
    }

    // Recalculate layout on screen resize or orientation change
    $(window).resize(function(){
        adjustLayout();
    });

    // Dynamic horizontal and vertical limits for flying balloons
    function getRandomLeft() {
        var screenWidth = $(window).width();
        return Math.max(10, (screenWidth - 80) * Math.random());
    }

    function getRandomTop() {
        var screenHeight = $(window).height();
        // Restricts balloon height between 10% and 70% of screen height dynamically
        return Math.max(screenHeight * 0.1, (screenHeight * 0.65) * Math.random());
    }

    function loopOne() { $('#b1').animate({left: getRandomLeft(), bottom: getRandomTop()}, 10000, loopOne); }
    function loopTwo() { $('#b2').animate({left: getRandomLeft(), bottom: getRandomTop()}, 10000, loopTwo); }
    function loopThree() { $('#b3').animate({left: getRandomLeft(), bottom: getRandomTop()}, 10000, loopThree); }
    function loopFour() { $('#b4').animate({left: getRandomLeft(), bottom: getRandomTop()}, 10000, loopFour); }
    function loopFive() { $('#b5').animate({left: getRandomLeft(), bottom: getRandomTop()}, 10000, loopFive); }
    function loopSix() { $('#b6').animate({left: getRandomLeft(), bottom: getRandomTop()}, 10000, loopSix); }
    function loopSeven() { $('#b7').animate({left: getRandomLeft(), bottom: getRandomTop()}, 10000, loopSeven); }

    // 1. Turn On Lights
    $('#turn_on').click(function(){
        $('#bulb_yellow').addClass('bulb-glow-yellow');
        $('#bulb_red').addClass('bulb-glow-red');
        $('#bulb_blue').addClass('bulb-glow-blue');
        $('#bulb_green').addClass('bulb-glow-green');
        $('#bulb_pink').addClass('bulb-glow-pink');
        $('#bulb_orange').addClass('bulb-glow-orange');
        $('body').addClass('peach');
        
        $(this).fadeOut('slow').delay(5000).promise().done(function(){
            $('#play').fadeIn('slow');
        });
    });

    // 2. Play Music
    $('#play').click(function(){
        var audio = $('.song')[0];
        if (audio) {
            audio.play();
        }
        
        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
        $('#bulb_red').addClass('bulb-glow-red-after');
        $('#bulb_blue').addClass('bulb-glow-blue-after');
        $('#bulb_green').addClass('bulb-glow-green-after');
        $('#bulb_pink').addClass('bulb-glow-pink-after');
        $('#bulb_orange').addClass('bulb-glow-orange-after');
        
        $('body').css('background-color', '#3B0B12');
        $('body').addClass('peach-after');
        
        $(this).fadeOut('slow').delay(6000).promise().done(function(){
            $('#bannar_coming').fadeIn('slow');
        });
    });

    // 3. Decorate Banner
    $('#bannar_coming').click(function(){
        $('.bannar').addClass('bannar-come');
        $(this).fadeOut('slow').delay(6000).promise().done(function(){
            $('#balloons_flying').fadeIn('slow');
        });
    });

    // 4. Fly Balloons
    $('#balloons_flying').click(function(){
        $('.balloon-border').animate({top: -500}, 8000);
        $('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
        $('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
        
        loopOne();
        loopTwo();
        loopThree();
        loopFour();
        loopFive();
        loopSix();
        loopSeven();
        
        $(this).fadeOut('slow').delay(5000).promise().done(function(){
            $('#cake_fadein').fadeIn('slow');
        });
    }); 

    // 5. Fade In Cake
    $('#cake_fadein').click(function(){
        adjustLayout();
        $('.cake').fadeIn('slow');
        $(this).fadeOut('slow').delay(3000).promise().done(function(){
            $('#light_candle').fadeIn('slow');
        });
    });

    // 6. Light Candle
    $('#light_candle').click(function(){
        $('.fuego').fadeIn('slow');
        $(this).fadeOut('slow').promise().done(function(){
            $('#wish_message').fadeIn('slow');
        });
    });

    // 7. Align Happy Birthday Balloons
    $('#wish_message').click(function(){
        $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
        $('#b1').attr('id','b11');
        $('#b2').attr('id','b22');
        $('#b3').attr('id','b33');
        $('#b4').attr('id','b44');
        $('#b5').attr('id','b55');
        $('#b6').attr('id','b66');
        $('#b7').attr('id','b77');
        
        arrangeBalloons();

        $('.balloons').css('opacity', '0.9');
        $('.balloons h2').fadeIn(3000);
        
        $(this).fadeOut('slow').delay(3000).promise().done(function(){
            $('#story').fadeIn('slow');
        });
    });
    
    // 8. Story Message Sequence
    $('#story').click(function(){
        $(this).fadeOut('slow');
        $('.cake').fadeOut('fast').promise().done(function(){
            $('.message').fadeIn('slow', function(){
                adjustLayout();
            });
        });
        
        function msgLoop(i) {
            $("p:nth-child(" + i + ")").fadeOut('slow').delay(800).promise().done(function(){
                i = i + 1;
                $("p:nth-child(" + i + ")").fadeIn('slow').delay(1000);
                adjustLayout(); // Adjust vertical position as text lines change
                
                if (i >= 50) {
                    $("p:nth-child(49)").fadeOut('slow').promise().done(function () {
                        $('.cake').fadeIn('fast');
                        adjustLayout();
                    });
                } else {
                    msgLoop(i);
                }       
            });
        }
        
        msgLoop(0);
    });
});
