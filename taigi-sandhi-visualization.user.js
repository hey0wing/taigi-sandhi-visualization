// ==UserScript==
// @name        taigi-sandhi-visualization
// @namespace   hey0wing
// @version     1.3
// @description Highlights tone sandhi changes in Taiwanese romanization on the MOE dictionary site. Changed tones are marked in red with a tooltip showing possible base tone → sandhi tone.
// @author      hey0wing
// @match       https://sutian.moe.edu.tw/*
// @run-at      document-idle
// @grant        GM_setValue
// @grant        GM_getValue
// @license     MIT
// ==/UserScript==

(() => {
    'use strict';
    
    function refreshLang() {
        const lang_region = document.getElementById('lang_setting')
        if (!lang_region) return
        lang_region.outerHTML = `
            <div id="lang_setting" class="d-flex justify-content-between">
                <div class="w-25 d-flex justify-content-around">
                    ${[["N", "南"], ["S", "北"], ["C", "海"]].map(([en, zh], i) => {
                        let color = GM_getValue('region', 'N')==en ? 'selected' : 'not_selected'
                        let val = GM_getValue('lang', 'zh')=='zh' ? zh : en
                        return `<button data-val="${en}" class="btn region ${color}">${val}</button>
                    `}).join('')}
                </div>
                <div class="w-25 d-flex justify-content-around">
                    ${[["zh", "中"], ["en", "Eng"]].map(([k, v], i) => {
                        let color = GM_getValue('lang', 'zh')==k ? 'selected' : 'not_selected'
                        return `<button data-val="${k}" class="btn lang ${color}">${v}</button>
                    `}).join('')}
                </div>
            </div>
        `
    }

    function refreshSandhi() {
        const sandhi_diagram = document.getElementById('sandhi_diagram')
        if (!sandhi_diagram) return
        if (GM_getValue('color') == 'red') {
            sandhi_diagram.innerHTML = `<svg width="250" height="150" xmlns="http://www.w3.org/2000/svg">
                <!-- Grid of numbers -->
                <text id="1" x="25" y="25" font-size="12" text-anchor="middle" alignment-baseline="central">1</text>
                <text id="2" x="125" y="25" font-size="12" text-anchor="middle" alignment-baseline="central">2</text>
                <text id="4" x="225" y="25" font-size="12" text-anchor="middle" alignment-baseline="central">4</text>
                <text id="5" x="75" y="75" font-size="12" text-anchor="middle" alignment-baseline="central">5</text>
                <text id="7" x="25" y="125" font-size="12" text-anchor="middle" alignment-baseline="central">7</text>
                ${GM_getValue('region')=='C' ? 
                    `<text id="3" x="125" y="75" font-size="12" text-anchor="middle" alignment-baseline="central">3</text>
                    <text id="6" x="125" y="125" font-size="12" text-anchor="middle" alignment-baseline="central">6</text>` :
                    `<text id="3" x="125" y="125" font-size="12" text-anchor="middle" alignment-baseline="central">3</text>`
                }
                <text id="8" x="225" y="125" font-size="12" text-anchor="middle" alignment-baseline="central">8</text>
                
                <text id="4h" x="175" y="15" font-size="12" text-anchor="middle" alignment-baseline="central">-h</text>
                <text id="8h" x="175" y="115" font-size="12" text-anchor="middle" alignment-baseline="central">-h</text>
                <text id="ptk" x="205" y="75" font-size="12" text-anchor="middle" alignment-baseline="central">-p,t,k</text>
                
                <!-- Horizontal arrows -->
                <path id="2_1" d="M115 25 H35" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
                <path id="4_2" d="M215 25 H135" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
                <path id="7_3" d="M35 125 H115" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
                <path id="8_3" d="M215 125 H135" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
                
                <!-- Vertical arrows -->
                <path id="1_7" d="M25 35 V115" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
                <path id="3_2" d="${GM_getValue('region')=='C'?'M125 65 V35':'M125 115 V35'}" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
                <path id="4_8" d="M225 35 V115" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
                <path id="8_4" d="M225 115 V35" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
                
                <!-- Diagonal arrows -->
                <path id="${{'N': '5_7', 'S': '5_3', 'C': '5_6'}[GM_getValue('region')]}" 
                    d="${GM_getValue('region')=='N'?'M70 85 L30 120':'M80 85 L120 120'}"
                    stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
                
                <!-- arrow definition -->
                <defs>
                <marker id="arrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="black"/>
                </marker>
                <marker id="arrow_red" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="red"/>
                </marker>
                </defs>
            </svg>`
        } else {
            sandhi_diagram.innerHTML = `<svg width="250" height="150" xmlns="http://www.w3.org/2000/svg">
                <!-- Grid of numbers -->
                <text id="2,3" x="25" y="25" font-size="12" text-anchor="middle" alignment-baseline="central">2,3</text>
                <text id="1" x="125" y="25" font-size="12" text-anchor="middle" alignment-baseline="central">1</text>
                <text id="4" x="225" y="25" font-size="12" text-anchor="middle" alignment-baseline="central">4</text>
                <text id="5" x="25" y="125" font-size="12" text-anchor="middle" alignment-baseline="central">5</text>
                <text id="7" x="125" y="125" font-size="12" text-anchor="middle" alignment-baseline="central">7</text>
                <text id="8" x="225" y="125" font-size="12" text-anchor="middle" alignment-baseline="central">8</text>

                <text id="4h" x="175" y="15" font-size="12" text-anchor="middle" alignment-baseline="central">-h</text>
                <text id="8h" x="175" y="115" font-size="12" text-anchor="middle" alignment-baseline="central">-h</text>
                <text id="ptk" x="205" y="75" font-size="12" text-anchor="middle" alignment-baseline="central">-p,t,k</text>

                <!-- Horizontal arrows -->
                <path id="2,3_1" d="M40 25 H115" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
                <path id="4_1" d="M215 25 H135" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
                <path id="5_7" d="M35 125 H115" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
                <path id="8_7" d="M215 125 H135" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>

                <!-- Vertical arrows -->
                <path id="1_7" d="M125 35 V115" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
                <path id="4_8" d="M225 35 V115" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
                <path id="8_4" d="M225 115 V35" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>

                <!-- arrow definition -->
                <defs>
                    <marker id="arrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                        <polygon points="0 0, 6 2, 0 4" fill="black"/>
                    </marker>
                    <marker id="arrow_blue" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                        <polygon points="0 0, 6 2, 0 4" fill="blue"/>
                    </marker>
                </defs>
            </svg>`
        }
        let id = GM_getValue('id')
        if (id == '4_8') document.getElementById('8_4').remove();
        if (id == '8_4') document.getElementById('4_8').remove();
        if (['2_1', '3_1'].includes(id) && GM_getValue('color') == 'blue') id = '2,3_1'

        if (id == '7_7' || id == '6_6') {
            const text = document.getElementById(id.slice(0,1));
            text.setAttribute('fill', GM_getValue('color'));
            text.setAttribute('font-size', 16);
        } else {
            const path = document.getElementById(id);
            path.setAttribute('stroke', GM_getValue('color'));
            path.setAttribute('marker-end', `url(#arrow_${GM_getValue('color')})`);
        }
    }

    let sandhi_isH = {
        // suffix === á
        true:   { 8: 5, 4: 2 },
        // suffix !== á
        false:  { 8: 3, 4: 2 },
    }
    let sandhi_map = {
        // suffix === á
        true:   { 1: 7, 2: 1, 3: 1, 5: 7, 7: 7, 4: 8, 8: 4 },
        // suffix !== á
        false:  { 1: 7, 2: 1, 3: 2, 5: 7, 7: 3, 4: 8, 8: 4 },
    }

    // Function to get the tone number from a syllable
    function getTone({syllable='', sandhi='', suffix='', neutral=null}) {
        const isChecked = /[pthk]\.?$/.test(syllable);
        const isH = /[h]$/.test(syllable);
        const normalized = syllable.normalize('NFD');
        
        let tone = null;
        for (let i = 0; i < normalized.length; i++) {
            const code = normalized.charCodeAt(i);
            if (code >= 0x0300 && code <= 0x036F) { // Combining diacritics
                tone =  code === 0x0301 ? 2 :
                        code === 0x0300 ? 3 :
                        code === 0x0302 ? 5 :
                        code === 0x0304 ? 7 :
                        code === 0x030D ? 8 :
                        code === 0x030C ? 6 :
                        code === 0x030B && 9
            }
        }
        tone ??= isChecked ? 4 : 1

        if (neutral=='before') return { tone: tone, sandhi: null, color: 'green', display: tone }
        if (neutral=='after') return { tone: 0, sandhi: null, color: 'green', display: 0 }

        let sandhi_t = (tone != 6 && tone != 9 && sandhi) ? (isH ? sandhi_isH[suffix == 'á'][tone] : sandhi_map[suffix == 'á'][tone]) : null
        return {
            tone: tone,
            sandhi: sandhi_t,
            color: sandhi_t ? (suffix == 'á' ? 'blue': 'red') : null,
            display: sandhi_t ? sandhi_t : tone,
        }
    }

    // Modified from https://github.com/andreihar/taibun.js
    function isCjk(input) {
        return [...input].some(char => {
            const code = char.codePointAt(0);
            return (
                (0x4E00 <= code && code <= 0x9FFF) ||  // BASIC
                (0x3400 <= code && code <= 0x4DBF) ||  // Ext A
                (0x20000 <= code && code <= 0x2A6DF) ||  // Ext B
                (0x2A700 <= code && code <= 0x2EBEF) ||  // Ext C,D,E,F
                (0x30000 <= code && code <= 0x323AF) ||  // Ext G,H
                (0x2EBF0 <= code && code <= 0x2EE5F)  // Ext I
            );
        });
    }

    function highlightSandhi(text) {
        const words = text.replace('/',' / ').split(/\s+/);
        return `
        <div class="d-flex flex-row flex-wrap align-items-end">
            ${words.map((v1, i) => {
                let w1 = v1.split('--');
                return w1.map((v2, j) => {
                    let word = v2.split('-');
                    return word.map((v3, k) => {
                        if (v3 === '/') return '<div>/</div>';
                        let tone;
                        if (k === word.length - 1 && j !== w1.length - 1) {
                            // Word before 輕聲 neutral tone
                            tone = getTone({ syllable: v3, neutral: 'before' });
                        } else if (k === 0 && j !== 0) {
                            // Word after 輕聲 neutral tone
                            tone = getTone({ syllable: v3, neutral: 'after' });
                        } else if (word.length === 1 && i !== words.length - 1 && ![',','.','!'].some(x => v3.includes(x))) {
                            // Monosyllabic and not the final word
                            tone = getTone({ syllable: v3, sandhi: true, suffix: words[i + 1] });
                        } else {
                            tone = getTone({ syllable: v3, sandhi: k !== word.length - 1, suffix: word[k + 1] });
                        }
                        return `
                            <div>
                                <div class="syllable-cell ${tone.color}" 
                                    data-color="${tone.color}" 
                                    data-tone="${tone.tone}" 
                                    data-sandhi="${tone.sandhi}">
                                    ${tone.display}
                                </div>
                                <div>${v3}</div>
                            </div>
                        `;
                    }).join('<div>-</div>');
                }).join('<div>--</div>');
            }).join('&nbsp;')}
        </div>`
    }

    function processPage(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let parent = node.parentNode;
            while (parent) {
                parent = parent.parentNode;
            }
            let text = node.nodeValue.trim();
            if (text && /[\-āáàâǎa̍ēéèêěe̍īíìîǐi̍ōóòôǒo̍ūúùûǔu̍͘]/.test(text) && !isCjk(text)) {
                const div = document.createElement('div');
                div.innerHTML = highlightSandhi(text);
                node.parentNode.replaceChild(div, node);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'UL' && ['fs-4', 'fw-bold', 'list-inline'].every(c => node.classList.contains(c))) {
                replaceUL(node);
            } else {
                for (let i = 0; i < node.childNodes.length; i++) {
                    processPage(node.childNodes[i]);
                }
            }
        }
        return true
    }

    function replaceUL(node) {
        // Get all span texts from li children and join with "/"
        let spanTexts = Array.from(node.querySelectorAll('li'))
            .map(li => li.querySelector('span')?.textContent || '')
            .filter(text => text)
            .join('/');
        node.querySelectorAll('span').forEach(span => span.remove());

        node.parentNode.classList.remove('align-items-baseline');
        node.parentNode.classList.add('align-items-end');
        node.lastChild.classList.remove('slash-divider');
        const div = document.createElement('li');
        div.innerHTML = highlightSandhi(spanTexts);
        div.classList.add('list-inline-item');
        node.insertBefore(div, node.firstChild);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .custom-tooltip {
            display: none;
            position: absolute;
            background-color: white;
            padding: 5px 10px;
            border: 4px solid black;
            border-radius: 4px;
            font-size: 12px;
            z-index: 100;
        }
        .btn.lang, .btn.region {
            padding: 0;
            font-size: .8rem;
        }
        .selected {
            text-decoration: underline;
        }
        .not_selected {
            color: grey;
        }
        .syllable-cell {
            font-size: .8rem;
            text-align: center;
        }
        .syllable-cell.red {
            color: red;
            font-weight: 700;
        }
        .syllable-cell.blue {
            color: blue;
            font-weight: 700;
        }
        .syllable-cell.green {
            color: green;
            font-weight: 700;
        }
        .syllable-cell.red:hover, .syllable-cell.blue:hover {
            cursor: pointer;
            background-color: #f0f0f0;
        }
    `;
    document.head.appendChild(style);

    const tooltip = document.createElement('div');
    tooltip.id = 'custom-tooltip';
    tooltip.className = 'custom-tooltip';
    tooltip.innerHTML = '<div id="lang_setting"></div>' + '<div id="sandhi_diagram"></div>'
    document.body.appendChild(tooltip);

    document.addEventListener('click', (e) => {
        const tooltip = document.getElementById('custom-tooltip');
        if (e.target.classList.contains('syllable-cell') && e.target.dataset.sandhi != 'null') {
            tooltip.style.display = 'block';
            GM_setValue('id', `${e.target.dataset.tone}_${e.target.dataset.sandhi}`)
            GM_setValue('color', e.target.dataset.color)

            const rect = e.target.getBoundingClientRect();
            let left = rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2;
            let top = rect.top + window.scrollY - tooltip.offsetHeight - 10;

            left = Math.max(0, Math.min(left, window.innerWidth - tooltip.offsetWidth));
            top = top < 0 ? rect.top + window.scrollY + rect.height + 10 : top;

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
        } else if (['btn', 'lang'].every(c => e.target.classList.contains(c))) {
            GM_setValue('lang', e.target.dataset.val)
        } else if (['btn', 'region'].every(c => e.target.classList.contains(c))) {
            GM_setValue('region', e.target.dataset.val)
        } else if (!tooltip.contains(e.target)) {
            tooltip.style.display = 'none';
        }
        refreshLang()
        refreshSandhi()
    });

    // Run initially and observe for changes
    console.log("taigi-sandhi-visualization")
    if (processPage(document.getElementsByTagName('main')[0])) {
        console.log('done')
    }
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                    if (processPage(node)) {
                        console.log('done')
                    }
                }
            });
        });
    });
    observer.observe(document.getElementsByTagName('main')[0], { childList: true, subtree: true });
})();