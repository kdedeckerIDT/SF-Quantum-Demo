// Set window breakpoint values to be accessed by other scripts
(function() {
    determineScreenSize = function() {
        var docWidth = viewport().width;
        var widthClass = "";

        var widthClasses = {
            'extra-small': 'w-xs',
            'small': 'w-sm',
            'medium': 'w-md',
            'large': 'w-lg',
            'extra-large': 'w-xl',
            'extra-extra-large': 'w-xxl'
        }

        if (docWidth >= 1400) {
            widthClass = widthClasses['extra-extra-large'];
        } else if (docWidth >= 1200) {
            widthClass = widthClasses['extra-large'];
        } else if (docWidth >= 992) {
            widthClass = widthClasses['large'];
        } else if (docWidth >= 768) {
            widthClass = widthClasses['medium'];
        } else if (docWidth >= 576) {
            widthClass = widthClasses['small'];
        } else {
            widthClass = widthClasses['extra-small'];
        }

        /*
        if (docWidth < 576) {
            widthClass = widthClasses['x-small'];
        } else if (docWidth >= 450 && docWidth < 737) {
            widthClass = widthClasses['small'];
        } else if (docWidth >= 738 && docWidth < 961) {
            widthClass = widthClasses[''];
        } else if (docWidth >= 962 && docWidth < 1117) {
            widthClass = "w-lg";
        } else {
            widthClass = "w-xl"
        }
        */

        window.widthClass = widthClass;
        window.breakpointsObj = widthClasses;

        var htmlEl = document.getElementsByTagName( 'html' )[0]; // '0' to assign the first (and only `HTML` tag)
        updateWidthClass(htmlEl, widthClass);


        function viewport() {
            var e = window, a = 'inner';
            if (!('innerWidth' in window )) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
        }

        function updateWidthClass(element, widthClass) {
            var classList = element.classList;

            if (classList.length <= 0) {
                element.classList.add(widthClass);
                return;
            }

            // Check for any existing width classes and update if necessary
            // Loop over list of classes on element
            for (let i = 0; i<classList.length; i++) {
                let cssClass = classList[i];

                // Loop over dictionary of width classes, look for matches
                for (const width in widthClasses) {
                    if (Object.hasOwn(widthClasses, width) &&
                    cssClass === widthClasses[width]) {
                        if (widthClass !== cssClass) {
                            element.classList.remove(cssClass);
                            element.classList.add(widthClass);
                            return;
                        } else {
                            return;
                        }
                    }
                }
            }
        }
    }

    windowResizeHandler = function () {
        var timeout = false, // holder for timeout id
            delay = 250; // delay after event is "complete" to run callback

        // window.resize event listener
        window.addEventListener('resize', function () {
            // clear the timeout
            clearTimeout(timeout);
            // start timing for event "completion"
            timeout = setTimeout(function () {
                // Functions to run on resize
                determineScreenSize();

            }, delay);
        });
    };

    determineScreenSize();
    windowResizeHandler();
})();