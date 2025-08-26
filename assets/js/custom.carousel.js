document.addEventListener("DOMContentLoaded", function () {
  plexifyCarouselAround();
});
function plexifyCarouselAround() {
  if (!document.querySelector(".pxl-history-carousel .item-slide")) {
    return;
  }
  gsap.registerPlugin(Draggable, InertiaPlugin);

  let items = gsap.utils.toArray(".pxl-history-carousel .item-slide");

  let carousel = buildCarousel(items, {
    radiusX: 1060,
    radiusY: 800,
    activeAngle: -90,
    draggable: true,

    onClick(element, self) {
      self.to(element, { duration: 3, ease: "linear" }, "short");
    },

    onActivate(element, self) {
      const slides = document.querySelectorAll(".pxl-history-carousel .item-slide");
      const thumbContainer = document.querySelector(".pxl-swiper-thumbs");
      const thumbWrapper = document.querySelector(".pxl-thumbs-wrapper");
      const thumbItems = document.querySelectorAll(".thumb-item");

      if (!slides.length || !thumbItems.length || !thumbWrapper || !thumbContainer) return;

      thumbItems.forEach((thumb) => thumb.classList.remove("active"));

      const activeIndex = Array.from(slides).indexOf(element);
      const thumbIndex = Math.floor(activeIndex / 2); 
      const totalThumbs = thumbItems.length;
      const centerIndex = Math.floor(totalThumbs / 2);

      let realActiveIndex = (centerIndex + (thumbIndex % (totalThumbs / 3)) - Math.floor(totalThumbs / 6)) % totalThumbs;
      if (realActiveIndex < 0) realActiveIndex += totalThumbs;

      const activeThumb = thumbItems[realActiveIndex];
      if (activeThumb) {
        activeThumb.classList.add("active");

        const offset = -(activeThumb.offsetLeft - thumbContainer.offsetWidth / 2 + activeThumb.offsetWidth / 2);

        gsap.to(thumbWrapper, {
          x: offset,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    },
  });

  carousel.render();

  function updateThumbWrapperPosition() {
    const thumbContainer = document.querySelector(".pxl-swiper-thumbs");
    const thumbWrapper = document.querySelector(".pxl-thumbs-wrapper");
    const activeItem = document.querySelector(".thumb-item.active") || document.querySelector(".thumb-item");

    if (!thumbContainer || !thumbWrapper || !activeItem) return;

    const offset = -(activeItem.offsetLeft - thumbContainer.offsetWidth / 2 + activeItem.offsetWidth / 2);

    gsap.to(thumbWrapper, {
      x: offset,
      duration: 0.8,
      ease: "power2.out",
    });
  }

  const thumbContainer = document.querySelector(".pxl-swiper-thumbs");
  if (thumbContainer) {
    const observer = new ResizeObserver(updateThumbWrapperPosition);
    observer.observe(thumbContainer);

    setTimeout(updateThumbWrapperPosition, 100);
  }


  function buildCarousel(
    targets,
    {
      radiusX = 200,
      radiusY = 200,
      activeAngle = -90,
      activeElement,
      onClick,
      onActivate,
      onDeactivate,
      onStart,
      onStop,
      draggable,
      autoAdvance,
    }
  ) {
    targets = gsap.utils.toArray(targets);
    gsap.set(targets, { xPercent: -50, x: 0, yPercent: -50, y: 0 });
    let DEG2RAD = Math.PI / 180,
      eventTypes = (
        "ontouchstart" in document.documentElement
          ? "touchstart,touchmove,touchcancel,touchend"
          : !("onpointerdown" in document.documentElement)
          ? "mousedown,mousemove,mouseup,mouseup"
          : "pointerdown,pointermove,pointercancel,pointerup"
      ).split(","),
      round = (value) => Math.round(value * 10000) / 10000,
      tempDiv = document.createElement("div"),
      quantity = targets.length,
      angleInc = 360 / quantity,
      wrap = gsap.utils.wrap(0, quantity),
      angleWrap = gsap.utils.wrap(0, 360),
      rotation = 0,
      dragged,
      onPressRotation,
      autoAdvanceCall =
        autoAdvance &&
        gsap.delayedCall(parseFloat(autoAdvance) || 2, () => {
          self.next();
          autoAdvanceCall.restart(true);
        }),
      xSetters = targets.map((el) => gsap.quickSetter(el, "x", "px")),
      ySetters = targets.map((el) => gsap.quickSetter(el, "y", "px")),
      self = {
        rotation(value) {
          if (arguments.length) {
            let prevActive = activeElement;
            rotation = angleWrap(value);
            activeElement = targets[wrap(Math.round(-value / angleInc))];
            self.render();
            if (prevActive !== activeElement) {
              onDeactivate && prevActive && onDeactivate(prevActive, self);
              onActivate && onActivate(activeElement, self);
            }
          }
          return rotation;
        },
        resize(rx, ry) {
          radiusX = rx;
          radiusY = ry;
          self.render();
        },
        render() {
          self.render = function () {
            let inc = angleInc * DEG2RAD,
              a = (rotation + activeAngle) * DEG2RAD,
              activeIndex = targets.indexOf(activeElement);

            targets.forEach((el) => el.classList.remove("active"));

            for (let i = 0; i < quantity; i++) {
              xSetters[i](round(Math.cos(a) * radiusX));
              ySetters[i](round(Math.sin(a) * radiusY));

              if (i === activeIndex) {
                gsap.to(targets[i], {
                  opacity: 1,
                  rotate: 0,
                  duration: 0.4,
                  ease: "power1.out",
                });
                targets[i].classList.add("active");
              } else if (
                i === wrap(activeIndex - 1) ||
                i === wrap(activeIndex + 1)
              ) {
                gsap.to(targets[i], {
                  opacity: 1,
                  rotate: i === wrap(activeIndex - 1) ? -10 : 10,
                  duration: 0.4,
                  ease: "power1.out",
                });
              } else if (
                i === wrap(activeIndex - 2) ||
                i === wrap(activeIndex + 2)
              ) {
                gsap.to(targets[i], {
                  opacity: 0,
                  rotate: i === wrap(activeIndex - 2) ? -20 : 20,
                  duration: 0.4,
                  ease: "power1.out",
                });
              } else if (
                i === wrap(activeIndex - 3) ||
                i === wrap(activeIndex + 3)
              ) {
                gsap.to(targets[i], {
                  opacity: 0,
                  rotate: i === wrap(activeIndex - 3) ? -40 : 40,
                  duration: 0.4,
                  ease: "power1.out",
                });
              } else {
                gsap.to(targets[i], {
                  opacity: 0,
                  rotate: 0,
                  duration: 0.4,
                  ease: "power1.out",
                });
              }

              a += inc;
            }
          };
        },

        activeElement(value) {
          if (arguments.length) {
            self.rotation(self.elementRotation(value));
          }
          return activeElement;
        },
        elementRotation(element) {
          let index = targets.indexOf(gsap.utils.toArray(element)[0]);
          return (quantity - index) * angleInc;
        },
        to(elOrRotation, vars, direction) {
          vars = vars || {};
          vars.rotation =
            typeof elOrRotation === "number"
              ? elOrRotation
              : self.elementRotation(elOrRotation) || parseFloat(elOrRotation);
          vars.overwrite = true;
          let { onUpdate, onComplete } = vars,
            _onStart = vars.onStart;
          autoAdvanceCall && autoAdvanceCall.pause();
          vars.onStart = function () {
            onStart && onStart(activeElement, self);
            _onStart && _onStart.call(this);
          };
          vars.onComplete = function () {
            onStop && onStop(activeElement, self);
            onComplete && onComplete.call(this);
            autoAdvanceCall && autoAdvanceCall.restart(true);
          };
          if (direction) {
            let getter = gsap.getProperty(tempDiv);
            vars.onUpdate = function () {
              self.rotation(getter("rotation"));
              onUpdate && onUpdate.call(this);
            };
            vars.rotation += "_" + direction;
            return gsap.fromTo(tempDiv, { rotation: rotation }, vars);
          }
          return gsap.to(self, vars);
        },
        next(vars, direction) {
          vars = {
            ...vars,
            duration: 1,
          };
          let element = targets[wrap(targets.indexOf(activeElement) + 2)];
          self.to(element, vars, direction || "ccw");
        },
        previous(vars, direction) {
          vars = {
            ...vars,
            duration: 1,
          };
          let element = targets[wrap(targets.indexOf(activeElement) - 2)];
          self.to(element, vars, direction || "cw");
        },
        kill() {
          targets.forEach((el) => {
            el.removeEventListener("click", _onClick);
            el.removeEventListener(eventTypes[0], onPress);
            el.removeEventListener(eventTypes[2], onRelease);
            el.removeEventListener(eventTypes[3], onRelease);
          });
          gsap.killTweensOf(self);
          tempDiv.parentNode && tempDiv.parentNode.removeChild(tempDiv);
          autoAdvanceCall && autoAdvanceCall.kill();
          draggable && draggable.kill();
        },
        autoAdvance: autoAdvanceCall,
      },
      _onClick = (e) => {
        if (!dragged) {
          autoAdvanceCall && autoAdvanceCall.restart(true);
          onClick && onClick(e.currentTarget, self);
        }
      },
      onPress = (e) => {
        onPressRotation = rotation;
        gsap.set(tempDiv, { rotation: rotation });
        autoAdvanceCall && autoAdvanceCall.pause();
        gsap.killTweensOf(self);
        draggable.startDrag(e);
        dragged = false;
      },
      onRelease = (e) => {
        draggable.endDrag(e);
        if (rotation === onPressRotation) {
          autoAdvanceCall && autoAdvanceCall.restart(true);
          draggable.tween && draggable.tween.kill();
          _onClick(e);
        }
      },
      syncDraggable = () => {
        if (!dragged) {
          onStart && onStart(activeElement, self);
          dragged = true;
        }
        self.rotation(draggable.rotation);
      };
    targets[0].parentNode.appendChild(tempDiv);
    gsap.set(tempDiv, {
      visibility: "hidden",
      position: "absolute",
      width: 0,
      height: 0,
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
    });
    targets.forEach((el) => {
      if (draggable) {
        el.addEventListener(eventTypes[0], onPress);
        el.addEventListener(eventTypes[2], onRelease);
        el.addEventListener(eventTypes[3], onRelease);
      } else {
        el.addEventListener("click", _onClick);
      }
    });

    self.snap = angleInc;
    draggable &&
      (self.draggable = draggable =
        Draggable.create(tempDiv, {
          type: "rotation",
          snap: gsap.utils.snap(2 * angleInc),
          inertia: true,
          onThrowComplete: () => {
            autoAdvanceCall && autoAdvanceCall.restart(true);
            onStop && onStop(activeElement, self);
          },
          onThrowUpdate: syncDraggable,
          onDrag: syncDraggable,
        })[0]);
    self.activeElement(gsap.utils.toArray(activeElement)[0] || targets[0]);
    return self;
  }

  let isScrolling = false;

  const carouselContainer = document.querySelector(".pxl-history-carousel.layout-1");

  if (carouselContainer && typeof carousel !== "undefined") {
    carouselContainer.addEventListener("click", (e) => {
      const prevBtn = e.target.closest(".pxl-swiper-arrow-prev");
      const nextBtn = e.target.closest(".pxl-swiper-arrow-next");

      if ((prevBtn || nextBtn) && !isScrolling) {
        isScrolling = true;

        if (prevBtn) {
          carousel.previous();
        } else if (nextBtn) {
          carousel.next();
        }

        setTimeout(() => {
          isScrolling = false;
        }, 500);
      }
    });
  }

}