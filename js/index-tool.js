/**
 * Created by Administrator on 2017-2-8.
 */
//轮播特效
addOnloadEvent(function onload() {
    var timer = null;
    var topB = document.getElementsByClassName('topBackground2')[0];
    var topBOl = topB.children[0];
    var topBackArr = document.getElementById('arr2');
    var topBLis = topBOl.children;
    var topBs = document.getElementsByClassName('topBackground12');
    var jsssorb2 = document.getElementsByClassName('jsssorb2')[0];
    //动态添加轮播小圆点结构
    var ul = document.createElement('ul');
    jsssorb2.appendChild(ul);
    for (var i = 0; i < topBs.length; i++) {
        var li = document.createElement('li');
        if (i === 0) {
            li.className = 'current';
        }
        ul.appendChild(li);
    }
    ;
    //克隆第一张图，加到最后
    var firstImg = topBLis[0].cloneNode(true);
    topBOl.appendChild(firstImg);
    var pic = 0;
    var quare = 0;
    var lis = jsssorb2.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        //点击小圆点颜色变化，背景图缓动到对应位置
        lis[i].onclick = function () {
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = '';
            }
            lis[this.index].className = 'current';
            var target = -(this.index * 2560 + 648);
            cartoonH(topBOl, target);
            pic = quare = this.index;
        };
    }

    //鼠标移动到图片上箭头显示，离开隐藏
    topB.onmouseover = function () {
        topBackArr.style.display = 'block';
        clearInterval(timer);

    };
    topB.onmouseout = function () {
        clearInterval(timer);
        topBackArr.style.display = 'none';
        timer = setInterval(playNext, 2000);
    };

    //点击右箭头图片移动
    var rightArr = document.getElementById('right2');
    var leftArr = document.getElementById('left2');

    rightArr.onclick = function () {
        if (pic === topBLis.length - 1) {
            pic = 0;
            topBOl.style.left = "-648px";
        }
        pic++;
        var target = -(pic * 2560 + 648);
        cartoonH(topBOl, target);

        //按钮也要跟着跑
        if (quare < lis.length - 1) {
            quare++;//计算出接下来要亮起的按钮的索引
        } else {
            quare = 0;
        }
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";
        }
        lis[quare].className = "current";
    };
    //点击左箭头图片移动
    leftArr.onclick = function () {
        if (pic === 0) {
            pic = topBLis.length - 1;
            topBOl.style.left = -(topBLis.length - 1) * 2560 - 648 + 'px';
        }
        pic--;
        var target = -(pic * 2560 + 648);
        cartoonH(topBOl, target)

        //按钮也要跟着跑
        if (quare > 0) {
            quare--;//计算出接下来要亮起的按钮的索引
        } else {
            quare = lis.length - 1;
        }
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";
        }
        lis[quare].className = "current";
    };
//图片自动播放
    timer = setInterval(playNext, 2000);
    function playNext() {
        rightArr.onclick();
    }


})

