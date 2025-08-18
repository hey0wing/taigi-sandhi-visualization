// ==UserScript==
// @name        taigi-sandhi-visualization
// @namespace   hey0wing
// @version     1.1
// @description Highlights tone sandhi changes in Taiwanese romanization on the MOE dictionary site. Changed tones are marked in red with a tooltip showing possible base tone → sandhi tone.
// @author      hey0wing
// @match       https://sutian.moe.edu.tw/*
// @run-at       document-idle
// @grant       none
// @license      MIT
// ==/UserScript==

(() => {
    'use strict';
    
    const sandhi_diagram_red = `
        <svg id="sandhi_red" width="250" height="150" xmlns="http://www.w3.org/2000/svg">
            <!-- Grid of numbers -->
            <text id="1" x="25" y="25" font-size="12" text-anchor="middle" alignment-baseline="central">1</text>
            <text id="2" x="125" y="25" font-size="12" text-anchor="middle" alignment-baseline="central">2</text>
            <text id="4" x="225" y="25" font-size="12" text-anchor="middle" alignment-baseline="central">4</text>
            <text id="5" x="75" y="75" font-size="12" text-anchor="middle" alignment-baseline="central">5</text>
            <text id="7" x="25" y="125" font-size="12" text-anchor="middle" alignment-baseline="central">7</text>
            <text id="3" x="125" y="125" font-size="12" text-anchor="middle" alignment-baseline="central">3</text>
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
            <path id="3_2" d="M125 115 V35" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
            <path id="4_8" d="M225 35 V115" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
            <path id="8_4" d="M225 115 V35" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>

            <!-- Diagonal arrows -->
            <path id="5_7" d="M70 85 L30 120" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
            <path id="5_3" d="M80 85 L120 120" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>

            <!-- arrow definition -->
            <defs>
                <marker id="arrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="black"/>
                </marker>
                <marker id="arrow_red" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="red"/>
                </marker>
            </defs>
        </svg>
    `
    
    const sandhi_diagram_blue = `
        <svg id="sandhi_blue" width="250" height="150" xmlns="http://www.w3.org/2000/svg">
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
        </svg>
    `

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

    function highlightSandhi(text, button = null) {
        const words = text.replace('/',' / ').split(/\s+/);
        return `
            <tr>
                ${words.map((v1, i) => {
                    let w1 = v1.split('--')
                    return w1.map((v2, j) => {
                        let word = v2.split('-');
                        return word.map((v3, k) => {
                            if (v3 == '/') return '<td></td>'
                            var tone;
                            if (k == word.length-1 && j != w1.length-1) {
                                // Word before 輕聲 neutral tone
                                tone = getTone({syllable: v3, neutral: 'before'})
                            } else if (k == 0 && j != 0) {
                                // Word after 輕聲 neutral tone
                                tone = getTone({syllable: v3, neutral: 'after'})
                            } else if (word.length === 1 && i != words.length-1) {
                                // Monosyllabic and not the final word
                                tone = getTone({syllable: v3, sandhi: true, suffix: words[i+1]})
                            } else {
                                tone = getTone({syllable: v3, sandhi: k!==word.length-1, suffix: word[k+1]})
                            }
                            return `<td class="syllable-cell ${tone.color}"
                                        data-color=${tone.color}
                                        data-tone=${tone.tone}
                                        data-sandhi=${tone.sandhi}>
                                        ${tone['display']}
                                    </td>`;
                        }).join('<td></td>');
                    }).join('<td></td>');
                }).join('') + 
                (button ? '<td></td>' : '')}
            </tr>
            <tr>
                ${words.map((v1, i) => {
                    return v1.split('--').map((v2, j) => {
                        return v2.split('-').map((v3, k) => {
                            if (v3 == '/') return '<td>/</td>'
                            return `<td>${v3}</td>`;
                        }).join('<td>-</td>');
                    }).join('<td>--</td>');
                }).join('') + 
                (button ? '<td>'+button.outerHTML+'</td>' : '')}
            </tr>
        `;
    }

    function processPage(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let parent = node.parentNode;
            while (parent) {
                parent = parent.parentNode;
            }
            let text = node.nodeValue.trim();
            if (text && /[\-āáàâǎa̍ēéèêěe̍īíìîǐi̍ōóòôǒo̍ūúùûǔu̍͘]/.test(text) && !isCjk(text)) {
                const button = node.parentNode.parentNode.querySelector('button');
                const div = document.createElement('table');
                div.innerHTML = highlightSandhi(text, button);
                // console.log(node.parentNode)
                // if (node.parentNode.tagName === 'TD') {
                //     console.log(node.parentNode)
                //     node.parentNode.setAttribute("colspan", "1");
                // }
                node.parentNode.replaceChild(div, node);
                if (button) button.remove()
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
        // Find the last li and get its button
        const listItems = node.querySelectorAll('li');
        const lastLi = listItems[listItems.length - 1];
        const button = lastLi ? lastLi.querySelector('button') : null;

        // Get all span texts from li children and join with "/"
        let spanTexts = Array.from(listItems)
            .map(li => li.querySelector('span')?.textContent || '')
            .filter(text => text)
            .join('/');

        const div = document.createElement('table');
        div.innerHTML = highlightSandhi(spanTexts, button);
        node.parentNode.classList.remove('align-items-baseline');
        node.parentNode.classList.add('align-items-end');
        node.parentNode.replaceChild(div, node);
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
    document.body.appendChild(tooltip);

    document.addEventListener('click', (e) => {
        const tooltip = document.getElementById('custom-tooltip');
        if (e.target.classList.contains('syllable-cell') && e.target.dataset.sandhi != 'null') {
            tooltip.style.display = 'block';
            tooltip.innerHTML = e.target.dataset.color == 'red' ? sandhi_diagram_red : sandhi_diagram_blue
            
            var id = `${e.target.dataset.tone}_${e.target.dataset.sandhi}`;
            if (id == '4_8') document.getElementById('8_4').remove();
            if (id == '8_4') document.getElementById('4_8').remove();
            if (['2_1', '3_1'].includes(id) && e.target.dataset.color == 'blue') id = '2,3_1'

            if (id == '7_7') {
                const text = document.getElementById('7');
                text.setAttribute('fill', e.target.dataset.color);
                text.setAttribute('font-size', 16);
            } else {
                const path = document.getElementById(id);
                path.setAttribute('stroke', e.target.dataset.color);
                path.setAttribute('marker-end', `url(#arrow_${e.target.dataset.color})`);
            }

            const rect = e.target.getBoundingClientRect();
            let left = rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2;
            let top = rect.top + window.scrollY - tooltip.offsetHeight - 10;

            left = Math.max(0, Math.min(left, window.innerWidth - tooltip.offsetWidth));
            top = top < 0 ? rect.top + window.scrollY + rect.height + 10 : top;

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
        } else {
            tooltip.style.display = 'none';
            tooltip.innerHTML = ''
        }
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