class GolfProMypage extends DomController{
    constructor(){
        super();
        this.install_target = {
            top_full_image:"#golf_pro_main_top_full_image",
            profile_image:"#golf_pro_main_profile_image",
            account_info:"#golf_pro_main_account_info"
        };
    }

    draw_layout(install_target){

        let top_full_image = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"padding-top":"100px"}, 
                                            /*attr*/ {id:this.install_target.top_full_image.replace(/#/, ''), class:"anim_fade_in"});
        let profile_image = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"background-color":"var(--bg-light)", "margin-top":"-100px"}, 
                                                /*attr*/ {id:this.install_target.profile_image.replace(/#/, ''), class:"article_padding"});
        let account_info = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"margin-bottom":"30px"}, 
                                                /*attr*/ {id:this.install_target.account_info.replace(/#/, ''), class:"article_padding anim_fade_in"});
        
        let html = top_full_image + profile_image + account_info;

        this.render(install_target, html);
    }

    draw_children(){
        this.draw_top_full_image();
        this.draw_profile_image();
        this.draw_account_info();
    }

    draw_top_full_image(install_target){
        install_target = install_target == undefined ? this.install_target.top_full_image : install_target;
        let html = CComp.container("div", 
                                    "", 
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

    draw_profile_image(install_target){
        install_target = install_target == undefined ? this.install_target.profile_image : install_target;
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
                CComp.text(`홍길동`, {"max-width":"180px", "font-size":"24px", "font-weight":"bold", "display":"block"}, null) +
                CComp.text("서울시 동작구 흑석동", {"max-width":"180px", "font-size":"12px", "display":"block"}, null) + 
                CComp.element("a", "www.pters.co.kr", {"font-size":"12px", "color":"cornflowerblue"}, {href:"https://www.pters.co.kr"}) +
                CComp.button("post_status_button", "게시중", {"width":"40vw", "border":"1px solid var(--bg-highlight)", "border-radius":"5px", "padding":"2px 5px", "display":"block", "max-width":"180px","color":"var(--font-highlight)"}, null, ()=>{alert("status 변경, 공개 or 비공개");}) +
                CComp.element("div",
                            CComp.button(
                                        "send_message_to", 
                                        "프로필 수정", 
                                        {"border":"2px solid var(--bg-highlight)", "border-radius":"10px", "padding":"5px 10px", "display":"inline-block", "color":"var(--font-highlight)", "font-weight":"bold"},
                                        null, 
                                        ()=>{
                                            location.href = "/golf_pro/profile_edit";
                                        }
                                        ),
                            {"position":"absolute", "top":"150px", "text-align":"right", "width":"100%"}   
                )
                ,
                {"position":"relative", "max-width":"800px", "margin":"0 auto"},
                null
            );

        this.render(install_target, html);
    }

    draw_account_info(install_target){
        install_target = install_target == undefined ? this.install_target.account_info : install_target;
        let article_title = CComp.text("계정 정보", {"font-size":"16px", "font-weight":"bold", "display":"block"});
        let id_row = 
            CComp.container(
                "div",
                CComp.element("div", "ID", {"flex":"1 1 0"})+
                CComp.element("div", "kildong0000", {"flex":"1 1 0", "text-align":"right"})+
                CComp.element("div", CImg.arrow_right([""], {"margin-bottom":"3px"}), {"flex-basis":"24px"}),
                {"display":"flex", "height":"45px", "line-height":"45px", "font-size":"14px"},
                {id:"golf_pro_mypage_id_info"},
                {
                    "type":"click",
                    "exe":()=>{
                        alert("ID 가입 정보 페이지로 이동");
                    }
                }
            );
        let phone_row = 
            CComp.container(
                "div",
                CComp.element("div", "휴대 전화", {"flex":"1 1 0"})+
                CComp.element("div", "000-0000-0000", {"flex":"1 1 0", "text-align":"right"})+
                CComp.element("div", CImg.arrow_right([""], {"margin-bottom":"3px"}), {"flex-basis":"24px"}),
                {"display":"flex", "height":"45px", "line-height":"45px", "font-size":"14px"},
                {id:"golf_pro_mypage_phone_info"},
                {
                    "type":"click",
                    "exe":()=>{
                        let animation = POPUP_FROM_BOTTOM;
                        if(window.innerWidth > MAX_WIDTH){
                            animation = POPUP_FROM_RIGHT;
                        }
                        layer_popup.open_layer_popup(POPUP_BASIC, 'golf_pro_phone_number_change_popup', 100, animation, null, ()=>{ 
                            let phone_info = new GolfProPhoneInfo();
                            phone_info.draw_layout(".golf_pro_phone_number_change_popup");
                            phone_info.draw_children();
                        });
                    }
                }
            );
        let verification_row = 
            CComp.container(
                "div",
                CComp.element("div", "자격 인증", {"flex":"1 1 0"})+
                CComp.element("div", "미인증", {"flex":"1 1 0", "color":"#fe4e65", "text-align":"right"})+
                CComp.element("div", CImg.arrow_right([""], {"margin-bottom":"3px"}), {"flex-basis":"24px"}),
                {"display":"flex", "height":"45px", "line-height":"45px", "font-size":"14px"},
                {id:"golf_pro_mypage_verification_info"},
                {
                    "type":"click",
                    "exe":()=>{
                        location.href = "/golf_pro/cert_info/";
                    }
                }
            );

        let html = 
            CComp.container(
                "div",
                article_title+
                CComp.container(
                    "div",
                    id_row +
                    phone_row + 
                    verification_row,
                    {"padding":"5px 0"}
                ),
                {"max-width":"800px", "margin":"0 auto"}
            );
        
        this.render(install_target, html);
    }
}


class GolfProPhoneInfo extends DomController{
    constructor(){
        super();
        this.install_target = {
            phone_info_top_title:"#golf_pro_phone_info_top_title",
            phone_info_input_wrap:"#golf_pro_phone_info_input_wrap"
        };
        this.$_forms = [];
    }

    draw_layout(install_target){

        let phone_info_top_title = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                            /*attr*/ {id:this.install_target.phone_info_top_title.replace(/#/, ''), class:"article_padding"});
        let phone_info_input_wrap = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                                /*attr*/ {id:this.install_target.phone_info_input_wrap.replace(/#/, ''), class:"article_padding"});
        
        let html = phone_info_top_title + phone_info_input_wrap;

        this.render(install_target, html);
    }

    draw_children(){
        this.draw_top_title();
        this.draw_input_wrap();
    }

    draw_top_title(install_target){
        install_target = install_target == undefined ? this.install_target.phone_info_top_title : install_target;
        let el_main_title = CComp.text("휴대 전화", {"font-size":"20px", "font-weight":"bold", "display":"block"});
        let el_sub_title = CComp.text(`휴대전화 변경 시 재인증이 필요합니다.`, {"font-size":"14px", "font-weight":"500", "display":"block"});
        let el_close_button = 
            CComp.button(
                "close_golf_pro_phone_info_popup",
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

    draw_input_wrap(install_target){
        install_target = install_target == undefined ? this.install_target.phone_info_input_wrap : install_target;
        
        let phone_number = 
            CComp.container(
                "div",
                CComp.element(
                    "div",
                    CComp.element(
                        "input", "", {"width":"100%"}, {"id":"golf_pro_phone_number", "placeholder":"00022221111"}
                    ),
                    {"flex":"1 1 0"}
                )+
                CComp.element(
                    "div",
                    CComp.button(
                        "golf_pro_phone_change_button",
                        "변경",
                        null,
                        null,
                        ()=>{
                            this.$_forms = ["#golf_pro_phone_number"];
                            let valid_check = this.check_data_before_send();
                            if(valid_check){
                                $('#auth_input_wrap').css('display', 'flex');
                                alert("인증 번호가 발송 되었습니다.");
                            }
                        }
                    ),
                    {"flex-basis":"60px"},
                ),
                {"display":"flex", "line-height":"50px"}
            );
        
        let phone_number_change_auth_input = 
            CComp.container(
                "div",
                CComp.element(
                    "div",
                    CComp.element(
                        "input", "", {"width":"100%"}, {"id":"golf_pro_phone_number_change_auth_number", "placeholder":"인증 번호 입력"}
                    ),
                    {"flex":"1 1 0"}
                )+
                CComp.element(
                    "div",
                    CComp.button(
                        "golf_pro_phone_change_auth_button",
                        "인증",
                        null,
                        null,
                        ()=>{
                            this.$_forms = ["#golf_pro_phone_number_change_auth_number"];
                            let valid_check = this.check_data_before_send();
                            if(valid_check){
                                alert("변경이 완료되었습니다");
                                layer_popup.close_layer_popup();
                                setTimeout(()=>{
                                    location.reload();
                                }, 300);
                            }
                        }
                    ),
                    {"flex-basis":"60px"}
                )
                ,
                {"display":"none", "line-height":"50px"},
                {"id":"auth_input_wrap"}
            );
        
        
        let html = 
            CComp.container(
                "div",
                phone_number + phone_number_change_auth_input
            );


        this.render(install_target, html);
    }

    check_data_before_send(){
        let problems = 0;
        this.$_forms.forEach((el)=>{
            if($(el).val() == null || $(el).val().length == 0){
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
