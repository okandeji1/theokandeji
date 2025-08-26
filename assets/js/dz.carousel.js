const CandidCVCarousel = function () {
  const handleServiceSwiper = function () {
    const slider = document.querySelector(".services-slider");

    if (slider) {
      const swiper = new Swiper(".services-slider", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        effect: "fade",
        speed: 1000,
        autoplay: {
          delay: 2000,
        },
        navigation: {
          nextEl: ".services-swiper-button-next",
          prevEl: ".services-swiper-button-prev",
        },
      });
    }
  };

  const handleBlogSwiper = function () {
    const blogSwiper = document.querySelector(".blog-swiper");

    if (blogSwiper) {
      const swiper = new Swiper(".blog-swiper", {
        speed: 1500,
        parallax: false,
        slidesPerView: 1,
        spaceBetween: 35,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        breakpoints: {
          567: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 35,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 35,
          },
        },
      });
    }
  };

  const handleBrandSwiper2 = function () {
    const brandSwiper = document.querySelector(".brand-swiper2");

    if (brandSwiper) {
      const swiper = new Swiper(".brand-swiper2", {
        speed: 1500,
        parallax: true,
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        breakpoints: {
          300: {
            slidesPerView: 1,
          },
          360: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 3,
          },
          991: {
            slidesPerView: 4,
          },
        },
      });
    }
  };

  const handleBrandSwiper3 = function () {
    const brandSwiper = document.querySelector(".brand-swiper3");

    if (brandSwiper) {
      const swiper = new Swiper(".brand-swiper3", {
        speed: 1500,
        parallax: true,
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        breakpoints: {
          300: {
            slidesPerView: 1,
          },
          360: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 3,
          },
          991: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        },
      });
    }
  };

  function ProductGallerySwiper1() {
    const gallerySwiperEl = document.querySelector(".product-gallery-swiper");
    const mainSwiperEl = document.querySelector(".product-gallery-swiper2");

    if (gallerySwiperEl && mainSwiperEl) {
      const swiperThumbs = new Swiper(".product-gallery-swiper", {
        spaceBetween: 10,
        slidesPerView: 2,
        pagination: {
          el: ".swiper-pagination-trading",
        },
      });

      const swiperMain = new Swiper(".product-gallery-swiper2", {
        spaceBetween: 0,
        updateOnWindowResize: true,
        navigation: {
          nextEl: ".gallery-button-next",
          prevEl: ".gallery-button-prev",
        },
        thumbs: {
          swiper: swiperThumbs,
        },
      });
    }
  }

  function ProductDetails() {
    const thumbsEl = document.querySelector(".product-detail-thumbs");
    const mainEl = document.querySelector(".product-detail");

    if (!thumbsEl || !mainEl) return;

    const swiperThumbs = new Swiper(".product-detail-thumbs", {
      spaceBetween: 0,
      slidesPerView: 1,
      freeMode: true,
      effect: "fade",
      loop: true,
      watchSlidesProgress: true,
    });

    const swiperMain = new Swiper(".product-detail", {
      spaceBetween: 10,
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
      breakpoints: {
        567: {
          spaceBetween: 10,
          slidesPerView: 1,
        },
        767: {
          spaceBetween: 30,
          slidesPerView: 2,
        },
        1025: {
          spaceBetween: 54,
          slidesPerView: 3,
        },
      },
      thumbs: {
        swiper: swiperThumbs,
      },
    });
  }

  const handleTestimonialSwiper = function () {
    const wrapper = document.querySelector(".testimonial-swiper-wrapper");
    const thumbsEl = document.querySelector(".testimonial-thumbs");
    const mainEl = document.querySelector(".testimonial-swiper");

    if (!wrapper || !thumbsEl || !mainEl) return;

    const testimonialThumbs = new Swiper(".testimonial-thumbs", {
      speed: 1500,
      parallax: true,
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000,
      },
    });

    new Swiper(".testimonial-swiper", {
      speed: 1500,
      parallax: true,
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: ".testimonial-button-next",
        prevEl: ".testimonial-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      thumbs: {
        swiper: testimonialThumbs,
      },
    });
  };

  const handleTestimonialSwiper2 = function () {
    const thumbSwiper = new Swiper('.blog2-thumb-swiper', {
	  slidesPerView: 1,
	  spaceBetween: 0,
	  allowTouchMove: false,
	  watchSlidesProgress: true,
	  watchSlidesVisibility: true,
	});

	const mainSwiper = new Swiper('.blog2-swiper', {
	  slidesPerView: 1,
	  spaceBetween: 0,
	  loop: false,
	  navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	  },
	  thumbs: {
		swiper: thumbSwiper,
	  },
	});
  };

  const handleReviewSlider = function () {
    const reviewSliderEl = document.querySelector(".reviewtwo-slider");

    if (reviewSliderEl) {
      const swiper = new Swiper(".reviewtwo-slider", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        speed: 2000,
        freeMode: false,
        autoplay: {
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          10: {
            slidesPerView: 1,
          },
          575: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 2,
          },
        },
      });
    }
  };

  return {
    load() {
      handleTestimonialSwiper();
      handleTestimonialSwiper2();
      handleServiceSwiper();
      handleBlogSwiper();
      handleBrandSwiper2();
      handleBrandSwiper3();
      ProductGallerySwiper1();
      ProductDetails();
      handleReviewSlider();
    },
  };
};

window.addEventListener("load", function () {
  CandidCVCarousel().load();
});
