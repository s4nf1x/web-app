/*блокировка поворота экрана */


const infoModalContent = {
    'speakers': {
        title: "Speakers - справка",
        show: true,
        text: `<p>Включение и выключение каждого канала аналогового выхода процессора</p>`
    },
    "eq": {
        title: "EQ - справка",
        show: true,
        text: `10-ти полосный цифровой эквалайзер для каждой пары аналоговых выходов, с возможностью установки 3-х основных парметров эквализации:
		FREQUENCY - частота
		GAIN - уровень
		QF - добротность
		
		Примечание: отображение на графике приблизительное, для наглядности.
		`
    },
    "cross": {
        title: "Crossover - справка",
        show: true,
        text: `Поканальный цифровой кроссовер для сведения полос акустической системы
		Применение параметров возможно как для обоих динамиков полосы (левый + правый)
		так и раздельно для левого и правого канала, реим переключается указателем 
		в строке Level: Common - одновременно оба канала Л + П, L - тоьлко левый, R - только правый.
		`
    },
    "tcorr": {
        title: "Time correction - справка",
        show: true,
        text: `Временные задержки сигнала (цифровая регулировка уровня задержки)
		и переключатель разворота фазы на 180 градусов.`
    },
    "profile": {
        title: "Profile - справка",
        show: true,
        text: `Выбор текущенго активного профиля работы процессора
		на данный момент есть только возможность переключения активного профиля, его изменения и сбора до значений по умолчанию (в ноль)`
    },
    "system": {
        title: "System - справка",
        show: true,
        text: "Привет eq"
    },
    "gen": {
        title: "Gen - справка",
        show: true,
        text: "Данный раздел не работает!"
    },
}
const ValueDegreeMap = {
    "-6dB/Oct": 10000,
    "-12dB/Oct": 6500,
    "-18dB/Oct": 3500,
    "-24dB/Oct": 2500,
    "-36dB/Oct": 2000,
    "-48dB/Oct": 1500,
}



const mockData = {
    EQ: {
        eqHi:  { freq1:20, gain1:0, q1:1, freq2:32, gain2:0, q2:1, freq3:50, gain3:0, q3:1, freq4:80, gain4:0, q4:1, freq5:127, gain5:0, q5:1, freq6:200, gain6:0, q6:1, freq7:317, gain7:0, q7:1, freq8:503, gain8:0, q8:1, freq9:798, gain9:0, q9:1, freq10:1266, gain10:0, q10:1 },
        eqHiL: { freq1:20, gain1:0, q1:1, freq2:32, gain2:0, q2:1, freq3:50, gain3:0, q3:1, freq4:80, gain4:0, q4:1, freq5:127, gain5:0, q5:1, freq6:200, gain6:0, q6:1, freq7:317, gain7:0, q7:1, freq8:503, gain8:0, q8:1, freq9:798, gain9:0, q9:1, freq10:1266, gain10:0, q10:1 },
        eqHiR: { freq1:20, gain1:0, q1:1, freq2:32, gain2:0, q2:1, freq3:50, gain3:0, q3:1, freq4:80, gain4:0, q4:1, freq5:127, gain5:0, q5:1, freq6:200, gain6:0, q6:1, freq7:317, gain7:0, q7:1, freq8:503, gain8:0, q8:1, freq9:798, gain9:0, q9:1, freq10:1266, gain10:0, q10:1 },
        eqMid: { freq1:20, gain1:0, q1:1, freq2:32, gain2:0, q2:1, freq3:50, gain3:0, q3:1, freq4:80, gain4:0, q4:1, freq5:127, gain5:0, q5:1, freq6:200, gain6:0, q6:1, freq7:317, gain7:0, q7:1, freq8:503, gain8:0, q8:1, freq9:798, gain9:0, q9:1, freq10:1266, gain10:0, q10:1 },
        eqMidL: { freq1:20, gain1:0, q1:1, freq2:32, gain2:0, q2:1, freq3:50, gain3:0, q3:1, freq4:80, gain4:0, q4:1, freq5:127, gain5:0, q5:1, freq6:200, gain6:0, q6:1, freq7:317, gain7:0, q7:1, freq8:503, gain8:0, q8:1, freq9:798, gain9:0, q9:1, freq10:1266, gain10:0, q10:1 },
        eqMidR: { freq1:20, gain1:0, q1:1, freq2:32, gain2:0, q2:1, freq3:50, gain3:0, q3:1, freq4:80, gain4:0, q4:1, freq5:127, gain5:0, q5:1, freq6:200, gain6:0, q6:1, freq7:317, gain7:0, q7:1, freq8:503, gain8:0, q8:1, freq9:798, gain9:0, q9:1, freq10:1266, gain10:0, q10:1 },
        eqLow: { freq1:20, gain1:0, q1:1, freq2:32, gain2:0, q2:1, freq3:50, gain3:0, q3:1, freq4:80, gain4:0, q4:1, freq5:127, gain5:0, q5:1, freq6:200, gain6:0, q6:1, freq7:317, gain7:0, q7:1, freq8:503, gain8:0, q8:1, freq9:798, gain9:0, q9:1, freq10:1266, gain10:0, q10:1 },
        eqLowL: { freq1:20, gain1:0, q1:1, freq2:32, gain2:0, q2:1, freq3:50, gain3:0, q3:1, freq4:80, gain4:0, q4:1, freq5:127, gain5:0, q5:1, freq6:200, gain6:0, q6:1, freq7:317, gain7:0, q7:1, freq8:503, gain8:0, q8:1, freq9:798, gain9:0, q9:1, freq10:1266, gain10:0, q10:1 },
        eqLowR: { freq1:20, gain1:0, q1:1, freq2:32, gain2:0, q2:1, freq3:50, gain3:0, q3:1, freq4:80, gain4:0, q4:1, freq5:127, gain5:0, q5:1, freq6:200, gain6:0, q6:1, freq7:317, gain7:0, q7:1, freq8:503, gain8:0, q8:1, freq9:798, gain9:0, q9:1, freq10:1266, gain10:0, q10:1 },
        eqSub: { freq1:20, gain1:0, q1:1, freq2:32, gain2:0, q2:1, freq3:50, gain3:0, q3:1, freq4:80, gain4:0, q4:1, freq5:127, gain5:0, q5:1, freq6:200, gain6:0, q6:1, freq7:317, gain7:0, q7:1, freq8:503, gain8:0, q8:1, freq9:798, gain9:0, q9:1, freq10:1266, gain10:0, q10:1 },
        eqSubL: { freq1:20, gain1:0, q1:1, freq2:32, gain2:0, q2:1, freq3:50, gain3:0, q3:1, freq4:80, gain4:0, q4:1, freq5:127, gain5:0, q5:1, freq6:200, gain6:0, q6:1, freq7:317, gain7:0, q7:1, freq8:503, gain8:0, q8:1, freq9:798, gain9:0, q9:1, freq10:1266, gain10:0, q10:1 },
        eqSubR: { freq1:20, gain1:0, q1:1, freq2:32, gain2:0, q2:1, freq3:50, gain3:0, q3:1, freq4:80, gain4:0, q4:1, freq5:127, gain5:0, q5:1, freq6:200, gain6:0, q6:1, freq7:317, gain7:0, q7:1, freq8:503, gain8:0, q8:1, freq9:798, gain9:0, q9:1, freq10:1266, gain10:0, q10:1 }
    },
    Volume: {
        master: -10,
        stereoHi: 0, leftHi: 0, rightHi: 0,
        stereoMid: 0, leftMid: 0, rightMid: 0,
        stereoLow: 0, leftLow: 0, rightLow: 0,
        stereoSub: 0, leftSub: 0, rightSub: 0
    },
    Cross: {
        "Low-pass": {
            hiHz: 2000,   hiFilterOrd: 12,
            midHz: 800,   midFilterOrd: 12,
            lowHz: 200,   lowFilterOrd: 12,
            subHz: 60,    subFilterOrd: 12
        },
        "Hi-pass": {
            hiHz: 2000,   hiFilterOrd: 12,
            midHz: 800,   midFilterOrd: 12,
            lowHz: 200,   lowFilterOrd: 12,
            subHz: 60,    subFilterOrd: 12
        }
    },
    Mute: {
        master: 0,
        leftHi: 0, rightHi: 0,
        leftMid: 0, rightMid: 0,
        leftLow: 0, rightLow: 0,
        leftSub: 0, rightSub: 0
    },
    Delay: {
        leftHi: 0, rightHi: 0,
        leftMid: 0, rightMid: 0,
        leftLow: 0, rightLow: 0,
        leftSub: 0, rightSub: 0
    },
    Phase: {
        leftHi: 0, rightHi: 0,
        leftMid: 0, rightMid: 0,
        leftLow: 0, rightLow: 0,
        leftSub: 0, rightSub: 0
    },
    Spdif: {
        spdifin: 50, spdifinact: 1,
        toslinkin: 50, toslinkinact: 0,
        usbin: 50, usbinact: 0,
        playerin: 50, playerinact: 0,
        protection: 0
    },
    System: {
        timer: 30
    },
    Stereo: {
        eqHi: 0, eqMid: 0, eqLow: 0, eqSub: 0,
        crossHi: 0, crossMid: 0, crossLow: 0, crossSub: 0
    }
};

class DataFromFile {
    loading = false;
    needUpdate = false;
    file = {}
    data = {}
}


function generateMockData() {
    // Генерация 10 логарифмических частот (20 Гц - 20 кГц)
    const generateFreqs = () => {
        const freqs = [];
        for (let i = 1; i <= 10; i++) {
            freqs.push(Math.round(20 * Math.pow(20000 / 20, (i - 1) / 9)));
        }
        return freqs;
    };
    const eqFreqs = generateFreqs();

    // Создание объекта для одного канала EQ (10 полос)
    const createEqBand = (freqs) => {
        const obj = {};
        for (let i = 1; i <= 10; i++) {
            obj[`freq${i}`] = freqs[i-1];
            obj[`gain${i}`] = 0;
            obj[`q${i}`] = 1.0;
        }
        return obj;
    };

    const baseEq = createEqBand(eqFreqs);
    const copyEq = () => ({ ...baseEq });

    return {
        EQ: {
            eqHi:  copyEq(),
            eqHiL: copyEq(),
            eqHiR: copyEq(),
            eqMid: copyEq(),
            eqMidL: copyEq(),
            eqMidR: copyEq(),
            eqLow: copyEq(),
            eqLowL: copyEq(),
            eqLowR: copyEq(),
            eqSub: copyEq(),
            eqSubL: copyEq(),
            eqSubR: copyEq()
        },
        Volume: {
            master: -10,
            stereoHi: 0, leftHi: 0, rightHi: 0,
            stereoMid: 0, leftMid: 0, rightMid: 0,
            stereoLow: 0, leftLow: 0, rightLow: 0,
            stereoSub: 0, leftSub: 0, rightSub: 0
        },
        Cross: {
            "Low-pass": {
                hiHz: 2000,   hiFilterOrd: 12,
                midHz: 800,   midFilterOrd: 12,
                lowHz: 200,   lowFilterOrd: 12,
                subHz: 60,    subFilterOrd: 12
            },
            "Hi-pass": {
                hiHz: 2000,   hiFilterOrd: 12,
                midHz: 800,   midFilterOrd: 12,
                lowHz: 200,   lowFilterOrd: 12,
                subHz: 60,    subFilterOrd: 12
            }
        },
        Mute: {
            master: 0,
            leftHi: 0, rightHi: 0,
            leftMid: 0, rightMid: 0,
            leftLow: 0, rightLow: 0,
            leftSub: 0, rightSub: 0
        },
        Delay: {
            leftHi: 0, rightHi: 0,
            leftMid: 0, rightMid: 0,
            leftLow: 0, rightLow: 0,
            leftSub: 0, rightSub: 0
        },
        Phase: {
            leftHi: 0, rightHi: 0,
            leftMid: 0, rightMid: 0,
            leftLow: 0, rightLow: 0,
            leftSub: 0, rightSub: 0
        },
        Spdif: {
            spdifin: 50, spdifinact: 1,
            toslinkin: 50, toslinkinact: 0,
            usbin: 50, usbinact: 0,
            playerin: 50, playerinact: 0,
            protection: 0
        },
        System: {
            timer: 30
        },
        Stereo: {
            eqHi: 0, eqMid: 0, eqLow: 0, eqSub: 0,
            crossHi: 0, crossMid: 0, crossLow: 0, crossSub: 0
        }
    };
}

 let gateway = `ws://${window.location.hostname}:82/`;
        let websocket;
        window.addEventListener('load', onLoad);
        function initWebSocket() {
            websocket = new WebSocket(gateway);
            websocket.onclose = onClose;
            websocket.onmessage = onMessage;
        }
        function onClose(event) {
            setTimeout(initWebSocket, 100);
        }
        function onMessage(event) {
        var data = event.data;
        console.log("Получено: " + data);




        var jsonData = JSON.parse(data);

       for (let key in jsonData){


        if (key === "Time") {
                document.querySelector("#username").value = JSON.parse(event.data).Time;
            }
            if (key === "Vol") {
                document.querySelector("#myRange").value = JSON.parse(event.data).Vol;
            }
            if (key === "Mute") {
                document.querySelector('[name=switchers_all]').checked = JSON.parse(event.data).Mute;
            }
        }



          //  document.querySelector("#state").textContent = state;
           // document.querySelector("#myRange").textContent = "Slider value: " + JSON.parse(event.data).sliderValue;
          //  document.querySelector("#myRange").value = JSON.parse(event.data).Vol;
          //  document.querySelector('[name=switchers_all]').checked = JSON.parse(event.data).Mute;
        }

        function onLoad(event) {
         //   initWebSocket();
           // document.getElementById('button').addEventListener('click', reset);
        }
        function reset() {
            //websocket.send('reset');
        }
        function sendDats() {
           // let sendValue = parseInt(document.getElementById('Slider').value).toString();
           // websocket.send(sendValue);
        }


