class GolfProMessageBox extends DomController{
    constructor(){
        super();
        this.install_target = {
            new_messages:"#golf_pro_message_box_new",
            old_messages:"#golf_pro_message_box_old"
        };
    }

    draw_layout(install_target){

        let new_messages = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"padding-top":"100px", "background-color":"var(--bg-light)"}, 
                                            /*attr*/ {id:this.install_target.new_messages.replace(/#/, ''), class:"article_padding anim_fade_in"});
        let old_messages = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                                /*attr*/ {id:this.install_target.old_messages.replace(/#/, ''), class:"article_padding anim_fade_in"});
        
        
        let html = new_messages + old_messages;
        this.render(install_target, html);
    }

    draw_children(){
        this.draw_new_messages();
        this.draw_old_messages();
    }

    draw_new_messages(install_target){
        install_target = install_target == undefined ? this.install_target.new_messages : install_target;
        let messages_demo = [
            {"user_name":"김춘향", "user_id":"kimchunaa", "status":"not_completed", "date":"2020-01-25 14:35", "message_id":"65464546"}, 
            {"user_name":"마동석", "user_id":"maaa00aa", "status":"not_completed", "date":"2020-01-25 14:35", "message_id":"849844654"}
        ];

        let article_title = 
            CComp.container(
                "div",
                CComp.text(`새로운 상담 요청 (${messages_demo.length}건)`, {"font-size":"18px", "font-weight":"bold", "display":"block"}) + 
                CComp.text("10일간 완료하지 않은 상담이 있을 경우, 내 프로필 게시가 중단 되므로 주의해주세요.", {"font-size":"12px", "display":"block"}),
                {"margin-bottom":"15px"}
            );

        let message_box = 
            CComp.container(
                "div",
                messages_demo.map((el)=>{
                    return this.dom_message_row(el);
                }).join("")
            );

        let html = 
            CComp.container(
                "div",
                article_title + message_box,
                {"max-width":"800px", "margin":"0 auto"}
            );

        this.render(install_target, html);
    }

    draw_old_messages(install_target){
        install_target = install_target == undefined ? this.install_target.old_messages : install_target;
        let messages_demo = [
            {"user_name":"배수정", "user_id":"kimchunaa", "status":"completed", "date":"2020-01-21 15:05", "message_id":"12313515"}, 
            {"user_name":"공유", "user_id":"maaa00aa", "status":"completed", "date":"2020-01-05 21:35", "message_id":"1311544356"},
            {"user_name":"김태희", "user_id":"kingsejong", "status":"rejected", "date":"2019-12-15 08:10", "message_id":"546958465"},
            {"user_name":"김세종", "user_id":"kingsejong", "status":"rejected", "date":"2020-01-25 14:35", "message_id":"21313214"}
        ];

        let article_title = 
            CComp.container(
                "div",
                CComp.text(`완료한 상담 (${messages_demo.length}건)`, {"font-size":"15px", "font-weight":"bold", "display":"block"}),
                {"margin-bottom":"15px", "color":"var(--font-sub-dark)"}
            );

        let message_box = 
            CComp.container(
                "div",
                messages_demo.map((el)=>{
                    return this.dom_message_row(el);
                }).join(""),
                {"color":"var(--font-sub-normal)"}
            );

        let html = 
            CComp.container(
                "div",
                article_title + message_box,
                {"max-width":"800px", "margin":"0 auto"}
            );

        this.render(install_target, html);
    }

    dom_message_row(data){
        let first_row = 
            CComp.container(
                "div",
                CComp.element("div", data.user_name, {"flex":"1 1 0"}) + 
                CComp.element("div", data.status, {"flex-basis":"60px"}),
                {"display":"flex", "font-size":"14px", "font-weight":"500"}
            );
        let second_row =
            CComp.container(
                "div",
                CComp.text(data.date, {"font-size":"11px"}),
                {"text-align":"right"}
            );

        let html = 
            CComp.container(
                "div",
                first_row + second_row,
                {"padding":"8px 0"},
                {"id":`message_row_message_id_${data.message_id}`},
                {
                    "type":"click", 
                    "exe":()=>{
                        let animation = POPUP_FROM_BOTTOM;
                        if(window.innerWidth > MAX_WIDTH){
                            animation = POPUP_FROM_RIGHT;
                        }
                        layer_popup.open_layer_popup(POPUP_BASIC, 'send_message_to_guest', 100, animation, null, ()=>{ 
                            let sm = new SendMessageToGuest();
                            sm.draw_layout(".send_message_to_guest");
                            sm.draw_children();
                        });
                    }
                }
                
            );
        return html;
    }
}

class SendMessageToGuest extends DomController{
    constructor(){
        super();
        this.install_target = {
            send_message_top_title:"#send_message_top_title",
            send_message_guest_info:"#send_message_guest_info",
            send_message_input_wrap:"#send_message_input_wrap",
            send_message_send:"#send_message_send"
        };
        this.$_forms = [];
    }

    draw_layout(install_target){

        let send_message_top_title = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                            /*attr*/ {id:this.install_target.send_message_top_title.replace(/#/, ''), class:"article_padding"});
        let send_message_guest_info = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ {"padding-bottom":0, "padding-top":0}, 
                                                /*attr*/ {id:this.install_target.send_message_guest_info.replace(/#/, ''), class:"article_padding"});
        let send_message_input_wrap = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                                /*attr*/ {id:this.install_target.send_message_input_wrap.replace(/#/, ''), class:"article_padding"});
        let send_message_send = CComp.container(/*type*/ "article", /*title*/ "", /*style*/ null, 
                                                /*attr*/ {id:this.install_target.send_message_send.replace(/#/, ''), class:"article_padding"});
        
        let html = send_message_top_title + send_message_guest_info + send_message_input_wrap + send_message_send;

        this.render(install_target, html);
    }

    draw_children(){
        this.draw_send_message_top_title();
        this.draw_send_message_guest_info();
        this.draw_send_message_input_wrap();
        this.draw_send_message_send();
    }

    draw_send_message_top_title(install_target){
        install_target = install_target == undefined ? this.install_target.send_message_top_title : install_target;
        let el_main_title = CComp.text("상담 답변", {"font-size":"20px", "font-weight":"bold", "display":"block"});
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
                el_main_title +  el_close_button,
                {"position":"relative"}
            );

        this.render(install_target, html);
    }

    draw_send_message_guest_info(install_target){
        install_target = install_target == undefined ? this.install_target.send_message_guest_info : install_target;
        let demo_message = {
            "sender_name":"김춘향",
            "sender_age":"26",
            "sender_gender":"여성",
            "message":"월수금 오후 7시 반포역 근처에서 초보 입문 하고 싶어요",
            "sender_phone":"000-1235-1234"
        };

        let guest_info = 
            CComp.container(
                "div",
                CComp.element("div", `${demo_message.sender_name} (${demo_message.sender_age}, ${demo_message.sender_gender})`, {"font-weight":"500"})
            );
        let message = 
            CComp.container(
                "div",
                CComp.element("div", demo_message.message) +
                CComp.element("div", "", {"position":"absolute", "top":"-8px", "left":"15px", "width":"0", "height":"0", "border":"8px solid var(--bg-light)", "border-right-color":"transparent", "border-bottom-color":"transparent", "transform":"rotate(45deg)"}), //뾰족한 삼각형 모양
                {"border-radius":"10px", "background-color":"var(--bg-light)", "padding":"10px", "font-size":"14px", "position":"relative", "margin-top":"15px"}
            );
        let contact = 
            CComp.container(
                "div",
                CComp.text(`상담을 수락하여 답변을 1회 진행한 이후 상담 요청자의 연락처 정보가 공개됩니다.`, {"display":"block", "font-size":"12px", "padding":"5px", "color":"var(--font-sub-normal)"})

            );

        let html = 
            CComp.container(
                "div",
                guest_info + message + contact
            );

        this.render(install_target, html);
    }

    draw_send_message_input_wrap(install_target){
        install_target = install_target == undefined ? this.install_target.send_message_input_wrap : install_target;
        let el_select = 
            CComp.container(
                "select",
                CComp.element("option", "상담 여부 선택", null, {"selected":"true", "disabled":"true"}) +
                CComp.element("option", "상담 수락") +
                CComp.element("option", "상담 거절"),
                {"font-size":"16px", "width":"100%", "margin-bottom":"15px"},
                {"id":"select_status_of_message"},
                {
                    "type":"change",
                    "exe":()=>{
                        
                    }
                }
            );

        let el_content = 
            CComp.element(
                /*type*/ "input", 
                /*title*/ "", 
                /*style*/ {"width":"100%", "height":"50px", "font-size":"16px"}, 
                /*attr*/ {id:"send_message_to_guest_input_content", placeholder:"상담 내용을 입력 해주세요.(30자 이내)", type:"text", maxlength:"30"} );

        this.$_forms.push("#select_status_of_message", "#send_message_to_guest_input_content");

        let html = 
            CComp.container(
                "div", 
                el_select + el_content
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
                CComp.text(`PTERS Connect는 중개자일뿐 상담에서 발생하는 모든 상황에 대해서 책임 지지 않습니다.`, 
                            {"font-size":"12px", "flex":"1 1 0"}),
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

