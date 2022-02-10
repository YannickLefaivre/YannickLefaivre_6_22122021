/**
 * For the code of this class, credit goes to:
 * 
 *  https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex#modals_and_keyboard_traps. 
 *  (The link to the place where I find the solution)
 * 
 * Github repo directory where to find the non-oriented object modified version of this code snippet : 
 * https://github.com/udacity/ud891/tree/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution
 *  
*/
export default class TrapTabKey {
    
    static init(event, modalOverlay) {

        const tabStops = TrapTabKey.firstAndLastFocusableElements(modalOverlay);

        // Check for TAB key press
        if (event.key === "Tab") {
    
            // SHIFT + TAB
            if (event.shiftKey) {

                if (document.activeElement === tabStops.firstTabStop) {

                    event.preventDefault();

                    tabStops.lastTabStop.focus();

                }
    
            // TAB
            } else {

                if (document.activeElement === tabStops.lastTabStop) {

                    event.preventDefault();

                    tabStops.firstTabStop.focus();

                }

            }
        }
    }

    static firstAndLastFocusableElements(modalOverlay) {

        // Find all focusable children
        var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
        var focusableElements = modalOverlay.querySelectorAll(focusableElementsString);

        // Convert NodeList to Array
        focusableElements = Array.prototype.slice.call(focusableElements);

        var firstTabStop = focusableElements[0];
        var lastTabStop = focusableElements[focusableElements.length - 1];

        return { firstTabStop, lastTabStop };

    }

}