let slideUp = (target, duration = 400) => {
    if (!target.classList.contains('-anim')) {
        target.classList.add('-anim');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('-anim');
        }, duration)
    }
}
let slideDown = (target, duration = 400) => {
    if (!target.classList.contains('-anim')) {
        target.classList.add('-anim');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('-anim');
        }, duration)
    }
}
let slideToggle = (target, duration = 400) => {
    if (target.hidden) {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
}


class Tabs {
    init() {
        this.elements = document.querySelectorAll('[data-tab]')
        this.objects = []
        if (this.elements.length > 0) {
            for (let index = 0; index < this.elements.length; index++) {
                const tab = this.elements[index];
                const obj = {}
                obj.el = tab
                obj.items = obj.el.querySelectorAll('[data-tab-item]')
                obj.contents = obj.el.querySelectorAll('[data-tab-content]')
                obj.activeItems = Array.from(obj.items).filter(item => item.classList.contains('-active'))
                obj.itemLabel = obj.el.hasAttribute('data-tab-item-label')

                const mediaSettings = obj.el.dataset.tab.split(',').map(item => item.trim())
                obj.mediaSettings = {
                    type: mediaSettings[0],
                    size: mediaSettings[1],
                }
                this.objects.push(obj)
            }
            for (let index = 0; index < this.objects.length; index++) {
                const obj = this.objects[index];
                const mediaQueryList = window.matchMedia(`(${obj.mediaSettings.type}-width:${obj.mediaSettings.size}px)`)
                this.mediaHandler(mediaQueryList, obj.el, obj.items, obj.contents, obj.activeItems, obj.itemLabel)
                mediaQueryList.addEventListener('change', e => this.mediaHandler(e, obj.el, obj.items, obj.contents, obj.activeItems, obj.itemLabel))
            }
        }
    }

    mediaHandler(e, tabElement, items, contents, activeItems, itemLabel) {
        if (e.matches) {
            let activeItems = []
            const inactiveItems = []
            items.forEach(item => item.classList.contains('-active') ? activeItems.push(item) : inactiveItems.push(item))
            if (activeItems.length > 0) {
                if (activeItems.length > 1) {
                    items.forEach(item => item.classList.remove('-active'))
                    items[0].classList.add('-active')
                    activeItems = [items[0]]
                    if (itemLabel) {
                        slideDown(activeItems[0].nextElementSibling, 0)
                    }
                }
                if (itemLabel) {
                    activeItems.forEach(item => slideDown(item.nextElementSibling, 0))
                    items.forEach(item => {
                        slideUp(item.nextElementSibling, 0)
                    })
                }
            } else {
                items[0].classList.add('-active')
                activeItems = [items[0]]
                if (itemLabel) {
                    activeItems.forEach(item => slideDown(item.nextElementSibling, 0))
                    items.forEach(item => {
                        slideUp(item.nextElementSibling, 0)
                    })
                }
            }
            activeItems.forEach(item => {
                const activeContent = []
                const inactiveContent = []
                contents.forEach(content => content.dataset.tabContent == item.dataset.tabItem ? activeContent.push(content) : inactiveContent.push(content))

                activeContent[0].classList.add('-active')
                this.animShow(activeContent[0], false)

                inactiveContent.forEach(content => {
                    if (content.classList.contains('-active')) {
                        content.classList.remove('-active')
                    }
                    this.animHide(content, false)
                })
            })

            tabElement.contents = contents
            tabElement.thisCLass = this
            tabElement.items = items
            tabElement.itemLabel = itemLabel
            tabElement.addEventListener('click', this.actionTabElement)
        } else {
            items.forEach(item => {
                item.classList.remove('-active')
                if (itemLabel) {
                    items.forEach(item => {
                        slideDown(item.nextElementSibling, 0)
                    })
                }
            })
            contents.forEach(content => {
                content.classList.remove('-active')
                this.animShow(content, false, true)
            })
            if (activeItems) {
                activeItems.forEach(item => item.classList.add('-active'))
            }

            tabElement.removeEventListener('click', this.actionTabElement)
        }
    }

    actionTabElement(e) {
        const target = e.target
        const contents = e.currentTarget.contents
        const thisCLass = e.currentTarget.thisCLass
        const items = e.currentTarget.items
        const itemLabel = e.currentTarget.itemLabel
        const animContents = Array.from(contents).filter(content => content.classList.contains('-anim'))

        if (target.closest('[data-tab-item]')) {
            e.preventDefault()
            if (animContents.length === 0) {
                const item = target.closest('[data-tab-item]')

                if (!item.classList.contains('-active')) {
                    let activeContent;
                    const inactiveContent = []
                    contents.forEach(content => content.dataset.tabContent == item.dataset.tabItem ? activeContent = content : inactiveContent.push(content))

                    items.forEach(item => item.classList.remove('-active'))
                    item.classList.add('-active')

                    activeContent.classList.add('-active')
                    thisCLass.animShow(activeContent)
                    inactiveContent.forEach(content => {
                        thisCLass.animHide(content)
                        content.classList.remove('-active')
                    })
                    if (itemLabel) {
                        slideDown(item.nextElementSibling)
                        items.forEach(item => {
                            slideUp(item.nextElementSibling)
                        })
                    }
                }
            }
        }
    }

    animHide(el, anim = true) {
        if (anim) {
            el.style.opacity = '0'
            el.classList.add('-anim')
            setTimeout(() => {
                el.style.display = 'none'
                el.classList.remove('-anim')
            }, 100)
        } else {
            el.style.opacity = '0'
            el.style.display = 'none'
        }
    }

    animShow(el, anim = true, removeStyle = false) {
        if (anim) {
            setTimeout(() => {
                el.style.display = 'block'
                el.classList.add('-anim')
                setTimeout(() => {
                    el.style.opacity = '1'
                    el.classList.remove('-anim')
                }, 100)
            }, 100)
        } else {
            el.style.opacity = '1'
            el.style.display = 'block'
        }
        if (removeStyle) {
            el.style.removeProperty('opacity')
            el.style.removeProperty('display')
        }
    }
}

const tabs = new Tabs()
tabs.init()

class CustomSelect {
    init() {
        this.elements = document.querySelectorAll('[data-custom-select]')
        this.objects = []
        if (this.elements.length > 0) {
            for (let index = 0; index < this.elements.length; index++) {
                const select = this.elements[index];

                const obj = {}
                obj.select = select
                obj.options = obj.select.options
                obj.selectedIndex = obj.select.selectedIndex
                obj.className = obj.select.classList[0]
                obj.mLabel = obj.select.hasAttribute('data-custom-select-mlabel') ? obj.select.dataset.customSelectMlabel : false
                obj.label = obj.select.hasAttribute('data-custom-select-label') ? obj.select.dataset.customSelectLabel : false

                this.objects.push(obj)
            }
            for (let index = 0; index < this.objects.length; index++) {
                const obj = this.objects[index];
                obj.select.className = ''
                obj.select.style.display = 'none'
                this.createStructure(obj.select, obj.options, obj.className, obj.mLabel, obj.label)

                obj.customSelect = {}
                obj.customSelect.select = obj.select.nextElementSibling
                obj.customSelect.openner = obj.customSelect.select.querySelector('.-custom-select__openner')
                obj.customSelect.value = obj.customSelect.select.querySelector('.-custom-select__value')
                obj.customSelect.icon = obj.customSelect.select.querySelector('.-custom-select__icon')
                obj.customSelect.body = obj.customSelect.select.querySelector('.-custom-select__body')
                obj.customSelect.items = obj.customSelect.select.querySelectorAll('.-custom-select__item')
                this.fillContent(obj)

                const customSelect = obj.customSelect

                if (!obj.label) {
                    customSelect.items[obj.select.selectedIndex].classList.add('-active')
                } else {
                    customSelect.select.classList.add('-custom-select-no-choose')
                }

                slideUp(customSelect.body, 0)
                customSelect.select.addEventListener('click', e => this.actionCustomSelect(e, obj.label, obj.select, obj.options))
                document.addEventListener('click', this.actionDocument)

                const thisClass = this
                customSelect.select.reset = function () {
                    const activeItem = customSelect.items[obj.selectedIndex]
                    thisClass.activeOption(activeItem, obj.select, obj.options, customSelect.select, obj.label)
                }
            }
        }
    }

    createStructure(select, options, className, mLabel, label) {
        const templateWrapStart = `<div class="${className} -custom-select">`
        const templateWrapEnd = `</div>`

        const templateOpennerStart = `<a href="" class="${className}__openner -custom-select__openner">`
        const templateOpennerEnd = `</a>`
        const templateValue = `<div class="${className}__value -custom-select__value">${label ? label : ''}</div>`
        const templateIcon = `<div class="${className}__icon -custom-select__icon">
      <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M1.5 15.5L7.8051 8.967C8.18881 8.56943 8.17736 7.93601 7.77953 7.55256L1.5 1.5" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round"/>
         </svg>

      </div>`

        const templateMlable = mLabel ? `<div class="${className}__mlabel -custom-select__mlabel">${mLabel}</div>` : ''
        const templateOpenner = templateOpennerStart + templateMlable + templateValue + templateIcon + templateOpennerEnd

        const templateBodyStart = `<div class="${className}__body -custom-select__body">`
        const templateBodyEnd = `</div>`
        let templateItems = ''
        for (let index = 0; index < options.length; index++) {
            const templateItem = `<div class="${className}__item -custom-select__item"></div>`
            templateItems += templateItem
        }
        const templateBody = templateBodyStart + templateItems + templateBodyEnd
        const templateCustomSelect = templateWrapStart + templateOpenner + templateBody + templateWrapEnd
        select.insertAdjacentHTML(
            'afterend',
            templateCustomSelect
        )
    }

    fillContent(obj) {
        const selectedOption = obj.options[obj.select.selectedIndex]
        if (!obj.label) {
            obj.customSelect.value.innerHTML = selectedOption.innerHTML
        }

        const contentOptions = Array.from(obj.options).map(item => item.innerHTML)
        obj.customSelect.items.forEach((item, index) => item.innerHTML = contentOptions[index])
    }

    actionCustomSelect(e, label, select, options) {
        const target = e.target
        const customSelect = e.currentTarget
        const customSelectValue = customSelect.querySelector('.-custom-select__value')
        const customSelectBody = customSelect.querySelector('.-custom-select__body')
        const customSelectItems = customSelect.querySelectorAll('.-custom-select__item')
        if (target.closest('.-custom-select__item')) {
            if (!document.querySelector('.-custom-select__body.-anim')) {
                if (label && customSelect.classList.contains('-custom-select-no-choose')) {
                    customSelect.classList.remove('-custom-select-no-choose')
                }
                if (!target.classList.contains('-active')) {
                    this.activeOption(target, select, options, customSelect)
                }
                customSelect.classList.remove('-open')
                slideUp(customSelectBody)
                const levelName = document.querySelector('.frequenc')
                levelName.textContent = customSelect.previousElementSibling.value
            }
        }
        if (target.closest('.-custom-select__openner')) {
            e.preventDefault()

            if (!document.querySelector('.-custom-select__body.-anim')) {
                const openner = target.closest('.-custom-select__openner')
                if (document.querySelector('.-custom-select.-open')) {
                    const openCustomSelect = document.querySelector('.-custom-select.-open')

                    if (openCustomSelect != customSelect) {
                        const customSelectBody = openCustomSelect.querySelector('.-custom-select__body')
                        slideUp(customSelectBody)
                        openCustomSelect.classList.remove('-open')
                    }
                }

                if (!customSelect.classList.contains('-open')) {
                    openner.vars = [this, select, options, customSelect, customSelectValue, customSelectBody, customSelectItems, label]
                    openner.addEventListener('keydown', this.keydownOpenner)
                    document.addEventListener('keydown', this.keydownDocument)
                    openner.addEventListener('blur', this.blurOpenner)
                } else {
                    openner.vars = []
                    openner.removeEventListener('blur', this.blurOpenner)
                    openner.removeEventListener('keydown', this.keydownOpenner)
                    document.removeEventListener('keydown', this.keydownDocument)
                }

                customSelect.classList.toggle('-open')
                slideToggle(customSelectBody)
            }
        }
    }

    blurOpenner(e) {
        if (!document.querySelector('.-custom-select__body.-anim')) {
            const openner = e.target
            const thisClass = openner.vars[0]
            const customSelect = openner.vars[3]
            const customSelectBody = openner.vars[5]
            if (openner.eventKey == 'Tab') {
                customSelect.classList.remove('-open')
                slideUp(customSelectBody)
                openner.eventKey = undefined
            }

            openner.removeEventListener('blur', thisClass.blurOpenner)
            openner.removeEventListener('keydown', thisClass.keydownOpenner)
            document.removeEventListener('keydown', thisClass.keydownDocument)
        }

    }

    keydownDocument(e) {
        if (e.code == 'ArrowUp' || e.code == 'ArrowDown') {
            e.preventDefault()
        }
    }

    keydownOpenner(e) {
        const openner = e.target
        const thisClass = openner.vars[0]
        const select = openner.vars[1]
        const options = openner.vars[2]
        const customSelect = openner.vars[3]
        const customSelectValue = customSelect.querySelector('.-custom-select__value')
        const customSelectBody = customSelect.querySelector('.-custom-select__body')
        const customSelectItems = customSelect.querySelectorAll('.-custom-select__item')
        const label = openner.vars[7]

        openner.eventKey = e.code

        if (e.code == 'Tab' && document.querySelector('.-custom-select__body.-anim')) {
            e.preventDefault()
        }

        if (!document.querySelector('.-custom-select__body.-anim')) {
            if (e.code == 'Escape') {
                customSelect.classList.remove('-open')
                slideUp(customSelectBody)
            }
            if (e.code == 'ArrowUp' || e.code == 'ArrowDown') {
                let activeItem = customSelect.querySelector('.-custom-select__item.-active')

                if (!activeItem) {
                    activeItem = customSelectItems[0]
                    thisClass.activeOption(activeItem, select, options, customSelect)

                    if (label && customSelect.classList.contains('-custom-select-no-choose')) {
                        customSelect.classList.remove('-custom-select-no-choose')
                    }

                    return false;
                }
                if (e.code == 'ArrowUp' && activeItem.previousElementSibling) {
                    thisClass.activeOption(activeItem.previousElementSibling, select, options, customSelect)
                }
                if (e.code == 'ArrowDown' && activeItem.nextElementSibling) {
                    thisClass.activeOption(activeItem.nextElementSibling, select, options, customSelect)
                }
            }
        }
    }

    activeOption(item, select, options, customSelect, label = null) {
        const customSelectValue = customSelect.querySelector('.-custom-select__value')
        const customSelectItems = customSelect.querySelectorAll('.-custom-select__item')
        customSelectItems.forEach(item => item.classList.remove('-active'))
        select.selectedIndex = Array.from(customSelectItems).indexOf(item)
        if (!label) {
            const selectedIndex = select.selectedIndex
            customSelectItems[selectedIndex].classList.add('-active')

            customSelectValue.innerHTML = options[selectedIndex].innerHTML
        } else {
            customSelectValue.innerHTML = label
            const customSelect = customSelectValue.closest('.-custom-select')
            customSelect.classList.add('-custom-select-no-choose')
        }
    }

    actionDocument(e) {
        const target = e.target
        if (!target.closest('.-custom-select')) {
            if (document.querySelector('.-custom-select.-open')) {
                if (!document.querySelector('.-custom-select__body.-anim')) {
                    const activeCustomSelect = document.querySelector('.-custom-select.-open')
                    const customSelectBody = activeCustomSelect.querySelector('.-custom-select__body')

                    activeCustomSelect.classList.remove('-open')
                    slideUp(customSelectBody)
                }
            }
        }
    }
}

const customSelect = new CustomSelect()
customSelect.init()


window.onload = function () {

    let dataFromFile = new DataFromFile();
    let profileId = null;

    /* Работа с файловой системой */
    async function getData() {
		// return mockData;
		return generateMockData();
    }

    async function getProfileId() {
		return 1; // активный профиль
    }

    async function sendCommand(commandCode) {

    }

    async function resetProfileToDefault(id) {

    }

    async function updateData() {

        
        if (response.ok) {
            const data = await response.json();
        }
        dataFromFile.loading = false;
    }

    async function updateProfile(profileId) {

    }

    async function setActiveProfile(profileId) {

    }

    /*Периодическое обновление Equlizera при необходимости*/
    setInterval(() => {
        if (dataFromFile.needUpdate && !dataFromFile.loading) {
            dataFromFile.needUpdate = false;
       //     updateData()
        }
    }, 1000)

    /*Подключение слушателей на системные кнопки*/
    const sysBtns = document.querySelectorAll('.system_settings .system_settings_btn');
    sysBtns.forEach(item => {
        item.addEventListener('click', () => {
            const btnCode = item.getAttribute('data-code')
            sendCommand(btnCode)
        })
    })




    //Функция обновления  параметра эквалайзера  в файле EQ
    function updateEqualizerFileParameter(value, item, band, level) {

    //const chartActive = select.closest('.settings_block').chart


        let hiEqRLSelect;
        if(level === 0){
        hiEqRLSelect = document.querySelector('.frequency_level_select input[name="eq[band][hi]"]');
        }
         if(level === 1){
        hiEqRLSelect = document.querySelector('.frequency_level_select input[name="eq[band][mid]"]');
        }
         if(level === 2){
        hiEqRLSelect = document.querySelector('.frequency_level_select input[name="eq[band][low]"]');
        }
         if(level === 3){
        hiEqRLSelect = document.querySelector('.frequency_level_select input[name="eq[band][sub]"]');
        }




        const levelsRight = ["eqHiR", "eqMidR", "eqLowR", "eqSubR"];
        const levelsLeft = ["eqHiL", "eqMidL", "eqLowL", "eqSubL"];
        const levelsStereo = ["eqHi", "eqMid", "eqLow", "eqSub"];


        const currentLevelRight = levelsRight[level];
        const currentLevelLeft = levelsLeft[level];
        const currentLevelStereo = levelsStereo[level];








        switch (item) {
            case "freq" ://!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (hiEqRLSelect.value == "1"){
                dataFromFile.file.EQ[currentLevelRight][`freq${band}`] = value * 1000;
                }else if (hiEqRLSelect.value == "2") {
                dataFromFile.file.EQ[currentLevelLeft][`freq${band}`] = value * 1000;
                }
                else{
                dataFromFile.file.EQ[currentLevelStereo][`freq${band}`] = value * 1000;
                }
                break;
            case "gain" :
                if (hiEqRLSelect.value == "1"){
                dataFromFile.file.EQ[currentLevelRight][`gain${band}`] = value;
                }else if (hiEqRLSelect.value == "2") {
                dataFromFile.file.EQ[currentLevelLeft][`gain${band}`] = value;
                }else{
                dataFromFile.file.EQ[currentLevelStereo][`gain${band}`] = value;
                }
                break;
            case "qf" :
                if (hiEqRLSelect.value == "1"){
                dataFromFile.file.EQ[currentLevelRight][`q${band}`] = value;
                }else if (hiEqRLSelect.value == "2") {
                dataFromFile.file.EQ[currentLevelLeft][`q${band}`] = value;
                }else{
                dataFromFile.file.EQ[currentLevelStereo][`q${band}`] = value;
                }
                break;
        }

       // dataFromFile.file.EQ[currentLevelStereo]['stereo'] = hiEqRLSelect.value;

        dataFromFile.needUpdate = true;
    }










    function updateSpDifFileParameter(value, field) {
        dataFromFile.file.Spdif[field] = value;
        dataFromFile.needUpdate = true;
    }
  function updateSystemFileParameter(value, field) {
        dataFromFile.file.System[field] = value;
        dataFromFile.needUpdate = true;
    }





function set_volume()
{
            const value = dataFromFile.file.Volume["master"];
            const slider = document.querySelector('[name=myRange]');
            slider.value = value;
            updateSlider(slider);
}




// Громкость
    volumeInput = document.querySelector('[name=myRange]');
    volumeInput.addEventListener('input', function (e) {
        e.preventDefault();

        updateSlider(volumeInput);

        dataFromFile.file.Volume["master"] = parseFloat(e.target.value);

        dataFromFile.needUpdate = true;

    });








    //Функция обновления  параметра эквалайзера  в файле CROSS
    function updateCrossFileParameter() {
        /*get filter value by interval*/
        const getFilterValue = (delta) => {
            const res = Object.keys(ValueDegreeMap).find(key => ValueDegreeMap[key] === delta).split('d')[0]
            return parseFloat(res.replace('-', ''))
        }
        /*Update low pass*/
        dataFromFile.file.Cross['Low-pass']['hiFilterOrd'] = getFilterValue(dataFromFile.data.cross[0][1].x - dataFromFile.data.cross[0][0].x)
        dataFromFile.file.Cross['Low-pass']['midFilterOrd'] = getFilterValue(dataFromFile.data.cross[1][1].x - dataFromFile.data.cross[1][0].x)
        dataFromFile.file.Cross['Low-pass']['lowFilterOrd'] = getFilterValue(dataFromFile.data.cross[2][1].x - dataFromFile.data.cross[2][0].x)
        dataFromFile.file.Cross['Low-pass']['subFilterOrd'] = getFilterValue(dataFromFile.data.cross[3][1].x - dataFromFile.data.cross[3][0].x)
        dataFromFile.file.Cross['Low-pass']['hiHz'] = parseFloat(dataFromFile.data.cross[0][1].x)
        dataFromFile.file.Cross['Low-pass']['midHz'] = parseFloat(dataFromFile.data.cross[1][1].x)
        dataFromFile.file.Cross['Low-pass']['lowHz'] = parseFloat(dataFromFile.data.cross[2][1].x)
        dataFromFile.file.Cross['Low-pass']['subHz'] = parseFloat(dataFromFile.data.cross[3][1].x)
        /*Update high pass*/
        dataFromFile.file.Cross['Hi-pass']['hiFilterOrd'] = getFilterValue(dataFromFile.data.cross[0][3].x - dataFromFile.data.cross[0][2].x)
        dataFromFile.file.Cross['Hi-pass']['midFilterOrd'] = getFilterValue(dataFromFile.data.cross[1][3].x - dataFromFile.data.cross[1][2].x)
        dataFromFile.file.Cross['Hi-pass']['lowFilterOrd'] = getFilterValue(dataFromFile.data.cross[2][3].x - dataFromFile.data.cross[2][2].x)
        dataFromFile.file.Cross['Hi-pass']['subFilterOrd'] = getFilterValue(dataFromFile.data.cross[3][3].x - dataFromFile.data.cross[3][2].x)
        dataFromFile.file.Cross['Hi-pass']['hiHz'] = parseFloat(dataFromFile.data.cross[0][2].x)
        dataFromFile.file.Cross['Hi-pass']['midHz'] = parseFloat(dataFromFile.data.cross[1][2].x)
        dataFromFile.file.Cross['Hi-pass']['lowHz'] = parseFloat(dataFromFile.data.cross[2][2].x)
        dataFromFile.file.Cross['Hi-pass']['subHz'] = parseFloat(dataFromFile.data.cross[3][2].x)

        /*volume update */
        const hiLevelRLSelect = document.querySelector('.frequency_level_select input[name="cross[volume][hi]"]')
        const midLevelRLSelect = document.querySelector('.frequency_level_select input[name="cross[volume][mid]"]')
        const lowLevelRLSelect = document.querySelector('.frequency_level_select input[name="cross[volume][low]"]')
        const subLevelRLSelect = document.querySelector('.frequency_level_select input[name="cross[volume][sub]"]')

        if (hiLevelRLSelect.value == "2") {
            dataFromFile.file.Volume['leftHi'] = parseFloat(dataFromFile.data.cross[0][1].y)
        } else if (hiLevelRLSelect.value == "1") {
            dataFromFile.file.Volume['rightHi'] = parseFloat(dataFromFile.data.cross[0][2].y)
        } else {
            dataFromFile.file.Volume['stereoHi'] = parseFloat(dataFromFile.data.cross[0][1].y)
            //dataFromFile.file.Volume['stereoHi'] = parseFloat(dataFromFile.data.cross[0][2].y)
        }
        if (midLevelRLSelect.value == "2") {
            dataFromFile.file.Volume['leftMid'] = parseFloat(dataFromFile.data.cross[1][1].y)
        } else if (midLevelRLSelect.value == "1") {
            dataFromFile.file.Volume['rightMid'] = parseFloat(dataFromFile.data.cross[1][2].y)
        } else {
            dataFromFile.file.Volume['stereoMid'] = parseFloat(dataFromFile.data.cross[1][1].y)
            //dataFromFile.file.Volume['stereoMid'] = parseFloat(dataFromFile.data.cross[1][2].y)
        }
        if (lowLevelRLSelect.value == "2") {
            dataFromFile.file.Volume['leftLow'] = parseFloat(dataFromFile.data.cross[2][1].y)
        } else if (lowLevelRLSelect.value == "1") {
            dataFromFile.file.Volume['rightLow'] = parseFloat(dataFromFile.data.cross[2][2].y)
        } else {
            dataFromFile.file.Volume['stereoLow'] = parseFloat(dataFromFile.data.cross[2][1].y)
            //dataFromFile.file.Volume['stereoLow'] = parseFloat(dataFromFile.data.cross[2][2].y)
        }
        if (subLevelRLSelect.value == "2") {
            dataFromFile.file.Volume['leftSub'] = parseFloat(dataFromFile.data.cross[3][1].y)
        } else if (subLevelRLSelect.value == "1") {
            dataFromFile.file.Volume['rightSub'] = parseFloat(dataFromFile.data.cross[3][2].y)
        } else {
            dataFromFile.file.Volume['stereoSub'] = parseFloat(dataFromFile.data.cross[3][1].y)
            //dataFromFile.file.Volume['stereoSub'] = parseFloat(dataFromFile.data.cross[3][2].y)
        }
        /*init file update*/
        dataFromFile.needUpdate = true;
    }

    // init charts from file


    const initDataFromFile = async () => {
     //   const data = await getProfileId()
        profileId = 1; // вернёт 1
        return mockData;
    }
    const initApp = async () => {
        initDataFromFile().then(data => {
            /*Даныне состояния*/
            // Eq график чарт
            const ctx1 = document.getElementById('cross_chart')
            // Cross график чарт
            const ctx = document.getElementById('eq_chart');
            if (ctx.nextElementSibling.chart) {
                ctx.nextElementSibling.chart.destroy()
            }
            if (ctx1.nextElementSibling.chart) {
                ctx1.nextElementSibling.chart.destroy()
            }

            function formCrossData(data) {
                const result = []
                for (let index = 0; index < 4; index++) {
                    const cross = data.Cross
                    const volume = data.Volume
                    const filterOrd = ["hiFilterOrd", "midFilterOrd", "lowFilterOrd", "subFilterOrd"][index]
                    const Hz = ["hiHz", "midHz", "lowHz", "subHz"][index]
                    const tip = ["hiTip", "midTip", "lowTip", "subTip"][index]
                    const vol = ["stereoHi", "stereoMid", "stereoLow", "stereoSub"][index]
                    //const muteLeft = ["leftHi", "leftMid", "leftLow", "leftSub"][index]
                    //const muteRight = ["rightHi", "rightMid", "rightLow", "rightSub"][index]
                    const newLine = [{
                        x: cross["Low-pass"][Hz] - ValueDegreeMap[`-${cross["Low-pass"][filterOrd]}dB/Oct`],
                        y: -12
                    },
                        {x: cross["Low-pass"][Hz], y: volume[vol]},
                        {x: cross["Hi-pass"][Hz], y: volume[vol]},
                        {x: cross["Hi-pass"][Hz] + ValueDegreeMap[`-${cross["Hi-pass"][filterOrd]}dB/Oct`], y: -12}]
                    result.push(newLine)
                }
                return result;
            }


            dataFromFile.data.volume = data.Volume;
            dataFromFile.data.spdif = data.Spdif;
            dataFromFile.data.system = data.System;
            dataFromFile.data.mute = data.Mute;
            dataFromFile.data.delay = data.Delay;
            dataFromFile.data.phase = data.Phase;
            dataFromFile.data.cross = formCrossData(data);
           // dataFromFile.data.equalizer = formEqualizerData(data);
            dataFromFile.data.equalizer = updateToEqualizerGraphic(data, 0, 0);//all
            dataFromFile.file = data;
            dataFromFile.needUpdate = false;
            ctx1.nextElementSibling.chart = new Chart(ctx1, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'high',
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                        ],

                        //  tension: 0.4, // Создает плавную "кривую" EQ
            pointRadius: 0, // Скрываем точки для чистоты линии
                   //  borderWidth: 1,
                   //         pointBorderWidth: 5,
                       // borderRadius: 20,
                        //pointBorderWidth: 5,
                       // cubicInterpolationMode: 'monotone',
                       // showLine: true
                    },
                        {
                            label: 'mid',

                            backgroundColor: ['rgba(0, 0, 255, 1)'],
                            borderColor: [
                                'rgba(100, 153, 255, 0.3)',
                            ],
                            borderWidth: 1,
                            pointBorderWidth: 5,
                            cubicInterpolationMode: 'monotone',
                            showLine: true
                        },
                        {
                            label: 'low',

                            backgroundColor: ['rgba(150, 255, 100,1)'],
                            borderColor: ['rgba(150, 255, 100,0.3)'],
                            borderWidth: 1,
                            pointBorderWidth: 5,
                            cubicInterpolationMode: 'monotone',
                            showLine: true
                        },
                        {
                            label: 'sub',
                            backgroundColor: ['rgba(255, 255, 0.3,1)'],
                            borderColor: [
                                'rgba(255, 255, 0, 0.3)'
                            ],
                            borderWidth: 1,
                            pointBorderWidth: 5,
                            cubicInterpolationMode: 'monotone',
                            showLine: true
                        }
                    ]
                },
                options: {
                    tension: 0.3,//??????????/
                    elements: {
                       	  point: {
						     radius: 0
					      },
                    },
                    scales: {
                        x: {
                type: 'logarithmic', // Важно для аудио графиков
                min: 20,
                max: 20000,

                ticks: {
                 maxTicksLimit: 5,//???????????????????????????????????????????
                callback: function (val, index) {
                if (val >= 1000) {
                return val / 1000 + "k"
                } else {
                return val/1000
                }
  },
                },
                title: {
                display: true,
                text: 'Hz'
                },

            },
                        y: {

                       // type: 'logarithmic',
                            ticks: {
                                callback: function (value, index, ticks) {
                                    if (index === 0) {
                                        return "-10";
                                    }
                                    if (index === 5) {
                                        return "0";
                                    }
                                    if (index === 10) {
                                        return "+10";
                                    }
                                }
                            },
                            title: {
                                display: false,
                                text: 'dB'
                            },
                            max: 10,
                            min: -10,
                        }
                    },
                    animation: {
                        duration: 0
                    }
                },
            });

            const chartActiveEqualizer = ctx1.nextElementSibling.chart
            /*Вставка данных из файла в граффик*/
            chartActiveEqualizer.data.datasets[0].data = prepareDateToEqualizerGraphic(dataFromFile, 0);
            /////////////chartActiveEqualizer.data.datasets[1].data = prepareDateToEqualizerGraphic(dataFromFile, 1);
           /////////// chartActiveEqualizer.data.datasets[2].data = prepareDateToEqualizerGraphic(dataFromFile, 2);
           //////////////// chartActiveEqualizer.data.datasets[3].data = prepareDateToEqualizerGraphic(dataFromFile, 3);
           //////////// chartActiveEqualizer.update();
            /*cross level select init from file*/
            const allLevelSelect = document.querySelectorAll('.frequency_level_select')
            allLevelSelect.forEach(item => {
                const initValue = dataFromFile.data.volume
                const select = item.querySelector('.input select');
                const event = new Event('input', {
                    bubbles: true,
                    cancelable: true,
                });

                if (select) {


if (select.name.includes('[hi]')) {
                        const channSwitchs = document.querySelectorAll('.frequency_level_select input[name="eq[band][hi]"]')
                        channSwitchs.forEach(item => {
                            item.addEventListener('input', () => {

                                let index_data;
                                const index = 0;
                                const band = document.querySelector('.band_number_select select').value;


                                if (item.value === "1"){
                                index_data = updateToEqualizerGraphic(data, index + 1, 1);
                                chartActiveEqualizer.data.datasets[index].borderDash = [2, 2];
                                } else if(item.value === "2" ){
                                index_data = updateToEqualizerGraphic(data, index + 1, 2);
                                chartActiveEqualizer.data.datasets[index].borderDash = [2, 2];
                                } else {
                                index_data = updateToEqualizerGraphic(data, index + 1, 0);
                                delete chartActiveEqualizer.data.datasets[index].borderDash;
                                }


                                dataFromFile.data.equalizer[index] = index_data[index];

                                //dataFromFile.data.equalizer = updateToEqualizerGraphic(data, 1);
                             ///////////////////////////  chartActiveEqualizer.data.datasets[index].data = prepareDateToEqualizerGraphic(dataFromFile, index);

                                //update slider
                                const freq = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.freq .frequency_range input');
                                const gain = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.gain .frequency_range input');
                                const qf = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.qf .frequency_range input');

                                freq.value = dataFromFile.data.equalizer[index][band-1][2].x / 1000;
                                gain.value = dataFromFile.data.equalizer[index][band-1][2].y;
                                qf.value = 1/(dataFromFile.data.equalizer[index][band-1][2].x - dataFromFile.data.equalizer[index][band-1][1].x) * 300;

                                const updateSlider = (item) => {
                                let percent = (item.value - item.min) / (item.max - item.min) * 100
                                let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
                                item.closest('.frequency_range').querySelector('.range_text .range_value .number').textContent = item.value;
                                item.style.background =
                                `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`

                                }
                                updateSlider(freq);
                                updateSlider(gain);
                                updateSlider(qf);

                                chartActiveEqualizer.update();
                            })
                            item.dispatchEvent(event);
                        })
}




if (select.name.includes('[mid]')) {
                        const channSwitchs = document.querySelectorAll('.frequency_level_select input[name="eq[band][mid]"]')
                        channSwitchs.forEach(item => {
                            item.addEventListener('input', () => {

                                let index_data;
                                const index = 1;
                                const band = document.querySelector('.band_number_select select').value;


                                if (item.value === "1"){
                                index_data = updateToEqualizerGraphic(data, index + 1, 1);
                                chartActiveEqualizer.data.datasets[index].borderDash = [2, 2];
                                } else if(item.value === "2" ){
                                index_data = updateToEqualizerGraphic(data, index + 1, 2);
                                chartActiveEqualizer.data.datasets[index].borderDash = [2, 2];
                                } else {
                                index_data = updateToEqualizerGraphic(data, index + 1, 0);
                                delete chartActiveEqualizer.data.datasets[index].borderDash;
                                }


                                dataFromFile.data.equalizer[index] = index_data[index];

                                //dataFromFile.data.equalizer = updateToEqualizerGraphic(data, 1);
                                /////////////////////////chartActiveEqualizer.data.datasets[index].data = prepareDateToEqualizerGraphic(dataFromFile, index);

                                //update slider
                                const freq = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.freq .frequency_range input');
                                const gain = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.gain .frequency_range input');
                                const qf = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.qf .frequency_range input');

                                freq.value = dataFromFile.data.equalizer[index][band-1][2].x / 1000;
                                gain.value = dataFromFile.data.equalizer[index][band-1][2].y;
                                qf.value = 1/(dataFromFile.data.equalizer[index][band-1][2].x - dataFromFile.data.equalizer[index][band-1][1].x) * 300;

                                const updateSlider = (item) => {
                                let percent = (item.value - item.min) / (item.max - item.min) * 100
                                let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
                                item.closest('.frequency_range').querySelector('.range_text .range_value .number').textContent = item.value;
                                item.style.background =
                                `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`

                                }
                                updateSlider(freq);
                                updateSlider(gain);
                                updateSlider(qf);

                                chartActiveEqualizer.update();
                            })
                            item.dispatchEvent(event);
                        })
}
if (select.name.includes('[low]')) {
                        const channSwitchs = document.querySelectorAll('.frequency_level_select input[name="eq[band][low]"]')
                        channSwitchs.forEach(item => {
                            item.addEventListener('input', () => {

                                let index_data;
                                const index = 2;
                                const band = document.querySelector('.band_number_select select').value;


                                if (item.value === "1"){
                                index_data = updateToEqualizerGraphic(data, index + 1, 1);
                                chartActiveEqualizer.data.datasets[index].borderDash = [2, 2];
                                } else if(item.value === "2" ){
                                index_data = updateToEqualizerGraphic(data, index + 1, 2);
                                chartActiveEqualizer.data.datasets[index].borderDash = [2, 2];
                                } else {
                                index_data = updateToEqualizerGraphic(data, index + 1, 0);
                                delete chartActiveEqualizer.data.datasets[index].borderDash;
                                }


                                dataFromFile.data.equalizer[index] = index_data[index];

                                //dataFromFile.data.equalizer = updateToEqualizerGraphic(data, 1);
                               ////////////////////////////// chartActiveEqualizer.data.datasets[index].data = prepareDateToEqualizerGraphic(dataFromFile, index);

                                //update slider
                                const freq = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.freq .frequency_range input');
                                const gain = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.gain .frequency_range input');
                                const qf = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.qf .frequency_range input');

                                freq.value = dataFromFile.data.equalizer[index][band-1][2].x / 1000;
                                gain.value = dataFromFile.data.equalizer[index][band-1][2].y;
                                qf.value = 1/(dataFromFile.data.equalizer[index][band-1][2].x - dataFromFile.data.equalizer[index][band-1][1].x) * 300;

                                const updateSlider = (item) => {
                                let percent = (item.value - item.min) / (item.max - item.min) * 100
                                let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
                                item.closest('.frequency_range').querySelector('.range_text .range_value .number').textContent = item.value;
                                item.style.background =
                                `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`

                                }
                                //не сбрасывает
                                updateSlider(freq);
                                updateSlider(gain);
                                updateSlider(qf);

                                chartActiveEqualizer.update();
                            })
                            item.dispatchEvent(event);
                        })
}
if (select.name.includes('[sub]')) {
                        const channSwitchs = document.querySelectorAll('.frequency_level_select input[name="eq[band][sub]"]')
                        channSwitchs.forEach(item => {
                            item.addEventListener('input', () => {

                                let index_data;
                                const index = 3;
                                const band = document.querySelector('.band_number_select select').value;


                                if (item.value === "1"){
                                index_data = updateToEqualizerGraphic(data, index + 1, 1);
                                chartActiveEqualizer.data.datasets[index].borderDash = [2, 2];
                                } else if(item.value === "2" ){
                                index_data = updateToEqualizerGraphic(data, index + 1, 2);
                                chartActiveEqualizer.data.datasets[index].borderDash = [2, 2];
                                } else {
                                index_data = updateToEqualizerGraphic(data, index + 1, 0);
                                delete chartActiveEqualizer.data.datasets[index].borderDash;
                                }


                                dataFromFile.data.equalizer[index] = index_data[index];

                                //dataFromFile.data.equalizer = updateToEqualizerGraphic(data, 1);
                              ///////////////////////////  chartActiveEqualizer.data.datasets[index].data = prepareDateToEqualizerGraphic(dataFromFile, index);

                                //update slider
                                const freq = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.freq .frequency_range input');
                                const gain = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.gain .frequency_range input');
                                const qf = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.qf .frequency_range input');

                                freq.value = dataFromFile.data.equalizer[index][band-1][2].x / 1000;
                                gain.value = dataFromFile.data.equalizer[index][band-1][2].y;
                                qf.value = 1/(dataFromFile.data.equalizer[index][band-1][2].x - dataFromFile.data.equalizer[index][band-1][1].x) * 300;

                                const updateSlider = (item) => {
                                let percent = (item.value - item.min) / (item.max - item.min) * 100
                                let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
                                item.closest('.frequency_range').querySelector('.range_text .range_value .number').textContent = item.value;
                                item.style.background =
                                `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`

                                }
                                //не сбрасывает
                                updateSlider(freq);
                                updateSlider(gain);
                                updateSlider(qf);

                                chartActiveEqualizer.update();
                            })
                            item.dispatchEvent(event);
                        })
}


                //????????????????????????????????


                    if (select.name.includes('[hi]')) {
                        //if (initValue['leftHi'] !== initValue['rightHi']) {
                          //  select.value = initValue['stereoHi'];
                          //  select.closest('.input').querySelector('.select-selected').innerHTML = initValue['stereoHi'] + " dB"
                       // }
                        const levelSwitchs = document.querySelectorAll('.frequency_level_select input[name="cross[volume][hi]"]')
                        levelSwitchs.forEach(item => {
                            item.value = "0"
                            item.addEventListener('input', () => {
                                if (item.value === "2") {
                                    select.value = dataFromFile.data.volume['leftHi'];
                                    levelUpdateOnGrafic(select.value, select)
                                    select.closest('.input').querySelector('.select-selected').innerHTML = dataFromFile.data.volume['leftHi'] + " dB"
                                } else if (item.value === "1") {
                                    select.value = dataFromFile.data.volume['rightHi'];
                                    levelUpdateOnGrafic(select.value, select)
                                    select.closest('.input').querySelector('.select-selected').innerHTML = dataFromFile.data.volume['rightHi'] + " dB"
                                }
                                 else {
                                    select.value = dataFromFile.data.volume['stereoHi'];
                                    levelUpdateOnGrafic(select.value, select)
                                    select.closest('.input').querySelector('.select-selected').innerHTML = dataFromFile.data.volume['stereoHi'] + " dB"
                                }
                            })
                            item.dispatchEvent(event);
                        })
}

                    if (select.name.includes('[mid]')) {
                        //if (initValue['leftMid'] !== initValue['rightMid']) {
                         //   select.value = initValue['stereoMid'];
                         //   select.closest('.input').querySelector('.select-selected').innerHTML = initValue['stereoMid'] + " dB"
                       // }
                        const levelSwitchs = document.querySelectorAll('.frequency_level_select input[name="cross[volume][mid]"]')
                        levelSwitchs.forEach(item => {
                            item.value = "0"
                            item.addEventListener('input', () => {

                                if (item.value === "2") {
                                    select.value = dataFromFile.data.volume['leftMid'];
                                    levelUpdateOnGrafic(select.value, select)
                                    select.closest('.input').querySelector('.select-selected').innerHTML = dataFromFile.data.volume['leftMid'] + " dB"
                                } else if (item.value === "1") {
                                    select.value = dataFromFile.data.volume['rightMid'];
                                    levelUpdateOnGrafic(select.value, select)
                                    select.closest('.input').querySelector('.select-selected').innerHTML = dataFromFile.data.volume['rightMid'] + " dB"
                                }
                                else {
                                    select.value = dataFromFile.data.volume['stereoMid'];
                                    levelUpdateOnGrafic(select.value, select)
                                    select.closest('.input').querySelector('.select-selected').innerHTML = dataFromFile.data.volume['stereoMid'] + " dB"
                                }
                            })
                            item.dispatchEvent(event);
                        })


                    }
                    if (select.name.includes('[low]')) {
                       // if (initValue['leftLow'] !== initValue['rightLow']) {
                           // select.value = initValue['stereoLow'];
                         //   select.closest('.input').querySelector('.select-selected').innerHTML = initValue['stereoLow'] + " dB"
                      //  }
                        const levelSwitchs = document.querySelectorAll('.frequency_level_select input[name="cross[volume][low]"]')
                        levelSwitchs.forEach(item => {
                            item.value = "0"
                            item.addEventListener('input', () => {

                                if (item.value === "2") {
                                    select.value = dataFromFile.data.volume['leftLow'];
                                    levelUpdateOnGrafic(select.value, select)
                                    select.closest('.input').querySelector('.select-selected').innerHTML = dataFromFile.data.volume['leftLow'] + " dB"
                                } else if (item.value === "1") {
                                    select.value = dataFromFile.data.volume['rightLow'];
                                    levelUpdateOnGrafic(select.value, select)
                                    select.closest('.input').querySelector('.select-selected').innerHTML = dataFromFile.data.volume['rightLow'] + " dB"
                                }
                                else {
                                    select.value = dataFromFile.data.volume['stereoLow'];
                                    levelUpdateOnGrafic(select.value, select)
                                    select.closest('.input').querySelector('.select-selected').innerHTML = dataFromFile.data.volume['stereoLow'] + " dB"
                                }
                            })
                            item.dispatchEvent(event);
                        })


                    }
                    if (select.name.includes('[sub]')) {
                       // if (initValue['leftSub'] !== initValue['rightSub']) {
                          //  select.value = initValue['stereoSub'];
                        //    select.closest('.input').querySelector('.select-selected').innerHTML = initValue['stereoSub'] + " dB"
                        //}
                        const levelSwitchs = document.querySelectorAll('.frequency_level_select input[name="cross[volume][sub]"]')
                        levelSwitchs.forEach(item => {
                            item.value = "0"
                            item.addEventListener('input', () => {
                                if (item.value === "2") {
                                    select.value = dataFromFile.data.volume['leftSub'];
                                    levelUpdateOnGrafic(select.value, select)
                                    select.closest('.input').querySelector('.select-selected').innerHTML = dataFromFile.data.volume['leftSub'] + " dB"
                                } else if (item.value === "1") {
                                    select.value = dataFromFile.data.volume['rightSub'];
                                    levelUpdateOnGrafic(select.value, select)
                                    select.closest('.input').querySelector('.select-selected').innerHTML = dataFromFile.data.volume['rightSub'] + " dB"
                                }
                                else {
                                    select.value = dataFromFile.data.volume['stereoSub'];
                                    levelUpdateOnGrafic(select.value, select)
                                    select.closest('.input').querySelector('.select-selected').innerHTML = dataFromFile.data.volume['stereoSub'] + " dB"
                                }
                            })
                            item.dispatchEvent(event);
                        })


                    }
                }
            })
            /*slope EQ init value from file*/
            const allSlopes = document.querySelectorAll('.frequency_slope')
            allSlopes.forEach(item => {
                const label = item.querySelector('.input .select-selected')
                const select = item.querySelector('.input select')
                const tab = item.closest('.frequency_block').getAttribute('data-tab-content')
                const tabMap = {
                    "1": "hiFilterOrd",
                    "2": "midFilterOrd",
                    "3": "lowFilterOrd",
                    "4": "subFilterOrd"
                }
                const isHigh = item.closest('.frequency_levels_item').classList.contains('high')
                let valueFromFile;
                if (isHigh) {
                    valueFromFile = dataFromFile.file.Cross["Hi-pass"][tabMap[tab]]
                } else {
                    valueFromFile = dataFromFile.file.Cross["Low-pass"][tabMap[tab]]
                }
                label.innerHTML = `-${valueFromFile}dB/Oct`
                select.value = `-${valueFromFile}dB/Oct`
            })
            /*slider EQ init value from file*/
            const allFrequencyBlocks = document.querySelectorAll('#eq .frequency_block');
            allFrequencyBlocks.forEach(item => {
                const index = item.getAttribute('data-tab-content') - 1;
                const freq = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.freq .frequency_range input');
                const gain = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.gain .frequency_range input');
                const qf = item.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.qf .frequency_range input');
                freq.value = dataFromFile.data.equalizer[index][0][2].x / 1000;
                gain.value = dataFromFile.data.equalizer[index][0][2].y;
                qf.value = 1/(dataFromFile.data.equalizer[index][0][2].x - dataFromFile.data.equalizer[index][0][1].x) * 300;
                const updateSlider = (item) => {
                    let percent = (item.value - item.min) / (item.max - item.min) * 100
                    let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
                    item.closest('.frequency_range').querySelector('.range_text .range_value .number').textContent = item.value;
                    if (item.closest('.frequency_range').querySelector('.range_text .eq_range_value .number')) {
                        if (item.value < 1) {
                            item.closest('.frequency_range').querySelector('.range_text .eq_range_value .number').textContent = item.value * 1000
                            item.closest('.frequency_range').querySelectorAll('.range_text .eq_range_value span')[1].textContent = "Hz"
                        } else {
                            item.closest('.frequency_range').querySelectorAll('.range_text .eq_range_value span')[1].textContent = "kHz"
                        }
                    }
                    item.style.background =
                        `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`


                }
                updateSlider(freq)
                updateSlider(gain)
                updateSlider(qf)




            })
            /*------------------------------------------------------------------------------------------------------------*/
            // Cross grafic init from file
            ctx.nextElementSibling.chart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'high',
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 2,
                        pointBorderWidth: 5,
                        cubicInterpolationMode: 'monotone',
                        showLine: true
                    },
                        {
                            label: 'mid',
                            backgroundColor: ['rgba(0, 0, 255,1)'],
                            borderColor: [
                                'rgba(100, 153, 255, 0.3)',
                            ],
                            borderWidth: 1,
                            pointBorderWidth: 5,
                            cubicInterpolationMode: 'monotone',
                            showLine: true
                        },
                        {
                            label: 'low',
                            backgroundColor: ['rgba(150, 255, 100,1)'],
                            borderColor: ['rgba(150, 255, 100,0.3)'],
                            borderWidth: 1,
                            pointBorderWidth: 5,
                            cubicInterpolationMode: 'monotone',
                            showLine: true
                        },
                        {
                            label: 'sub',
                            backgroundColor: ['rgba(255, 255, 0,1)'],
                            borderColor: [
                                'rgba(255, 255, 0,0.3)'
                            ],
                            borderWidth: 1,
                            pointBorderWidth: 5,
                            cubicInterpolationMode: 'monotone',
                            showLine: true
                        }
                    ]
                },
                options: {
                    tension: 0.1,
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                callback: function (val, index) {
                                    if (val > 1000) {
                                        return val / 1000 + "k"
                                    } else {
                                        return val
                                    }

                                },
                            },
                            title: {
                                display: true,
                                text: 'Hz'
                            },
                            max: 20000,
                            min: 0,
                        },
                        y: {
                            ticks: {
                                callback: function (value, index, ticks) {
                                    if (index === 0) {
                                        return "-10";
                                    }
                                    if (index === 5) {
                                        return "-5";
                                    }
                                    if (index === 10) {
                                        return "-0";
                                    }
                                }
                            },
                            title: {
                                display: false,
                                text: 'dB'
                            },
                            max: 0,
                            min: -10,
                        }
                    },
                    animation: {
                        duration: 0
                    }
                },
            });


            /*Вставка данных из файла в граффик*/
            const chartActiveCross = ctx.nextElementSibling.chart

            chartActiveCross.data.datasets[0].data = dataFromFile.data.cross[0];
            chartActiveCross.data.datasets[1].data = dataFromFile.data.cross[1];
            chartActiveCross.data.datasets[2].data = dataFromFile.data.cross[2];
            chartActiveCross.data.datasets[3].data = dataFromFile.data.cross[3];

           // if (dataFromFile.file.Volume.leftHi !== dataFromFile.file.Volume.rightHi) {
          //      chartActiveCross.data.datasets[0].borderDash = [10, 5]
          //  }
         //   if (dataFromFile.file.Volume.leftMid !== dataFromFile.file.Volume.rightMid) {
          //      chartActiveCross.data.datasets[1].borderDash = [10, 5]
         //   }
          //  if (dataFromFile.file.Volume.leftLow !== dataFromFile.file.Volume.rightLow) {
         //       chartActiveCross.data.datasets[2].borderDash = [10, 5]
          //  }
         //   if (dataFromFile.file.Volume.leftSub !== dataFromFile.file.Volume.rightSub) {
          //      chartActiveCross.data.datasets[3].borderDash = [10, 5]
          //  }

            chartActiveCross.update();
            /*Type init data from file*/
            // Cross type Select
            document.querySelectorAll('.type_select').forEach(function (item) {
                let select = item.querySelector(' select')
                const index = select.closest('.frequency_block').getAttribute('data-tab-content')
                const low = select.closest('.frequency_levels_item').classList.contains('low');
                const high = select.closest('.frequency_levels_item').classList.contains('high');
                let newCrossValue = 1;
                const map = ['hiTip', 'midTip', 'lowTip', 'subTip']

                if (low) {
                    newCrossValue = dataFromFile.file.Cross["Low-pass"][map[index - 1]];
                }
                if (high) {
                    newCrossValue = dataFromFile.file.Cross["Hi-pass"][map[index - 1]];
                }

                typeSelectOnSelect(newCrossValue - 1, select)
            })
            /*slider Cross init value from file*/
            const allFrequencyBlocksCross = document.querySelectorAll('#cross .frequency_block');
            allFrequencyBlocksCross.forEach(item => {
                const index = item.getAttribute('data-tab-content') - 1;

                const lowRange = item.closest('.frequency_block').querySelector('.frequency_levels_item.low .frequency_range input');
                const highRange = item.closest('.frequency_block').querySelector('.frequency_levels_item.high .frequency_range input');

                lowRange.value = dataFromFile.data.cross[index][1].x / 1000
                highRange.value = dataFromFile.data.cross[index][2].x / 1000
                const updateSlider = (item) => {
                    let percent = (item.value - item.min) / (item.max - item.min) * 100
                    let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
                    item.closest('.frequency_range').querySelector('.range_text .range_value .number').textContent = item.value;
                    if (item.closest('.frequency_range').querySelector('.range_text .eq_range_value .number')) {
                        if (item.value < 1) {
                            item.closest('.frequency_range').querySelector('.range_text .eq_range_value .number').textContent = item.value * 1000
                            item.closest('.frequency_range').querySelectorAll('.range_text .eq_range_value span')[1].textContent = "Hz"
                        } else {
                            item.closest('.frequency_range').querySelectorAll('.range_text .eq_range_value span')[1].textContent = "kHz"
                        }
                    }
                    item.style.background =
                        `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`

                }
                updateSlider(lowRange)
                updateSlider(highRange)
            })
            /*Tcross Phase вставка данных из файла*/
            const allTcrossSpekears = document.querySelectorAll('.speakers_params .param_item .param_footer .phase .value .phase_item')
            allTcrossSpekears.forEach(item => {
                const input = item.querySelector('input')
                const keyMap = {
                    "tcorr[front_left][high][phase]": "leftHi",
                    "tcorr[front_left][low][phase]": "leftLow",
                    "tcorr[front_left][mid][phase]": "leftMid",
                    "tcorr[sub][left][phase]": "leftSub",
                    "tcorr[front_right][high][phase]": "rightHi",
                    "tcorr[front_right][low][phase]": "rightLow",
                    "tcorr[front_right][mid][phase]": "rightMid",
                    "tcorr[sub][right][phase]": "rightSub"
                }
                const currentKey = input.getAttribute('name')
                const valueInFile = dataFromFile.data.phase[keyMap[currentKey]]
                if (valueInFile === 1 && input.value === "180") {
                    input.checked = true;
                }
                if (valueInFile === 0 && input.value === "0") {
                    input.checked = true;
                }
                item.addEventListener('click', event => {
                    input.checked = true;
                    const updatePhaseInFile = () => {
                        if (input.value === "0") {
                            dataFromFile.data.phase[keyMap[currentKey]] = 0;
                        }
                        if (input.value === "180") {
                            dataFromFile.data.phase[keyMap[currentKey]] = 1;
                        }
                        dataFromFile.needUpdate = true;
                    }
                    updatePhaseInFile()
                })
            })
            // Profile выбор активного профиля
            const allProfiles = document.querySelectorAll('.profile_settings .profile_settings_item');

            function resetAllProfiles() {
                allProfiles.forEach(item => {
                    const btn = item.querySelector('.profile_settings_item_btn')
                    btn.innerHTML = 'Inactive'
                    item.classList.remove('active')

                })
            }

            allProfiles.forEach(item => {
                const btn = item.querySelector('.profile_settings_item_btn')
                const resetBtn = item.querySelector('.profile_settings_item_reset_btn')
                if (btn.getAttribute('data-id') == profileId) {
                    resetAllProfiles()
                    btn.innerHTML = 'Active'
                    item.classList.add('active')
                }
                resetBtn.addEventListener('click', async () => {
                    const resetId = resetBtn.getAttribute('data-id')
                    const modal = document.querySelector('.profile_settings_reset_modal')
                    const modalCloseBtn = modal.querySelector('.profile_settings_reset_modal_close')
                    const modalNoBtn = modal.querySelector('.profile_settings_reset_modal_btn_no')
                    const modalYesBtn = modal.querySelector('.profile_settings_reset_modal_btn_yes')
                    const label = modal.querySelector('.profile_settings_reset_modal_label_number')
                    label.innerHTML = resetId
                    const yesListener = async () => {
                        await resetProfileToDefault(resetId)
                        const activeProfileId = await getProfileId();
                        if (activeProfileId == resetId) {
                            initApp()//?????????????????????????????????????????????????????????????????????????????
                        }
                        modal.classList.remove("active")
                    }
                    modalCloseBtn.addEventListener('click', () => {
                        modalYesBtn.removeEventListener('click', yesListener)
                        modal.classList.remove("active")
                    })
                    modalNoBtn.addEventListener('click', () => {
                        modalYesBtn.removeEventListener('click', yesListener)
                        modal.classList.remove("active")
                    })
                    modalYesBtn.addEventListener('click', yesListener)
                    modal.classList.add("active")
                })
                btn.addEventListener('click', () => {
                    resetAllProfiles()
                    setActiveProfile(btn.getAttribute('data-id'))
                    btn.innerHTML = 'Active'
                    item.classList.add('active')
                })
            })
            //init System from file
             const initSystem = () => {

              const setSystemInput = () => {
                    const target = document.querySelector('.timer_settings')
                    const select = target.querySelector('.timer_settings_number_select')
                    const input = select.querySelector('input')
                 //   const rangeInput = target.querySelector(' .timer_settings_number_select input')


                //    rangeInput.value = data.System.timer;
                    input.value = data.System.timer;


                    input.addEventListener('input', () => {
                     //   rangeInput.value = input.value;
                        const event = new Event('input', {
                            bubbles: true,
                            cancelable: true,
                        });
                        updateSystemFileParameter(parseInt(input.value), "timer")
                       // rangeInput.dispatchEvent(event)
                    })
                 //   rangeInput.addEventListener('input', () => {
                  //      input.value = rangeInput.value;
                  //      updateSpDifFileParameter(parseInt(rangeInput.value), "spdifin")
                //    })




              }
setSystemInput();
             }



            //init SpDiF from file
            const initSpDiF = () => {

                const setSpdifInput = () => {
                    const target = document.querySelector('.generator_settings_spdif.input')
                    const btn = target.querySelector('.generator_settings_btn')
                    const select = target.querySelector('.generator_settings_number_select')
                    const input = select.querySelector('input')
                    const rangeInput = target.querySelector(' .generator_settings_range_select input')
                    input.addEventListener('input', () => {
                        rangeInput.value = input.value;
                        const event = new Event('input', {
                            bubbles: true,
                            cancelable: true,
                        });
                        rangeInput.dispatchEvent(event)
                    })
                    rangeInput.addEventListener('input', () => {
                        input.value = rangeInput.value;
                        updateSpDifFileParameter(parseInt(rangeInput.value), "spdifin")
                    })

                    if ((data.Spdif.spdifinact === 1 && data.Spdif.toslinkinact === 1) ||
                    (data.Spdif.spdifinact === 0 && data.Spdif.toslinkinact === 0))
                    {

                        updateSpDifFileParameter(1, "spdifinact")
                        updateSpDifFileParameter(0, "toslinkinact")

                    }



                    if (data.Spdif.spdifinact === 1) {
                        target.classList.add('active')
                        btn.classList.add('active')
                        btn.innerHTML = 'Active'
                        select.classList.add('active')
                        input.removeAttribute('disabled')
                        rangeInput.removeAttribute('disabled')
                        rangeInput.value = data.Spdif.spdifin;
                        input.value = data.Spdif.spdifin;
                    } else {
                        input.removeAttribute('disabled')
                        input.value = data.Spdif.spdifin;
                        input.setAttribute('disabled', true)
                        rangeInput.removeAttribute('disabled')
                        rangeInput.value = data.Spdif.spdifin;
                        rangeInput.setAttribute('disabled', true)
                    }




                    const item = rangeInput;
                    let percent = (item.value - item.min) / (item.max - item.min) * 100
                    let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
                    item.style.background =
                        `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`
                }



                const setTosLinkInput = () => {
                    const target = document.querySelector('.generator_settings_toslink.input')
                    const btn = target.querySelector('.generator_settings_btn')
                    const select = target.querySelector('.generator_settings_number_select')
                    const input = select.querySelector('input')
                    const rangeInput = target.querySelector(' .generator_settings_range_select input')
                    input.addEventListener('input', () => {
                        rangeInput.value = input.value;
                        const event = new Event('input', {
                            bubbles: true,
                            cancelable: true,
                        });
                        rangeInput.dispatchEvent(event)
                    })
                    rangeInput.addEventListener('input', () => {
                        input.value = rangeInput.value;
                        updateSpDifFileParameter(parseInt(rangeInput.value), "toslinkin")
                    })
                    if (data.Spdif.toslinkinact === 1) {
                        target.classList.add('active')
                        btn.classList.add('active')
                        btn.innerHTML = 'Active'
                        select.classList.add('active')
                        input.removeAttribute('disabled')
                        rangeInput.removeAttribute('disabled')
                        rangeInput.value = data.Spdif.toslinkin;
                        input.value = data.Spdif.toslinkin;
                    } else {
                        input.removeAttribute('disabled')
                        input.value = data.Spdif.toslinkin;
                        input.setAttribute('disabled', true)
                        rangeInput.removeAttribute('disabled')
                        rangeInput.value = data.Spdif.toslinkin;
                        rangeInput.setAttribute('disabled', true)
                    }
                    const item = rangeInput;
                    let percent = (item.value - item.min) / (item.max - item.min) * 100
                    let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
                    item.style.background =
                        `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`
                }


              const setUsbInput = () => {
                    const target = document.querySelector('.generator_settings_usb.input')
                    const btn = target.querySelector('.generator_settings_btn')
                    const select = target.querySelector('.generator_settings_number_select')
                    const input = select.querySelector('input')
                    const rangeInput = target.querySelector(' .generator_settings_range_select input')
                    input.addEventListener('input', () => {
                        rangeInput.value = input.value;
                        const event = new Event('input', {
                            bubbles: true,
                            cancelable: true,
                        });
                        rangeInput.dispatchEvent(event)
                    })
                    rangeInput.addEventListener('input', () => {
                        input.value = rangeInput.value;
                        updateSpDifFileParameter(parseInt(rangeInput.value), "usbin")
                    })
                    if (data.Spdif.usbinact === 1) {
                        target.classList.add('active')
                        btn.classList.add('active')
                        btn.innerHTML = 'Active'
                        select.classList.add('active')
                        input.removeAttribute('disabled')
                        rangeInput.removeAttribute('disabled')
                        rangeInput.value = data.Spdif.usbin;
                        input.value = data.Spdif.usbin;
                    } else {
                        input.removeAttribute('disabled')
                        input.value = data.Spdif.usbin;
                        input.setAttribute('disabled', true)
                        rangeInput.removeAttribute('disabled')
                        rangeInput.value = data.Spdif.usbin;
                        rangeInput.setAttribute('disabled', true)
                    }
                    const item = rangeInput;
                    let percent = (item.value - item.min) / (item.max - item.min) * 100
                    let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
                    item.style.background =
                        `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`
                }


                  const setPlayerInput = () => {
                    const target = document.querySelector('.generator_settings_player.input')
                    const btn = target.querySelector('.generator_settings_btn')
                    const select = target.querySelector('.generator_settings_number_select')
                    const input = select.querySelector('input')
                    const rangeInput = target.querySelector(' .generator_settings_range_select input')
                    input.addEventListener('input', () => {
                        rangeInput.value = input.value;
                        const event = new Event('input', {
                            bubbles: true,
                            cancelable: true,
                        });
                        rangeInput.dispatchEvent(event)
                    })
                    rangeInput.addEventListener('input', () => {
                        input.value = rangeInput.value;
                        updateSpDifFileParameter(parseInt(rangeInput.value), "playerin")
                    })
                    if (data.Spdif.playerinact === 1) {
                        target.classList.add('active')
                        btn.classList.add('active')
                        btn.innerHTML = 'Active'
                        select.classList.add('active')
                        input.removeAttribute('disabled')
                        rangeInput.removeAttribute('disabled')
                        rangeInput.value = data.Spdif.playerin;
                        input.value = data.Spdif.playerin;
                    } else {
                        input.removeAttribute('disabled')
                        input.value = data.Spdif.playerin;
                        input.setAttribute('disabled', true)
                        rangeInput.removeAttribute('disabled')
                        rangeInput.value = data.Spdif.playerin;
                        rangeInput.setAttribute('disabled', true)
                    }
                    const item = rangeInput;
                    let percent = (item.value - item.min) / (item.max - item.min) * 100
                    let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
                    item.style.background =
                        `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`
                }

                const setProtection = () => {
                    const target = document.querySelector('.generator_settings_protection')
                    const btn = target.querySelector('.generator_settings_btn');
                    if (data.Spdif.protection === 1) {
                        target.classList.toggle('active')
                        btn.classList.add('active')
                        btn.innerHTML = 'Active'
                    }
                }

                setSpdifInput()
                setTosLinkInput()
                setUsbInput()
                setPlayerInput()
                setProtection()


                //setSpdifOutact()
                //setSingenerotor()
                //setWhiteNoise()
            }


            initSystem();
            initSpDiF();

