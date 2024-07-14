document.addEventListener("DOMContentLoaded", () => {
  const primarySlider = document.getElementById("primary-slider");
  const secondarySlider = document.getElementById("secondary-slider");
  const primaryColor = document.getElementById("primary-color");
  const secondaryColor = document.getElementById("secondary-color");
  const gradientBar = document.querySelector(".gradient-bar");

  const gradientStops = [
    { offset: 0, color: "#DF6358" },
    { offset: 16.67, color: "#E9995E" },
    { offset: 33.33, color: "#F6E275" },
    { offset: 50, color: "#A6CA54" },
    { offset: 66.67, color: "#80B0A1" },
    { offset: 83.33, color: "#75A5CE" },
    { offset: 100, color: "#6E64A8" },
  ];

  function getGradientColor(percent) {
    for (let i = 0; i < gradientStops.length - 1; i++) {
      const start = gradientStops[i];
      const end = gradientStops[i + 1];
      if (percent >= start.offset && percent <= end.offset) {
        const range = end.offset - start.offset;
        const rangePercent = (percent - start.offset) / range;
        const startColor = hexToRgb(start.color);
        const endColor = hexToRgb(end.color);
        const r = Math.round(
          startColor.r + rangePercent * (endColor.r - startColor.r)
        );
        const g = Math.round(
          startColor.g + rangePercent * (endColor.g - startColor.g)
        );
        const b = Math.round(
          startColor.b + rangePercent * (endColor.b - startColor.b)
        );
        return `rgb(${r}, ${g}, ${b})`;
      }
    }
    return "#000000";
  }

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }

  function updateColor(slider, colorElement) {
    const value = slider.value;
    const color = getGradientColor(value);
    colorElement.style.backgroundColor = color;
    colorElement.style.left = `calc(${value}% - 15px)`;
  }

  function updateSVGPreview(primaryColor, secondaryColor, isDarkMode) {
    const svgPrimaryButtons = document.querySelectorAll(".primary-button-on");
    svgPrimaryButtons.forEach((svg) => {
      svg.style.fill = primaryColor.style.backgroundColor;
    });

    const svgSecondary = document.querySelector(".secondary-button-on");
    if (svgSecondary) {
      svgSecondary.style.fill = secondaryColor.style.backgroundColor;
    }

    const svgBackground = document.querySelector(".svg-back");
    if (svgBackground) {
      if (isDarkMode) {
        svgBackground.style.setProperty("fill", "#3f3f3f", "important");
        const innerBoxes = document.querySelectorAll(".inner-box");
        innerBoxes.forEach((innerBox) => {
          innerBox.style.fill = "#343434";
        });

        const titleMains = document.querySelectorAll(".title-main");
        titleMains.forEach((titleMain) => {
          titleMain.style.fill = "#ffffff";
        });

        const svgSearch = document.querySelector(".svg-search");
        if (svgSearch) {
          svgSearch.style.fill = "#505050";
        }

        const settingIcons = document.querySelectorAll(".setting-icon");
        settingIcons.forEach((settingIcon) => {
          settingIcon.style.fill = "#ffffff";
        });

        const searchIcons = document.querySelectorAll(".search-icon");
        searchIcons.forEach((searchIcon) => {
          searchIcon.style.stroke = "#ffffff";
        });
      } else {
        svgBackground.style.setProperty(
          "fill",
          "rgb(255, 255, 255)",
          "important"
        );
        const innerBoxes = document.querySelectorAll(".inner-box");
        innerBoxes.forEach((innerBox) => {
          innerBox.style.fill = "";
        });

        const titleMains = document.querySelectorAll(".title-main");
        titleMains.forEach((titleMain) => {
          titleMain.style.fill = "#000000";
        });

        const svgSearch = document.querySelector(".svg-search");
        if (svgSearch) {
          svgSearch.style.fill = "#eeeeee";
        }

        const settingIcons = document.querySelectorAll(".setting-icon");
        settingIcons.forEach((settingIcon) => {
          settingIcon.style.fill = "#3D3D3D";
        });

        const searchIcons = document.querySelectorAll(".search-icon");
        searchIcons.forEach((searchIcon) => {
          searchIcon.style.stroke = "#3D3D3D";
        });
      }
    }
  }

  const darkBtn = document.getElementById("dark-btn");
  const lightBtn = document.getElementById("light-btn");
  let isDarkMode = false;

  darkBtn.addEventListener("click", function () {
    this.classList.add("active");
    lightBtn.classList.remove("active");
    isDarkMode = true;
    updateSVGPreview(primaryColor, secondaryColor, isDarkMode);
  });

  lightBtn.addEventListener("click", function () {
    this.classList.add("active");
    darkBtn.classList.remove("active");
    isDarkMode = false;
    updateSVGPreview(primaryColor, secondaryColor, isDarkMode);
  });

  primarySlider.addEventListener("input", () => {
    updateColor(primarySlider, primaryColor);
    updateSVGPreview(primaryColor, secondaryColor, isDarkMode);
  });

  secondarySlider.addEventListener("input", () => {
    updateColor(secondarySlider, secondaryColor);
    updateSVGPreview(primaryColor, secondaryColor, isDarkMode);
  });

  const generateButton = document.querySelector(".submit");
  generateButton.addEventListener("click", () => {
    const primaryHex = rgbToHex(primaryColor.style.backgroundColor);
    const secondaryHex = rgbToHex(secondaryColor.style.backgroundColor);
    const secondaryDarkHex = "#ffffff77";
    const secondaryLightHex = "#00000077";
    const campsiteUrl = isDarkMode
      ? "url(/extras/icons/campsitedark.svg)"
      : "url(/extras/icons/campsitelight.svg)";
    const searchbarSearch = isDarkMode
      ? "url(/extras/icons/search-light.svg)"
      : "url(/extras/icons/search.svg)";

    const jsonCode = `
        :root {
          --theme: ${primaryHex};
          --background: ${isDarkMode ? "#1A1A1A" : "#FDF6F8"};
          --primary-color: ${isDarkMode ? "#FFFFFF" : "#000000"};
          --secondary-color: ${
            isDarkMode ? secondaryDarkHex : secondaryLightHex
          };
          --searchbar-bg: ${isDarkMode ? "#383838" : "#eeeeee"};
          --searchbar-gears: url(/extras/icons/settings.svg);
          --searchbar-search: ${searchbarSearch};
          --mini-logo: url(/extras/icons/mini-logo.svg);
          --box: ${isDarkMode ? "#383838B3" : "#F9DDE4B3"};
          --feature-bg: ${isDarkMode ? "#79797933" : "#eeeeee75"};
          --feature-input-bg: ${isDarkMode ? "#FFFFFF33" : "#e4e4e4"};
          --feature-slider-bg: ${isDarkMode ? "#FFFFFF33" : "#cccccc"};
          --scrollbar-handle: ${isDarkMode ? "#797979" : "#c2bfbf"};
          --scrollbar-handle-active: ${isDarkMode ? "#656565" : "#b2afaf"};
          --theme-icon: url(/extras/icons/dark.svg);
          --navbar-gradient: linear-gradient(0.25turn, ${primaryHex}, ${secondaryHex});
          --campsite: ${campsiteUrl};
        }
      `;

    navigator.clipboard
      .writeText(jsonCode)
      .then(() => {
        alert("JSON code copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy JSON code to clipboard.");
      });

    gradientBar.style.background = `linear-gradient(0.25turn, ${primaryHex}, ${secondaryHex})`;
  });

  function rgbToHex(rgbString) {
    const rgbArray = rgbString.match(/\d+/g);
    const r = parseInt(rgbArray[0]);
    const g = parseInt(rgbArray[1]);
    const b = parseInt(rgbArray[2]);
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  updateColor(primarySlider, primaryColor);
  updateColor(secondarySlider, secondaryColor);

  updateSVGPreview(primaryColor, secondaryColor, isDarkMode);
});
