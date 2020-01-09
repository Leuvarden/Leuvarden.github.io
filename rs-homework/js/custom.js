(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll('#nav .tab-control').forEach(function(navEl, index, navElArray) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };

  navEl.onkeydown = function(event) {
    if (['ArrowLeft', 'Left', 'ArrowRight', 'Right', 'Home', 'End', 'Space', 'Enter'].includes(event.key)) {
      event.preventDefault();

      let currentActiveElement = navElArray[index];
      switch (event.code) {
        case 'Space':
        case 'Enter':
          toggleTab(currentActiveElement.id, currentActiveElement.dataset.target);
          break;
        case 'ArrowRight':
          currentActiveElement = index + 1 === navElArray.length ? navElArray[0] : navElArray[index + 1];
          break;
        case 'ArrowLeft':
          currentActiveElement = index - 1 === -1 ? navElArray[navElArray.length - 1] : navElArray[index - 1];
          break;
        case 'Home':
          currentActiveElement = navElArray[0];
          break;
        case 'End':
          currentActiveElement = navElArray[navElArray.length - 1];
          break;
        default:
          break;
      }

      currentActiveElement.focus();

    }
  }
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll('#nav .tab-control');

  navEls.forEach(function(navEl) {
    if (navEl.id === selectedNav) {
      navEl.classList.add('is-active');
      navEl.setAttribute('aria-selected', 'true');
      navEl.removeAttribute('tabindex');
    } else {
      if (navEl.classList.contains('is-active')) {
        navEl.classList.remove('is-active');
      }
      navEl.setAttribute('aria-selected', 'false');
      navEl.setAttribute('tabindex', '-1')
    }
  });

  var tabsPanels = document.querySelectorAll('.tab-pane');

  tabsPanels.forEach(function(tabPanel) {
    if (tabPanel.id === targetId) {
      tabPanel.style.display = 'block';
      tabPanel.setAttribute('aria-expanded', 'true');
    } else {
      tabPanel.style.display = 'none';
      tabPanel.setAttribute('aria-expanded', 'false');
    }
  });
}

