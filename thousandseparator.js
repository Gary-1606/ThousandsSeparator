
/**
 * Converts a number input into thousand values
 * 100000000 ==> 100,000,000
 * 10000.12 ==> 100,00.12
 *  */

(function (root) {
    var library = {};


    library.thousandSeparator = function (number) {
        // Resursively format arrays:
        if (Array.isArray(number)) {
            return map(number, function (val) {
                return thousandSeparator(val);
            });
        }
        if (!isNaN(number)) {
            //convering the number to a string inorder to access the string methods
            var number = number.toString();
            var decimalpart = number.split('.')[1];
            //converting the number to a whole number
            number = parseInt(number).toString();
            if (number.length < 3) {
                return number;
            }
            else {
                var mod = (number.length) % 3;
                // separating the number for the first comma - Try with 10000 and 1000000 as examples
                var firstpart = mod ? (number.substr(0, mod) + ',') : '';
                //Taking all the other characters as a part
                var secondpart = number.substr(mod);
                //match 3 consecutive digits that are followed by a digit ==> 0000000 --> 000,000,0
                secondpart = secondpart.replace(/(\d{3})(?=\d)/g, '$1' + ',');
                //combine the parts
                if (decimalpart !== undefined) {
                    return (firstpart + secondpart + '.' + decimalpart);
                }
                return (firstpart + secondpart);
            }
        }
    }


    /* --- Module Definition --- */

    // Export conversionlib for CommonJS. If being loaded as an AMD module, define it as such.
    // Otherwise, just add `conversionlib` to the global object
    // Credits: Underscore.js
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = library;
        }
        exports.conversionlib = library;
    } else if (typeof define === 'function' && define.amd) {
        // Return the library as an AMD module:
        define([], function () {
            return library;
        });
    } else {
        var oldconversionlib = root.conversionlib;
        lib.noConflict = function () {
            root.conversionlib = oldconversionlib;
            return library;
        }
        // Declare `fx` on the root (global/window) object:
        root['conversionlib'] = library;
    }

})(this);