// Volume master
            set_volume();



            // Speakers
            document.querySelector('[name=switchers_all]').checked = dataFromFile.file.Mute["master"] === 1;
            document.querySelectorAll('.speakers_all .speaker_item input').forEach(item => {
                const name = item.getAttribute('name');
                const isChecked = (value) => {
                    if (value === 1) {
                        return true;
                    } else {
                        return false;
                    }
                }
                if (name === "speakers[front_left][high]") {
                    item.checked = isChecked(dataFromFile.file.Mute["leftHi"]);
                }
                if (name === "speakers[front_right][high]") {
                    item.checked = isChecked(dataFromFile.file.Mute["rightHi"]);
                }

                if (name === "speakers[front_left][mid]") {
                    item.checked = isChecked(dataFromFile.file.Mute["leftMid"]);
                }
                if (name === "speakers[front_right][mid]") {
                    item.checked = isChecked(dataFromFile.file.Mute["rightMid"]);
                }
                if (name === "speakers[front_left][low]") {
                    item.checked = isChecked(dataFromFile.file.Mute["leftLow"]);
                }
                if (name === "speakers[front_right][low]") {
                    item.checked = isChecked(dataFromFile.file.Mute["rightLow"]);
                }
                if (name === "speakers[front_left][sub]") {
                    item.checked = isChecked(dataFromFile.file.Mute["leftSub"]);
                }
                if (name === "speakers[front_right][sub]") {
                    item.checked = isChecked(dataFromFile.file.Mute["rightSub"]);
                }
                item.addEventListener('click', () => {
                    const name = item.getAttribute('name');
                    const getValue = () => {
                        let newValue = 0;
                        if (item.checked) {
                            newValue = 1;
                        }
                        return newValue;
                    }
                    if (name === "speakers[front_left][high]") {
                        dataFromFile.file.Mute["leftHi"] = getValue();
                    }
                    if (name === "speakers[front_right][high]") {
                        dataFromFile.file.Mute["rightHi"] = getValue();
                    }

                    if (name === "speakers[front_left][mid]") {
                        dataFromFile.file.Mute["leftMid"] = getValue();
                    }
                    if (name === "speakers[front_right][mid]") {
                        dataFromFile.file.Mute["rightMid"] = getValue();
                    }
                    if (name === "speakers[front_left][low]") {
                        dataFromFile.file.Mute["leftLow"] = getValue();
                    }
                    if (name === "speakers[front_right][low]") {
                        dataFromFile.file.Mute["rightLow"] = getValue();
                    }
                    if (name === "speakers[front_left][sub]") {
                        dataFromFile.file.Mute["leftSub"] = getValue();
                    }
                    if (name === "speakers[front_right][sub]") {
                        dataFromFile.file.Mute["rightSub"] = getValue();
                    }
                    updateCrossFileParameter()
                })
            })

            let allTCrossPanels = document.querySelectorAll('.speakers_params .param_item');
            allTCrossPanels.forEach(function (item) {
                const input = item.querySelector('.speaker_range input')
                const label = item.querySelector('.param_footer .distance .distance_value .value')
                const name = input.getAttribute('name')
                if (name === "tcorr[front_left][high][range]") {
                    input.value = dataFromFile.file.Delay["leftHi"]
                }
                if (name === "tcorr[front_right][high][range]") {
                    input.value = dataFromFile.file.Delay["rightHi"]
                }
                if (name === "tcorr[front_left][mid][range]") {
                    input.value = dataFromFile.file.Delay["leftMid"]
                }
                if (name === "tcorr[front_right][mid][range]") {
                    input.value = dataFromFile.file.Delay["rightMid"]
                }
                if (name === "tcorr[front_left][low][range]") {
                    input.value = dataFromFile.file.Delay["leftLow"]
                }
                if (name === "tcorr[front_right][low][range]") {
                    input.value = dataFromFile.file.Delay["rightLow"]
                }
                if (name === "tcorr[sub][left][range]") {
                    input.value = dataFromFile.file.Delay["leftSub"]
                }
                if (name === "tcorr[sub][right][range]") {
                    input.value = dataFromFile.file.Delay["rightSub"]
                }
                const updateSlider = (item) => {
                    let percent = (item.value - item.min) / (item.max - item.min) * 100
                    let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
                    item.closest('.speaker_range').querySelector('.range_text .range_value .number').textContent = item.value;
                    item.style.background =
                        `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`


                }
                updateSlider(input)
                label.innerHTML = (input.value * 34).toFixed(1) + " cm"
                const onSliderValueChange = () => {
                    const name = input.getAttribute('name')
                    if (name === "tcorr[front_left][high][range]") {
                        dataFromFile.file.Delay["leftHi"] = parseFloat(input.value);
                    }
                    if (name === "tcorr[front_right][high][range]") {
                        dataFromFile.file.Delay["rightHi"] = parseFloat(input.value);
                    }
                    if (name === "tcorr[front_left][mid][range]") {
                        dataFromFile.file.Delay["leftMid"] = parseFloat(input.value);
                    }
                    if (name === "tcorr[front_right][mid][range]") {
                        dataFromFile.file.Delay["rightMid"] = parseFloat(input.value);
                    }
                    if (name === "tcorr[front_left][low][range]") {
                        dataFromFile.file.Delay["leftLow"] = parseFloat(input.value);
                    }
                    if (name === "tcorr[front_right][low][range]") {
                        dataFromFile.file.Delay["rightLow"] = parseFloat(input.value);
                    }
                    if (name === "tcorr[sub][left][range]") {
                        dataFromFile.file.Delay["leftSub"] = parseFloat(input.value);
                    }
                    if (name === "tcorr[sub][right][range]") {
                        dataFromFile.file.Delay["rightSub"] = parseFloat(input.value);
                    }
                    updateSlider(input)
                    updateCrossFileParameter()
                    label.innerHTML = (input.value * 34).toFixed(1) + " cm"
                }
                input.addEventListener('input', () => {
                    onSliderValueChange()
                })
                const prev = item.querySelector('.speaker_range .range_input_wp .prev')
                const next = item.querySelector('.speaker_range .range_input_wp .next')
                let timerPrev;
                let timerNext;
                prev.addEventListener('click', () => {
                    if (input.value >= input.min + input.step) {
                        input.value = input.value - input.step
                        onSliderValueChange()
                    }
                })
                prev.addEventListener('mousedown', () => {
                    timerPrev = setInterval(() => {
                        if (input.value >= input.min + input.step) {
                            input.value = input.value - input.step
                            onSliderValueChange()
                        }
                    }, 100)

                })
                prev.addEventListener('mouseup', () => {
                    clearInterval(timerPrev);
                })
                prev.addEventListener('mouseleave', () => {
                    clearInterval(timerPrev);
                })
                next.addEventListener('mousedown', () => {
                    timerNext = setInterval(() => {
                        if (input.value <= input.max - input.step) {
                            input.value = parseFloat(input.value) + parseFloat(input.step)
                            onSliderValueChange()
                        }
                    }, 100)
                })
                next.addEventListener('click', () => {
                    if (input.value <= input.max - input.step) {
                        input.value = parseFloat(input.value) + parseFloat(input.step)
                        onSliderValueChange()
                    }
                })
                next.addEventListener('mouseup', () => {
                    clearInterval(timerNext);
                })
                next.addEventListener('mouseleave', () => {
                    clearInterval(timerNext);
                })
                // Range TCross  модальное окно и стрелки
                const rangeModal = item.querySelector('.speaker_range .speaker_range_modal')
                const showenText = item.querySelector('.speaker_range .range_text .range_value .number')
                const rangeModalBtn = item.querySelector('.speaker_range .speaker_range_modal .speaker_range_modal_btn')
                const rangeModalInput = item.querySelector('.speaker_range .speaker_range_modal .speaker_range_modal_label_input input')
                const sliderInput = item.querySelector('.speaker_range input')
                showenText.addEventListener('click', () => {
                    rangeModalInput.value = sliderInput.value;
                    rangeModal.classList.add("active")
                })
                rangeModalBtn.addEventListener('click', () => {
                    rangeModal.classList.remove("active")
                    sliderInput.value = rangeModalInput.value;
                    showenText.innerHTML = sliderInput.value;
                    let percent = (sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min) * 100
                    let percent1 = 100 - ((sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min) * 100);
                    sliderInput.style.background =
                        `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`
                    onSliderValueChange()
                })


            })

        });
    }
    initApp()

    function updateChartHighLight(index, btn) {
        const chartActive = btn.closest('.settings_block').chart
        const getNewColor = (color, opacity) => {
            const charArray = color.split(',')
            const newColor = charArray.reduce((acc, item, index) => {
                if (index === charArray.length - 1) {
                    return acc + ` ${opacity})`;
                }
                return acc + item + ",";
            }, "")
            return newColor;
        }
        for (let i = 0; i < 4; i++) {
            if (i === index) {
                chartActive.data.datasets[i].borderColor[0] = getNewColor(chartActive.data.datasets[i].borderColor[0], 1)
                chartActive.data.datasets[i].borderWidth = 2;
            } else {
                chartActive.data.datasets[i].borderColor[0] = getNewColor(chartActive.data.datasets[i].borderColor[0], 0.3)
                chartActive.data.datasets[i].borderWidth = 1;
            }
        }
        chartActive.update()
    }

    // toggle buttons(hi, mid, low, sub) - EQ
    (function () {

        let buttonHigh = document.querySelector('.high')
        buttonHigh.addEventListener('click', function () {
            const chartActive = buttonHigh.closest('.settings_block').chart
            updateChartHighLight(0, buttonHigh)
            buttonHigh.parentElement.querySelectorAll('*').forEach(element => {
                element.classList.remove('active')
            });
            buttonHigh.classList.add('active')
            setActivateTab(buttonHigh, 1)
        })
        let buttonMid = document.querySelector('.mid')

        buttonMid.addEventListener('click', function () {
            const chartActive = buttonMid.closest('.settings_block').chart
            updateChartHighLight(1, buttonMid)
            buttonMid.parentElement.querySelectorAll('*').forEach(element => {
                element.classList.remove('active')
            });

            buttonMid.classList.add('active')
            setActivateTab(buttonMid, 2)
        })
        let buttonLow = document.querySelector('.low')

        buttonLow.addEventListener('click', function () {
            const chartActive = buttonLow.closest('.settings_block').chart
            updateChartHighLight(2, buttonLow)
            buttonLow.parentElement.querySelectorAll('*').forEach(element => {
                element.classList.remove('active')
            });

            buttonLow.classList.add('active')
            setActivateTab(buttonLow, 3)
        })

        let buttonSub = document.querySelector('.sub')
        buttonSub.addEventListener('click', function () {
            const chartActive = buttonSub.closest('.settings_block').chart
            updateChartHighLight(3, buttonSub)
            buttonSub.parentElement.querySelectorAll('*').forEach(element => {
                element.classList.remove('active')
            });

            buttonSub.classList.add('active')
            setActivateTab(buttonSub, 4)
        })
    })();
    // Char Line
    //Код работы ссылок из more в парвом верхнем углу
    const moreLinks = document.querySelectorAll('.more_hidden_menu .more_hidden_menu_item')
    moreLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            clearContentBlocks();
            clearNavItems();
            const target = link.getAttribute('href');
            let targetBlock = document.querySelector(target);
            if (targetBlock) {
                targetBlock.classList.add('active');
            }
            const hiddenMenu = document.querySelector('.more_hidden_menu');
            hiddenMenu.classList.remove('active')
            const tabTitle = document.querySelector('.about .tab_title')
            tabTitle.innerHTML = link.getAttribute('data-tab')
        })
    })
    // Код для работы навигации в нижнем части
    let navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const hiddenMenu = document.querySelector('.more_hidden_menu');
            hiddenMenu.classList.remove('active')
            let target = this.getAttribute('href');
            clearContentBlocks();
            clearNavItems();

            let targetBlock = document.querySelector(target)
            const activeBtn = targetBlock.querySelector('.level_item.-active')
            const tabTitle = document.querySelector('.about .tab_title')
            tabTitle.innerHTML = this.getAttribute('data-tab')
            console.log("77777")
            console.log(activeBtn)
            if (targetBlock)
                targetBlock.classList.add('active');
            if (activeBtn?.classList.contains("high")) {
                setActivateTab(activeBtn, 1)
            }
            if (activeBtn?.classList.contains("mid")) {
                setActivateTab(activeBtn, 2)
            }
            if (activeBtn?.classList.contains("low")) {
                setActivateTab(activeBtn, 3)
            }
            if (activeBtn?.classList.contains("sub")) {
                setActivateTab(activeBtn, 4)
            }

            this.classList.add('active');

        })
    })

    // SpDif & Generator control аквтивация секций
    const SpDiFInputVolume = document.querySelector('.generator_settings_spdif.input .generator_settings_btn')
    const TosLinkInputVolume = document.querySelector('.generator_settings_toslink.input .generator_settings_btn')
    const UsbInputVolume = document.querySelector('.generator_settings_usb.input .generator_settings_btn')
    const PlayerInputVolume = document.querySelector('.generator_settings_player.input .generator_settings_btn')
    const Protection = document.querySelector('.generator_settings_protection .generator_settings_btn')

    SpDiFInputVolume.addEventListener('click', () => {
        const target = document.querySelector('.generator_settings_spdif.input')
        const select = target.querySelector('.generator_settings_number_select')
        const input = select.querySelector('input')

        const target2 = document.querySelector('.generator_settings_toslink.input')
        const select2 = target2.querySelector('.generator_settings_number_select')
        const input2 = select2.querySelector('input')

        const rangeInput = document.querySelector('.generator_settings_spdif.input .generator_settings_range_select input')
        const rangeInput2 = document.querySelector('.generator_settings_toslink.input .generator_settings_range_select input')


        target.classList.toggle('active')
        target2.classList.toggle('active')

        if (target.classList.contains('active')) {
            SpDiFInputVolume.innerHTML = 'Active'
            TosLinkInputVolume.innerHTML = 'Inactive'

            select.classList.add('active')
            input.removeAttribute('disabled')

            select2.classList.remove('active')
            input2.setAttribute('disabled', "true")

            rangeInput.removeAttribute('disabled')
            rangeInput2.setAttribute('disabled', "true")

            updateSpDifFileParameter(1, "spdifinact")
            updateSpDifFileParameter(0, "toslinkinact")
        } else {
            SpDiFInputVolume.innerHTML = 'Inactive'
            TosLinkInputVolume.innerHTML = 'Active'


            select.classList.remove('active')
            input.setAttribute('disabled', "true")

            select2.classList.add('active')
            input2.removeAttribute('disabled')

            rangeInput.setAttribute('disabled', "true")
            rangeInput2.removeAttribute('disabled')

            updateSpDifFileParameter(0, "spdifinact")
            updateSpDifFileParameter(1, "toslinkinact")
        }
    })


    TosLinkInputVolume.addEventListener('click', () => {

        const target = document.querySelector('.generator_settings_toslink.input')
        const select = target.querySelector('.generator_settings_number_select')
        const input = select.querySelector('input')

        const target2 = document.querySelector('.generator_settings_spdif.input')
        const select2 = target2.querySelector('.generator_settings_number_select')
        const input2 = select2.querySelector('input')

        const rangeInput = document.querySelector('.generator_settings_toslink.input .generator_settings_range_select input')
        const rangeInput2 = document.querySelector('.generator_settings_spdif.input .generator_settings_range_select input')


        target.classList.toggle('active')
        target2.classList.toggle('active')
        if (target.classList.contains('active')) {
            TosLinkInputVolume.innerHTML = 'Active'
            SpDiFInputVolume.innerHTML = 'Inactive'

            select2.classList.remove('active')
            input2.setAttribute('disabled', "true")

            select.classList.add('active')
            input.removeAttribute('disabled')

            rangeInput.removeAttribute('disabled')
            rangeInput2.setAttribute('disabled', "true")

            updateSpDifFileParameter(1, "toslinkinact")
            updateSpDifFileParameter(0, "spdifinact")
        } else {
            TosLinkInputVolume.innerHTML = 'Inactive'
            SpDiFInputVolume.innerHTML = 'Active'

            select2.classList.add('active')
            input2.removeAttribute('disabled')

            select.classList.remove('active')
            input.setAttribute('disabled', "true")

            rangeInput.setAttribute('disabled', "true")
            rangeInput2.removeAttribute('disabled')

            updateSpDifFileParameter(0, "toslinkinact")
            updateSpDifFileParameter(1, "spdifinact")
        }
    })

    UsbInputVolume.addEventListener('click', () => {
        const target = document.querySelector('.generator_settings_usb.input')
        const select = target.querySelector('.generator_settings_number_select')
        const input = select.querySelector('input')
        const rangeInput = document.querySelector('.generator_settings_usb.input .generator_settings_range_select input')
        target.classList.toggle('active')
        if (target.classList.contains('active')) {
            UsbInputVolume.innerHTML = 'Active'
            select.classList.add('active')
            input.removeAttribute('disabled')
            rangeInput.removeAttribute('disabled')
            updateSpDifFileParameter(1, "usbinact")
        } else {
            UsbInputVolume.innerHTML = 'Inactive'
            select.classList.remove('active')
            input.setAttribute('disabled', "true")
            rangeInput.setAttribute('disabled', "true")
            updateSpDifFileParameter(0, "usbinact")
        }
    })

    PlayerInputVolume.addEventListener('click', () => {
         const target = document.querySelector('.generator_settings_player.input')
        const select = target.querySelector('.generator_settings_number_select')
        const input = select.querySelector('input')
        const rangeInput = document.querySelector('.generator_settings_player.input .generator_settings_range_select input')
        target.classList.toggle('active')
        if (target.classList.contains('active')) {
            PlayerInputVolume.innerHTML = 'Active'
            select.classList.add('active')
            input.removeAttribute('disabled')
            rangeInput.removeAttribute('disabled')
            updateSpDifFileParameter(1, "playerinact")
        } else {
            PlayerInputVolume.innerHTML = 'Inactive'
            select.classList.remove('active')
            input.setAttribute('disabled', "true")
            rangeInput.setAttribute('disabled', "true")
            updateSpDifFileParameter(0, "playerinact")
        }
    })

     Protection.addEventListener('click', () => {
        const target = document.querySelector('.generator_settings_protection')
       // const select = target.querySelector('.generator_settings_number_select')
        //const input = select.querySelector('input')
        target.classList.toggle('active')
        if (target.classList.contains('active')) {
            Protection.innerHTML = 'Active'
           // select.classList.add('active')
          //  input.removeAttribute('disabled')
            updateSpDifFileParameter(1, "protection")
        } else {
            Protection.innerHTML = 'Inactive'
          //  select.classList.remove('active')
          //  input.setAttribute('disabled', "true")
            updateSpDifFileParameter(0, "protection")
        }
    })

