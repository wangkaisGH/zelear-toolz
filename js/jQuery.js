/**
 * Created by Administrator on 2017-2-16.
 */
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


//�����˵��¼�
            $(".subnav12 li").mouseenter(function () {
                $(this).css("background", "#0091FE").siblings().css("background", "black");
                var pic = $(this).index();
                var keyVluList = keyVlu[pic];
                var HTML2 = "";
                var HTML3 = "";
                var HTML4 = "";
                //�б�С��12��ʱ������һ��UL
                if (keyVluList.length < 13) {
                    for (var i = 0; i < keyVluList.length; i++) {
                        HTML2 = HTML2 + "<li><a href='#'>" + keyVluList[i] + "</a></li>";
                    }
                    ;
                    HTML2 = "<ul>" + HTML2 + "</ul>"
                }
                //�б�С��24��ʱ����������UL
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
                //�б����24��ʱ����������UL
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
            //����뿪�����˵�ʱ����������˵�
            $(".swapUl2").mouseleave(function () {
                $(".subnav22").children().remove();
            })

            //����뿪���˵��ĵڶ���ULʱ����ն��������˵�
            $(this).siblings().mouseenter(function () {
                $(".subnav12").children().remove();
                $(".subnav22").children().remove();
            });
        }
        //����뿪����ӣ���ն��������˵������˵�����ɫ��ԭ��
        $(".mainnav2").mouseleave(function () {
            $(".subnav12").children().remove();
            $(".subnav22").children().remove();
            $(".main-zealer2").css("background", "black");

        })
        //����뿪�ڶ���ULʱ�����һ���˵��Ľṹ


    });

})
;