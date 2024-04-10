// Main navigation functionality
(function() {
    // Elements
    let navContainerEl = document.getElementById('main-nav-panel-container');
    let navToggleBtn = document.getElementById('main-nav-btn-toggle');
    let navPanelEl = document.getElementsByClassName('main-nav-panel');
    if (navPanelEl.length >= 0) {
        navPanelEl = navPanelEl[0];
    }
    let navCloseEl = document.getElementById('main-nav-close');
    let navPanelBgEl = document.getElementById('main-nav-bg');

    // State
    window.IDTmainNav = {
        activeMenus: [undefined, undefined, undefined] // 1 slot per menu depth
    };
    let panelOpen = false;

    // Init open/close menu functionality
    initMenuToggleBtns();

    // Interactivity
    navToggleBtn.addEventListener('click', togglePanel);
    navCloseEl.addEventListener('click', togglePanel);
    navPanelBgEl.addEventListener('click', togglePanel);

    function initMenuToggleBtns() {
        var toggleBtns = navContainerEl.querySelectorAll('[data-menu-target]');

        for (const btn of toggleBtns) {
            if (btn.hasAttribute("initialized")) {
                continue;
            }
            
            let targetID = btn.getAttribute('data-menu-target');

            btn.setAttribute('initialized', true);
            btn.setAttribute('aria-expanded', false);

            // Check for + initi reveal content
            let revealEl = btn.querySelectorAll('[data-reveal-content]');
                revealEl = (revealEl.length > 0) ? revealEl[0] : null;
            if (revealEl) {
                let defaultText = revealEl.getAttribute('data-reveal-content');

                revealEl.innerText = defaultText;

                // Set-up mutation observer to react to changes in parent's attributes and change the 
                window.MutationObserver = window.MutationObserver
                || window.WebKitMutationObserver
                || window.MozMutationObserver;

                // Find the element that you want to "watch"
                var target = btn,
                // create an observer instance
                observer = new MutationObserver(function(mutation) {
                   toggleRevealText(btn, revealEl);
                }),
                config = {
                    attributes: true // this is to watch for attribute changes.
                };
                observer.observe(target, config);
                // observer.disconnect();
            }
            btn.addEventListener('click', toggleMenuBtnClickHandler, true);
        }

        function toggleRevealText(btn, revealEl){
            if (btn.getAttribute('aria-expanded') === 'true') {
                let activeText = revealEl.getAttribute('data-reveal-content--active');
                revealEl.innerText = activeText;
            } else if (btn.getAttribute('aria-expanded') === 'false') {
                let defaultText = revealEl.getAttribute('data-reveal-content');
                revealEl.innerText = defaultText;
            }
        }

        function toggleMenuBtnClickHandler(e) {
            let btnEl = e.currentTarget;
            let menuTarget = btnEl.getAttribute('data-menu-target');

            if (!menuTarget) {
                console.log("Can't determine menu to open from button:");
                console.log(btnEl);
                return;
            }

            let targetEl = document.getElementById(menuTarget);

            if (!targetEl) {
                console.log("Unable to find menu to open with ID: " + menuTarget);
            }

            toggleFlyoutMenu(btnEl, targetEl);
        }

        function toggleFlyoutMenu(btnEl, targetEl) {

            let menuData = window.IDTmainNav;

            // Determine which level of menu the button lives in
            // This is needed to find/close any previously opened menus in the same tier
            let menuTier = btnEl.closest('.main-nav-panel-menu');
            
            if (!menuTier) {
                console.error('Cannot determine menu tier class selector: ".main-nav-panel-menu"');
                return;
            }
            let menuId = menuTier.id;
            menuTier = menuTier.id.split('-'); // Expects element id of "menu-level-#"
            menuTier = Number(menuTier[menuTier.length - 1]);

            let activeMenu = (menuData.activeMenus[menuTier]) ? menuData.activeMenus[menuTier] : null;

            // If a menu has been opened previously in the same tier, close it and reset it's button
            if (activeMenu) {
                let activeBtn = determineActiveBtnEl(false, menuId);

                closeMenu(activeBtn, activeMenu, menuTier);

                if (activeMenu === targetEl) {
                    return;
                }
            }
            
            // Toggle closed if open, else open
            if (btnEl.getAttribute('aria-expanded') === 'true') {
                closeMenu(btnEl, targetEl, menuTier);
            } else {
                openMenu(btnEl, targetEl, menuTier);
            }
            
            function openMenu(btnEl, targetMenu, menuTier) {
                btnEl.setAttribute('aria-expanded', 'true');
                targetMenu.classList.add('menu-active');
                menuData.activeMenus[menuTier] = targetMenu;
            }

            function closeMenu(btnEl, targetMenu, menuTier) {
                targetMenu.classList.remove('menu-active');
                btnEl.setAttribute('aria-expanded', 'false');
                menuData.activeMenus[menuTier] = undefined;

                // close subsequent menus
                if (menuTier < menuData.activeMenus.length - 1 && // Ensure there are subsequent menus
                    menuData.activeMenus[menuTier+1]) { // Check if anything is open in the next menus
                    let nextMenu = menuData.activeMenus[menuTier+1];
                    let nextBtn = determineActiveBtnEl(targetMenu);
                    closeMenu(nextBtn, nextMenu, (menuTier + 1));
                }
            }

        }

        function determineActiveBtnEl (menuEl, menuId) {
            if (!menuEl && !menuId) {
                console.error('Not enough info to determine button element');
            } else if (!menuEl) {
                menuEl = document.getElementById(menuId);
            }

            if (!menuEl) {
                console.error('Cannot find menu for this button');
                return;
            }

            return menuEl.querySelector('[aria-expanded=true]');
        }
    }

    function togglePanel() {

        if (panelOpen) {
            window.setTimeout(function() {
                toggleDisplay(navContainerEl);
            }, 350);
        } else {
            toggleDisplay(navContainerEl);
        }
        
       window.setTimeout(function() {
        toggleOpenAttrs(navPanelEl);
        toggleOpenAttrs(navToggleBtn);

        if (panelOpen) {
            panelOpen = false;
        } else {
            panelOpen = true;
        }
       }, 10);
    }

    function toggleDisplay(el) {
        if (el.style.display === "none") {
            el.style.display = "";
          } else {
            el.style.display = "none";
          }
    }

    function toggleOpenAttrs(el) {
        if (el.classList.contains('open')) {
            el.classList.remove('open');
            el.classList.add('closed');
        } else if (el.classList.contains('closed')) {
            el.classList.remove('closed');
            el.classList.add('open');
        }

        if (el.getAttribute('aria-expanded') === 'false') {
            el.setAttribute('aria-expanded', 'true');
        } else if (el.getAttribute('aria-expanded') === 'true') {
            el.setAttribute('aria-expanded', 'false');
        }
    }

    togglePanel(); // DEBUG ONLY
})();

