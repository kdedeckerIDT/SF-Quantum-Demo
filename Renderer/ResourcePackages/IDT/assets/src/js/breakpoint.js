export class Breakpoint {
    widthClass = "";
    widthClasses = {
        'extra-small': 'w-xs',
        'small': 'w-sm',
        'medium': 'w-md',
        'large': 'w-lg',
        'extra-large': 'w-xl',
        'extra-extra-large': 'w-xxl'
    };
    determineScreenSize = function() {
        var docWidth = viewport().width;
        var widthClass = "";

        if (docWidth >= 1400) {
            widthClass = this.widthClasses['extra-extra-large'];
        } else if (docWidth >= 1200) {
            widthClass = this.widthClasses['extra-large'];
        } else if (docWidth >= 992) {
            widthClass = this.widthClasses['large'];
        } else if (docWidth >= 768) {
            widthClass = this.widthClasses['medium'];
        } else if (docWidth >= 576) {
            widthClass = this.widthClasses['small'];
        } else {
            widthClass = this.widthClasses['extra-small'];
        }

        /*
        if (docWidth < 576) {
            widthClass = this.widthClasses['x-small'];
        } else if (docWidth >= 450 && docWidth < 737) {
            widthClass = this.widthClasses['small'];
        } else if (docWidth >= 738 && docWidth < 961) {
            widthClass = this.widthClasses[''];
        } else if (docWidth >= 962 && docWidth < 1117) {
            widthClass = "w-lg";
        } else {
            widthClass = "w-xl"
        }
        */

        window.widthClass = widthClass;
        window.breakpointsObj = this.widthClasses;

        const htmlEl = document.getElementsByTagName( 'html' )[0]; // '0' to assign the first (and only `HTML` tag)
        updateWidthClass(htmlEl, widthClass);

        function viewport() {
            const e = window, a = 'inner';
            if (!('innerWidth' in window )) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
        }

        function updateWidthClass(element, widthClass) {
            const classList = element.classList;

            if (classList.length <= 0) {
                element.classList.add(widthClass);
                return;
            }

            // Check for any existing width classes and update if necessary
            // Loop over list of classes on element
            for (let i = 0; i<classList.length; i++) {
                let cssClass = classList[i];

                // Loop over dictionary of width classes, look for matches
                for (const width in this.widthClasses) {
                    if (Object.hasOwn(this.widthClasses, width) &&
                    cssClass === this.widthClasses[width]) {
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
    };
    windowResizeHandler = function () {
        let timeout = false, // holder for timeout id
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

    constructor() {
        determineScreenSize();
        windowResizeHandler();
    }
}
// Set window breakpoint values to be accessed by other scripts