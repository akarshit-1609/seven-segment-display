class Seven_segment_display {
    static #cssLoaded = false;
    #truth_table = {
        0: [1, 1, 1, 1, 1, 1, 0],
        1: [0, 1, 1, 0, 0, 0, 0],
        2: [1, 1, 0, 1, 1, 0, 1],
        3: [1, 1, 1, 1, 0, 0, 1],
        4: [0, 1, 1, 0, 0, 1, 1],
        5: [1, 0, 1, 1, 0, 1, 1],
        6: [1, 0, 1, 1, 1, 1, 1],
        7: [1, 1, 1, 0, 0, 0, 0],
        8: [1, 1, 1, 1, 1, 1, 1],
        9: [1, 1, 1, 1, 0, 1, 1],
        "-": [0, 0, 0, 0, 0, 0, 1],
        "E": [1, 0, 0, 1, 1, 1, 1]
    };
    #segments = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    #element = undefined;
    #segmentsModule = undefined;
    #number = null;
    #digits = 1;
    #sizePX = 5;
    #onColour = "#ff0000";
    #offColour = "#00000015";
    #offOpacity = 0.5;
    #allActive = false;
    constructor(elementId, {
        digits = this.#digits,
        size = this.#sizePX,
        onColour = this.#onColour,
        offColour = this.#offColour,
        offOpacity = this.#offOpacity,
        allActive = this.#allActive
    }) {
        Seven_segment_display.#loadCSS();
        this.#element = document.getElementById(elementId);
        if (!this.#element) {
            throw new Error("Element not found");
        } else if (typeof digits !== "number" || !Number.isInteger(digits)) {
            throw new Error("Digits must be a positive integer.");
        } else if (digits <= 0) {
            throw new Error("Digits must be a positive integer.");
        } else if (typeof size !== "number" || !Number.isInteger(size)) {
            throw new Error("Size must be a positive integer.");
        } else if (size <= 0) {
            throw new Error("Size must be a positive integer.");
        } else if (typeof offOpacity !== "number" || Number.isNaN(offOpacity)) {
            throw new Error("Opacity must be a number which lie between 0 and 1.");
        } else if (offOpacity < 0 || offOpacity > 1) {
            throw new Error("Opacity must lie between 0 and 1.");
        } else if (typeof allActive !== "boolean") {
            throw new Error("All active must a boolean");
        }
        this.#digits = digits;
        this.#sizePX = size;
        this.#onColour = onColour;
        if (offColour !== "") {
            this.#offColour = offColour;
        }
        this.#offOpacity = offOpacity;
        this.#allActive = allActive;
        this.#segmentsModule = document.createElement("div");
        this.#segmentsModule.classList.add("seven-segments-light-emitting-diode-display-module");
        this.#segmentsModule.style.setProperty("font-size", this.#sizePX + "px");
        this.#element.innerHTML = "";
        this.#segmentsSetup(this.#digits);
        this.#element.appendChild(this.#segmentsModule);
    }

    static #loadCSS() {
        if (Seven_segment_display.#cssLoaded) return;
        const cssURL = "https://akarshit-1609.github.io/seven-segment-display/style.css";
        const alreadyLoaded = [...document.querySelectorAll('link[rel="stylesheet"]')]
            .some(link => link.href === cssURL);
        if (alreadyLoaded) {
            Seven_segment_display.#cssLoaded = true;
            return;
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssURL;
        document.head.appendChild(link);
        Seven_segment_display.#cssLoaded = true;
    }

    #segmentsSetup(digit) {
        this.#segmentsModule.innerHTML = "";
        for (let i=0; i<digit; i++){
            const oneDigit = document.createElement("div");
            oneDigit.classList.add("seven-segments-light-emitting-diode-one-digit-display");
            this.#segments.forEach(s => {
                const segment = document.createElement("div");
                segment.classList.add(`seven-segments-light-emitting-diode-segment-${s}`);
                segment.style.setProperty("--seven-segments-light-emitting-diode-colour", this.#offColour);
                oneDigit.appendChild(segment);
                segment.style.opacity = this.#offOpacity;
            });
            const dot = document.createElement("div");
            dot.classList.add("seven-segments-light-emitting-diode-decimal-point-display-non-integer-number");
            dot.style.setProperty("--seven-segments-light-emitting-diode-colour", this.#offColour);
            dot.style.opacity = this.#offOpacity;
            this.#segmentsModule.appendChild(oneDigit);
            this.#segmentsModule.appendChild(dot);
        }
        if (this.#allActive) {
            this.#resetModule();
        }
    }

    #isValidNumber(val) {
        const str = String(val).trim();
        if (Number.isNaN(Number(str)) || str === '') {
            console.error("Invalid Number.");
            return false;
        }
        if (str.replace('.', '').length > this.#digits) {
            console.error("The digit limit has been exceeded.");
            return false;
        }
        if (Number(str) < 0 && this.#allActive) {
            console.error("Negative number does not support during all active segments.");
            return false;
        }
        return true;
    }

    #resetModule() {
        const allDigits = this.#segmentsModule.querySelectorAll(".seven-segments-light-emitting-diode-one-digit-display");
        const allDots = this.#segmentsModule.querySelectorAll(".seven-segments-light-emitting-diode-decimal-point-display-non-integer-number");
        for (let i=0; i<allDigits.length; i++){
            this.#segments.forEach((s, j) => {
                const segment = allDigits[i].querySelector(`.seven-segments-light-emitting-diode-segment-${s}`);
                if (this.#allActive){
                    segment.style.setProperty("--seven-segments-light-emitting-diode-colour", 
                        this.#truth_table[0][j] === 1 ? this.#onColour : this.#offColour
                    );
                    if (this.#truth_table[0][j] === 1) {
                        segment.style.opacity = 1;
                    } else {
                        segment.style.opacity = this.#offOpacity;
                    }
                } else {
                    segment.style.setProperty("--seven-segments-light-emitting-diode-colour", 
                        this.#offColour
                    );
                    segment.style.opacity = this.#offOpacity;
                }
            });
            allDots[i].style.setProperty("--seven-segments-light-emitting-diode-colour", this.#offColour);
            allDots[i].style.opacity = this.#offOpacity;
        }
    }

    changeDigits(digits) {
        if (typeof digits !== "number" || !Number.isInteger(digits)) {
            console.error("Digits must be a positive integer.");
            return;
        } else if (digits <= 0) {
            console.error("Digits must be a positive integer.");
            return;
        }
        this.#digits = digits;
        this.#segmentsSetup(this.#digits);
        this.write(this.#number);
    }

    changeSize(size) {
        if (typeof size !== "number" || !Number.isInteger(size)) {
            console.error("Size must be a positive integer.");
            return;
        } else if (size <= 0) {
            console.error("Size must be a positive integer.");
            return;
        }
        this.#sizePX = size;
        this.#segmentsModule.style.setProperty("font-size", this.#sizePX + "px");
        this.write(this.#number);
    }

    changeOnColour(colour) {
        this.#onColour = colour;
        this.write(this.#number);
    }
    changeOffColour(colour) {
        if (colour !== ""){
            this.#offColour = colour;
            this.write(this.#number);
        }
    }

    changeOffOpacity(opacity) {
        if (typeof opacity !== "number" || Number.isNaN(opacity)) {
            console.error("Opacity must be a number which lie between 0 and 1.");
            return;
        } else if (opacity < 0 || opacity > 1) {
            console.error("Opacity must lie between 0 and 1.");
            return;
        }
        this.#offOpacity = opacity;
        this.write(this.#number);
    }

    changeAllActive(val) {
        if (typeof val !== "boolean") {
            console.error("All active must a boolean");
            return;
        } else if (this.#number < 0 && val) {
            console.error("Operation suspended due to negative number.");
            return false;
        }
        this.#allActive = val;
        this.write(this.#number);
    }
    
    write(number) {
        if (number === undefined){
            return;
        }
        this.#resetModule();
        this.#number = number;
        if (this.#number === null){
            return;
        }
        const allDigits = this.#segmentsModule.querySelectorAll(".seven-segments-light-emitting-diode-one-digit-display");
        const allDots = this.#segmentsModule.querySelectorAll(".seven-segments-light-emitting-diode-decimal-point-display-non-integer-number");
        if (!this.#isValidNumber(this.#number)) {
            const lastDigit = allDigits[allDigits.length - 1];
            this.#segments.forEach((s, i) => {
                const segment = lastDigit.querySelector(`.seven-segments-light-emitting-diode-segment-${s}`);
                segment.style.setProperty("--seven-segments-light-emitting-diode-colour", 
                    this.#truth_table["E"][i] === 1 ? this.#onColour : this.#offColour
                );
                if (this.#truth_table["E"][i] === 1) {
                    segment.style.opacity = 1;
                } else {
                    segment.style.opacity = this.#offOpacity;
                }
            });
            return;
        }
        const numberStr = this.#number.toString();
        const numberArr = [...numberStr.split('.').join('')];
        const dotIndexFromLast = numberStr.includes('.') ? (numberStr.length - 1) - numberStr.lastIndexOf('.') : -1;
        let numIndex = 0;
        for (let i=allDigits.length-numberArr.length; i<allDigits.length; i++){
            this.#segments.forEach((s, j) => {
                const segment = allDigits[i].querySelector(`.seven-segments-light-emitting-diode-segment-${s}`);
                segment.style.setProperty("--seven-segments-light-emitting-diode-colour", 
                    this.#truth_table[numberArr[numIndex]][j] === 1 ? this.#onColour : this.#offColour
                );
                if (this.#truth_table[numberArr[numIndex]][j] === 1) {
                    segment.style.opacity = 1;
                } else {
                    segment.style.opacity = this.#offOpacity;
                }
            });
            numIndex++;
        }
        if (dotIndexFromLast != -1) {
            allDots[allDots.length - 1 - dotIndexFromLast].style.setProperty("--seven-segments-light-emitting-diode-colour", this.#onColour);
            allDots[allDots.length - 1 - dotIndexFromLast].style.opacity = 1;
        }
    }
}

window.Seven_segment_display = Seven_segment_display;