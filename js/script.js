/*

Style   : MobApp Script JS
Version : 1.0
Author  : Surjith S M
URI     : https://surjithctly.in/

Copyright © All rights Reserved 

*/

$(function() {
    "use strict";

    /*-----------------------------------
     * FIXED  MENU - HEADER
     *-----------------------------------*/
    function menuscroll() {
        var $navmenu = $('.nav-menu');
        if ($(window).scrollTop() > 50) {
            $navmenu.addClass('is-scrolling');
        } else {
            $navmenu.removeClass("is-scrolling");
        }
    }
    function setColor(el){
        return (el.substr(el.length - 1) == "*")?"active":"";
    }
    function loadText(){
        var cel = $("#cell_question");
        var data = ques.val().split('\n');
        cel.find("p").text(data[0]);

        var list = "";

        for (var i = 1 ;i < 5 ;i++) {
            list += "<li class='"+setColor(data[i])+"' ><i class='bi bi-check-circle'></i><i class='bi bi-check-circle "+setColor(data[i])+"'></i>"+data[i].replace("*","")+"</li>";
        };

        cel.find("ul").html(list);
    }

    menuscroll();
    $(window).on('scroll', function() {
        menuscroll();
    });
    /*-----------------------------------
     * NAVBAR CLOSE ON CLICK
     *-----------------------------------*/

    $('.navbar-nav > li:not(.dropdown) > a').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });
    /* 
     * NAVBAR TOGGLE BG
     *-----------------*/
    var siteNav = $('#navbar');
    siteNav.on('show.bs.collapse', function(e) {
        $(this).parents('.nav-menu').addClass('menu-is-open');
    })
    siteNav.on('hide.bs.collapse', function(e) {
        $(this).parents('.nav-menu').removeClass('menu-is-open');
    })

    /*-----------------------------------
     * ONE PAGE SCROLLING
     *-----------------------------------*/
    // Select all links with hashes
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-toggle="tab"]').on('click', function(event) {
        // On-page links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
    /*-----------------------------------
     * OWL CAROUSEL
     *-----------------------------------*/
    var $testimonialsDiv = $('.testimonials');
    if ($testimonialsDiv.length && $.fn.owlCarousel) {
        $testimonialsDiv.owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>']
        });
    }

    var $galleryDiv = $('.img-gallery');
    if ($galleryDiv.length && $.fn.owlCarousel) {
        $galleryDiv.owlCarousel({
            nav: false,
            center: true,
            loop: true,
            autoplay: true,
            dots: true,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3
                }
            }
        });
    }

    var ques = $("#txt_question_value");

    ques.val("Esto es tu pregunta completa que tiene que ir en esta sección");
    ques.val(ques.val() + "\nEsto es tu primera opción a la pregunta");
    ques.val(ques.val() + "\nEsto es tu segunda opción a la pregunta *");
    ques.val(ques.val() + "\nEsto es tu tercera opción a la pregunta");
    ques.val(ques.val() + "\nEsto es tu cuarta opción a la pregunta\n");
    ques.val(ques.val() + "\nAquí irá la siguiente pregunta completa que tiene que ir en esta sección");
    ques.val(ques.val() + "\nEsto es tu primera opción a la pregunta");
    ques.val(ques.val() + "\nEsto es tu segunda opción a la pregunta");
    ques.val(ques.val() + "\nEsto es tu tercera opción a la pregunta *");
    ques.val(ques.val() + "\nEsto es tu cuarta opción a la pregunta");

    loadText();
    ques.change(function(){
        loadText();        
    });

    //contactenos
    var mensaje = $("#mensaje");
    var formContacto = $('#contact-form');

    formContacto.submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: 'contact/contacto.php',
            data: $(this).serialize(),
            success: function(response)
            {
                var jsonData = JSON.parse(response);
                if (jsonData.success == "1")
                {
                    mensaje.removeClass('error');
                    mensaje.addClass('success');
                    mensaje.text("Correo Enviado, te responderemos pronto!").show();
                    formContacto[0].reset();
                }
                else
                {
                    mensaje.addClass('error');
                    mensaje.text("Ocurrió un error en el envio del correo!").show();
                }
           },
           error: function (request, status, error) {
                mensaje.removeClass('success');
                mensaje.addClass('error');
                mensaje.text("Ocurrió un error interno, trabajaremos en ello!").show();
            }
       });
     });

    $('#WAButton').floatingWhatsApp({
        phone: '+51 975944898', //WhatsApp Business phone number International format-
        //Get it with Toky at https://toky.co/en/features/whatsapp.
        headerTitle: 'Hola bienvenido a TUDYNI!', //Popup Title
        popupMessage: 'En que te podemos ayudar?', //Popup Message
        showPopup: true, //Enables popup display
        buttonImage: '<img src="https://rawcdn.githack.com/rafaelbotazini/floating-whatsapp/3d18b26d5c7d430a1ab0b664f8ca6b69014aed68/whatsapp.svg" />', //Button Image
        position: "right"    
      });

}); /* End Fn */