// Main site search functionality
(function() {
    // Elements
    let searchContainerEl = document.getElementById('main-site-search');

    if (!searchContainerEl) {
        console.error('Cannot init main search, main element not found');
        return;
    }

    let searchInputEl = searchContainerEl.querySelector('.site-search__input');
    let searchBtnEl = searchContainerEl.querySelector('.site-search__button');
    
    if (!searchInputEl || !searchBtnEl) {
        console.error('Cannot init main search, critical element not found');
        return;
    }

    // State
    let searchOpen = false;

    let widthClass = "";

    if (!window.widthClass) {
        console.error('Unable to determine window width, is breakpoints.js loaded?');
    } else {
        widthClass = window.widthClass;
    }

    // Open search
    if (isDesktop()) {
        searchOpen = true;
        searchContainerEl.classList.add('active');
    }
    
    // Interactivity
    searchBtnEl.addEventListener('click', searchBtnClickHandler);
    document.addEventListener('focusin', function(e) {
        searchFocusHandler(e.target);
    }, true);
    document.addEventListener('click', function(e) {
        searchFocusHandler(e.target);
    }, true);

    function searchBtnClickHandler() {
        if (searchOpen) {
            // Submit search
            runSearch(searchInputEl.value);
        } else { // Display search
            searchContainerEl.classList.add('active');
            searchInputEl.focus();
            searchOpen = true;
        }
    }

    function searchFocusHandler(targetEl) {
        if (isDesktop()) {
            return;
        }

        let searchIsFocused = ((searchBtnEl === targetEl || 
            searchContainerEl === targetEl || 
            searchInputEl === targetEl)) ? true : false;
        
        if (searchIsFocused && searchOpen === false) {
                searchOpen = true;

                // Input doesn't receive focus without timeout, wait until element is available to focus
                window.searchFocusTimeout = window.setTimeout(function(){
                    searchInputEl.focus();
                }, 510);

                searchContainerEl.classList.add('active');
                
        } else if (!searchIsFocused && searchOpen === true) {
            searchOpen = false;
            searchContainerEl.classList.remove('active');

            // Clear any active timeouts from previous if it needs to be canceled
            clearTimeout(window.searchFocusTimeout);
        }
    }

    function runSearch(query) {
        var isString = (typeof query === "string");
        
        if (isString && query.length !== 0) {
            return;
        } else if (!query || !isString) {
            console.error('Cannot determine search query. Query is:');
            console.error(query);
        }
    }

    function isDesktop() {
        if (!window.breakpointsObj) {
            console.error('Unable to determine window width, is breakpoints.js loaded?');
            return false;
        }

        if (widthClass !== window.breakpointsObj['extra-small'] ||
        widthClass !== window.breakpointsObj['small']) {
            return true;
        }
        return false;
    }
})();