//导航逐级显示与隐藏 原始JS代码
/*addOnloadEvent(function onload() {

    var sidebar2 = document.getElementsByClassName("sidebar2")[0];
    var mainnav2 = document.getElementsByClassName("mainnav2")[0];
    var mainZealer2s = document.getElementsByClassName("main-zealer2")
    var subnav12 = document.getElementsByClassName("subnav12")[0];
    var subnav12Ul = subnav12.children[0];
    var subnav22 = document.getElementsByClassName('subnav22')[0];
    var subnav22Ul = subnav22.children[0];
    var subnav212Ul = subnav22.children[1];
    //从数据中获取一个属性名的数组
    var dataKey = [];
    var dataKeyVlure = [];
    for (var key in data) {
        dataKey.push(key);//从数据中获取一个属性名的数组 （一级菜单）
        dataKeyVlure.push(data[key]);//从数据中获取一个属性名对应的属性值的数组 （二级菜单）
    }
    ;
    var Pic = null;
    //鼠标放上以后背景变色
    for (var i = 0; i < mainZealer2s.length; i++) {
        if (i === 1) {
            //鼠标移动到主导航背景变色且子导航显示
            mainZealer2s[i].onmouseover = function () {
                subnav12Ul.style.display='block';
                for (var i = 0; i < mainZealer2s.length; i++) {
                    mainZealer2s[i].style.backgroundColor = '';
                }
                this.style.backgroundColor = "#0091FE";
                //创建结构
                for (var i = 0; i < dataKey.length; i++) {
                    var li = document.createElement('li');
                    subnav12Ul.appendChild(li);
                    var a = document.createElement('a');
                    li.appendChild(a);
                    a.innerHTML = dataKey[i];
                }
                ;
                //子导航显示
                subnav12.style.display = "block";
                //鼠标移动到子菜单的li时，背景变色
                var subnav12UlLis = subnav12Ul.children;
                for (var i = 0; i < subnav12UlLis.length; i++) {
                    subnav12UlLis[i].index = i;
                    subnav12UlLis[i].onmouseover = function () {
                        for (var i = 0; i < subnav12UlLis.length; i++) {
                            subnav12UlLis[i].style.backgroundColor = '';
                        }
                        ;
                        //鼠标所在位置变色
                        this.style.backgroundColor = "#0091FE";
                        Pic = this.index;
                        //创建子导航的下一级导航，先创建结构。
                        function creatElenent(begin, length, obj) {//(数组开始的索引，数组长度，添加的对象)
                            for (var i = begin; i < length; i++) {
                                var li = document.createElement('li');
                                obj.appendChild(li);
                                var a = document.createElement('a');
                                li.appendChild(a);
                                a.innerHTML = dataKeyVlure[Pic][i];
                            }
                        }
                        var dataL = dataKeyVlure[Pic];
                        var number = Math.ceil(dataL.length/12);

                        if (dataKeyVlure[Pic].length < 12) {//如果数组的长度小于12（即一个UL所能装的最大值）
                            subnav22Ul.innerHTML = '';
                            creatElenent(0, dataKeyVlure[Pic].length, subnav22Ul);
                            subnav212Ul.style.display = 'none';
                        } else {//如果数字的长度大于12，则新建一个UL，装剩下的。
                            subnav22Ul.innerHTML = '';
                            creatElenent(0, 12, subnav22Ul);
                            subnav212Ul.innerHTML = '';
                            creatElenent(11, dataKeyVlure[Pic].length, subnav212Ul);
                            subnav212Ul.style.display = 'block';
                        }
                        subnav22.style.display = "block";
                    };
                }
                ;
                //创建完结构后，清空数组
                dataKey = [];
            }
            mainnav2.onmouseleave = function () {
                //鼠标离开大盒子，主菜单才消失
                subnav22Ul.innerHTML = '';
                subnav212Ul.innerHTML = '';
                subnav12Ul.style.display='none';
                for (var i = 0; i < mainZealer2s.length; i++) {
                    mainZealer2s[i].style.backgroundColor = '';
                }

                var subnav12UlLis = subnav12Ul.children;
                //鼠标离开大盒子，子菜单的背景颜色清空；
                //如果子菜单存在，且它的类名不为空，那么鼠标离开主菜单时需要清子菜单的背景色
                if (subnav12UlLis[Pic] && subnav12UlLis[Pic].style.backgroundColor !== '') {
                    subnav12UlLis[Pic].style.backgroundColor = '';
                }
            };
        } else {
            //鼠标移动到主导航背景变色
            mainZealer2s[i].onmouseover = function () {
                for (var i = 0; i < mainZealer2s.length; i++) {
                    mainZealer2s[i].style.backgroundColor = '';
                    subnav22.style.display = "none";
                    subnav12.style.display = "none";
                }
                this.style.backgroundColor = "#0091FE";
            };
        }
    }
    ;

})*/
//导航逐级显示与隐藏 jQuery写法
$(function () {
    $(".main-zealer2").mouseenter(function () {
        $(this).css("background", "#0091FE").siblings().css("background", "black");
        var index = $(this).index();
        var HTML1 = "";
        var keyVlu = [];
        if (index === 1) {
            for (var key in data) {
                HTML1 = HTML1 + "<li><a href='#'>" + key + "</a></li>";
                keyVlu.push(data[key]);
            }
            ;
            HTML1 = "<ul>" + HTML1 + "</ul>"
            $(".subnav12").html(HTML1);


//二级菜单
            $(".subnav12 li").mouseenter(function () {
                $(this).css("background", "#0091FE").siblings().css("background", "black");
                var pic = $(this).index();
                var keyVluList = keyVlu[pic];
                var HTML2 = "";
                var HTML3 = "";
                var HTML4 = "";
                //列表小于12个时，创建一个UL
                if (keyVluList.length < 13) {
                    for (var i = 0; i < keyVluList.length; i++) {
                        HTML2 = HTML2 + "<li><a href='#'>" + keyVluList[i] + "</a></li>";
                    }
                    ;
                    HTML2 = "<ul>" + HTML2 + "</ul>"
                }
                //列表小于24个时，创建两个UL
                else if (keyVluList.length < 25) {
                    for (var i = 0; i < 13; i++) {
                        HTML2 = HTML2 + "<li><a href='#'>" + keyVluList[i] + "</a></li>";
                    }
                    ;
                    HTML2 = "<ul>" + HTML2 + "</ul>";
                    for (var j = 12; j < keyVluList.length; j++) {
                        HTML3 = HTML3 + "<li><a href='#'>" + keyVluList[j] + "</a></li>";
                    }
                    ;
                    HTML3 = "<ul>" + HTML3 + "</ul>";
                    HTML2 = HTML2 + HTML3;
                }
                //列表大于24个时，创建三个UL
                else if (keyVluList.length > 25) {
                    for (var i = 0; i < 13; i++) {
                        HTML2 = HTML2 + "<li><a href='#'>" + keyVluList[i] + "</a></li>";
                    }
                    ;
                    HTML2 = "<ul>" + HTML2 + "</ul>";
                    for (var j = 13; j < 25; j++) {
                        HTML3 = HTML3 + "<li><a href='#'>" + keyVluList[j] + "</a></li>";
                    }
                    ;
                    HTML3 = "<ul>" + HTML3 + "</ul>";
                    HTML2 = HTML2 + HTML3;
                    for (var i = 24; i < keyVluList.length; i++) {
                        HTML4 = HTML4 + "<li><a href='#'>" + keyVluList[i] + "</a></li>";
                    }
                    HTML4 = "<ul>" + HTML4 + "</ul>";
                    HTML2 = HTML2 + HTML4;
                }
                $(".subnav22").html(HTML2);
            });
            //鼠标离开二级菜单时，清空三级菜单
            $(".swapUl2").mouseleave(function () {
                $(".subnav22").children().remove();
            })

            //鼠标离开主菜单的第二个UL时，清空二级三级菜单
            $(this).siblings().mouseenter(function () {
                $(".subnav12").children().remove();
                $(".subnav22").children().remove();
            });
        }
        //鼠标离开大盒子，清空二级三级菜单，主菜单背景色还原；
        $(".mainnav2").mouseleave(function () {
            $(".subnav12").children().remove();
            $(".subnav22").children().remove();
            $(".main-zealer2").css("background", "black");

        })
        //鼠标离开第二个UL时，清空一级菜单的结构


    });

});