//new
// System control number select's
 const SystemNumberSelects = document.querySelectorAll('.timer_settings_number_select')
 SystemNumberSelects.forEach((item) => {
        const input = item.querySelector('input');
        const rangeInput = item.parentElement.querySelector('.timer_settings_number_select input');
        const prev = item.querySelector('.prev');
        const next = item.querySelector('.next');
        const event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        prev.addEventListener('click', () => {

                input.stepDown()
                input.dispatchEvent(event)


        })
        next.addEventListener('click', () => {

                input.stepUp()
                input.dispatchEvent(event)

        })
    })












    // SpDif & Generator control number select's
    const SpDifNumberSelects = document.querySelectorAll('.generator_settings_number_select')
    SpDifNumberSelects.forEach((item) => {
        const input = item.querySelector('input');
        const rangeInput = item.parentElement.querySelector('.generator_settings_range_select input');
        const prev = item.querySelector('.prev');
        const next = item.querySelector('.next');
        const event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        prev.addEventListener('click', () => {
            if (item.classList.contains('active')) {
                input.stepDown()
                input.dispatchEvent(event)
            }

        })
        next.addEventListener('click', () => {
            if (item.classList.contains('active')) {
                input.stepUp()
                input.dispatchEvent(event)
            }
        })
    })
    //
    const SpDifRangeSelect = document.querySelectorAll('.generator_settings_range_select input').forEach(item => {
        item.addEventListener('input', () => {
            let percent = (item.value - item.min) / (item.max - item.min) * 100
            let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
            item.style.background =
                `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`
        })
    })

    // Спикеры все off или on
    switcherInput = document.querySelector('[name=switchers_all]');
    switcherInput.addEventListener('input', function (e) {
        e.preventDefault();
        let allSpeakers = document.querySelectorAll('#speakers .speakers_all [type=checkbox]');
        setAllSpeakersStatus = (value) => {
            const allSpeakers = document.querySelectorAll('#speakers .speakers_all .speaker_item input')
            allSpeakers.forEach(item => {
                item.checked = value
            })
            const fileValue = value ? 1 : 0
            dataFromFile.file.Mute["master"] = fileValue;
            dataFromFile.file.Mute["leftHi"] = fileValue;
            dataFromFile.file.Mute["rightHi"] = fileValue;
            dataFromFile.file.Mute["leftMid"] = fileValue;
            dataFromFile.file.Mute["rightMid"] = fileValue;
            dataFromFile.file.Mute["leftLow"] = fileValue;
            dataFromFile.file.Mute["rightLow"] = fileValue;
            dataFromFile.file.Mute["leftSub"] = fileValue;
            dataFromFile.file.Mute["rightSub"] = fileValue;
            updateCrossFileParameter()
        }
        setAllSpeakersStatus(this.checked)

        if (this.checked) {
            allSpeakers.forEach(function (item) {
                item.checked = true;
            })
        } else {
            allSpeakers.forEach(function (item) {
                item.checked = false;
            })
        }
    });
    // toggle buttons(hi, mid, low, sub) - Cross
    (function () {

        let buttonHigh = document.querySelector('.cross_high');
        let buttonLow = document.querySelector('.cross_low');
        let buttonSub = document.querySelector('.cross_sub');
        let buttonMid = document.querySelector('.cross_mid');
        buttonHigh.addEventListener('click', function () {
            const chartActive = buttonHigh.closest('.settings_block').chart
            updateChartHighLight(0, buttonHigh)
            buttonHigh.parentElement.querySelectorAll('*').forEach(element => {
                element.classList.remove('active')
            });

            buttonHigh.classList.add('active')
            setActivateTab(buttonHigh, 1)
        })
        buttonMid.addEventListener('click', function () {
            const chartActive = buttonMid.closest('.settings_block').chart
            updateChartHighLight(1, buttonMid)
            buttonMid.parentElement.querySelectorAll('*').forEach(element => {
                element.classList.remove('active')
            });

            buttonMid.classList.add('active')
            setActivateTab(buttonMid, 2)
        })
        buttonLow.addEventListener('click', function () {
            const chartActive = buttonLow.closest('.settings_block').chart
            updateChartHighLight(2, buttonLow)
            buttonLow.parentElement.querySelectorAll('*').forEach(element => {
                element.classList.remove('active')
            });

            buttonLow.classList.add('active')
            setActivateTab(buttonLow, 3)
        })
        buttonSub.addEventListener('click', function () {
            const chartActive = buttonSub.closest('.settings_block').chart
            updateChartHighLight(3, buttonSub)
            buttonSub.parentElement.querySelectorAll('*').forEach(element => {
                element.classList.remove('active')
            });

            buttonSub.classList.add('active')
            setActivateTab(buttonSub, 4)
        })
    })();

    // Range Slider модальное окно и стрелки
    let allRangeBlocks = document.querySelectorAll('.frequency_block .frequency_levels_item');
    allRangeBlocks.forEach(function (item) {
        const isFreq = item.closest('.frequency_levels_item').classList.contains('freq')
        const isGain = item.closest('.frequency_levels_item').classList.contains('gain')
        const isQF = item.closest('.frequency_levels_item').classList.contains('qf')
        const isCross = !!item.closest('.cross_settings_block')
        const sliderInput = item.querySelector('.frequency_range input')
        if (isFreq || isCross) {
            function digits_float(target) {

                if (target) {
                    const val = parseFloat(target.value) * 1000
                    target.value = val.toString().replace(/[^0-9]/g, '')
                    if (target.value > 20000) {
                        target.value = 20000
                    }
                    target.value = target.value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    console.log(target.value)
                }
            }

            function digits_float_update(target, value, plus) {
                target.value = target.value.replace(/[^0-9]/g, '')
                if (plus) {
                    target.value = parseInt(target.value) + parseInt(value)
                } else {
                    const newVal = parseInt(target.value) - parseInt(value)
                    if (newVal > 20) {
                        target.value = newVal
                    }
                }
                if (target.value > 20000) {
                    target.value = 20000
                }

                target.value = target.value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            }

            const rangeModal = item.querySelector('.frequency_range .custom_frequency_range_modal')
            const showenText = item.querySelector('.frequency_range .range_text .range_value .number')
            const rangeModalBtn = item.querySelector('.frequency_range .custom_frequency_range_modal .custom_frequency_range_modal_btn')
            const rangeModalInput = item.querySelector('.frequency_range .custom_frequency_range_modal .custom_frequency_range_modal_label_input input')
            const resetBtn = item.querySelector('.frequency_range .custom_frequency_range_modal .custom_frequency_range_modal_reset_btn')
            const rangeModalCloseBtn = item.querySelector('.frequency_range .custom_frequency_range_modal .custom_frequency_range_modal_close')
            const steps = item.querySelectorAll('.custom_frequency_range_modal_step_item')
            showenText.addEventListener('click', () => {
                rangeModalInput.value = sliderInput.value;
                rangeModal.classList.add("active")
                digits_float(rangeModalInput);
            })
            rangeModalCloseBtn?.addEventListener('click', () => {
                rangeModal.classList.remove("active")
            })
            rangeModalBtn?.addEventListener('click', () => {
                rangeModal.classList.remove("active")
                sliderInput.value = rangeModalInput.value.replace(/[^0-9]/g, '') / 1000;
                showenText.innerHTML = sliderInput.value;
                let percent = (sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min) * 100
                let percent1 = 100 - ((sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min) * 100);
                sliderInput.style.background =
                    `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`

                onRangeValueUpdate.bind(sliderInput)()
            })
            rangeModalInput?.addEventListener('input', () => {
                digits_float(rangeModalInput);
            })
            resetBtn?.addEventListener('click', () => {
                const isCross_High = !!resetBtn?.closest('.frequency_levels_item.high')
                if (isCross_High) {
                    rangeModalInput.value = 20000;
                } else {
                    rangeModalInput.value = 0;//???????????????????
                }
            })
            steps?.forEach(el => {
                const prev = el?.querySelector('.prev')
                const next = el?.querySelector('.next')
                const value = el?.querySelector('.step_item_value').innerHTML
                prev?.addEventListener('click', () => {
                    digits_float_update(rangeModalInput, value, false)
                })
                next?.addEventListener('click', () => {
                    digits_float_update(rangeModalInput, value, true)
                })
            })
        } else if (isGain) {

            const rangeModal = item.querySelector('.frequency_range .custom_gain_range_modal')
            const showenText = item.querySelector('.frequency_range .range_text .range_value .number')
            const rangeModalBtn = item.querySelector('.frequency_range .custom_gain_range_modal .custom_gain_range_modal_btn')
            const rangeModalInput = item.querySelector('.frequency_range .custom_gain_range_modal .custom_gain_range_modal_label_input input')
            const resetBtn = item.querySelector('.frequency_range .custom_gain_range_modal .custom_gain_range_modal_reset_btn')
            const rangeModalCloseBtn = item.querySelector('.frequency_range .custom_gain_range_modal .custom_gain_range_modal_close')
            const steps = item.querySelectorAll('.custom_gain_range_modal_step_item')
            showenText.addEventListener('click', () => {
                rangeModalInput.value = sliderInput.value;
                rangeModal.classList.add("active")
            })
            rangeModalCloseBtn?.addEventListener('click', () => {
                rangeModal.classList.remove("active")
            })
            rangeModalBtn?.addEventListener('click', () => {
                rangeModal.classList.remove("active")
                sliderInput.value = rangeModalInput.value;
                showenText.innerHTML = sliderInput.value;
                let percent = (sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min) * 100
                let percent1 = 100 - ((sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min) * 100);
                sliderInput.style.background =
                    `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`

                onRangeValueUpdate.bind(sliderInput)()
            })
            resetBtn?.addEventListener('click', () => {
                rangeModalInput.value = 0;
            })
            steps?.forEach(el => {
                const prev = el?.querySelector('.prev')
                const next = el?.querySelector('.next')
                const value = el?.querySelector('.step_item_value').innerHTML
                prev?.addEventListener('click', () => {
                    const prevValue = parseFloat(rangeModalInput.value);
                    const nextValue = prevValue - parseFloat(value)
                    if (nextValue >= -10 && nextValue <= 10) {
                        rangeModalInput.value = nextValue.toFixed(2)
                    }
                })
                next?.addEventListener('click', () => {
                    const prevValue = parseFloat(rangeModalInput.value);
                    const nextValue = prevValue + parseFloat(value)
                    if (nextValue >= -10 && nextValue <= 10) {
                        rangeModalInput.value = nextValue.toFixed(2)
                    }
                })
            })
        } else if (isQF) {
            const rangeModal = item.querySelector('.frequency_range .custom_qf_range_modal')
            const showenText = item.querySelector('.frequency_range .range_text .range_value .number')
            const rangeModalBtn = item.querySelector('.frequency_range .custom_qf_range_modal .custom_qf_range_modal_btn')
            const rangeModalInput = item.querySelector('.frequency_range .custom_qf_range_modal .custom_qf_range_modal_label_input input')
            const resetBtn = item.querySelector('.frequency_range .custom_qf_range_modal .custom_qf_range_modal_reset_btn')
            const rangeModalCloseBtn = item.querySelector('.frequency_range .custom_qf_range_modal .custom_qf_range_modal_close')
            const steps = item.querySelectorAll('.custom_qf_range_modal_step_item')
            showenText.addEventListener('click', () => {
                rangeModalInput.value = sliderInput.value;
                rangeModal.classList.add("active")
            })
            rangeModalCloseBtn?.addEventListener('click', () => {
                rangeModal.classList.remove("active")
            })
            rangeModalBtn?.addEventListener('click', () => {
                rangeModal.classList.remove("active")
                sliderInput.value = rangeModalInput.value;
                showenText.innerHTML = sliderInput.value;
                let percent = (sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min) * 100
                let percent1 = 100 - ((sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min) * 100);
                sliderInput.style.background =
                    `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`

                onRangeValueUpdate.bind(sliderInput)()
            })
            resetBtn?.addEventListener('click', () => {
                rangeModalInput.value = 0.2;
            })
            steps?.forEach(el => {
                const prev = el?.querySelector('.prev')
                const next = el?.querySelector('.next')
                const value = el?.querySelector('.step_item_value').innerHTML
                prev?.addEventListener('click', () => {
                    const prevValue = parseFloat(rangeModalInput.value);
                    const nextValue = prevValue - parseFloat(value)
                    if (nextValue > 0.19 && nextValue <= 5) {
                        rangeModalInput.value = nextValue.toFixed(2)
                    }
                })
                next?.addEventListener('click', () => {
                    const prevValue = parseFloat(rangeModalInput.value);
                    const nextValue = prevValue + parseFloat(value)
                    if (nextValue > 0.19 && nextValue <= 5) {
                        rangeModalInput.value = nextValue.toFixed(2)
                    }
                })
            })
        } else {
            const rangeModal = item.querySelector('.frequency_range .frequency_range_modal')
            const showenText = item.querySelector('.frequency_range .range_text .range_value .number')
            const rangeModalBtn = item.querySelector('.frequency_range .frequency_range_modal .frequency_range_modal_btn')
            const rangeModalCloseBtn = item.querySelector('.frequency_range .frequency_range_modal .frequency_range_modal_close')
            const rangeModalInput = item.querySelector('.frequency_range .frequency_range_modal .frequency_range_modal_label_input input')
            const plusBtn = item.querySelector('.frequency_range .frequency_range_modal .frequency_range_modal_label_input_actions .plus')
            const minusBtn = item.querySelector('.frequency_range .frequency_range_modal .frequency_range_modal_label_input_actions .minus')
            const resetBtn = item.querySelector('.frequency_range .frequency_range_modal .frequency_range_modal_label_input_actions .reset')
            rangeModalInput?.addEventListener('input', () => {
                if (rangeModalInput.value > rangeModalInput.max) {
                    rangeModalInput.value = rangeModalInput.max
                }
            })
            showenText.addEventListener('click', () => {
                rangeModalInput.value = sliderInput.value;
                rangeModal.classList.add("active")
            })
            plusBtn.addEventListener('click', () => {
                rangeModalInput.stepUp()
            })
            minusBtn.addEventListener('click', () => {
                rangeModalInput.stepDown()
            })
            resetBtn.addEventListener('click', () => {
                const isCross_High = !!resetBtn.closest('.frequency_levels_item.high')
                if (isCross_High) {
                    rangeModalInput.value = rangeModalInput.max;
                } else {
                    rangeModalInput.value = rangeModalInput.min;
                }
            })
            rangeModalCloseBtn?.addEventListener('click', () => {
                rangeModal.classList.remove("active")
            })
            rangeModalBtn.addEventListener('click', () => {
                rangeModal.classList.remove("active")
                sliderInput.value = rangeModalInput.value;
                showenText.innerHTML = sliderInput.value;
                let percent = (sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min) * 100
                let percent1 = 100 - ((sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min) * 100);
                sliderInput.style.background =
                    `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`

                onRangeValueUpdate.bind(sliderInput)()
            })

        }
        /*изменение input при клике на стрелку*/
        const prev = item.querySelector('.range_input_wp .prev')
        const next = item.querySelector('.range_input_wp .next')
        let timerPrev;
        let timerNext;
        prev.addEventListener('click', () => {
            if (sliderInput.value >= sliderInput.min + sliderInput.step) {
                sliderInput.value = sliderInput.value - sliderInput.step
                onRangeValueUpdate.bind(sliderInput)()
            }
        })
        prev.addEventListener('mousedown', () => {
            timerPrev = setInterval(() => {
                if (sliderInput.value >= sliderInput.min + sliderInput.step) {
                    sliderInput.value = sliderInput.value - sliderInput.step
                    onRangeValueUpdate.bind(sliderInput)()
                }
            }, 100)

        })
        prev.addEventListener('mouseup', () => {
            clearInterval(timerPrev);
        })
        prev.addEventListener('mouseleave', () => {
            clearInterval(timerPrev);
        })
        next.addEventListener('mousedown', () => {
            timerNext = setInterval(() => {
                if (sliderInput.value <= sliderInput.max - sliderInput.step) {
                    sliderInput.value = parseFloat(sliderInput.value) + parseFloat(sliderInput.step)
                    onRangeValueUpdate.bind(sliderInput)()
                }
            }, 100)
        })
        next.addEventListener('click', () => {
            if (sliderInput.value <= sliderInput.max - sliderInput.step) {
                sliderInput.value = parseFloat(sliderInput.value) + parseFloat(sliderInput.step)
                onRangeValueUpdate.bind(sliderInput)()
            }
        })
        next.addEventListener('mouseup', () => {
            clearInterval(timerNext);
        })
        next.addEventListener('mouseleave', () => {
            clearInterval(timerNext);
        })
    });

    //infoModal модальное окно
    const infoModalTrigger = document.querySelector('#infoModal')
    infoModalTrigger.addEventListener('click', () => {
        const activeTab = document.querySelector('.content_block.active')
        const activeTabId = activeTab.getAttribute('id')
        const modalData = infoModalContent[activeTabId]
        if (modalData.show) {
            infoModalTrigger.classList.add('active')
            const modal = document.querySelector('.about_modal')
            modal.classList.add('active')
            const isOpened = infoModalTrigger.classList.contains('active')
            if (isOpened) {
                const title = modal.querySelector('.about_modal_label')
                title.innerHTML = modalData.title
                const text = modal.querySelector('.about_modal_text')
                text.innerHTML = modalData.text
                console.log(modalData)
            }
            const aboutModalCloseBtn = modal.querySelector('.about_modal_close')
            aboutModalCloseBtn?.addEventListener('click', () => {
                modal.classList.remove('active')
                infoModalTrigger.classList.remove('active')
            })
        }

    })



      function updateSlider(item){
                let percent = (item.value - item.min) / (item.max - item.min) * 100
                let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
                //item.closest('.frequency_range').querySelector('.range_text .range_value .number').textContent = item.value;
                item.style.background =
                    `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`

            }


     // Range Volume  модальное окно и стрелки
    let allVolumeRangeBlocks = document.querySelectorAll('.volume_params');
    allVolumeRangeBlocks.forEach(function (item) {





    const sliderInput = item.querySelector('.volume_range input')

            const prev = document.querySelector('.prev')
            const next = document.querySelector('.next')
            let timerPrev;
            let timerNext;

            prev?.addEventListener('click', () => {

                const nextValue = parseFloat(sliderInput.value) - 2
                if (nextValue >= -60 && nextValue <= 0) {
                   // rangeModalInput.value = nextValue.toFixed(2)
                   sliderInput.value = nextValue;
                   updateSlider(sliderInput);
                }
            })
            next?.addEventListener('click', () => {

                const nextValue = parseFloat(sliderInput.value) + 2
                if (nextValue >= -60 && nextValue <= 0) {
                  //  rangeModalInput.value = nextValue.toFixed(2)
                  sliderInput.value = nextValue;
               updateSlider(sliderInput);
                }
            })
                prev.addEventListener('mouseup', () => {
                    clearInterval(timerPrev);
                })
                prev.addEventListener('mouseleave', () => {
                    clearInterval(timerPrev);
                })
                next.addEventListener('mouseup', () => {
                    clearInterval(timerNext);
                })
                next.addEventListener('mouseleave', () => {
                    clearInterval(timerNext);
                })
                prev.addEventListener('mousedown', () => {
                   timerPrev = setInterval(() => {
                   nextValue = parseFloat(sliderInput.value) - 1
                        if (nextValue >= -60 && nextValue <= 0) {
                        sliderInput.value = nextValue;
                      updateSlider(sliderInput);
                        }
                    }, 50)
                })
                next.addEventListener('mousedown', () => {
                   timerNext = setInterval(() => {
                   nextValue = parseFloat(sliderInput.value) + 1
                        if (nextValue >= -60 && nextValue <= 0) {
                        sliderInput.value = nextValue;
                        updateSlider(sliderInput);
                        }
                    }, 50)
                })

    })


    // Range TCross  модальное окно и стрелки
    let allTCrossRangeBlocks = document.querySelectorAll('.speakers_params .param_item');

    allTCrossRangeBlocks.forEach(function (item) {
        const sliderInput = item.querySelector('.speaker_range input')
        const rangeModal = item.querySelector('.speaker_range_modal')
        const showenText = item.querySelector('.range_text .range_value .number')
        const rangeModalBtn = item.querySelector('.speaker_range_modal .speaker_range_modal_btn')
        const rangeModalInput = item.querySelector('.speaker_range_modal .speaker_range_modal_label_input input')
        const resetBtn = item.querySelector('.speaker_range_modal .speaker_range_modal_reset_btn')
        const rangeModalCloseBtn = item.querySelector('.speaker_range_modal .speaker_range_modal_close')
        const steps = item.querySelectorAll('.speaker_range_modal_step_item')
        const title = item.querySelector('.speaker_title').innerHTML
        item.querySelector('.speaker_range_modal_label_text').innerHTML = title
        showenText?.addEventListener('click', () => {
            rangeModalInput.value = sliderInput.value;
            rangeModal.classList.add("active")
        })
        rangeModalCloseBtn?.addEventListener('click', () => {
            rangeModal.classList.remove("active")
        })
        rangeModalBtn?.addEventListener('click', () => {
            rangeModal.classList.remove("active")
            sliderInput.value = rangeModalInput.value;
            showenText.innerHTML = sliderInput.value;
            let percent = (sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min) * 100
            let percent1 = 100 - ((sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min) * 100);
            sliderInput.style.background =
                `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`

            onRangeValueUpdate.bind(sliderInput)()
        })
        resetBtn?.addEventListener('click', () => {
            rangeModalInput.value = 0;
        })
        steps?.forEach(el => {
            const prev = el?.querySelector('.prev')
            const next = el?.querySelector('.next')
            const value = el?.querySelector('.step_item_value').innerHTML
            prev?.addEventListener('click', () => {
                const prevValue = parseFloat(rangeModalInput.value);
                const nextValue = prevValue - parseFloat(value)
                if (nextValue >= 0 && nextValue <= 20) {
                    rangeModalInput.value = nextValue.toFixed(2)
                }
            })
            next?.addEventListener('click', () => {
                const prevValue = parseFloat(rangeModalInput.value);
                const nextValue = prevValue + parseFloat(value)
                if (nextValue >= 0 && nextValue <= 20) {
                    rangeModalInput.value = nextValue.toFixed(2)
                }
            })
        })
    })

    function updateToEqualizerGraphic(data, num, chann) {

                const formDataRow = (item, index) => {
                    return [{
                        x: item[
                            `freq${index}`
                            ] - parseFloat(1/item[
                            `q${index}`
                            ]) * 600, y: 0
                    },
                        {
                            x: item[
                                `freq${index}`
                                ] - parseFloat(1/item[
                                `q${index}`
                                ]) * 300, y: item[
                                `gain${index}`
                                ] / 3
                        },
                        {
                            x: item[
                                `freq${index}`
                                ], y: item[
                                `gain${index}`
                                ]
                        },
                        {
                            x: item[
                                `freq${index}`
                                ] +  parseFloat(1/item[
                                `q${index}`
                                ]) * 300, y: item[
                                `gain${index}`
                                ] / 3
                        },
                        {
                            x: item[
                                `freq${index}`
                                ] + parseFloat(1/item[
                                `q${index}`
                                ]) * 600, y: 0
                        }]
                }
                let newHiData = [];
                let newMidData = [];
                let newLowData = [];
                let newSubData = [];


                for (let i = 1; i <= 10; i++) {



               if(num === 0 || num === 1){
                if (chann === 1) {
                  newHiData.push(formDataRow(data.EQ.eqHiR, i));
                }else if (chann === 2) {
                   newHiData.push(formDataRow(data.EQ.eqHiL, i));
                } else {
                   newHiData.push(formDataRow(data.EQ.eqHi, i));
                }
}
if(num === 0 || num === 2){
                 if (chann === 1) {
                    newMidData.push(formDataRow(data.EQ.eqMidR, i));
                }else if (chann === 2) {
                    newMidData.push(formDataRow(data.EQ.eqMidL, i));
                } else {
                    newMidData.push(formDataRow(data.EQ.eqMid, i));
                }
}
if(num === 0 || num === 3){
                 if (chann === 1) {
                    newLowData.push(formDataRow(data.EQ.eqLowR, i));
                }else if (chann === 2) {
                    newLowData.push(formDataRow(data.EQ.eqLowL, i));
                } else {
                    newLowData.push(formDataRow(data.EQ.eqLow, i));
                }
}
if(num === 0 || num === 4){
                 if (chann === 1) {
                    newSubData.push(formDataRow(data.EQ.eqSubR, i));
                }else if (chann === 2) {
                    newSubData.push(formDataRow(data.EQ.eqSubL, i));
                } else {
                    newSubData.push(formDataRow(data.EQ.eqSub, i));
                }
}

                  //  newHiData.push(formDataRow(data.EQ.eqHi, i));
                    //newMidData.push(formDataRow(data.EQ.eqMid, i));
                    //newLowData.push(formDataRow(data.EQ.eqLow, i));
                    //newMasterData.push(formDataRow(data.EQ.eqSub, i));
                }
                return [newHiData, newMidData, newLowData, newSubData];


    }



