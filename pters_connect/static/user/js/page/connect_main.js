class ConnectMain extends DomController{
    constructor(){
        super();
        this.install_target = {
            search_box:"#search_box",
            program_guide:"#program_guide",
            magazine:"#magazine",
            leading_partner_pro:"#leading_partner_pro"
        };
    }

    draw_layout(install_target){

        let search_box = CComponent.container(
                                            /*type*/ "article", 
                                            /*title*/ "", 
                                            /*style*/ {"height":"100vh", "padding-top":"140px"}, 
                                            /*attr*/ {id:this.install_target.search_box.replace(/#/, ''), class:"search_box_bg_image article_padding"});
        let program_guide = CComponent.container(/*type*/ "article", /*title*/ "", /*style*/ null, /*attr*/ {id:this.install_target.program_guide.replace(/#/, ''), class:"article_padding"});
        let magazine = CComponent.container(/*type*/ "article", /*title*/ "", /*style*/ null, /*attr*/ {id:this.install_target.magazine.replace(/#/, ''), class:"article_padding"});
        let leading_partner_pro = CComponent.container(/*type*/ "article", /*title*/ "", /*style*/ null, /*attr*/ {id:this.install_target.leading_partner_pro.replace(/#/, ''), class:"article_padding"});

        let html = search_box + program_guide + magazine + leading_partner_pro;

        this.render(install_target, html);
    }

    draw_search_box(install_target){
        install_target = install_target == undefined ? this.install_target.search_box : install_target;
        let html = 
            CComponent.container("div", 
                                this.dom_search_box_title() + this.dom_search_box_search_tool(), 
                                null,
                                 null);
        this.render(install_target, html);
    }

    draw_program_guide(install_target){
        install_target = install_target == undefined ? this.install_target.program_guide : install_target;
        let html = "program_guide";
        this.render(install_target, html);
    }

    draw_magazine(install_target){
        install_target = install_target == undefined ? this.install_target.magazine : install_target;
        let html = "magazine";
        this.render(install_target, html);
    }

    draw_leading_partner_pro(install_target){
        install_target = install_target == undefined ? this.install_target.leading_partner_pro : install_target;
        let html = "leading_partner_pro";
        this.render(install_target, html);
    }


    dom_search_box_title(){
        let title = CComponent.text(/*title*/ "내 주변 <br>최고의 골프 코치님을 <br>찾아보세요", /*style*/ {"font-size":"2.0em", "font-weight":"bold", "color":"var(--font-invisible)", "word-break":"keep-all"}, /*attr*/{});
        let html = CComponent.container(/*type*/ "div", 
                                        /*title*/ title, 
                                        /*style*/ {"margin":"0 auto", "margin-bottom":"30px", "max-width":"600px", "animation-duration":"1s"}, 
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
                                            location.href = '/connect_home/search_result/';
                                        });

        let html = CComponent.container(/*type*/ "div", 
                                        /*title*/ input + button, 
                                        /*style*/ {"position":"relative", "max-width":"600px", "margin":"0 auto"}, 
                                        /*attr*/null);
        return html;
    }




}
