const slider = {
  officeGallery() {
    function sliderInit() {
      $('.slider-for').slick({
        centerMode: true,
        slidesToShow: 1,
        nextArrow: '<button type="button" class="slick-next"><<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="30" viewBox="0 0 614 1024">\n        <path fill="#fff" d="M603.873 488.396l-491.97-478.129c-7.040-6.835-15.142-10.267-24.286-10.267-9.148 0-17.246 3.432-24.283 10.267l-52.777 51.305c-7.048\n         6.839-10.557 14.695-10.557 23.6s3.509 16.761 10.557 23.6l414.893 403.238-414.893 403.245c-7.048 6.839-10.557 14.709-10.557 23.59 0 8.902 3.509 16.772\n          10.557 23.611l52.78 51.287c7.037 6.846 15.135 10.257 24.283 10.257 9.144 0 17.242-3.418 24.283-10.257l491.944-478.132c7.033-6.835 10.553-14.709\n           10.553-23.6s-3.494-16.761-10.527-23.615z"></path>\n        </svg></button>',
        prevArrow: '<button type="button" class="slick-prev"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="30" viewBox="0 0 614 1024">\n        <path fill="#fff" d="M603.873 488.396l-491.97-478.129c-7.040-6.835-15.142-10.267-24.286-10.267-9.148 0-17.246 3.432-24.283 10.267l-52.777 51.305c-7.048\n         6.839-10.557 14.695-10.557 23.6s3.509 16.761 10.557 23.6l414.893 403.238-414.893 403.245c-7.048 6.839-10.557 14.709-10.557 23.59 0 8.902 3.509 16.772\n          10.557 23.611l52.78 51.287c7.037 6.846 15.135 10.257 24.283 10.257 9.144 0 17.242-3.418 24.283-10.257l491.944-478.132c7.033-6.835 10.553-14.709\n           10.553-23.6s-3.494-16.761-10.527-23.615z"></path>\n        </svg></button>',
        variableWidth: true,
        responsive: [
          {
            breakpoint: 1440,
            settings: {
              centerPadding: '20px',
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 981,
            settings: {
              arrows: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              centerPadding: '160px',
              slidesToShow: 3,
              arrows: false,
            },
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              fade: true,
              asNavFor: '.slider-nav',
              centerPadding: '0',
              centerMode: true,
            },
          },
        ],
      });
      $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        arrows: false,
        adaptiveHeight: true,
      });
      $('.project-slider').slick({
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        infinite: false,
        variableWidth: true,
        swipeToSlide: true,
        nextArrow: '<button type="button" class="slick-next"><<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="30" viewBox="0 0 614 1024">\n        <path fill="#fff" d="M603.873 488.396l-491.97-478.129c-7.040-6.835-15.142-10.267-24.286-10.267-9.148 0-17.246 3.432-24.283 10.267l-52.777 51.305c-7.048\n         6.839-10.557 14.695-10.557 23.6s3.509 16.761 10.557 23.6l414.893 403.238-414.893 403.245c-7.048 6.839-10.557 14.709-10.557 23.59 0 8.902 3.509 16.772\n          10.557 23.611l52.78 51.287c7.037 6.846 15.135 10.257 24.283 10.257 9.144 0 17.242-3.418 24.283-10.257l491.944-478.132c7.033-6.835 10.553-14.709\n           10.553-23.6s-3.494-16.761-10.527-23.615z"></path>\n        </svg></button>',
        prevArrow: '<button type="button" class="slick-prev"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="30" viewBox="0 0 614 1024">\n        <path fill="#fff" d="M603.873 488.396l-491.97-478.129c-7.040-6.835-15.142-10.267-24.286-10.267-9.148 0-17.246 3.432-24.283 10.267l-52.777 51.305c-7.048\n         6.839-10.557 14.695-10.557 23.6s3.509 16.761 10.557 23.6l414.893 403.238-414.893 403.245c-7.048 6.839-10.557 14.709-10.557 23.59 0 8.902 3.509 16.772\n          10.557 23.611l52.78 51.287c7.037 6.846 15.135 10.257 24.283 10.257 9.144 0 17.242-3.418 24.283-10.257l491.944-478.132c7.033-6.835 10.553-14.709\n           10.553-23.6s-3.494-16.761-10.527-23.615z"></path>\n        </svg></button>',
      });
    }
    function init() {
      sliderInit();
    }
    return {
      init: init(),
    };
  },
};

export default slider;