//new

class Complex {
  constructor(real, imag) {
    this.real = real;
    this.imag = imag;
  }

  add(other) {
    return new Complex(this.real + other.real, this.imag + other.imag);
  }

  mul(other) {
    return new Complex(
      this.real * other.real - this.imag * other.imag,
      this.real * other.imag + this.imag * other.real
    );
  }

  div(other) {
    const denominator = other.real * other.real + other.imag * other.imag;
    return new Complex(
      (this.real * other.real + this.imag * other.imag) / denominator,
      (this.imag * other.real - this.real * other.imag) / denominator
    );
  }

   inv(other) {
   const denominator = other.real * other.real + other.imag * other.imag;
     return new Complex(
      other.real / denominator,
      -other.imag / denominator
    );
  }

   abs() {
    return Math.hypot(this.real, this.imag); // sqrt(real² + imag²)
  }
}




function calcBinCoeffs(freq, gain, q)
    {
    let A = Math.pow(10, gain / 40);
    let omega = 2 * Math.PI * freq / 48000;
    let alpha = Math.sin(omega) / (2 * q);

    let a0 = 1 + alpha / A;
    let a1 = -2 * Math.cos(omega);
    let a2 = 1 - alpha / A;
    let b0 = 1 + alpha * A;
    let b1 = -2 * Math.cos(omega);
    let b2 = 1 - alpha * A;

return [a0, a1, a2, b0, b1, b2];
    }

