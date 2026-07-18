# Seven Segment Display

A lightweight, powerful JavaScript library for building interactive seven-segment displays on the web. Render digital numbers with real-time updates, extensive customization, and effortless integration into any HTML element.

🚀 **[View the Live Demo on GitHub Pages](https://akarshit-1609.github.io/seven-segment-display/example/demo.html)**

---

## 📦 Installation

Since this library is hosted on GitHub Pages, you don't need to install anything via NPM. Simply include the script tag inside the `<head>` or at the end of the `<body>` of your HTML file:

```html
<script src="https://akarshit-1609.github.io/seven-segment-display/script.js"></script>

```



## 🚀 Quick Start

To use the library, you need a target HTML element (like a `<div>`) with a unique `id`. You then initialize the object in your JavaScript by passing that ID and an optional configuration object.

### 1. The Target Element

Create an element in your HTML:

```html
<div id="your_element_id"></div>

```

*Note: The `Element_ID` passed to the constructor will simply be `"your_element_id"`.*

### 2. Initialization

Create a new instance of `Seven_segment_display`:

```javascript
const obj = new Seven_segment_display("your_element_id", {
    digits:2,
    size:10,
    onColour: "red",
    offColour: "grey",
    offOpacity: 0.1,
    allActive: false
});

```

---

## ⚙️ Configuration (`data` parameter)

The second argument in the constructor is the `data` object. It is **optional** and accepts a JSON object for dynamic arguments.

Here are the available properties, their types, and limitations:

| Property | Type | Example | Constraints & Limits | Description |
| --- | --- | --- | --- | --- |
| **`digits`** | `Number` | `2` | **Strictly > 0** | A positive integer used for create module for each digits. Cannot be negative or zero. |
| **`size`** | `Number` | `10` | **Strictly > 0** | A positive integer used for scaling. Cannot be negative or zero. |
| **`onColour`** | `String` | `"red"` | **Only Colour** | To set colour of active segments. |
| **`offColour`** | `String` | `"grey"` | **Only Colour** | To set colour of deactive segments. |
| **`offOpacity`** | `Number` | `0.2` | **0.0 to 1.0** | A float value representing opacity of deactive segments. |
| **`allActive`** | `Boolean` | `true` | `true` / `false` | If `true` then rest of the module exclude number show zero and not support `true` with negative number. Default is false. |

---

## 🛠️ Methods

Once instantiated, your object has access to several methods to execute tasks or update arguments dynamically.

### Core Method

* **`obj.write(number)`**
The main execution method of the library. It processes the given number based on the current configuration and renders the output to your target `Element_ID`.

### Dynamic Setters

You can change the configuration parameters on the fly without recreating the object:

* **`obj.changeDigits(positiveNumber)`** — Updates the `digits` parameter (e.g., `obj.changeDigits(4)`).
* **`obj.changeSize(positiveNumber)`** — Updates the `size` parameter (e.g., `obj.changeSize(12)`).
* **`obj.changeOnColour(stringValue)`** — Updates the `onColour` parameter (e.g., `obj.changeOnColour("blue")`).
* **`obj.changeOffColour(stringValue)`** — Updates the `offColour` parameter (e.g., `obj.changeOffColour("yellow")`).
* **`obj.changeOffOpacity(floatValue)`** — Updates the `offOpacity` parameter (e.g., `obj.changeOffOpacity(0.8)`).
* **`obj.changeAllActive(booleanValue)`** — Updates the `allActive` parameter (e.g., `obj.changeAllActive(true)`).

---

## 💻 Complete Example

Here is a full, working HTML template demonstrating how to import, configure, and manipulate `Seven_segment_display`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seven Segment Display Library Demo</title>
    
    <!-- 1. Import the library directly from GitHub Pages -->
    <script src="https://akarshit-1609.github.io/seven-segment-display/script.js"></script>
</head>
<body>

    <!-- 2. Create the target DOM element with a unique ID -->
    <div id="your_element_id"></div>

    <script>
        // 3. Define the dynamic arguments (data JSON)
        // Ensure you follow the type and constraint limits
        const configData = {
            digits:2,           // Positive number (>0)
            size:10,            // Positive number (>0)
            onColour: "red",    // String (Colour)
            offColour: "grey",  // String (Colour)
            offOpacity: 0.1,    // Float between 0.0 and 1.0
            allActive: false    // Boolean
        };

        // 4. Initialize the object
        // First parameter is the Element_ID ("your_element_id"), second is the data JSON
        const obj = new Seven_segment_display("your_element_id", configData);

        // 5. Execute the main method with a test value
        obj.write(5);

        // 6. Update arguments dynamically on the fly
        // The library will adapt to these new settings
        obj.changeDigits(4);
        obj.changeSize(12);
        obj.changeOffOpacity(0.2);
        
        // Execute again
        obj.write(108);
    </script>
</body>
</html>

```

```

```

---

## 📜 License

This project is licensed under the **GNU Lesser General Public License Version 3 (LGPLv3)**.

You are free to use, modify, and distribute this library, even in proprietary or commercial projects, provided that you comply with the terms of the LGPLv3. Any modifications to this library itself must be released under the same license.

For the full license text, please see the [LICENSE](LICENSE) file in this repository or visit the [official GNU website](https://www.gnu.org/licenses/lgpl-3.0.html).