// default loader
$(".l-main").load('_dashboard.html'); // set default

// Click on Logo
$('.m-header__logo').click(function (e) { 
  e.preventDefault();
  $(".l-main").load($(this).attr("href") + "?" + new Date().getTime());
  $('a.m-nav__link').removeClass('-active');
  $('[data-page="overview"]').addClass('-active');
});

$('.m-nav__link.-basket, .m-nav__item.-home a, .m-nav__link.-data, .m-nav__link.-mobile, .m-nav__link.-products').click(function (e) { 
  e.preventDefault();
  $('a.m-nav__link').removeClass('-active');
  $(this).addClass('-active');
  $(".l-main").load($(this).attr("href"));
});


// Click on top buttons + action button
$('.m-header--tablet .m-button, .m-header-image .m-button, .m-footer .m-button').click(function (e) { 
  e.preventDefault();
  $(".l-main").load($(this).attr("href"));            
});
