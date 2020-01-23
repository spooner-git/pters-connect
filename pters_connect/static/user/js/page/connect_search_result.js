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

        let map_box = CComponent.container(/*type*/ "article", /*title*/ "", /*style*/ {"padding-top":"100px"}, 
                                            /*attr*/ {id:this.install_target.map_box.replace(/#/, '')});
        let search_input = CComponent.container(/*type*/ "article", /*title*/ "", /*style*/ {"background-color":"var(--bg-light)"}, 
                                                /*attr*/ {id:this.install_target.search_input.replace(/#/, ''), class:"article_padding"});
        let result_list = CComponent.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                                /*attr*/ {id:this.install_target.result_list.replace(/#/, ''), class:"article_padding"});
        
        let html = map_box + search_input + result_list;

        this.render(install_target, html);
    }

    draw_map_box(install_target){
        install_target = install_target == undefined ? this.install_target.map_box : install_target;
        let html = CComponent.container("div", "", {"height":"35vh"}, {id:"map_container"});
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
        let title = CComponent.text(/*title*/ "주변을 검색 해보세요", /*style*/ {"font-size":"1.3em", "font-weight":"bold", "word-break":"keep-all", "display":"block"}, /*attr*/{});
        let title_description = CComponent.text(/*title*/ "나와 가까운 코치님을 찾아보세요.", /*style*/ {"font-size":"0.8em", "font-weight":"normal", "word-break":"keep-all", "display":"block", "padding-left":"3px"}, /*attr*/{});
        let html = CComponent.container(/*type*/ "div", 
                                        /*title*/ title + title_description, 
                                        /*style*/ {"margin":"0 auto", "margin-bottom":"15px", "max-width":"600px", "animation-duration":"1s"}, 
                                        /*attr*/ {class:"anim_fade_in"});
        return html;
    }

    dom_search_box_search_tool(){
        let input = CComponent.element(/*type*/ "input", 
                                        /*title*/ "", 
                                        /*style*/ {"width":"100%", "height":"50px", "font-size":"16px"}, 
                                        /*attr*/ {id:"search_main_input", placeholder:"장소 혹은 주소를 입력해주세요."} );
        let button = CComponent.button(/*id*/ "search_button", 
                                        /*title*/ CImg.search(["var(--fundamental-white)"], {"margin-top":"5px"}), 
                                        /*style*/ {"position":"absolute", "top":"5px", "right":"5px", "width":"40px", "height":"40px", "border-radius":"50%", "background-color":"#fe4e65"}, 
                                        /*attr*/ {class:"anim_opacity_90 anim_scale_up"},
                                        /*onclick*/ ()=>{
                                            let context = this;
                                            this.ps.keywordSearch($('#search_main_input').val(), (data, status, pagination)=>{
                                                this.kakao_placesSearchCB(data, status, pagination, context);
                                            });
                                        });

        let html = CComponent.container(/*type*/ "div", 
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
        let photo_box = CComponent.button(`profile_photo_${db_id}`, 
                                        "",
                                        {"width":"100%", "border-radius":"5px", "background-image":"url('/static/user/res/demo/profile.jpg')", "background-size":"cover", "background-repeat":"no-repeat", "background-position":"top", "position":"absolute", "top":0, "left":0, "height":"calc(100% - 45px)"}, 
                                        null,
                                        ()=>{alert("프로필 클릭")});
        let name_box = CComponent.button(`profile_${db_id}`, 
                                        CComponent.text("홍길동", {"font-size":"13px", "font-weight":"bold", "text-align":"center", "display":"block"}, null) + 
                                        CComponent.text("서울 동작구 흑석동", {"font-size":"10px", "font-weight":"normal", "text-align":"center", "display":"block"}, null), 
                                        null, 
                                        null, 
                                        ()=>{alert("프로필 클릭")});

        let wrapper = CComponent.container("article", photo_box + name_box, null, {class:"profile_brick anim_fade_in anim_scale_up"});
        return wrapper;
    }


}