// Navigation search functionality
if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", initNavigationSearch);
  } else {
    // `DOMContentLoaded` has already fired
    initNavigationSearch();
  }

function initNavigationSearch() {
    // Elements
    let mainNavSearchEl = document.getElementById('main-nav-search');
    let resultsContainerEl = document.getElementsByClassName('main-nav-search__container')[0];
    let resultsEl = document.getElementsByClassName('main-nav-search__results')[0];
    let searchInputEl = document.getElementsByClassName('site-search__input');
        searchInputEl = (searchInputEl && searchInputEl.length > 0) ? searchInputEl[0] : null;
    let clearBtnEl = document.getElementsByClassName('site-search__active-clear');
        clearBtnEl = (clearBtnEl && clearBtnEl.length > 0) ? clearBtnEl[0] : null;

    let pages = window.productPages;
    
    if (!mainNavSearchEl || !pages) {
        console.error('Unable to init navigation search');
        return;
    }

    function clearDisplayHandler(inputEl) {
        if (!clearBtnEl) {
            return;
        }

        if (inputEl.value.length > 0) {
            clearBtnEl.classList.add('active');
        } else {
            clearBtnEl.classList.remove('active');
        }
    }

    function runSearch(input) {
        input = input.replace(/\[\]\[\];<>=/g, "").toLowerCase();
        let results = [];

        if (input.length < 3) {
            displayResults(results, true);
            return;
        }

        pages.forEach(page => {
            if (page.pageName.toLowerCase().includes(input) || 
            page.keywords &&
            page.keywords.toLowerCase().includes(input)) {
                results.push(page);
            };
        });

        displayResults(results);
    }

    function displayResults(results, hideResults) {
        if (hideResults) {
            resultsContainerEl.classList.toggle("d-none", true);
            return;
        }

        let resultTemplateEl = document.querySelector('[data-nav-search-result]');
        let searchHeadingEl = document.querySelector('[data-nav-search-result-heading]');

        searchHeadingEl.innerText = `${results.length} page${results.length === 1 ? '' : 's'} found`;
        
        resultsEl.innerHTML = "";

        results.forEach(page => {
            let resultEl = resultTemplateEl.content.cloneNode(true).children[0];
            let linkEl = resultEl.children[0];

            linkEl.href = page.url;
            linkEl.innerText = page.pageName;

            resultsEl.appendChild(resultEl);
        });
        resultsContainerEl.classList.toggle("d-none", false);
    
    }
    
    // Only run function after wait time completes no matter how many times it's invoked, invoking resets wait time
    const debounce = (callback, wait) => {
        let timeoutId = null;
        return (...args) => {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
            callback(...args);
            }, wait);
        };
    }

    // Debounced nav search
    const handleNavSearch = debounce((event) => {
        if (event.target.value || event.target.value === "") {
            runSearch(event.target.value);
        }
    }, 250);

    // Interactivity
    mainNavSearchEl.addEventListener("input", function(e){
        handleNavSearch(e);
        clearDisplayHandler(e.target);
    });

    if (clearBtnEl && searchInputEl) {
        clearBtnEl.addEventListener('click', function(e){
            searchInputEl.value = '';
            var event = new Event('input', {
                bubbles: true,
            });
              
            searchInputEl.dispatchEvent(event);
        });
    }
};