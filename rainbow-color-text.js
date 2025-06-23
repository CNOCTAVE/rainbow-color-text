// rainbow-color-text - rainbow color text.
// Copyright (C) 2024-2025  Yu Hongbo, CNOCTAVE

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.RainbowColorText = factory());
}(this, (function () {
    'use strict';

    class RainbowColorText {
        constructor(colors, 
            className = 'rainbow-color-text') {
            this.styleId = 'rainbow-color-text-style';
            this.colors = colors;
            this.className = className || 'rainbow-color-text';
            this._createStyleElement();
            this._createStyle();
        }

        static init(colors, className = 'rainbow-color-text') {
            if (!Array.isArray(colors) || colors.length < 2) {
                console.error('RainbowColorText.init() requires an array of at least 2 color values');
                return false;
            }
            return new RainbowColorText(colors, className);
        }

        addTo(element) {
            if (!element || !element.classList) {
                console.error('Invalid DOM element provided');
                return false;
            }

            element.classList.add(this.className);
            return true;
        }

        removeFrom(element) {
            if (!element || !element.classList) {
                console.error('Invalid DOM element provided');
                return false;
            }

            element.classList.remove(this.className);
            return true;
        }

        getCSSCode() {
            return `
.${this.className} {
    background-image: -webkit-linear-gradient(90deg, ${this.colors.join(', ')});
    -webkit-background-clip: text;
    color: transparent;
}
            `.trim();
        }

        getCSSText() {
            return `
background-image: -webkit-linear-gradient(90deg, ${this.colors.join(', ')});
-webkit-background-clip: text;
color: transparent;
            `.trim();
        }

        _createStyleElement() {
            var style = document.getElementById(this.styleId);
            if (!style) {
                style = document.createElement('style');
                style.id = this.styleId;
                document.head.appendChild(style);
            }
        }

        _createStyle() {
            const style = document.getElementById(this.styleId);
            style.textContent += this.getCSSCode();
        }

        removeStyleElement() {
            const existingStyle = document.getElementById(this.styleId);
            if (existingStyle) {
                document.head.removeChild(existingStyle);
            }
        }
    }

    return RainbowColorText;
})));