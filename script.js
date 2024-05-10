// Фильтр
document
  .getElementById("complete-checkbox")
  .addEventListener("change", function () {
    const completeElements = document.querySelectorAll(".complete");

    completeElements.forEach(function (element) {
      if (this.checked) {
        element.classList.add("shown");
      } else {
        element.classList.remove("shown");
      }
    }, this);
  });

document.getElementById("bad-checkbox").addEventListener("change", function () {
  const badElements = document.querySelectorAll(".bad");

  badElements.forEach(function (element) {
    if (this.checked) {
      element.classList.add("shown");
    } else {
      element.classList.remove("shown");
    }
  }, this);
});

document
  .getElementById("wait-checkbox")
  .addEventListener("change", function () {
    const badElements = document.querySelectorAll(".wait");

    badElements.forEach(function (element) {
      if (this.checked) {
        element.classList.add("shown");
      } else {
        element.classList.remove("shown");
      }
    }, this);
  });

// Фильтр very mini
document
  .getElementById("complete-checkbox-very-mini")
  .addEventListener("change", function () {
    const completeElements = document.querySelectorAll(".complete");

    completeElements.forEach(function (element) {
      if (this.checked) {
        element.classList.add("shown");
      } else {
        element.classList.remove("shown");
      }
    }, this);
  });

document
  .getElementById("bad-checkbox-very-mini")
  .addEventListener("change", function () {
    const badElements = document.querySelectorAll(".bad");

    badElements.forEach(function (element) {
      if (this.checked) {
        element.classList.add("shown");
      } else {
        element.classList.remove("shown");
      }
    }, this);
  });

document
  .getElementById("wait-checkbox-very-mini")
  .addEventListener("change", function () {
    const badElements = document.querySelectorAll(".wait");

    badElements.forEach(function (element) {
      if (this.checked) {
        element.classList.add("shown");
      } else {
        element.classList.remove("shown");
      }
    }, this);
  });
// Фильтр mini
document
  .getElementById("complete-checkbox-mini")
  .addEventListener("change", function () {
    const completeElements = document.querySelectorAll(".complete");

    completeElements.forEach(function (element) {
      if (this.checked) {
        element.classList.add("shown");
      } else {
        element.classList.remove("shown");
      }
    }, this);
  });

document
  .getElementById("bad-checkbox-mini")
  .addEventListener("change", function () {
    const badElements = document.querySelectorAll(".bad");

    badElements.forEach(function (element) {
      if (this.checked) {
        element.classList.add("shown");
      } else {
        element.classList.remove("shown");
      }
    }, this);
  });

document
  .getElementById("wait-checkbox-mini")
  .addEventListener("change", function () {
    const badElements = document.querySelectorAll(".wait");

    badElements.forEach(function (element) {
      if (this.checked) {
        element.classList.add("shown");
      } else {
        element.classList.remove("shown");
      }
    }, this);
  });

// Открытие inProcess
window.onload = function () {
  var detailsElements = document.querySelectorAll("details");

  detailsElements.forEach(function (details) {
    var summary = details.querySelector("summary.inProcess");
    if (summary) {
      details.open = true;
    }
  });
};

// Menu
document.getElementById("menuButton").addEventListener("click", function () {
  document.getElementById("menu").classList.toggle("open");
});

// inProcess для summary
document.addEventListener("DOMContentLoaded", function () {
  var allDetails = document.querySelectorAll("details");
  allDetails.forEach(function (detailsC) {
    var summaryC = detailsC.querySelector("summary");
    var inProcessItemC = detailsC.querySelector("ul .inProcess");

    if (inProcessItemC) {
      summaryC.classList.add("inProcess");
    }
  });
});

// complete для summary
document.addEventListener("DOMContentLoaded", function () {
  var allDetails = document.querySelectorAll("details");
  allDetails.forEach(function (details) {
    var summary = details.querySelector("summary");
    var allLiItems = details.querySelectorAll("ul li");
    var allComplete = true;

    allLiItems.forEach(function (li) {
      if (!li.classList.contains("complete") && !li.classList.contains("bad")) {
        allComplete = false;
      }
    });

    if (allComplete) {
      summary.classList.add("complete");
    }
  });
});
