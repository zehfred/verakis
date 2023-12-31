$(document).ready(function () {
  // Check the data-page-slug attribute and update the body class accordingly
  var pageSlug = $("body").attr("data-page-slug");
  var hostname = window.location.pathname;

  // Check for the special case first
  if (pageSlug === "a-comida-na-boca-do-povo") {
    $('[data-menu-link="comunicacao"]').addClass("w--current");
    $("body").removeClass("page-training").addClass("page-communication");
  } else {
    // Check hostname and set the appropriate class
    if (hostname.includes("formacao")) {
      $('[data-menu-link="formacao"]').addClass("w--current");
    } else if (hostname.includes("negocios")) {
      $('[data-menu-link="negocios"]').addClass("w--current");
    } else if (hostname.includes("comunicacao")) {
      $('[data-menu-link="comunicacao"]').addClass("w--current");
    } else if (hostname.includes("artigo")) {
      $('[data-menu-link="artigos"]').addClass("w--current");
    }
  }

  // Check for the existence of the Splide slider and its required child element
  var $slider = $(".testimonials-slider");
  if ($slider.length && $slider.find(".splide__list").length) {
    var splide = new Splide(".testimonials-slider", {
      type: "loop",
      perPage: 2,
      perMove: 1,
      gap: "2rem",
      pagination: false,
      breakpoints: {
        767: {
          perPage: 1,
        },
      },
    });
    splide.mount();
  } else {
    // Remove the section_testimonials from the DOM if there's no splide__list
    $(".section_testimonials").remove();
  }
  var $generalSlider = $(".general-slider");
  if ($generalSlider.length && $generalSlider.find(".splide__list").length) {
    var splideGeneral = new Splide(".general-slider", {
      type: "loop",
      perPage: 4,
      perMove: 1,
      gap: "2rem",
      pagination: false,
      breakpoints: {
        767: {
          perPage: 1,
        },
      },
    });
    splideGeneral.mount();
  }

  // Check and sort modules-grid
  var $grid = $(".modules-grid");
  if ($grid.length) {
    sortModulesGrid($grid);
  }

  var $peopleGrid = $(".course-team_people.teachers");
  if ($peopleGrid.length) {
    sortTeachers($peopleGrid);
  }

  $(".tabs-menu .tab-link").on("click", function () {
    var $thisTab = $(this);
    var $parentMenu = $thisTab.closest(".tabs-menu");

    var position = $thisTab.position().left;
    var tabWidth = $thisTab.outerWidth();
    var menuWidth = $parentMenu.width();
    var currentScrollLeft = $parentMenu.scrollLeft();

    // Adjust position for items that won't be fully visible
    if (position + tabWidth > menuWidth + currentScrollLeft) {
      position = position - menuWidth + tabWidth;
    }

    // Smoothly animate the scrollLeft property of the tabs-menu to the clicked tab-link
    $parentMenu.animate({ scrollLeft: position }, 300);
  });

  $(".main-menu_button").on("click", function () {
    $("body").toggleClass("no-scroll");
  });

  var currentYear = new Date().getFullYear();
  $(".copyright-year").text(currentYear);

  // If 'section_related-courses' does not contain 'courses-list', remove it
  if (!$(".section_related-courses .courses-list").length) {
    $(".section_related-courses").next(".spacer").remove(); // This will remove the '.spacer' element
    $(".section_related-courses").remove(); // This continues to remove the '.section_related-courses' as before
  }
});

function sortModulesGrid($grid) {
  var $items = $grid.find(".modules-grid_item");

  $items
    .sort(function (a, b) {
      var dateAString = $(a).attr("data-module-date");
      var dateBString = $(b).attr("data-module-date");

      // Convert the date strings into actual Date objects
      var dateA = new Date(dateAString);
      var dateB = new Date(dateBString);

      // Compare the Date objects
      return dateA - dateB;
    })
    .appendTo($grid);
}

function sortTeachers() {
  var $peopleContainer = $(".course-team_people.teachers");
  var $people = $peopleContainer.find(".person");

  $people.sort(function (a, b) {
    var nameA = $(a).find(".person_name").text().trim().toUpperCase(); // Get the name from .person_name and convert to uppercase
    var nameB = $(b).find(".person_name").text().trim().toUpperCase(); // Same for the second element

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0; // names must be equal
  });

  $peopleContainer.empty().append($people); // Clear the container and append the sorted divs
}