/*
// calculate response of biquad filter
function  calcResponse(coeff, freq, fs) {
  let om = 2 * Match.PI *  freq / fs;
  Complex x, y, z;

  z.re = cos(om);
  z.im = sin(om);
  z = inv(z);

  x = toComp(c.b0);
  x = add(x, mul(toComp(c.b1), z));
  x = add(x, mul(toComp(c.b2), mul(z, z)));

  y = toComp(c.a0);
  y = add(y, mul(toComp(c.a1), z));
  y = add(y, mul(toComp(c.a2), mul(z, z)));

  return mul(x, inv(y));
}
*/
                    // Пример функции для генерации данных (упрощенная модель пикового фильтра)
function generateEQData(coeffs) {
    const points = [];
// 2. Генерация точек (логарифмическая шкала от 20Гц до 20кГц)

    let numPoints = 100;
    for (let i = 0; i < numPoints; i ++) {


    let f = 20 * Math.pow(20000 / 20, i / (numPoints - 1));
    let w = 2 * Math.PI * f / 48000;

    let z = new Complex(Math.cos(w), -Math.sin(w));
   // z = z.inv(z);

let hh = new Complex(1,0);

    for(let y=0; y < coeffs.length ;y++)
        {
            let a0 = coeffs[y][0];
            let a1 = coeffs[y][1];
            let a2 = coeffs[y][2];
            let b0 = coeffs[y][3];
            let b1 = coeffs[y][4];
            let b2 = coeffs[y][5];

            // Вычисление числителя: b0 + b1*z + b2*z*z
            let b0c = new Complex(b0, 0);
            let b1c = new Complex(b1, 0);
            let b2c = new Complex(b2, 0);


  //x = toComp(c.b0);
  //x = add(x, mul(toComp(c.b1), z));
  //x = add(x, mul(toComp(c.b2), mul(z, z)));
            let numerator = b0c.add(b1c.mul(z)).add(b2c.mul(z.mul(z)));

            // Вычисление знаменателя: a0 + a1*z + a2*z*z
            let a0c = new Complex(a0, 0);
            let a1c = new Complex(a1, 0);
            let a2c = new Complex(a2, 0);

  //y = toComp(c.a0);
  //y = add(y, mul(toComp(c.a1), z));
  //y = add(y, mul(toComp(c.a2), mul(z, z)));

            let denominator = a0c.add(a1c.mul(z)).add(a2c.mul(z.mul(z)));

            // Деление
            let h = numerator.div(denominator);


        //  return mul(x, inv(y));


            hh = hh.mul(h);//mul
        }

   // g = 10 * log10(r.re * r.re + r.im * r.im);
  //      g += setting.totalGain;
   //     float y = GAIN_TO_Y(g);



//let magnitudeDb = 20 * Math.log10(hh.abs(hh));
  let magnitudeDb = 10 * Math.log10(hh.real * hh.real + hh.imag * hh.imag);

  //  let y = GAIN_TO_Y(g);
    points.push({x: f, y: magnitudeDb});


    }
    return points;
}
//new




