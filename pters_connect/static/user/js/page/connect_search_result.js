class ConnectSearchResult extends DomController{
    constructor(){
        super();
        this.install_target = {
            map_box:"#map_box",
            search_input:"#search_input",
            result_list:"#result_list"
        };
    }

    draw_layout(install_target){

        let map_box = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"padding-top":"100px"}, 
                                            /*attr*/ {id:this.install_target.map_box.replace(/#/, '')});
        let search_input = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"background-color":"var(--bg-light)"}, 
                                                /*attr*/ {id:this.install_target.search_input.replace(/#/, ''), class:"article_padding"});
        let result_list = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                                /*attr*/ {id:this.install_target.result_list.replace(/#/, ''), class:"article_padding"});
        
        let html = map_box + search_input + result_list;

        this.render(install_target, html);
    }

    draw_map_box(install_target){
        install_target = install_target == undefined ? this.install_target.map_box : install_target;
        let html = CComp.container("div", "", {"height":"35vh"}, {id:"map_container"});
        this.render(install_target, html);
        this.draw_kakao_map("#map_container")
    }

    draw_kakao_map(install_target){
        this.infowindow = new kakao.maps.InfoWindow({zIndex:1});
        let $map_container = document.querySelector(install_target);
        let map_options = {
            center: new kakao.maps.LatLng(33.45071, 126.570667), //지도 중심 좌표
            level: 3 //지도 레벨 (확대 축소)
        };
        this.map = new kakao.maps.Map($map_container, map_options);
        this.ps = new kakao.maps.services.Places();
    }

    kakao_placesSearchCB(data, status, pagination, context){
        if(status === kakao.maps.services.Status.OK){
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            let bounds = new kakao.maps.LatLngBounds();

            for (var i=0; i<data.length; i++) {

                context.kakao_displayMarker(data[i]);
                
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }   
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            console.log(bounds)
            context.map.setBounds(bounds);
        }
    }

    kakao_displayMarker(place){
        // 마커를 생성하고 지도에 표시합니다
        this.marker = new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(place.y, place.x)
        });
        this.marker.setMap(null);

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(this.marker, 'click', ()=> {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            this.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            this.infowindow.open(this.map, this.marker);
        });
    }

    draw_search_input(install_target){
        install_target = install_target == undefined ? this.install_target.search_input : install_target;
        let html = this.dom_search_box_title() + this.dom_search_box_search_tool();
        this.render(install_target, html);
    }

    dom_search_box_title(){
        let title = CComp.text(/*title*/ "주변을 검색 해보세요", /*style*/ {"font-size":"1.3em", "font-weight":"bold", "word-break":"keep-all", "display":"block"}, /*attr*/{});
        let title_description = CComp.text(/*title*/ "나와 가까운 코치님을 찾아보세요.", /*style*/ {"font-size":"0.8em", "color":"var(--font-sub-normal)", "font-weight":"normal", "word-break":"keep-all", "display":"block", "padding-left":"3px"}, /*attr*/{});
        let html = CComp.container(/*type*/ "div", 
                                        /*title*/ title + title_description, 
                                        /*style*/ {"margin":"0 auto", "margin-bottom":"15px", "max-width":"600px", "animation-duration":"1s"}, 
                                        /*attr*/ {class:"anim_fade_in"});
        return html;
    }

    dom_search_box_search_tool(){
        let input = CComp.element(/*type*/ "input", 
                                        /*title*/ "", 
                                        /*style*/ {"width":"100%", "height":"50px", "font-size":"16px"}, 
                                        /*attr*/ {id:"search_main_input", placeholder:"장소 혹은 주소를 입력해주세요."} );
        let button = CComp.button(/*id*/ "search_button", 
                                        /*title*/ CImg.search(["var(--fundamental-white)"], {"margin-top":"5px"}), 
                                        /*style*/ {"position":"absolute", "top":"5px", "right":"5px", "width":"40px", "height":"40px", "border-radius":"50%", "background-color":"#fe4e65"}, 
                                        /*attr*/ {class:"anim_opacity_90 anim_scale_up"},
                                        /*onclick*/ ()=>{
                                            let context = this;
                                            this.ps.keywordSearch($('#search_main_input').val(), (data, status, pagination)=>{
                                                this.kakao_placesSearchCB(data, status, pagination, context);
                                            });
                                        });

        let html = CComp.container(/*type*/ "div", 
                                        /*title*/ input + button, 
                                        /*style*/ {"position":"relative", "max-width":"600px", "margin":"0 auto"}, 
                                        /*attr*/null);
        return html;
    }

    draw_result_list(install_target){
        install_target = install_target == undefined ? this.install_target.result_list : install_target;
        let html_to_join = [];
        for(let i=0; i<5; i++){
            html_to_join.push(
                this.dom_profile_box()
            );
        }


        let html = html_to_join.join("");
        this.render(install_target, html);
    }

    dom_profile_box(){
        let db_id = "1";
        let photo_box = CComp.button(`profile_photo_${db_id}`, 
                                        "",
                                        {"width":"100%", "border-radius":"5px", "background-image":"url('/static/user/res/demo/profile.jpg')", "background-size":"cover", "background-repeat":"no-repeat", "background-position":"top", "position":"absolute", "top":0, "left":0, "height":"calc(100% - 45px)"}, 
                                        null,
                                        ()=>{
                                            show_page_popup("popup_teacher_info", POPUP_FROM_RIGHT, 100, ()=>{
                                                let teacher_info = new TeacherInfo();
                                                teacher_info.draw_layout(".popup_teacher_info");
                                                teacher_info.draw_top_full_image();
                                                teacher_info.draw_teacher_profile();
                                                teacher_info.draw_teacher_introduce();
                                                teacher_info.draw_teacher_facility();
                                            });
                                        });
        let name_box = CComp.button(`profile_${db_id}`, 
                                        CComp.text("홍길동", {"font-size":"13px", "font-weight":"bold", "text-align":"center", "display":"block"}, null) + 
                                        CComp.text("서울 동작구 흑석동", {"font-size":"10px", "font-weight":"normal", "text-align":"center", "display":"block"}, null), 
                                        null, 
                                        null, 
                                        ()=>{
                                            // show_page_popup(popup_name, animation, size, callback)
                                        });

        let wrapper = 
            CComp.container(
                "article", 
                CComp.element("div", "", {"padding-top":"130%"}) + //더미
                photo_box + name_box
                , 
                {"position":"relative", "display":"inline-block", "width":"46%", "margin":"2%", "max-width":"250px"}, 
                {class:"anim_fade_in anim_scale_up"}
            );
        return wrapper;
    }
}


class TeacherInfo extends DomController{
    constructor(){
        super();
        this.install_target = {
            teacher_top_full_image:"#teacher_top_full_image",
            teacher_profile:"#teacher_profile",
            teacher_introduce:"#teacher_introduce",
            teacher_facility:"#teacher_facility",
            recommend_teachers:"#recommend_teachers"
        };
    }

    draw_layout(install_target){

        let teacher_top_full_image = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"position":"relative", "z-index":"0"}, 
                                            /*attr*/ {id:this.install_target.teacher_top_full_image.replace(/#/, '')});
        let teacher_profile = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"position":"relative", "margin-top":"-100px"}, 
                                                /*attr*/ {id:this.install_target.teacher_profile.replace(/#/, ''), class:"article_padding"});
        let teacher_introduce = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                                /*attr*/ {id:this.install_target.teacher_introduce.replace(/#/, ''), class:"article_padding"});
        let teacher_facility = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                                /*attr*/ {id:this.install_target.teacher_facility.replace(/#/, ''), class:"article_padding"});
        let recommend_teachers = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                                /*attr*/ {id:this.install_target.recommend_teachers.replace(/#/, ''), class:"article_padding"});

        let html = teacher_top_full_image + teacher_profile + teacher_introduce + teacher_facility + recommend_teachers;

        this.render(install_target, html);
    }

    draw_top_full_image(install_target){
        install_target = install_target == undefined ? this.install_target.teacher_top_full_image : install_target;
        let html = CComp.container("div", 
                                    CComp.button(
                                        "teacher_info_close",
                                        CImg.arrow_left(["var(--fundamental-white)"]),
                                        {
                                            "position":"absolute",
                                            "top":"0",
                                            "left":"0",
                                            "padding":"15px"
                                        },
                                        null,
                                        ()=>{layer_popup.close_layer_popup();}
                                        ), 
                                    {
                                        "position":"relative",
                                        "height":"30vh",
                                        "background-image":"url('/static/user/res/background/golf_background.jpg')",
                                        "background-size":"cover",
                                        "background-repeat":"no-repeat"
                                    }, 
                                    null);

        this.render(install_target, html);
    }

    draw_teacher_profile(install_target){
        install_target = install_target == undefined ? this.install_target.teacher_profile : install_target;
        let html = 
            CComp.container( //wrapper
                "div",
                CComp.container( //프로필 사진
                    "div",
                    CComp.container( //가로세로 비율을 위한 더미
                        "div",
                        "",
                        {"padding-top":"130%"},
                        null
                    ),
                    {
                        "width":"40vw",
                        "max-width":"180px",
                        "background-image":"url('/static/user/res/demo/profile.jpg')",
                        "background-size":"cover",
                        "background-repeat":"no-repeat",
                        "border-radius":"10px"
                    },
                    null
                ) + 
                CComp.text("홍길동", {"max-width":"180px", "font-size":"24px", "font-weight":"bold", "display":"block"}, null) +
                CComp.text("서울시 동작구 흑석동", {"max-width":"180px", "font-size":"12px", "display":"block"}, null) + 
                CComp.element("a", "www.pters.co.kr", {"font-size":"12px", "color":"cornflowerblue"}, {href:"https://www.pters.co.kr"})+
                CComp.element("div",
                            CComp.button(
                                        "send_message_to", 
                                        "상담 요청 보내기", 
                                        {"border":"2px solid var(--bg-highlight)", "border-radius":"10px", "padding":"5px 10px", "display":"inline-block", "color":"var(--font-highlight)", "font-weight":"bold"},
                                        null, 
                                        ()=>{
                                            layer_popup.open_layer_popup(POPUP_BASIC, 'send_message_to_teacher', 100, POPUP_FROM_BOTTOM, null, ()=>{ 
                                                let sm = new SendMessageToTeacher();
                                                sm.draw_layout(".send_message_to_teacher");
                                                sm.draw_send_message_top_title();
                                                sm.draw_send_message_input_wrap();
                                                sm.draw_send_message_send();
                                            })}
                                        ),
                            {"position":"absolute", "top":"150px", "text-align":"right", "width":"100%"}   
                )
                ,
                {"position":"relative"},
                null
            );

        this.render(install_target, html);
    }

    draw_teacher_introduce(install_target){
        install_target = install_target == undefined ? this.install_target.teacher_introduce : install_target;
        let text_sample = `서울 동작구 상도동에 위치한 chungho 골프 아카데미의 공동 창업자입니다.<br><br>
        2004년도 브리티시 PGA로 프로 무대에 데뷔하여 2006년 유로피언 투어까지 3년간 선수로 활약했습니다.<br><br>
        2007년부터는 일반인을 대상으로 하는 레슨 스튜디오를 오픈하여 현재까지 1,600여명의 수강생이 있습니다.`;

        let html = CComp.container(
            "div",
            CComp.element("div", text_sample, {"font-size":"16px", "word-break":"keep-all"}, "")
        );

        this.render(install_target, html);
    }

    draw_teacher_facility(install_target){
        install_target = install_target == undefined ? this.install_target.teacher_facility : install_target;

        let html = 
        CComp.text("레슨 시설", {"font-size":"16px", "font-weight":"bold", "display":"block", "margin-bottom":"10px"}) +
        CComp.container( //시설 wrapper
            "div",
            CComp.element("div", //사진 wrapper
                            CComp.element("div", "", {"padding-top":"50%"}), // 가로 세로 비율을 위한 더미
                            {"background-image":"url('/static/user/res/background/golf_background.jpg')", "background-size":"cover", "background-repeat":"no-repeat"}
                        ) +
            CComp.text("chungho 골프 아카데미", {"font-size":"15px", "font-weight":"500", "display":"block"}) +
            CComp.text("서울특별시 동작구 흑석동 중앙하이츠빌 아파트 1001-1808", {"font-size":"10px", "display":"block"})

        );

        this.render(install_target, html);
    }
}

class SendMessageToTeacher extends DomController{
    constructor(){
        super();
        this.install_target = {
            send_message_top_title:"#send_message_top_title",
            send_message_input_wrap:"#send_message_input_wrap",
            send_message_send:"#send_message_send"
        };
        this.$_forms = [];
    }

    draw_layout(install_target){

        let send_message_top_title = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                            /*attr*/ {id:this.install_target.send_message_top_title.replace(/#/, ''), class:"article_padding"});
        let send_message_input_wrap = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                                /*attr*/ {id:this.install_target.send_message_input_wrap.replace(/#/, ''), class:"article_padding"});
        let send_message_send = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                                /*attr*/ {id:this.install_target.send_message_send.replace(/#/, ''), class:"article_padding"});
        
        let html = send_message_top_title + send_message_input_wrap + send_message_send;

        this.render(install_target, html);
    }


    draw_send_message_top_title(install_target){
        install_target = install_target == undefined ? this.install_target.send_message_top_title : install_target;
        let el_main_title = CComp.text("상담 요청 보내기", {"font-size":"20px", "font-weight":"bold", "display":"block"});
        let el_sub_title = CComp.text(`${"홍길동"} 레슨 프로님께 상담을 요청합니다.`, {"font-size":"14px", "font-weight":"500", "display":"block"});
        let el_close_button = 
            CComp.button(
                "close_send_message_to_teacher_popup",
                CImg.x(),
                {"position":"absolute", "top":0, "right":0, "padding-right":0},
                null,
                ()=>{
                    layer_popup.close_layer_popup();
                }
            );

        let html = 
            CComp.container(
                "div",
                el_main_title + el_sub_title + el_close_button,
                {"position":"relative"}
            );

        this.render(install_target, html);
    }

    draw_send_message_input_wrap(install_target){
        install_target = install_target == undefined ? this.install_target.send_message_input_wrap : install_target;
        let el_phone = CComp.element(/*type*/ "input", 
                                        /*title*/ "", 
                                        /*style*/ {"width":"100%", "height":"50px", "font-size":"16px", "margin-bottom":"15px"}, 
                                        /*attr*/ {id:"send_message_to_teacher_input_phone", placeholder:"연락 받으실 번호", type:"tel"} );

        let el_content = CComp.element(/*type*/ "input", 
                                        /*title*/ "", 
                                        /*style*/ {"width":"100%", "height":"50px", "font-size":"16px"}, 
                                        /*attr*/ {id:"send_message_to_teacher_input_content", placeholder:"상담 내용을 입력 해주세요.(30자 이내)", type:"text", maxlength:"30"} );

        this.$_forms.push("#send_message_to_teacher_input_phone", "#send_message_to_teacher_input_content");

        let html = 
            CComp.container(
                "div", 
                el_phone + el_content
            );

        this.render(install_target, html);
    }

    draw_send_message_send(install_target){
        install_target = install_target == undefined ? this.install_target.send_message_send : install_target;

        let el_agreement = 
            CComp.container(
                "div",
                CComp.element(
                    "input",
                    "",
                    {"-webkit-appearance":"checkbox", "width":"25px", "height":"25px", "flex-basis":"30px"},
                    {"type":"checkbox", "name":"agreement", "id":"send_agreement"}
                ) + 
                CComp.text("PTERS Connect는 중개자일뿐 상담에서 발생하는 모든 상황에 대해서 책임 지지 않습니다.", {"font-size":"12px", "flex":"1 1 0"}),
                {"display":"flex", "margin-bottom":"15px"}
            );

        let el_button = 
            CComp.container(
                "div",
                CComp.button(
                    "send_message_to_teacher_button",
                    "보내기", 
                    {"border":"2px solid var(--bg-highlight)", "font-size":"18px", "font-weight":"bold", "color":"var(--font-highlight)", "display":"inline-block", "border-radius":"5px"},
                    null,
                    (e)=>{
                        let form_check = this.check_data_before_send();

                        if($('#send_agreement').prop("checked") && form_check == true){
                            layer_popup.close_layer_popup();
                            alert("보내기 완료");
                        }else{
                            Anim.vibrate(e.target);
                        }
                    }
                ),
                {"text-align":"center"}
            );
            

        let html = 
            CComp.container(
                "div",
                el_agreement + el_button
            );

        this.render(install_target, html);
    }

    check_data_before_send(){
        let problems = 0;
        this.$_forms.forEach((el)=>{
            if($(el).val().length == 0){
                $(el).addClass('border_red');
                Anim.vibrate(el);
                problems++;
            }else{
                $(el).removeClass('border_red anim_spark');
            }
        });
        if(problems > 0){
            return false;
        }
        return true;
    }

}


class RecommentTeachers extends DomController{
    constructor(){
        super();
        this.install_target = {
        };
    }
}
