import Wrapper from "../assets/wrappers/Carousel";
import { useRef, useState, useEffect } from "react";

const Carousel = ({ children }) => {
  const carouselRef = useRef(null);
  const currentDirection = useRef(null);
  const scrollAnimationRef = useRef(null);
  const scrollSpeedRef = useRef(0);

  // Dragging
  const isDragging = useRef(false);
  const wasDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Auto Scroll
  const startAutoScroll = (direction) => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollStep = () => {
      container.scrollBy({
        left:
          direction === "left"
            ? -scrollSpeedRef.current
            : scrollSpeedRef.current,
        behavior: "auto",
      });

      scrollAnimationRef.current = requestAnimationFrame(scrollStep);
    };

    cancelAnimationFrame(scrollAnimationRef.current);
    currentDirection.current = direction;
    scrollAnimationRef.current = requestAnimationFrame(scrollStep);
  };

  const stopScrolling = () => {
    cancelAnimationFrame(scrollAnimationRef.current);
    currentDirection.current = null;
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      stopScrolling(); // Parar auto-scroll se estiver usando dragging
      return;
    }
    const container = carouselRef.current;
    if (!container) return;

    const { left, right } = container.getBoundingClientRect();
    const mouseX = e.clientX;
    const edgeSize = 40;

    const distanceToLeft = mouseX - left;
    const distanceToRight = right - mouseX;
    const MAX_SCROLL_SPEED = 6;
    const MIN_SCROLL_SPEED = 1;

    if (distanceToLeft < edgeSize) {
      scrollSpeedRef.current = Math.min(
        MAX_SCROLL_SPEED,
        Math.max(MIN_SCROLL_SPEED, ((edgeSize - distanceToLeft) / edgeSize) * 4)
      );

      if (currentDirection.current !== "left") {
        startAutoScroll("left");
      }
    } else if (distanceToRight < edgeSize) {
      scrollSpeedRef.current = Math.min(
        MAX_SCROLL_SPEED,
        Math.max(
          MIN_SCROLL_SPEED,
          ((edgeSize - distanceToRight) / edgeSize) * 4
        )
      );

      if (currentDirection.current !== "right") {
        startAutoScroll("right");
      }
    } else {
      stopScrolling();
    }
  };

  // Gradient visibility state
  const [gradientState, setGradientState] = useState({
    left: true,
    right: true,
  });

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const updateGradient = () => {
      const { scrollLeft: sl, scrollWidth, clientWidth } = container;
      setGradientState({
        left: sl > 5,
        right: sl + clientWidth < scrollWidth - 5,
      });
    };

    container.addEventListener("scroll", updateGradient);
    window.addEventListener("resize", updateGradient);

    // Wait until after the first paint to trigger gradient update
    requestAnimationFrame(updateGradient);

    return () => {
      container.removeEventListener("scroll", updateGradient);
      window.removeEventListener("resize", updateGradient);
    };
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
    }
  }, []);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only respond to left click
    const container = carouselRef.current;
    isDragging.current = true;
    wasDragging.current = false;
    startX.current = e.clientX - container.getBoundingClientRect().left;
    scrollLeft.current = container.scrollLeft;
    container.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      wasDragging.current = true;
      setTimeout(() => {
        wasDragging.current = false;
      }, 50); // Delay to allow click suppression
    }
    isDragging.current = false;
    carouselRef.current.style.cursor = "grab";
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    stopScrolling();
    carouselRef.current.style.cursor = "grab";
  };

  const handleMouseMoveDrag = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    // wasDragging.current = true;

    const container = carouselRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    container.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <Wrapper
      className={`carousel-wrapper ${!gradientState.left ? "hide-left" : ""} ${
        !gradientState.right ? "hide-right" : ""
      }`}
    >
      <section
        className="carousel"
        ref={carouselRef}
        onMouseMove={(e) => {
          handleMouseMove(e);
          handleMouseMoveDrag(e);
        }}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {children}
      </section>
    </Wrapper>
  );
};

export default Carousel;