//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    function prepareDateToEqualizerGraphic(dataFromFile, index) {



        let result = []

    const data = JSON.parse(JSON.stringify(dataFromFile.data.equalizer[index]));

   // let freq = data[index][2].x;
   // let gain = dataFromFile.data.equalizer[index][1 - 1][2].y;
   // let q = 1/(dataFromFile.data.equalizer[index][1 - 1][2].x - dataFromFile.data.equalizer[index][1 - 1][1].x) * 300;
//
 //const freq = select.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.freq .frequency_range input');
 //const gain = select.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.gain .frequency_range input');
// const qf = select.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.qf .frequency_range input');
//console.log(qf*4);

let coeffs = [];

for (let i = 0; i < 10; i++) {


    let freq = data[i][2].x;
    let gain = data[i][2].y;
    let q = 1/(data[i][2].x - data[i][1].x) * 300;


// 1. Расчет коэффициентов Biquad (RBJ Cookbook)
    coeffs.push(calcBinCoeffs(freq, gain, q));
}

result = generateEQData(coeffs);

return result;

        //return [{x: -50000, y: 0}, ...result, {x: 50000, y: 0}]
    }

    const onRangeValueUpdate = function () {
        let newNumberValue = false;
        if (this.closest('.settings_block')) {
            let buttonHigh = this.closest('.settings_block').querySelector('.level_item.high.active')
            let buttonLow = this.closest('.settings_block').querySelector('.level_item.low.active');
            let buttonSub = this.closest('.settings_block').querySelector('.level_item.sub.active');
            let buttonMid = this.closest('.settings_block').querySelector('.level_item.mid.active');
            let lowButton = document.querySelector('.fl_item.low.active')
            let highButton = document.querySelector('.fl_item.high.active')
            let freqButton = document.querySelector('.fl_item.freq.active')
            let gainButton = document.querySelector('.fl_item.gain.active')
            let qfButton = document.querySelector('.fl_item.qf.active')

            const scopeInput = this.closest('.frequency_block').querySelector('.frequency_levels_item.active .frequency_slope .input ')
            const chartActive = this.closest('.settings_block').chart
            /*CROSS*/
            /*Обновление low точки на граффике*/
            const updateCrossGraphicLowPoint = (index, scopeValue) => {
                const degree = ValueDegreeMap[scopeValue];
                const delta = dataFromFile.data.cross[index][2].x - this.value * 1000;
                if (delta >= 0) {
                    dataFromFile.data.cross[index][1].x = this.value * 1000
                    dataFromFile.data.cross[index][0].x = this.value * 1000 - degree;
                    chartActive.data.datasets[index].data = dataFromFile.data.cross[index]

                    updateCrossFileParameter();
                } else {
                    this.value = (dataFromFile.data.cross[index][2].x - 0) / 1000
                }

            }
            /*Обновление high точки на граффике*/

            const updateCrossGraphicHighPoint = (index, scopeValue) => {
                const degree = ValueDegreeMap[scopeValue];
                const delta = this.value * 1000 - dataFromFile.data.cross[index][1].x
                if (delta >= 0) {
                    dataFromFile.data.cross[index][2].x = this.value * 1000;
                    dataFromFile.data.cross[index][3].x = this.value * 1000 + degree;
                    chartActive.data.datasets[index].data = dataFromFile.data.cross[index]
                    updateCrossFileParameter();
                } else {
                    this.value = (dataFromFile.data.cross[index][1].x + 0) / 1000
                    dataFromFile.data.cross[index][2].x = this.value * 1000;
                    dataFromFile.data.cross[index][3].x = this.value * 1000 + degree;
                    chartActive.data.datasets[index].data = dataFromFile.data.cross[index]
                    updateCrossFileParameter();
                }

            }
            /*EQUALIZER*/




// Функция для прореживания массива (каждый n-й элемент)
function downsample(data, threshold) {
  const size = data.length;
  if (size <= threshold) return data;

  const step = Math.floor(size / threshold);
  let newArray = [];
  for (let i = 0; i < size; i += step) {
    newArray.push(data[i]);
  }
  return newArray;
}
















            const updateEqualizerGraphicFreq = (index, band) => {
                let editingBandData = dataFromFile.data.equalizer[index][band - 1]
                let delta = parseFloat(this.value) * 1000 - editingBandData[2].x;
                editingBandData[0].x = editingBandData[0].x + delta;
                editingBandData[1].x = editingBandData[1].x + delta;
                editingBandData[2].x = editingBandData[2].x + delta;
                editingBandData[3].x = editingBandData[3].x + delta;
                editingBandData[4].x = editingBandData[4].x + delta;
                dataFromFile.data.equalizer[index][band - 1] = editingBandData;
                updateEqualizerFileParameter(parseFloat(this.value), "freq", band, index);
                chartActive.data.datasets[index].data = prepareDateToEqualizerGraphic(dataFromFile, index);

const arr = 0;//generateEQData22(this.value*1000,9, 10);///prepareDateToEqualizerGraphic(dataFromFile, index);
////////////const arr = prepareDateToEqualizerGraphic(dataFromFile, index);

/////////const x = arr.map(point => point.x);
///////////////const y = arr.map(point => point.y);

/////////////const newXValue = calculateMovingAverage(x, 10);
// Создаем новый массив, заменяя только первый элемент (индекс 0) в каждой паре
//const updatedCoords = arr.map(([x, y]) => [new_xValues, y]);
///////////////var updatedPoints = new Array();
/////////////////for(var i = 0; i<x.length; i++){
  /////////////  updatedPoints.push({x: newXValue[i], y: y[i]});
//////////////////}


 ////////chartActive.data.datasets[index].data = arr;
              // chartActive.data.datasets[index].data = updatedPoints;

            }
            const updateEqualizerGraphicGain = (index, band) => {
                let editingBandData = dataFromFile.data.equalizer[index][band - 1];
                let delta = parseFloat(this.value) - editingBandData[2].y;
                editingBandData[1].y = editingBandData[1].y + delta / 3;
                editingBandData[2].y = editingBandData[2].y + delta;
                editingBandData[3].y = editingBandData[3].y + delta / 3;
                dataFromFile.data.equalizer[index][band - 1] = editingBandData;
                updateEqualizerFileParameter(parseFloat(this.value), "gain", band, index)
               chartActive.data.datasets[index].data = prepareDateToEqualizerGraphic(dataFromFile, index);
            }
            const updateEqualizerGraphicQf = (index, band) => {
                let editingBandData = dataFromFile.data.equalizer[index][band - 1];
                editingBandData[0].x = editingBandData[2].x - parseFloat(1 / this.value) * 600;
                editingBandData[1].x = editingBandData[2].x - parseFloat(1 / this.value) * 300;
                editingBandData[3].x = editingBandData[2].x + parseFloat(1 / this.value) * 300;
                editingBandData[4].x = editingBandData[2].x + parseFloat(1 / this.value) * 600;
                dataFromFile.data.equalizer[index][band - 1] = editingBandData;
                updateEqualizerFileParameter(parseFloat(this.value), "qf", band, index)
               chartActive.data.datasets[index].data = prepareDateToEqualizerGraphic(dataFromFile, index);
            }

            if (buttonHigh) {
                if (lowButton && scopeInput) {
                    const scopeValue = scopeInput.querySelector('select[name="cross[common_high][low][slope]"] ').value
                    updateCrossGraphicLowPoint(0, scopeValue);

                }
                if (highButton && scopeInput) {
                    const scopeValue = scopeInput.querySelector('select[name="cross[common_high][high][slope]"] ').value
                    updateCrossGraphicHighPoint(0, scopeValue);
                    if (this.value == 20) {
                        newNumberValue = true;
                    }
                }

                if (freqButton) {
                    const band = this.closest('.frequency_block ').querySelector('.band_number_select select').value
                    updateEqualizerGraphicFreq(0, band);
                }
                if (gainButton) {
                    const band = this.closest('.frequency_block ').querySelector('.band_number_select select').value
                    updateEqualizerGraphicGain(0, band);
                }
                if (qfButton) {
                    const band = this.closest('.frequency_block ').querySelector('.band_number_select select').value
                    updateEqualizerGraphicQf(0, band);
                }
            }
            if (buttonMid) {
                if (lowButton && scopeInput) {
                    const scopeValue = scopeInput.querySelector('select[name="cross[common_high][low][slope]"] ').value
                    updateCrossGraphicLowPoint(1, scopeValue);

                    if (this.value == 0) {
                        newNumberValue = true;
                    }
                }
                if (highButton && scopeInput) {
                    const scopeValue = scopeInput.querySelector('select[name="cross[common_high][high][slope]"] ').value
                    updateCrossGraphicHighPoint(1, scopeValue)
                    if (this.value == 20) {
                        newNumberValue = true;
                    }
                }
                if (freqButton) {
                    const band = this.closest('.frequency_block ').querySelector('.band_number_select select').value
                    updateEqualizerGraphicFreq(1, band);
                }
                if (gainButton) {
                    const band = this.closest('.frequency_block ').querySelector('.band_number_select select').value
                    updateEqualizerGraphicGain(1, band);
                }
                if (qfButton) {
                    const band = this.closest('.frequency_block ').querySelector('.band_number_select select').value
                    updateEqualizerGraphicQf(1, band);
                }
            }
            if (buttonLow) {
                if (lowButton && scopeInput) {
                    const scopeValue = scopeInput.querySelector('select[name="cross[common_high][low][slope]"] ').value
                    updateCrossGraphicLowPoint(2, scopeValue);
                    if (this.value == 0) {
                        newNumberValue = true;
                    }
                }
                if (highButton && scopeInput) {
                    const scopeValue = scopeInput.querySelector('select[name="cross[common_high][high][slope]"] ').value
                    updateCrossGraphicHighPoint(2, scopeValue)
                    if (this.value == 20) {
                        newNumberValue = true;
                    }
                }
                if (freqButton) {
                    const band = this.closest('.frequency_block ').querySelector('.band_number_select select').value
                    updateEqualizerGraphicFreq(2, band);
                }
                if (gainButton) {
                    const band = this.closest('.frequency_block ').querySelector('.band_number_select select').value
                    updateEqualizerGraphicGain(2, band);
                }
                if (qfButton) {
                    const band = this.closest('.frequency_block ').querySelector('.band_number_select select').value
                    updateEqualizerGraphicQf(2, band);
                }
            }
            if (buttonSub) {
                if (lowButton && scopeInput) {
                    const scopeValue = scopeInput.querySelector('select[name="cross[common_high][low][slope]"] ').value
                    updateCrossGraphicLowPoint(3, scopeValue);
                    if (this.value == 0) {
                        newNumberValue = true;
                    }
                }
                if (highButton && scopeInput) {
                    const scopeValue = scopeInput.querySelector('select[name="cross[common_high][high][slope]"] ').value
                    updateCrossGraphicHighPoint(3, scopeValue)
                }
                if (freqButton) {
                    const band = this.closest('.frequency_block ').querySelector('.band_number_select select').value
                    updateEqualizerGraphicFreq(3, band);
                }
                if (gainButton) {
                    const band = this.closest('.frequency_block ').querySelector('.band_number_select select').value
                    updateEqualizerGraphicGain(3, band);
                }
                if (qfButton) {
                    const band = this.closest('.frequency_block ').querySelector('.band_number_select select').value
                    updateEqualizerGraphicQf(3, band);
                }
            }




            chartActive.update('none');//new

        }
        let percent = (this.value - this.min) / (this.max - this.min) * 100
        let percent1 = 100 - ((this.value - this.min) / (this.max - this.min) * 100);
        if (newNumberValue) {
            this.parentNode.parentNode.querySelector('.range_text .range_value .number').textContent = "off"
        } else {
            this.parentNode.parentNode.querySelector('.range_text .range_value .number').textContent = this.value;
        }
        if (this.parentNode.parentNode.querySelector('.range_text .eq_range_value .number')) {
            if (this.value < 1) {
                this.parentNode.parentNode.querySelector('.range_text .eq_range_value .number').textContent = this.value * 1000
                this.parentNode.parentNode.querySelectorAll('.range_text .eq_range_value span')[1].textContent = "Hz"
            } else {
                this.parentNode.parentNode.querySelectorAll('.range_text .eq_range_value span')[1].textContent = "kHz"
            }
        }

        this.style.background =
            `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`


    }

    // Range Slider Стилы &&  Change Value by Range (изменение графика положение верхних  точек) CROSS
    let allRangeSliders = document.querySelectorAll("[type=range]");
    allRangeSliders.forEach(function (item) {
        let percent = (item.value - item.min) / (item.max - item.min) * 100
        let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
        item.style.background =
            `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`
 ///console.log(item.classList);
        if (!item.classList.contains('custom') && item.name !== 'myRange') {
            item.parentNode.parentNode.querySelector('.range_text .range_value .number').textContent = item.value
            item.oninput = onRangeValueUpdate;

        }
    })

    // TCORR элементы для управление
    let allTcorrSpeakers = document.querySelectorAll('#tcorr .speakers_all input');
    allTcorrSpeakers.forEach(function (item) {
        item.addEventListener('click', function (e) {
            clearTcorrSpeakers();
            this.checked = true;
            let targetParameter = this.dataset.target;
            clearTcorrParametres();
            document.querySelector(targetParameter).classList.add('active')
        })
    })
    // TCORR slider select Front right

    // Cross Select отключить выборку
    document.querySelectorAll('.frequency_slope select').forEach(function (item) {
        item.addEventListener('mousedown', function (e) {
            e.preventDefault()
            this.blur();
        })
    })
    // Level Select отключить выборку
    document.querySelectorAll('.frequency_level_select select').forEach(function (item) {
        item.addEventListener('mousedown', function (e) {
            e.preventDefault()
            this.blur();
        })
    })
    // Cross Select Навигация Level
    // Level выбор L/R Common
    const allLevelLR = document.querySelectorAll('.frequency_level_select .radio_group')
    allLevelLR.forEach(item => {
        const input = item.querySelector('input')
        const sameInputs = document.querySelectorAll(`.frequency_level_select .radio_group input[name*="${input.name}"]`)
        //const LR = item.querySelector('.radio_group_item.lr')
        const L = item.querySelector('.radio_group_item_button.left')
        const R = item.querySelector('.radio_group_item_button.right')
        const Common = item.querySelector('.radio_group_item.common')
        const event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        const setLevelSelectStyle = (value) => {
            if (value === "0") {
                Common.classList.add('active');
                R.classList.remove('active');
                L.classList.remove('active')
               // LR.classList.remove('active')
               // LR.querySelector('.right').classList.remove('active')
               // LR.querySelector('.left').classList.remove('active')
            } else if (value === "1") {
                Common.classList.remove('active')
                R.classList.add('active');
                L.classList.remove('active')
               // LR.classList.add('active')
               // LR.querySelector('.right').classList.add('active')
               // LR.querySelector('.left').classList.remove('active')
            } else if (value === "2") {
                Common.classList.remove('active')
                R.classList.remove('active');
                L.classList.add('active')
               // LR.classList.add('active')
               // LR.querySelector('.left').classList.add('active')
               // LR.querySelector('.right').classList.remove('active')
            }
let name = "";
if(input.name === ('eq[band][hi]'))
name = 'eqHi';
if(input.name === ('eq[band][mid]'))
name = 'eqMid';
if(input.name === ('eq[band][low]'))
name = 'eqLow';
if(input.name === ('eq[band][sub]'))
name = 'eqSub';

if(input.name === ('cross[volume][hi]'))
name = 'crossHi';
if(input.name === ('cross[volume][mid]'))
name = 'crossMid';
if(input.name === ('cross[volume][low]'))
name = 'crossLow';
if(input.name === ('cross[volume][sub]'))
name = 'crossSub';




                if(name)
                {
                dataFromFile.file.Stereo[name] = parseInt(item.value);
                dataFromFile.needUpdate = true;
                }
        }
        Common.addEventListener('click', () => {
            sameInputs.forEach(input => {
                input.value = "0"
                input.dispatchEvent(event);
            });
        })
        L.addEventListener('click', () => {
             sameInputs.forEach(input => {
                input.value = "2"
                input.dispatchEvent(event);
            });
        })
        R.addEventListener('click', () => {
             sameInputs.forEach(input => {
                input.value = "1"
                input.dispatchEvent(event);
            });
        })
        input.addEventListener('input', () => {
            item.value = input.value
            setLevelSelectStyle(item.value)
        })
    })



    //функиця обновления level на графике
    function levelUpdateOnGrafic(newValue, select) {
        select.value = newValue;
        if (select.closest('.settings_block') && select.closest('.settings_block').chart) {
            let buttonHigh = select.closest('.settings_block').querySelector('.level_item.high.active')
            let buttonLow = select.closest('.settings_block').querySelector('.level_item.low.active');
            let buttonSub = select.closest('.settings_block').querySelector('.level_item.sub.active');
            let buttonMid = select.closest('.settings_block').querySelector('.level_item.mid.active');
            const chartActive = select.closest('.settings_block').chart
            if (buttonHigh) {
                dataFromFile.data.cross[0][1].y = select.value;
                dataFromFile.data.cross[0][2].y = select.value;
                dataFromFile.data.cross[0][0].y = -12 + parseInt(select.value);
                dataFromFile.data.cross[0][3].y = -12 + parseInt(select.value);
                chartActive.data.datasets[0].data = dataFromFile.data.cross[0];
                const dashed = document.querySelector('.frequency_level_select input[name="cross[volume][hi]"]')?.value
                if (dashed === "1" || dashed === "2") {
                    chartActive.data.datasets[0].borderDash = [10, 5]
                } else {
                    delete chartActive.data.datasets[0].borderDash
                }
            }
            if (buttonMid) {
                dataFromFile.data.cross[1][1].y = select.value;
                dataFromFile.data.cross[1][2].y = select.value;
                dataFromFile.data.cross[1][0].y = -12 + parseInt(select.value);
                dataFromFile.data.cross[1][3].y = -12 + parseInt(select.value);
                chartActive.data.datasets[1].data = dataFromFile.data.cross[1];
                const dashed = document.querySelector('.frequency_level_select input[name="cross[volume][mid]"]')?.value
                if (dashed === "1" || dashed === "2") {
                    chartActive.data.datasets[1].borderDash = [10, 5]
                } else {
                    delete chartActive.data.datasets[1].borderDash
                }

            }
            if (buttonLow) {
                dataFromFile.data.cross[2][1].y = select.value;
                dataFromFile.data.cross[2][2].y = select.value;
                dataFromFile.data.cross[2][0].y = -12 + parseInt(select.value);
                dataFromFile.data.cross[2][3].y = -12 + parseInt(select.value);
                chartActive.data.datasets[2].data = dataFromFile.data.cross[2];
                const dashed = document.querySelector('.frequency_level_select input[name="cross[volume][low]"]')?.value
                if (dashed === "1" || dashed === "2") {
                    chartActive.data.datasets[2].borderDash = [10, 5]
                } else {
                    delete chartActive.data.datasets[2].borderDash
                }
            }
            if (buttonSub) {
                dataFromFile.data.cross[3][1].y = select.value;
                dataFromFile.data.cross[3][2].y = select.value;
                dataFromFile.data.cross[3][0].y = -12 + parseInt(select.value);
                dataFromFile.data.cross[3][3].y = -12 + parseInt(select.value);
                chartActive.data.datasets[2].data = dataFromFile.data.cross[2];
                const dashed = document.querySelector('.frequency_level_select input[name="cross[volume][sub]"]')?.value
                if (dashed === "1" || dashed === "2") {
                    chartActive.data.datasets[3].borderDash = [10, 5]
                } else {
                    delete chartActive.data.datasets[3].borderDash
                }
            }

            updateCrossFileParameter();
            chartActive.update();
        }
    }

    document.querySelectorAll('.level_select_navigation span').forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            let select = item.closest('.frequency_level_select').querySelector('select')
            let selectOptions = select.querySelectorAll('option');
            let sameSelect = document.querySelectorAll(`.frequency_level_select select[name="${select.name}"]`);
            let i = 0;

            // Cross Select обраотка нового значения
            let newCrossValue = null;
            if (this.classList.contains('prev')) {
                selectOptions.forEach(function (optionItem) {
                    if (optionItem.selected) {
                        previousOptionElement = i - 1;
                    }
                    i++;
                })

                if (i >= 0 && selectOptions[previousOptionElement]) {
                    selectOptions[previousOptionElement].selected = true;
                }
                newCrossValue = selectOptions[previousOptionElement].value
            } else {
                selectOptions.forEach(function (optionItem) {
                    if (optionItem.selected) {
                        nextOptionElement = i + 1;
                    }
                    i++;
                })

                if (i <= selectOptions.length && selectOptions[nextOptionElement]) {
                    selectOptions[nextOptionElement].selected = true;
                }
                newCrossValue = selectOptions[nextOptionElement]?.value
            }
            sameSelect.forEach(select => {
                if (newCrossValue) {
                    select.value = newCrossValue;
                    select.closest('.input').querySelector('.select-selected').innerHTML = newCrossValue + " dB"
                }
            })
            if (newCrossValue) {
                levelUpdateOnGrafic(newCrossValue, select)
            }

        })
    })
    // Cross Select Навигация Scope
    // функиция для изменение значения на графике (угла наклона)
    function updateScopeGrafic(newCrossValue, select) {
        const degree = ValueDegreeMap[newCrossValue]
        if (select.closest('.settings_block')) {
            let buttonHigh = select.closest('.settings_block').querySelector('.level_item.high.active')
            let buttonLow = select.closest('.settings_block').querySelector('.level_item.low.active');
            let buttonSub = select.closest('.settings_block').querySelector('.level_item.sub.active');
            let buttonMid = select.closest('.settings_block').querySelector('.level_item.mid.active');
            let lowButton = document.querySelector('.fl_item.low.active')
            let highButton = document.querySelector('.fl_item.high.active')

            const chartActive = select.closest('.settings_block').chart
            if (buttonHigh) {
                if (lowButton) {
                    const x = chartActive.data.datasets[0].data[1].x - degree;
                    dataFromFile.data.cross[0][0].x = x;
                    chartActive.data.datasets[0].data = dataFromFile.data.cross[0]
                }
                if (highButton) {
                    const x = chartActive.data.datasets[0].data[2].x + degree;
                    dataFromFile.data.cross[0][3].x = x;
                    chartActive.data.datasets[0].data = dataFromFile.data.cross[0]
                }
            }
            if (buttonMid) {
                if (lowButton) {
                    const x = chartActive.data.datasets[1].data[1].x - degree;
                    dataFromFile.data.cross[1][0].x = x;
                    chartActive.data.datasets[1].data = dataFromFile.data.cross[1]
                }
                if (highButton) {
                    const x = chartActive.data.datasets[1].data[2].x + degree;
                    dataFromFile.data.cross[1][3].x = x;
                    chartActive.data.datasets[1].data = dataFromFile.data.cross[1]
                }
            }
            if (buttonLow) {
                if (lowButton) {
                    const x = chartActive.data.datasets[2].data[1].x - degree;
                    dataFromFile.data.cross[2][0].x = x;
                    chartActive.data.datasets[2].data = dataFromFile.data.cross[2]
                }
                if (highButton) {
                    const x = chartActive.data.datasets[2].data[2].x + degree;
                    dataFromFile.data.cross[2][3].x = x;
                    chartActive.data.datasets[2].data = dataFromFile.data.cross[2]
                }

            }
            if (buttonSub) {
                if (lowButton) {
                    const x = chartActive.data.datasets[3].data[1].x - degree;
                    dataFromFile.data.cross[3][0].x = x;
                    chartActive.data.datasets[3].data = dataFromFile.data.cross[3]
                }
                if (highButton) {
                    const x = chartActive.data.datasets[3].data[2].x + degree;
                    dataFromFile.data.cross[3][3].x = x;
                    chartActive.data.datasets[3].data = dataFromFile.data.cross[3]
                }
            }
            updateCrossFileParameter();
            chartActive.update();
        }
    }

    // Cross Select Навигация Scope
    document.querySelectorAll('.slope_navigation span').forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            let select = item.closest('.frequency_slope').querySelector('select')
            let selectOptions = select.querySelectorAll('option');
            let i = 0;

            // Cross Select обраотка нового значения
            let newCrossValue = null;
            if (this.classList.contains('prev')) {
                selectOptions.forEach(function (optionItem) {
                    if (optionItem.selected) {
                        previousOptionElement = i - 1;
                    }
                    i++;
                })

                if (i >= 0 && selectOptions[previousOptionElement]) {
                    selectOptions[previousOptionElement].selected = true;
                }
                newCrossValue = selectOptions[previousOptionElement].value
            } else {
                selectOptions.forEach(function (optionItem) {
                    if (optionItem.selected) {
                        nextOptionElement = i + 1;
                    }
                    i++;
                })

                if (i <= selectOptions.length && selectOptions[nextOptionElement]) {
                    selectOptions[nextOptionElement].selected = true;
                }
                newCrossValue = selectOptions[nextOptionElement].value;//??????????????????????
            }
            select.value = newCrossValue;
            select.closest('.input').querySelector('.select-selected').innerHTML = newCrossValue
            // изменение значения на графике (угла наклона)

            updateScopeGrafic(newCrossValue, select);
        })
    })

    // Equalizer  Range Slider Стилы &&  Change Value by Range  Band select
    document.querySelectorAll('.band_number_select span').forEach(function (item) {

        item.addEventListener('click', function (e) {
            e.preventDefault();
            let select = item.closest('.band_number_select').querySelector('select')
            let selectOptions = select.querySelectorAll('option');
            let i = 0;
            let newCrossValue = null;
            if (this.classList.contains('prev')) {
                selectOptions.forEach(function (optionItem) {
                    if (optionItem.selected) {
                        previousOptionElement = i - 1;
                    }
                    i++;
                })

                if (i >= 0 && selectOptions[previousOptionElement]) {
                    selectOptions[previousOptionElement].selected = true;
                }


                newCrossValue = selectOptions[previousOptionElement].value

            } else {
                selectOptions.forEach(function (optionItem) {
                    if (optionItem.selected) {
                        nextOptionElement = i + 1;
                    }
                    i++;
                })

                if (i <= selectOptions.length && selectOptions[nextOptionElement]) {
                    selectOptions[nextOptionElement].selected = true;
                }

                newCrossValue = selectOptions[nextOptionElement].value
            }
            select.closest('.frequency_block').querySelectorAll('.band_number_select select').forEach((sel) => {
                sel.value = newCrossValue;
                sel.closest('.input').querySelector('.select-selected').innerHTML = "BAND" + sel.value
            })
            const freq = select.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.freq .frequency_range input');
            const gain = select.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.gain .frequency_range input');
            const qf = select.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.qf .frequency_range input');
            let buttonHigh = this.closest('.settings_block').querySelector('.levels_block .level_item.high.active')
            let buttonLow = this.closest('.settings_block').querySelector('.levels_block .level_item.low.active')
            let buttonSub = this.closest('.settings_block').querySelector('.levels_block .level_item.sub.active')
            let buttonMid = this.closest('.settings_block').querySelector('.levels_block .level_item.mid.active')
            let index = 0;
            if (buttonHigh) {
                index = 0;
            }
            if (buttonMid) {
                index = 1;
            }
            if (buttonLow) {
                index = 2;
            }
            if (buttonSub) {
                index = 3;
            }
            freq.value = dataFromFile.data.equalizer[index][newCrossValue - 1][2].x / 1000;
            gain.value = dataFromFile.data.equalizer[index][newCrossValue - 1][2].y;
            qf.value = 1/(dataFromFile.data.equalizer[index][newCrossValue - 1][2].x - dataFromFile.data.equalizer[index][newCrossValue - 1][1].x) * 300;
            const updateSlider = (item) => {
                let percent = (item.value - item.min) / (item.max - item.min) * 100
                let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
                item.closest('.frequency_range').querySelector('.range_text .range_value .number').textContent = item.value;
                item.style.background =
                    `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`

            }
            updateSlider(freq)
            updateSlider(gain)
            updateSlider(qf)
        })
    })

