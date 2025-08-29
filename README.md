# 台語變調視像化 taigi-sandhi-visualization

A browser extension/userscript that highlights tone sandhi changes in Taiwanese Hokkien romanization on the [MOE Taiwanese Dictionary](https://sutian.moe.edu.tw/).

![example](https://raw.githubusercontent.com/hey0wing/taigi-sandhi-visualization/main/readme/example.gif)

## Features

- **Tone Sandhi Highlighting**: 
    - Automatically detects and highlights tone changes in Taiwanese romanization text on the MOE dictionary site.
    - Tone changes for every syllable except for the last one in a phrase.
    - Only **南部 / Southern (漳州腔 / Zhangzhou)** sandhi is supported
- **Color Coding**:
    - **Red**: Normal tone sandhi.
    - **Blue**: Tone sandhi before the `-á` suffix.
    - **Green**: Neutral tones.
- **Tooltips**: Clicking a highlighted syllable to view the tone sandhi diagram.

## Installation

### Option 1: Browser Extension
- Install from the [Firefox Add-ons Store](https://addons.mozilla.org/en-US/firefox/addon/taigi-sandhi-visualization/) or [Chrome Web Store](https://chromewebstore.google.com/detail/ljkpjdedglglmhnggjhhapmdknjelppa).

### Option 2: Userscript Manager

| Platform | Supported Browsers | Userscript Manager |
|----------|--------------------|--------------------|
| Desktop  | Chrome, Brave, Safari, Firefox, Edge | Tampermonkey, Violentmonkey, Greasemonkey |
| Android  | Firefox, Edge      | Tampermonkey, Violentmonkey |
| iOS      | Safari             | Userscript (Free), Tampermonkey (USD 2.99) |


1. **Install via Userscript Manager (Alternative)**:
    - Follow the [Greasy Fork tutorial](https://greasyfork.org/en/help/installing-user-scripts) to install one.
        - Or install Tampermonkey (*Recommended*), Violentmonkey or Greasemonkey on your own
    -  **Add the Userscript**:
        - **Greasy Fork (Recommended)**: Click [Here](https://greasyfork.org/en/scripts/545891-taigi-sandhi-visualization) and install the script directly by clicking "Install this script".
        - Otherwise, copy the script directly from [`taigi-sandhi-visualization.user.js`](https://raw.githubusercontent.com/hey0wing/taigi-sandhi-visualization/main/taigi-sandhi-visualization.user.js), and paste the code.

## Planned Improvements

- Add tone sandhi for [other regions](https://zh.wikipedia.org/zh-hk/閩南語音系#一般聲調)
    - **北部 / Northern (偏泉腔 / Quanzhou-alike)** (5 -> 3)
    - **海口 / Coastal (泉州腔 / Quanzhou)** (2 -> 5; 5,6,7,8 -> 6)
- Add Chao's Tone letter / Pitch contour for visualization
    - Real-time audio conversion(?)

## Credits

- Inspired by [https://github.com/Aiuanyu/KIPSutian-autoplay](https://github.com/Aiuanyu/KIPSutian-autoplay)
- Inspired by [https://github.com/andreihar/taibun.js](https://github.com/andreihar/taibun.js)

## License
This project is licensed under the [MIT License](LICENSE).