//页面下拉到一定高度侧边按钮显示
addOnloadEvent(function onload() {
    var timer = null;
    var sidebtn2 = document.getElementsByClassName('sidebtn2')[0];
    document.onscroll = function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollTop > 100) {
            cartoonHAll(sidebtn2, {"bottom": 20})
        }
        if (scrollTop < 100) {
            cartoonHAll(sidebtn2, {"bottom": -200})
        }
    };
//点击置顶按钮页面缓动到顶部
    var topbtn = sidebtn2.getElementsByTagName("span")[1];
    topbtn.onclick = function () {
        clearInterval(timer);
        var target = 0;
        timer = setInterval(function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            var leader = scrollTop;
            var step = (target - leader) / 10;
            leader = leader + step;
            window.scrollTo(0, leader);
            if (leader === 0) {
                clearInterval(timer);
            }
        }, 15)

    };


})

//鼠标移动到图片上阴影变化 原始JS代码

/*addOnloadEvent(function onload() {
    var content2 = document.getElementById("content2");
    var as = content2.getElementsByTagName("a");
    for (var i = 0; i < as.length; i++) {
        as[i].style.boxShadow = "#fff 5px 8px 20px";
        as[i].onmouseover = function () {
            for (var i = 0; i < as.length; i++) {
                as[i].style.boxShadow = "#fff 5px 8px 20px";
                as[i].style.zIndex = 4;
            }
            this.style.boxShadow = "black 5px 8px 20px";
            this.style.zIndex = 15;
            var that = this;
            content2.onmouseout = function () {
                that.style.boxShadow = "#fff 5px 8px 20px";
                that.style.zIndex = 4;
            }
        };

    }
})*/

//鼠标移动到图片上阴影变化 jQuery写法
addOnloadEvent(function(){
    $(document).ready(function () {
        $("#content2 >.hot2 .hotlist2 a,.scretlist>a").css("boxShadow","#fff 5px 8px 20px");
        $("#content2 >.hot2 .hotlist2 a,.scretlist>a").mouseenter(function () {
            $(this).css("boxShadow","black 5px 8px 20px").siblings().css("boxShadow","#fff 5px 8px 20px");;
        });
        //鼠标离开当前标签后还原为默认样式
        $("#content2 >.hot2 .hotlist2 a,.scretlist>a").mouseleave(function () {
            $(this).css("boxShadow","#fff 5px 8px 20px");
        })
    })
})