//custom select for scope, level, equalizer
    function bandSelectOnSelect(newValue, select) {
        let newCrossValue = newValue.substr(4);

        select.closest('.frequency_block').querySelectorAll('.band_number_select select').forEach((sel) => {
            sel.value = newCrossValue;
            sel.closest('.input').querySelector('.select-selected').innerHTML = "BAND" + sel.value
        })
        const freq = select.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.freq .frequency_range input');
        const gain = select.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.gain .frequency_range input');
        const qf = select.closest('.frequency_block').querySelector('.frequency_levels_item.equalizer.qf .frequency_range input');
        let buttonHigh = this.closest('.settings_block').querySelector('.levels_block .level_item.high.active')
        let buttonLow = this.closest('.settings_block').querySelector('.levels_block .level_item.low.active')
        let buttonSub = this.closest('.settings_block').querySelector('.levels_block .level_item.sub.active')
        let buttonMid = this.closest('.settings_block').querySelector('.levels_block .level_item.mid.active')
        let index = 0;
        if (buttonHigh) {
            index = 0;
        }
        if (buttonMid) {
            index = 1;
        }
        if (buttonLow) {
            index = 2;
        }
        if (buttonSub) {
            index = 3;
        }
        freq.value = dataFromFile.data.equalizer[index][newCrossValue - 1][2].x / 1000;
        gain.value = dataFromFile.data.equalizer[index][newCrossValue - 1][2].y;
        qf.value = 1/(dataFromFile.data.equalizer[index][newCrossValue - 1][2].x - dataFromFile.data.equalizer[index][newCrossValue - 1][1].x) * 300;
        const updateSlider = (item) => {
            let percent = (item.value - item.min) / (item.max - item.min) * 100
            let percent1 = 100 - ((item.value - item.min) / (item.max - item.min) * 100);
            item.closest('.frequency_range').querySelector('.range_text .range_value .number').textContent = item.value;
            item.style.background =
                `linear-gradient(to right, #A482EE 0% ${percent}%, #535353 ${percent}% ${percent1}%)`

        }
        updateSlider(freq)
        updateSlider(gain)
        updateSlider(qf)

    }

    function typeSelectOnSelect(newValue, select) {
        const scopeSelect = select.closest('.frequency_levels_item').querySelector('.frequency_slope .input select')
        const prevSlope = scopeSelect.value
        const scopeSelectSelected = select.closest('.frequency_levels_item').querySelectorAll('.frequency_slope .input .select-items div')
        scopeSelectSelected.forEach(item => {
            if (item.innerHTML === "-36dB/Oct" || item.innerHTML === "-48dB/Oct") {
                item.style.display = "none"
            }
        })
        scopeSelect.options.length = 0;
        scopeSelect.options[0] = new Option("-6dB/Oct", "-6dB/Oct");
        scopeSelect.options[1] = new Option("-12dB/Oct", "-12dB/Oct");
        scopeSelect.options[2] = new Option("-18dB/Oct", "-18dB/Oct");
        scopeSelect.options[3] = new Option("-24dB/Oct", "-24dB/Oct");
        if (newValue == "Linkwitz-Riley") {
            newValue = 0;
        }
        if (newValue == "Butterworth") {
            newValue = 1;
        }
        if (newValue == "Bessel") {
            newValue = 2;
        }

        if (newValue == 0) {
            scopeSelect.options[4] = new Option("-36dB/Oct", "-36dB/Oct");
            scopeSelect.options[5] = new Option("-48dB/Oct", "-48dB/Oct");
            scopeSelectSelected.forEach(item => {
                item.style.display = "block"
            })
        }
        scopeSelect.selectedIndex = 0;
        select.closest('.type_select').querySelector('.select-selected').innerHTML = select.options[newValue]?.text;
        let newSlopeValue = prevSlope;

        if (newValue != 0) {
            if (prevSlope === "-48dB/Oct" || prevSlope === "-36dB/Oct") {
                newSlopeValue = "-24dB/Oct"
            } else {
                newSlopeValue = prevSlope
            }
        }
        scopeSelect.value = newSlopeValue;
        select.closest('.frequency_levels_item').querySelector('.frequency_slope .select-selected').innerHTML = newSlopeValue;
        updateScopeGrafic(newSlopeValue, scopeSelect)
        const index = select.closest('.frequency_block').getAttribute('data-tab-content')
        const low = select.closest('.frequency_levels_item').classList.contains('low');
        const high = select.closest('.frequency_levels_item').classList.contains('high');
        const map = ['hiTip', 'midTip', 'lowTip', 'subTip']

        if (low) {
            dataFromFile.file.Cross["Low-pass"][map[index - 1]] = parseFloat(newValue) + 1
        }
        if (high) {
            dataFromFile.file.Cross["Hi-pass"][map[index - 1]] = parseFloat(newValue) + 1
        }

        updateCrossFileParameter();
    }

    function levelSelectOnSelect(newValue, select) {

        let sameSelect = document.querySelectorAll(`.frequency_level_select select[name="${select.name}"]`);
        sameSelect.forEach(sel => {
            sel.value = select.value;
            sel.closest('.input').querySelector('.select-selected').innerHTML = newValue
        })
        levelUpdateOnGrafic(newValue.split(' ')[0], select)
    }

    function scopeSelectOnSelect(newValue, select) {
        const scopeSelect = select.closest('.frequency_levels_item').querySelector('.frequency_slope .input select')
        scopeSelect.value = newValue
        updateScopeGrafic(newValue, select)
    }

    let allSelects = document.querySelectorAll(".select-css");
    allSelects.forEach((select) => {
        let options = select.querySelectorAll('option');
        let wrapper = select.closest('.input');
        let a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = select.options[select.selectedIndex].innerHTML;
        wrapper.appendChild(a);
        let b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        options.forEach((option, index) => {
            let c = document.createElement("DIV");
            c.innerHTML = select.options[index].innerHTML;
            c.addEventListener('click', function (e) {
                a.innerHTML = this.innerHTML
                if (wrapper.querySelector('.type_select_value')) {
                    typeSelectOnSelect.bind(this)(a.innerHTML, select)
                }
                if (wrapper.querySelector('.band_select_value')) {
                    bandSelectOnSelect.bind(this)(a.innerHTML, select)
                }
                if (wrapper.querySelector('.frequency_level_select')) {
                    levelSelectOnSelect.bind(this)(a.innerHTML, select)
                }
                if (wrapper.querySelector('.frequency_slope_select')) {
                    scopeSelectOnSelect.bind(this)(a.innerHTML, select)
                }
                b.classList.add('select-hide');
            })
            b.appendChild(c);
        })
        a.addEventListener('click', (e) => {
            e.stopPropagation();

            wrapper.querySelector('.select-items').classList.toggle("select-hide");
        })
        wrapper.appendChild(b);
    })

    function closeAllSelect(elmnt) {
        let selects = document.querySelectorAll('.select-items');
        selects.forEach((item) => {
            item.classList.add('select-hide')
        })
    }

    document.addEventListener("click", closeAllSelect);
    // Cross Переключатель Low/High  и FREQ/BAND/QF для частоты
    frequencyLevels = document.querySelectorAll('.fl_levels_row .fl_item');
    frequencyLevels.forEach(function (item) {
        let target = item.dataset.target;
        let bigParent = item.parentNode.parentNode.parentNode;
        let levels = bigParent.querySelectorAll('.frequency_levels_item');
        item.addEventListener('click', function (e) {
            e.preventDefault();
            clearFrequencyLevels();
            this.classList.add('active');

            levels.forEach(function (level) {
                level.classList.remove('active')
            })

            bigParent.querySelector('.frequency_levels_item' + target).classList.add('active');
        })
    })

    // Cross type Select
    document.querySelectorAll('.type_select span').forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            let select = item.closest('.type_select').querySelector(' select')
            let selectOptions = select.querySelectorAll('option');
            let i = 0;
            let newCrossValue = null;
            if (this.classList.contains('prev')) {
                selectOptions.forEach(function (optionItem) {
                    if (optionItem.selected) {
                        previousOptionElement = i - 1;
                    }
                    i++;
                })

                if (i >= 0 && selectOptions[previousOptionElement]) {
                    selectOptions[previousOptionElement].selected = true;
                }
                newCrossValue = selectOptions[previousOptionElement].value
            } else {
                selectOptions.forEach(function (optionItem) {
                    if (optionItem.selected) {
                        nextOptionElement = i + 1;
                    }
                    i++;
                })

                if (i <= selectOptions.length && selectOptions[nextOptionElement]) {
                    selectOptions[nextOptionElement].selected = true;
                }
                newCrossValue = selectOptions[nextOptionElement].value;//??????????????????????
            }
            typeSelectOnSelect(newCrossValue, select)
        })
    })
    /* navbar more menu*/
    const moreTrigger = document.querySelector('.more_trigger')
    const moreHiddenMenu = document.querySelector('.more_hidden_menu')
    moreTrigger.addEventListener('click', () => {
        moreHiddenMenu.classList.toggle('active')
    })
}


// toggle low block desktop/mobile
const crossSettingsBlock = document.querySelector('.cross_settings_block');

function toggleStyles(x) {
    if (x.matches) {
        crossSettingsBlock.style = ''
        crossSettingsBlock.style.marginLeft = '-334px';
        crossSettingsBlock.style.marginRight = '20px';
        crossSettingsBlock.style.marginTop = '220px';
        crossSettingsBlock.style.width = '337px';
    } else {
        crossSettingsBlock.style = ''
        crossSettingsBlock.style.marginTop = '260px';
        crossSettingsBlock.style.marginLeft = '-410px';
    }
}

let x = window.matchMedia("(max-width: 380px)");
// toggleStyles(x);
// x.addEventListener('change', toggleStyles);

// Очишаем все контент элементы
function clearContentBlocks() {
    let blocks = document.querySelectorAll('.content_block');
    blocks.forEach(function (item) {
        item.classList.remove('active');
    })
}

// Очишаем все элементы навигации
function clearNavItems() {
    let blocks = document.querySelectorAll('.navigation a');
    blocks.forEach(function (item) {
        item.classList.remove('active');
    })
}

// Очишаем все элементы tcorr Спикеров
function clearTcorrSpeakers() {
    let speakers = document.querySelectorAll('#tcorr .speakers_all input');
    speakers.forEach(function (item) {
        item.checked = false;
    })
}

// Очишаем все элементы tcorr Параметров
function clearTcorrParametres() {
    let speakers = document.querySelectorAll('#tcorr .speakers_params .param_item');
    speakers.forEach(function (item) {
        item.classList.remove('active');
    })
}

/*Устанавливаем активную вкладку*/
function setActivateTab(btn, index) {
    clearFrequencyLevels();
    clearFrequencyLevelItems();
    const activeItem = btn.closest('.settings_block').querySelector(
        `.frequency_blocks [data-tab-content="${index}"] .frequency_levels_item`
    )
    const activeBtn = btn.closest('.settings_block').querySelector(
        `.frequency_blocks [data-tab-content="${index}"] .fl_item`
    )
    console.log("QQQQ")
    activeItem.classList.add('active');
    activeBtn.classList.add('active');
}

function clearFrequencyLevelItems() {
    frequencyLevelItems = document.querySelectorAll('.frequency_levels_item');
    frequencyLevelItems.forEach(function (item) {
        item.classList.remove('active')
    })
}

function clearFrequencyLevels() {
    frequencyLevels = document.querySelectorAll('.fl_levels_row .fl_item');
    frequencyLevels.forEach(function (item) {
        item.classList.remove('active')
    })
}





/*
// Пример функции для расчета усиления Bell-фильтра
function getBellGain(f, f0, Q, gainDb) {
    const A = Math.pow(10, gainDb / 40);
    const w0 = 2 * Math.PI * f0;
    const w = 2 * Math.PI * f;
    const alpha = Math.sin(w0 / 44100) / (2 * Q); // Упрощенно для визуализации

    // Это упрощенная модель для построения кривой
    const h = Math.sqrt(Math.pow(f/f0 - f0/f, 2) + Math.pow(1/Q, 2));
    return gainDb / (1 + Math.pow(Q * (f/f0 - f0/f), 2));
}

// Генерация данных для Chart.js
const points = [];
for (let f = 20; f <= 20000; f *= 1.1) { // Логарифмический шаг
    points.push({ x: f, y: getBellGain(f, 1000, 1.41, 6) });
}

new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Parametric EQ',
            data: points,
            tension: 0, // Отключаем Безье, так как мы сами рассчитали точки
            pointRadius: 0
        }]
    },
    options: {
        scales: {
            x: { type: 'logarithmic', min: 20, max: 20000 },
            y: { min: -15, max: 15 }
        }
    }
});
*/
