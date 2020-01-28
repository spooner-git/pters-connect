class GolfProCertInfo extends DomController{
    constructor(){
        super();
        this.install_target = {
            cert_info_top_title:"#golf_pro_cert_info_top_title",
            cert_info_input_wrap:"#golf_pro_cert_info_input_wrap",
            cert_add_new_wrap:"#golf_pro_cert_add_new"
        };
        this.$_forms = [];
    }

    draw_layout(install_target){

        let cert_info_top_title = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"padding-top":"100px"}, 
                                            /*attr*/ {id:this.install_target.cert_info_top_title.replace(/#/, ''), class:"article_padding"});
        let cert_info_input_wrap = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                                /*attr*/ {id:this.install_target.cert_info_input_wrap.replace(/#/, ''), class:"article_padding"});
        let cert_add_new_wrap = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                                /*attr*/ {id:this.install_target.cert_add_new_wrap.replace(/#/, ''), class:"article_padding"});
        let html = cert_info_top_title + cert_info_input_wrap + cert_add_new_wrap;

        this.render(install_target, html);
    }

    draw_children(){
        this.draw_top_title();
        this.draw_cert_list_wrap();
        this.draw_cert_add_new();
    }

    draw_top_title(install_target){
        install_target = install_target == undefined ? this.install_target.cert_info_top_title : install_target;
        let el_main_title = CComp.text("자격 인증", {"font-size":"20px", "font-weight":"bold", "display":"block"});
        let el_sub_title = CComp.text(`인증 서류 검토 후 반영까지 최대 5 영업일이 소요될 수 있습니다.`, {"font-size":"14px", "font-weight":"500", "display":"block"});
        let el_close_button = 
            CComp.button(
                "close_golf_pro_cert_info_popup",
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
                el_main_title + this.dom_buttons() + el_sub_title,
                {"position":"relative", "max-width":"800px", "margin":"0 auto"}
            );

        this.render(install_target, html);
    }

    dom_buttons(){
        let html = 
        CComp.element("div",
                CComp.button(
                            "cancle_profile_edit", 
                            "나가기", 
                            {"border":"2px solid var(--bg-sub-light)", "border-radius":"10px", "padding":"5px 10px", "display":"inline-block", "color":"var(--font-sub-light)", "font-weight":"500"},
                            null, 
                            ()=>{
                                
                                location.href= "/golf_pro/mypage";
                                
                            }
                            ),
                {"display":"inline-block", "float":"right"}   
        )
        return html;
    }

    draw_cert_list_wrap(install_target){
        install_target = install_target == undefined ? this.install_target.cert_info_input_wrap : install_target;
        let article_title = 
            CComp.text(
                "내 자격 인증",
                {"display":"block", "font-size": "13px", "font-weight":"bold", "margin-bottom":"5px"}
            );

        let cert_data_demo = [
            {"cert_name":"USGTF 프로", "status":"OK", "cert_id":"321321"},
            {"cert_name":"KLPGA 프로", "status":"WAIT", "cert_id":"123456"}
        ];

        let html = 
            CComp.container(
                "div",
                article_title +
                cert_data_demo.map((el)=>{return this.dom_cert_list(el);}).join(""),
                {"max-width":"800px", "margin":"0 auto"}
            );

        this.render(install_target, html);
    }

    dom_cert_list(data){
        let html = 
            CComp.container(
                "div",
                CComp.element("div", data.cert_name, {"flex":"1 1 0"}) +
                CComp.element("div", data.status, {"flex-basis":"50px"}, {"id":`cert_delete_${data.cert_id}`},
                    {
                        "type":"click",
                        "exe":()=>{
                            let result = confirm(`${data.cert_name} 자격증을 삭제 할까요?`);
                            if(result){
                                alert("자격증 정보를 삭제 하였습니다.");
                            }
                        }
                    }
                ),
                {"display":"flex", "line-height":"50px"}
            );
        return html;
    }


    draw_cert_add_new(install_target){
        install_target = install_target == undefined ? this.install_target.cert_add_new_wrap : install_target;
        let article_title = 
            CComp.text(
                "자격 인증 추가",
                {"display":"block", "font-size": "13px", "font-weight":"bold", "margin-bottom":"10px"}
            );

        let add_inputs = 
            CComp.container(
                "div",
                CComp.element("input", "", {"display":"block", "width":"100%", "margin-bottom":"5px"}, {"type":"text", "name":"new_cert_name", "placeholder":"자격명"})+
                CComp.element("input", "", {"display":"block", "width":"100%"}, {"type":"file", "name":"new_cert_file"})+
                CComp.text(`자격 서류 파일을 업로드 해주세요. 그림 파일(png, jpg) 및 pdf 파일을 사용할 수 있습니다.`, {"display":"block", "font-size":"12px", "padding":"5px", "color":"var(--font-sub-normal)"})+
                CComp.container(
                    "div",
                    CComp.button(
                        "cert_add_new_send_to_server",
                        "추가",
                        {"width":"70px", "border":"2px solid var(--bg-highlight)", "border-radius":"10px", "color":"var(--font-highlight)", "padding":"5px 10px", "font-weight":"500", "display":"inline-block"},
                        null,
                        ()=>{
                            alert("자격 서류를 업로드 하였습니다.");
                            location.reload();
                        }
                    ),
                    {"text-align":"right"}
                ),
                null,
                {"id":"cert_add_new_file_input"}
            );
        
        let html = 
            CComp.container(
                "div",
                article_title + add_inputs
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

