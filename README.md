# 台語變調視像化 taigi-sandhi-visualization

Highlights tone sandhi changes in Taiwanese romanization on the MOE dictionary site.

![example](https://raw.githubusercontent.com/hey0wing/taigi-sandhi-visualization/main/readme/example.gif)

## Features

- **Tone Sandhi Highlighting**: 
    - Automatically detects and highlights tone changes in Taiwanese romanization text on the MOE dictionary site.
    - Tone changes for every syllable except for the last one in a phrase.
    - Tone sandhi for three common [accents](https://zh.wikipedia.org/zh-hk/閩南語音系#一般聲調)
        - **南部腔 Southern (偏漳腔 Zhangzhou-leaning)**
        - **北部腔 Northern (偏泉腔 Quanzhou-leaning)**
        - **海口腔 Seaport / Coastal (泉州腔 Quanzhou)**
- **Color Coding**:
    - **Red**: Normal tone sandhi.
    - **Blue**: Tone sandhi before the `-á` suffix.
    - **Green**: Neutral tones.
- **Tooltips**: Clicking a highlighted syllable to view the tone sandhi diagram.

## Installation

- **Note**: Device & browser compatibility
    - Desktop: Chrome, Brave, Safari, Firefox, Edge
    - Android: *Firefox* or *Edge*
    - iOS: Safari with *Userscript* (Free) or *Tampermonkey* (USD2.99)

1. **Install via Firefox Extension (Recommended for Firefox users)**:
    - Add directly from the Firefox Add-ons store: [Taigi Sandhi Visualization](https://addons.mozilla.org/en-US/firefox/addon/taigi-sandhi-visualization/).

2. **Install via Userscript Manager (Alternative)**:
    - Follow the [Greasy Fork tutorial](https://greasyfork.org/en/help/installing-user-scripts) to install one.
        - Or install Tampermonkey (*Recommended*), Violentmonkey or Greasemonkey on your own
    -  **Add the Userscript**:
        - **Greasy Fork (Recommended)**: Click [Here](https://greasyfork.org/en/scripts/545891-taigi-sandhi-visualization) and install the script directly by clicking "Install this script".
        - Otherwise, copy the script directly from [`taigi-sandhi-visualization.user.js`](https://raw.githubusercontent.com/hey0wing/taigi-sandhi-visualization/main/taigi-sandhi-visualization.user.js), and paste the code.
3. **Visit the MOE Dictionary**:
    - Navigate to [sutian.moe.edu.tw](https://sutian.moe.edu.tw/). The script will automatically process Taiwanese romanization text.

## Planned Improvements

- Add Chao's Tone letter / Pitch contour for visualization
    - Real-time audio conversion(?)

## Credits

- Inspired by [https://github.com/Aiuanyu/KIPSutian-autoplay](https://github.com/Aiuanyu/KIPSutian-autoplay)
- Inspired by [https://github.com/andreihar/taibun.js](https://github.com/andreihar/taibun.js)