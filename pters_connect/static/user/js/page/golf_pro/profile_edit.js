class ProfileEditpage extends DomController{
    constructor(){
        super();
        this.install_target = {
            top_title:"#golf_pro_profile_edit_top_title",
            top_full_image:"#golf_pro_profile_edit_top_full_image",
            profile_image:"#golf_pro_profile_edit_profile_image",
            account_info:"#golf_pro_profile_edit_account_info",
            facility_info:"#golf_pro_profile_edit_facility_info"
        };
    }

    draw_layout(install_target){
        let top_title = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"padding-top":"100px"}, 
                                            /*attr*/ {id:this.install_target.top_title.replace(/#/, ''), class:"anim_fade_in"});
        let top_full_image = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                            /*attr*/ {id:this.install_target.top_full_image.replace(/#/, ''), class:"anim_fade_in"});
        let profile_image = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"background-color":"var(--bg-light)", "margin-top":"-100px"}, 
                                                /*attr*/ {id:this.install_target.profile_image.replace(/#/, ''), class:"article_padding"});
        let account_info = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"margin-bottom":"0px"}, 
                                                /*attr*/ {id:this.install_target.account_info.replace(/#/, ''), class:"article_padding anim_fade_in"});
        let facility_info = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"margin-bottom":"30px"}, 
                                                /*attr*/ {id:this.install_target.facility_info.replace(/#/, ''), class:"article_padding anim_fade_in"});
        
        let html = top_title + top_full_image + profile_image + account_info + facility_info;

        this.render(install_target, html);
    }

    draw_children(){
        // this.draw_top_title();
        this.draw_top_full_image();
        this.draw_profile_image();
        this.draw_account_info();
        this.draw_facility_info();
    }

    draw_top_title(install_target){
        install_target = install_target == undefined ? this.install_target.top_title : install_target;
        let el_main_title = CComp.text("프로필", {"font-size":"20px", "font-weight":"bold", "display":"block"});
        let el_close_button = 
            CComp.button(
                "close_golf_pro_profile_edit_top_title",
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
                el_main_title + el_close_button,
                {"position":"relative"}
            );
        this.render(install_target, html);
    }

    draw_top_full_image(install_target){
        install_target = install_target == undefined ? this.install_target.top_full_image : install_target;
        let html = 
            CComp.container(
                "div", 
                CImg.pencil(["var(--bg-highlight)"],{"position":"absolute", "top":"5px", "right":"5px"}), 
                {
                    "position":"relative",
                    "height":"30vh",
                    "background-image":"url('/static/user/res/background/golf_background.jpg')",
                    "background-size":"cover",
                    "background-repeat":"no-repeat"
                }, 
                {"id":"profile_top_full_image_change"},
                {
                    "type":"click",
                    "exe":()=>{
                        alert("배경 이미지 변경");
                    }
                }
            );

        this.render(install_target, html);
    }

    draw_profile_image(install_target){
        install_target = install_target == undefined ? this.install_target.profile_image : install_target;
        let html = 
            CComp.container( //wrapper
                "div",
                CComp.container( //프로필 사진
                    "div",
                    CImg.pencil(["var(--bg-highlight)"],{"position":"absolute", "top":"5px", "right":"5px"})+
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
                        "border-radius":"10px",
                        "position":"relative"
                    },
                    {"id":"profile_image_change"},
                    {
                        "type":"click",
                        "exe":()=>{
                            alert("프로필 이미지 변경");
                        }
                    }
                ) + 
                CComp.container(
                    "div",
                    CComp.element("div",
                            CComp.button(
                                        "save_profile_edit", 
                                        "저장", 
                                        {"border":"2px solid var(--bg-highlight)", "border-radius":"10px", "padding":"5px 10px", "display":"inline-block", "color":"var(--font-highlight)", "font-weight":"500"},
                                        null, 
                                        ()=>{
                                            let result = confirm("변경 사항을 저장하시겠습니까?");
                                            if(result){
                                                location.href= "/golf_pro/mypage";
                                            }else{

                                            }
                                        }
                                        ),
                            {"display":"inline-block", "float":"right", "margin":"0 5px"}
                    )+
                    CComp.element("div",
                            CComp.button(
                                        "cancle_profile_edit", 
                                        "취소", 
                                        {"border":"2px solid var(--bg-sub-light)", "border-radius":"10px", "padding":"5px 10px", "display":"inline-block", "color":"var(--font-sub-light)", "font-weight":"500"},
                                        null, 
                                        ()=>{
                                            let result = confirm("변경 사항을 취소하고 돌아갑니까?");
                                            if(result){
                                                location.href= "/golf_pro/mypage";
                                            }else{

                                            }
                                        }
                                        ),
                            {"display":"inline-block", "float":"right", "margin":"0 5px"}   
                    ),
                    {"position":"absolute", "top":"150px", "text-align":"right", "width":"100%"},
                )
                ,
                {"position":"relative", "max-width":"800px", "margin":"0 auto"},
                null
            );

        this.render(install_target, html);
    }

    draw_account_info(install_target){
        install_target = install_target == undefined ? this.install_target.account_info : install_target;
        let text_demo = `서울 동작구 상도동에 위치한 chungho 골프 아카데미의 공동 창업자입니다.<br><br>
        2004년도 브리티시 PGA로 프로 무대에 데뷔하여 2006년 유로피언 투어까지 3년간 선수로 활약했습니다.<br><br>
        2007년부터는 일반인을 대상으로 하는 레슨 스튜디오를 오픈하여 현재까지 1,600여명의 수강생이 있습니다.`;

        let name_row = 
            CComp.container(
                "div",
                CComp.text("이름", {"display":"block", "font-size":"13px", "font-weight":"bold", "padding":"5px 0"})+
                CComp.element("input", "", {"font-size":"16px", "width":"100%"}, {"placeholder":"입력", "value":"홍길동"})
                ,{"padding":"5px 0"}
            );
        // let phone_row = 
        //     CComp.container(
        //         "div",
        //         CComp.text("휴대전화 번호", {"display":"block", "font-size":"13px", "font-weight":"bold", "padding":"5px 0"})+
        //         CComp.element("input", "", {"font-size":"16px"}, {"placeholder":"숫자만 입력", "value":"00000001111"})
        //         ,{"padding":"5px 0"}
        //     );
        let homepage_row = 
            CComp.container(
                "div",
                CComp.text("홈페이지", {"display":"block", "font-size":"13px", "font-weight":"bold", "padding":"5px 0"})+
                CComp.element("input", "", {"font-size":"16px", "width":"100%"}, {"placeholder":"주소 입력", "value":"www.pters.co.kr"})
                ,{"padding":"5px 0"}
            );
        let introduce_text_row = 
            CComp.container(
                "div",
                CComp.text("소개글", {"display":"block", "font-size":"13px", "font-weight":"bold", "padding":"5px 0"})+
                CComp.element("div", text_demo, {"font-size":"16px"}, {placeholder:"소개글을 입력해주세요.", contenteditable:"true", class:"content_editable"})
                ,{"padding":"5px 0"}
            );
            
        let html = 
            CComp.container(
                "div",
                CComp.container(
                    "div",
                    name_row +
                    // phone_row + 
                    homepage_row +
                    introduce_text_row,
                    {"padding":"5px 0"}
                ),
                {"max-width":"800px", "margin":"0 auto"}
            );
        
        this.render(install_target, html);
    }

    draw_facility_info(install_target){
        install_target = install_target == undefined ? this.install_target.facility_info : install_target;
        let article_title = CComp.text("레슨 시설 정보", {"font-size":"16px", "font-weight":"bold", "display":"block"});
        let facilities_demo = [
            {id:"13556", name:"청호 골프 아카데미", address:"서울시 강남구 청담동 12312-45645464"},
            {id:"20202", name:"동작 문화 회관", address:"서울시 동작구 흑석동 86-14"}
        ]
        
        let add_facility_row = 
            CComp.container(
                "div",
                CComp.container("div", CImg.plus_circle(["var(--img-highlight)"]), {"flex-basis":"30px"}) +
                CComp.container("div", CComp.text("시설 추가", {"font-size":"14px"}), {"flex":"1 1 0"}),
                {"display":"flex", "line-height":"45px"},
                {id:"add_new_my_facility"},
                {
                    "type":"click",
                    "exe":()=>{
                        let animation = POPUP_FROM_BOTTOM;
                        if(window.innerWidth > MAX_WIDTH){
                            animation = POPUP_FROM_RIGHT;
                        }
                        layer_popup.open_layer_popup(POPUP_BASIC, 'golf_pro_facility_searching', 100, animation, null, ()=>{ 
                            let facility_search = new FacilitySearching();
                            facility_search.draw_layout(".golf_pro_facility_searching");
                            facility_search.draw_children();
                            
                        });
                    }
                }
            );
        
        let facilities_row = 
            CComp.container(
                "div",
                facilities_demo.map((el)=>{return this.element_facility_row(el)}).join(""),
                {"padding":"10px 0"}
            )

        let html = 
            CComp.container(
                "div",
                article_title+
                CComp.container(
                    "div",
                    add_facility_row +
                    facilities_row,
                    {"padding":"5px 0"}
                ),
                {"max-width":"800px", "margin":"0 auto"}
            );
        
        this.render(install_target, html);
    }

    element_facility_row(data){
        let name = data.name;
        let id = data.id;
        let address = data.address;
        let html = 
        CComp.container(
            "div",
            CComp.text(name, {"font-size":"14px", "font-weight":"500", "display":"block"})+
            CComp.text(address, {"font-size":"12px", "display":"block"}),
            {"padding":"10px 5px"},
            {id:`element_facility_${id}`},
            {
                "type":"click",
                "exe":()=>{
                    let result = confirm(`시설 ${id} ${name} 삭제할까요?`);
                    if(result){
                        alert("시설 삭제");
                    }else{
                    }
                }
            }
        )
        return html;
    }
}

class FacilitySearching extends DomController{
    constructor(){
        super();
        this.install_target = {
            top_title:"#golf_pro_facility_searching_top_title",
            map_box:"#golf_pro_facility_searching_map",
            search_input:"#golf_pro_facility_searching_input",
            search_result_list:"#golf_pro_facility_searching_result_list"
        };

        this.map;
        this.map_markers = [];
    }


    draw_layout(install_target){
        let top_title = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                            /*attr*/ {id:this.install_target.top_title.replace(/#/, ''), class:"article_padding"});
        let map_box = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                            /*attr*/ {id:this.install_target.map_box.replace(/#/, ''), class:"anim_fade_in"});
        let search_input = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"background-color":"var(--bg-light)", "position":"sticky", "top":"0"}, 
                                                /*attr*/ {id:this.install_target.search_input.replace(/#/, ''), class:"article_padding"});
        let search_result_list = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"margin-bottom":"0px"}, 
                                                /*attr*/ {id:this.install_target.search_result_list.replace(/#/, ''), class:"article_padding anim_fade_in"});

        let html = top_title + map_box + search_input + search_result_list;

        this.render(install_target, html);
    }

    draw_children(){
        this.draw_top_title();
        this.draw_map_box();
        this.draw_search_input();
        // this.draw_search_result_list();
    }

    draw_top_title(install_target){
        install_target = install_target == undefined ? this.install_target.top_title : install_target;
        let el_main_title = CComp.text("장소 검색", {"font-size":"20px", "font-weight":"bold", "display":"block"});
        let el_close_button = 
            CComp.button(
                "close_facility_searching",
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
                el_main_title + el_close_button,
                {"position":"relative"}
            );
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
            this.draw_search_result_list(data);
            this.kakao_removeMarkers();
            for (var i=0; i<data.length; i++) {
                context.kakao_displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }   
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            context.map.setBounds(bounds);
        }
    }

    kakao_displayMarker(place){
        // 마커를 생성하고 지도에 표시합니다
        let marker = new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(place.y, place.x)
        });

        this.map_markers.push(marker);

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', ()=> {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            this.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            this.infowindow.open(this.map, marker);
        });
    }

    kakao_removeMarkers(){
        this.map_markers.forEach((el)=>{el.setMap(null);});
        this.map_markers = [];
    }

    draw_search_input(install_target){
        install_target = install_target == undefined ? this.install_target.search_input : install_target;
        // let html = this.dom_search_box_title() + this.dom_search_box_search_tool();
        let html = this.dom_search_box_search_tool();
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

    draw_search_result_list(data, install_target){
        install_target = install_target == undefined ? this.install_target.search_result_list : install_target;
        let html = 
            CComp.container(
                "div",
                data.map((el)=>{return this.dom_search_result_element(el)}).join("")
            );
        this.render(install_target, html);
    }

    dom_search_result_element(data){
        let kakao_map_id = data.id;
        let road_address = data.road_address_name;
        let address = data.address_name;
        let phone = data.phone;
        let place_name = data.place_name;
        let place_url = data.place_url;
        let x = data.x;
        let y = data.y;

        let html = 
            CComp.container(
                "div",
                CComp.element(
                    "div",
                    CComp.text(place_name, {"font-size":"16px", "font-weight":"bold"})
                )+
                CComp.element(
                    "div",
                    CComp.text(address, {"font-size":"12px"}),
                    {"line-height":"10px"}
                ),
                {"padding":"10px 0"},
                {id:`search_result_element_${kakao_map_id}`},
                {
                    "type":"click",
                    "exe":()=>{
                        let result = confirm(`추가: ${place_name} / 위치: (${x},${y}) / 주소: ${address} \n 추가할까요?`);
                        if(result){
                            layer_popup.close_layer_popup();
                        }else{
    
                        }
                    }
                }
            );

        return html;
    }

}

