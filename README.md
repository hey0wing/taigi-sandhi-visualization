# 台語變調視像化 taigi-sandhi-visualization

Highlights tone sandhi changes in Taiwanese romanization on the MOE dictionary site. Changed tones are marked in red with a tooltip showing possible base tone → sandhi tone.

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

- **Note**: Device capatibility
    - Desktop: Chrome, Brave, Safari, Firefox, Edge are supported.
    - Android: Only *Firefox* and *Edge* are supported devices due to userscript manager availability.
    - iOS: To be tested...

1. **Install a Userscript Manager**:
    - Follow the [Greasy Fork tutorial](https://greasyfork.org/en/help/installing-user-scripts) to install one.
    - Or install Tampermonkey (*Recommended*), Violentmonkey or Greasemonkey on your own
2. **Add the Userscript** (if not using Greasy Fork):
    - **Recommended**: Install the script directly via [Greasy Fork](https://greasyfork.org/en/scripts/545891-taigi-sandhi-visualization) by clicking "Install this script".
    - Otherwise, copy the script directly from [`taigi-sandhi-visualization.user.js`](https://raw.githubusercontent.com/hey0wing/taigi-sandhi-visualization/main/taigi-sandhi-visualization.user.js).
        - Open your userscript manager, create a new script, and paste the code.
3. **Visit the MOE Dictionary**:
    - Navigate to [sutian.moe.edu.tw](https://sutian.moe.edu.tw/). The script will automatically process Taiwanese romanization text.

## Planned Improvements

- Add tone sandhi for [other regions](https://zh.wikipedia.org/zh-hk/閩南語音系#一般聲調)
    - **北部 / Northern (偏泉腔 / Quanzhou-alike)** (5 -> 3)
    - **海口 / Coastal (泉州腔 / Quanzhou)** (2 -> 5; 5,6,7,8 -> 6)
- Add Chao's Tone letter / Pitch contour for visualization
    - Real-time audio conversion(?)

## Credits

- Inspired by [https://github.com/Aiuanyu/KIPSutian-autoplay](https://github.com/Aiuanyu/KIPSutian-autoplay)
- Inspired by [https://github.com/andreihar/taibun.js](https://github.com/andreihar/taibun.js)