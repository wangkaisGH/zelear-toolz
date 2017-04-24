/**
 * Created by Administrator on 2017/1/14.
 */
/**
 * 用来兼容获得元素内的文本内容
 * @param element
 * @returns {string}
 */
function getInnerText(element) {
    if (typeof element.innerText == 'string') {
        return element.innerText;
    } else {
        return element.textContent;
    }
}

/**
 * 兼容替换元素的文本内容
 * @param element
 * @param content
 * @returns {*}
 */
function setInnerText(element, content) {
    if (typeof element.innerText == 'string') {
        return element.innerText = content;
    }
    else {
        return element.textContent = content;
    }
}
/**
 * 作用于替换元素的新类名
 * @param element
 * @param oldstr
 * @param newstr
 * @returns {string}
 */
function replaceClassName(element, oldstr, newstr) {
    var arr = element.className.split(' ');
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == oldstr) {
            arr[i] = newstr;
        }
    }
    return arr.join(' ');
}
/**
 * 封装兼容nextsibling函数
 * @param element
 * @returns {Element}
 */
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var next = element.nextSibling;
        while (next && next.nodeType != 1) {
            next = element.nextSibling;
        }
    }
}

/**
 * 兼容得到兄弟元素
 * @param element
 * @returns {Element}
 */
function getpreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var previous = element.previousSibling;
        while (previous && previous.nodeType != 1) {
            previous = element.previousSibling;
        }
    }
}
/**
 * 封装通过类名得到元素的兼容方法
 * @param element
 * @param className
 * @returns {*}
 */
function getElementsByClassName(element, className) {
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(className);
    } else {
        var filterArr = [];
        var allArr = element.getElementsByTagName('*');
        for (var i = 0; i < allArr.length; i++) {
            var tempArr = allArr[i].className.split(' ');
            for (var j = 0; j < tempArr.length; j++) {
                if (tempArr[j] == className) {
                    filterArr.push(allArr[i]);
                }
            }
        }
        return filterArr;
    }
}
//需要给window下onload追加事件，由于js没有重载，防止后面的onload事件会把前面的重叠
/**
 * 用于给window追加onload事件
 * @param fn
 */
function addOnloadEvent(fn) {
    var oldOnload = window.onload;
    if (typeof oldOnload == 'function') {
        window.onload = function () {
            oldOnload();//前面的需要执行；
            fn();//后面的也需要执行
        }
    } else {
        window.onload = function () {
            fn();//只执行后面的；
        }
    }
}
/*
 function addOnloadEvent(fn) {
 var oldOnload = window.onload;
 if(typeof oldOnload == 'function') {
 window.onload = function () {
 oldOnload();
 fn();
 }
 }else {
 window.onload = fn;
 }
 }*/

//暂定的封装动画的函数，感觉有点low
/**
 * 用来移动div，添加轮播图和动画效果；low
 * @param obj
 * @param target
 */
function cartoon(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = 3;
        step = target > leader ? step : -step;
        if (Math.abs(target - leader) > Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + 'px';
        } else {
            obj.style.left = target + 'px';
            clearInterval(obj.timer);
        }
    }, 15);
}


//封装兼容scroll,页面滚动坐标
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}
//获取页面的可视区域（clientWidth）；
function client() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}
//封装缓动动画函数，方便调用
function cartoonH(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = (target - leader) / 15;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        obj.style.left = leader + 'px';
        if (leader == target) {
            clearInterval(obj.timer);
        }
    }, 15);
}


//获取计算后（生效）的样式属性
/**
 * 获取元素的生效属性
 * @param id
 * @param attr
 * @returns {*}
 */
function getStyle(id, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(id, null)[attr];
    } else {
        return id.currentStyle[attr];
    }
}

//封装可同时改变多个属性的缓动动画函数，需要用到jason

function cartoonHAll(obj, jason, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = 1;
        for (var key in jason) {
            if (key == 'opacity') {
                var leader = getStyle(obj, key) * 100;
                var target = jason[key] * 100;
                var step = ( target - leader) / 15;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[key] = leader / 100;
            } else if (key == 'zIndex') {
                obj.style.zIndex = jason[key];
            } else {
                var leader = parseInt(getStyle(obj, key)) || 0;
                var target = jason[key];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[key] = leader + 'px';
            }
            if (leader != target) {
                flag = 0;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15);
}


//获取事件的兼容写法：只是个例子，不能被引用
function getEvent(event) {
    var event = event || window.event;
    //下面就可以调用这个event了；
}
//事件对象的三个重要坐标中page的兼容写法,不被引用
function getEvent(event) {
    var event = event || window.event;
    var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
    var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
}
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();//清除选中的内容
txt = window.getSelection ? window.getSelection().toString() : document.selection.createRange().text;//选中显示分享


/*function getEvent(event) {
    return event || window.event;
}
function getPageX(event) {
    var event = getEvent(event);
    return event.pageX || event.clientX + document.documentElement.scrollLeft;
}
function getPageY(event) {
    var event = getEvent(event);
    return event.pageY || event.clientY + document.documentElement.scrollTop;
}
function stopPropagation(event) {
    var event = getEvent(event);
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}
function getTarget(event) {
    var event = getEvent(event);
    return event.target || event.srcElement;
}*/
var eventTool = {
    getEvent: function (event) {
        return event || window.event;
    },
    getPageX: function (event) {
        var event = eventTool.getEvent(event);
        return event.pageX || event.clientX + document.documentElement.scrollLeft;
    },
    getPageY: function (event) {
        var event = eventTool.getEvent(event);
        return event.pageY || event.clientY + document.documentElement.scrollTop;
    },
    stopPropagation: function (event) {
        var event = eventTool.getEvent(event);
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    getTarget: function (event) {
        var event = eventTool.getEvent(event);
        return event.target || event.srcElement;
    }
};

//封装trim方法，去除字符串两端的空白符（space）;
function trim(str) {
    return str.replace(/^\s+|\s+$/g,'');
}

//在两数之间随机取值的封装函数；
function getRandom(stratNum,endNum) {
    var lengthNum = endNum - stratNum + 1;
    return Math.floor(Math.random()*lengthNum + stratNum);
}