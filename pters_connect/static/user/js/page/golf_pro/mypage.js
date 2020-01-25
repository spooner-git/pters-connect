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
                CComp.button("post_status_button", "게시중", {"border":"1px solid var(--bg-highlight)", "border-radius":"5px", "padding":"2px 5px", "display":"block", "max-width":"180px","color":"var(--font-highlight)"}, null, ()=>{alert("status 변경, 공개 or 비공개");}) +
                CComp.element("div",
                            CComp.button(
                                        "send_message_to", 
                                        "프로필 수정", 
                                        {"border":"2px solid var(--bg-highlight)", "border-radius":"10px", "padding":"5px 10px", "display":"inline-block", "color":"var(--font-highlight)", "font-weight":"bold"},
                                        null, 
                                        ()=>{
                                            alert("프로필 페이지");
                                            // layer_popup.open_layer_popup(POPUP_BASIC, 'send_message_to_teacher', 100, POPUP_FROM_BOTTOM, null, ()=>{ 
                                                
                                            // });
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
                ()=>{
                    alert("ID 가입 정보 페이지로 이동");
                }
            );
        let phone_row = 
            CComp.container(
                "div",
                CComp.element("div", "휴대 전화", {"flex":"1 1 0"})+
                CComp.element("div", "000-0000-0000", {"flex":"1 1 0", "text-align":"right"})+
                CComp.element("div", CImg.arrow_right([""], {"margin-bottom":"3px"}), {"flex-basis":"24px"}),
                {"display":"flex", "height":"45px", "line-height":"45px", "font-size":"14px"},
                {id:"golf_pro_mypage_id_info"},
                ()=>{
                    alert("휴대폰 인증 페이지로 이동");
                }
            );
        let verification_row = 
            CComp.container(
                "div",
                CComp.element("div", "자격 인증", {"flex":"1 1 0"})+
                CComp.element("div", "미인증", {"flex":"1 1 0", "color":"#fe4e65", "text-align":"right"})+
                CComp.element("div", CImg.arrow_right([""], {"margin-bottom":"3px"}), {"flex-basis":"24px"}),
                {"display":"flex", "height":"45px", "line-height":"45px", "font-size":"14px"},
                {id:"golf_pro_mypage_id_info"},
                ()=>{
                    alert("자격 서류 업로드 페이지로 이동");
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

