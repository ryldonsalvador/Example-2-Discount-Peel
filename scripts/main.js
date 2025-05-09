document.addEventListener("DOMContentLoaded", function () {
  // Initial position
  const initialX = 298;
  const initialY = 598;

  // Target position
  const targetX = 250;
  const targetY = 520;

  // Duration of the animation (in seconds)
  const duration = 1;

  let isDraggingEnabled = false; // Initially disabled until animation completes
  let isHandlePressTriggered = false; // Prevent handlePress from triggering multiple times
  let initialX2 = targetX; // Initialize variables to store x position
  let initialY2 = targetY; // Initialize variables to store y position

  // Select the hit areas
  const hitArea = document.querySelector(".dragArea");
  const hitArea2 = document.querySelector(".clickArea");

  const containerCoupon = document.querySelector(".coupon-container");

  containerCoupon.addEventListener("click", (event) => {
    const box = event.target.closest(".coupon-box");

    if (box) {
      if (box.classList.contains("coupon-box-1")) {
        // alert("Coupon 1 clicked!");
        window.open(window.clickTag2, "_blank");
      } else if (box.classList.contains("coupon-box-2")) {
        // alert("Coupon 2 clicked!");
        window.open(window.clickTag3, "_blank");
      } else if (box.classList.contains("coupon-box-3")) {
        // alert("Coupon 3 clicked!");
        window.open(window.clickTag4, "_blank");
      }
    } else {
      // alert("Clicked on the coupon container (not on a box)");
      window.open(window.clickTag1, "_blank");
    }
  });

  const couponBoxes = document.querySelectorAll(".coupon-box");

  couponBoxes.forEach((box) => {
    const btn = box.querySelector(".btn");

    // Mouse enter (desktop)
    box.addEventListener("mouseenter", () => {
      // Scale the whole coupon box
      gsap.to(box, {
        y: -3,
        filter: "drop-shadow(0px 0px 3px rgba(160, 159, 159, 0.6))",
        duration: 0.4,
        ease: "power3.out",
        z: 0.001,
      });

      // Animate only the button inside
      gsap.to(btn, {
        backgroundColor: "#e6f4ff",
        filter: "drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.6))",
        duration: 0.4,
        ease: "power3.out",
        z: 0.001,
      });
    });

    // Mouse leave (desktop)
    box.addEventListener("mouseleave", () => {
      gsap.to(box, {
        y: 0,
        duration: 0.4,
        filter: "drop-shadow(0px 0px 3px rgba(160, 159, 159, 0))",
        ease: "power3.out",
        z: 0.001,
      });

      gsap.to(btn, {
        backgroundColor: "#cdeaff",
        filter: "drop-shadow(0px 0px 3px rgba(0, 0, 0, 0))",
        duration: 0.4,
        ease: "power3.out",
        z: 0.001,
      });
    });

    // Touch start (mobile)
    box.addEventListener("touchstart", () => {
      gsap.to(box, {
        y: -3,
        duration: 0.4,
        ease: "power3.out",
        filter: "drop-shadow(0px 0px 3px rgba(160, 159, 159, 0.6))",
        z: 0.001,
      });

      gsap.to(btn, {
        backgroundColor: "#e6f4ff",
        filter: "drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.6))",
        duration: 0.4,
        ease: "power3.out",
        z: 0.001,
      });
    });

    // Touch end (mobile)
    box.addEventListener("touchend", () => {
      gsap.to(box, {
        delay: 0.3,
        y: 0,
        duration: 0.4,
        filter: "drop-shadow(0px 0px 3px rgba(160, 159, 159, 0))",
        ease: "power3.out",
        z: 0.001,
      });

      gsap.to(btn, {
        delay: 0.3,
        backgroundColor: "#cdeaff",
        filter: "drop-shadow(0px 0px 3px rgba(0, 0, 0, 0))",
        duration: 0.4,
        ease: "power3.out",
        z: 0.001,
      });
    });
  });

  var p = new Peel("#top-left", {
    corner: Peel.Corners.BOTTOM_RIGHT,
  });

  const video = document.getElementById("myVideo");
  let animationPlayed = false;

  video.addEventListener("ended", function () {
    // console.log("Video has finished playing!");
    // You can trigger any action here
    video.currentTime = 3.5;
    video.play();
  });
  video.addEventListener("play", function () {
    // console.log("Video play triggered");
    // You can trigger any action here
  });

  video.addEventListener("timeupdate", function () {
    if (!animationPlayed && video.currentTime >= 2) {
      animationPlayed = true;
      playIntroAnimation(); //  call the named GSAP animation
    }
  });

  // GSAP animation intro
  function playIntroAnimation() {
    gsap.to(
      { x: initialX, y: initialY },
      {
        x: targetX,
        y: targetY,
        duration: duration,
        ease: "power1.inOut",
        repeat: 2,
        yoyo: true,
        onUpdate: function () {
          const { x, y } = this.targets()[0];
          p.setPeelPosition(x, y);
        },
        onComplete: function () {
          p.setPeelPosition(targetX, targetY);
          isDraggingEnabled = true;
          initializeHandlers();
        },
      }
    );
  }

  // Function to initialize handleDrag and handlePress
  function initializeHandlers() {
    // show handle drag and click
    showInteractiveElements();
    // Handle drag functionality
    p.handleDrag(function (evt, x, y) {
      if (!isDraggingEnabled) {
        return; // Stop processing if dragging has been disabled
      }

      // Update the position of the hitArea based on the drag coordinates
      hitArea.style.left = `${x - 70}px`;
      hitArea.style.top = `${y - 50}px`;

      initialX2 = x; // Update initialX2 dynamically
      initialY2 = y; // Update initialY2 dynamically
      p.setPeelPosition(x, y); // Use x and y in the method
      // console.log(p.getAmountClipped());
      if (p.getAmountClipped() >= 0.2) {
        hideInteractiveElements();
        isDraggingEnabled = false;
        p.removeEvents();
        p.handleDrag = function () {}; // Overwrite the drag function to disable it

        gsap.to(
          { x: initialX2, y: initialY2 },
          {
            x: -400,
            y: -600,
            duration: 1,
            ease: "power1.inOut",
            onUpdate: function () {
              const { x, y } = this.targets()[0];
              p.setPeelPosition(x, y); // Update the position during the animation
            },
            onComplete: function () {
              p.setPeelPosition(-400, -600);
              console.log("Drag animation completed!");
              gsap.set(
                ".peel-top, .peel-bottom-shadow, .peel-back, .peel-top-shadow",
                {
                  display: "none",
                }
              );
            },
          }
        );
      }
    }, hitArea);

    // Attach drag and click detection to both hit areas
    // Define onClick handlers for each hit area
    function onClickHitArea() {
      onClick(); // Call the shared onClick logic
    }

    function onClickHitArea2() {
      onClick(); // Call the shared onClick logic
    }

    // Reusable function for drag detection
    function addDragAndClickDetection(element, onClick) {
      let startX,
        startY,
        isDragging = false;
      const dragThreshold = 10; // Adjust this threshold as needed for drag detection

      // Add event listeners for both mouse and touch interactions
      element.addEventListener("mousedown", (event) =>
        handleStart(event.clientX, event.clientY)
      );
      element.addEventListener("touchstart", (event) => {
        const touch = event.touches[0];
        handleStart(touch.clientX, touch.clientY);
      });

      element.addEventListener("mousemove", (event) =>
        handleMove(event.clientX, event.clientY)
      );
      element.addEventListener("touchmove", (event) => {
        const touch = event.touches[0];
        handleMove(touch.clientX, touch.clientY);
      });

      element.addEventListener("mouseup", handleEnd);
      element.addEventListener("touchend", handleEnd);

      function handleStart(x, y) {
        isDragging = false; // Reset drag state
        startX = x; // Record the starting X position
        startY = y; // Record the starting Y position
      }

      function handleMove(x, y) {
        const deltaX = Math.abs(x - startX);
        const deltaY = Math.abs(y - startY);

        // Check if movement exceeds the drag threshold
        if (deltaX > dragThreshold || deltaY > dragThreshold) {
          isDragging = true; // Mark as dragging
        }
      }

      function handleEnd() {
        if (!isDragging) {
          // console.log(`${element.className} detected click`);
          onClick(); // Perform the desired click action
        } else {
          // console.log(`${element.className} detected drag`);
        }
      }
    }

    // Define the shared onClick logic
    function onClick() {
      hideInteractiveElements();
      if (isHandlePressTriggered) {
        return; // Exit if handlePress was already triggered
      }

      isHandlePressTriggered = true; // Set the flag to true to prevent re-triggering

      // Create the GSAP tween dynamically on press to use the updated x and y
      gsap.to(
        { x: initialX2, y: initialY2 }, // Use the latest values of initialX2 and initialY2
        {
          x: -400,
          y: -600,
          duration: 1,
          ease: "power1.inOut",
          onUpdate: function () {
            const { x, y } = this.targets()[0];
            p.setPeelPosition(x, y); // Update the position during the animation
          },
          onComplete: function () {
            p.setPeelPosition(-400, -600);
            // console.log("Press animation completed!");
            gsap.set(
              ".peel-top, .peel-bottom-shadow, .peel-back, .peel-top-shadow",
              {
                display: "none",
              }
            );

            // Reset the flag after the animation is completed
            isHandlePressTriggered = false;
          },
        }
      );
    }

    // Attach drag and click detection to both hit areas
    addDragAndClickDetection(hitArea, onClickHitArea);
    addDragAndClickDetection(hitArea2, onClickHitArea2);

    // hide handle drag and click
    function hideInteractiveElements() {
      gsap.set(".dragArea, .clickArea", {
        display: "none",
      });
    }
    // show handle drag and click
    function showInteractiveElements() {
      gsap.set(".dragArea , .clickArea", {
        display: "block",
      });
    }
  }
});
