class DomController{
    render(install_target, html){
        document.querySelector(install_target).innerHTML = html;
    }
}

class ConnectBase{
    constructor(install_target, background){
        this.install_target = install_target;
        this.background = "transparent"; /*black, white, transparent*/
        this.color_combination = {
            transparent:{icon:"var(--fundamental-white)", bg:"transparent", logo:"/static/common/res/logo/logo_white.png", shade:"linear-gradient(180deg, black, transparent)"},
            black:{icon:"var(--fundamental-white)", bg:"#282828", logo:"/static/common/res/logo/logo_white.png", shade:"unset"},
            white:{icon:"var(--fundamental-black)", bg:"#ffffff", logo:"/static/common/res/logo/logo.png", shade:"unset"}
        };
        if(background != undefined){
            this.background = background;
        }
    }

    change_bg(color){
        this.background = color;
        this.render();
    }

    init(){
        this.render();
    }

    render(){
        document.querySelector(this.install_target).innerHTML = this.assembly();
    }

    assembly(){
        let nav_button_left  = this.dom_nav_button_left();
        let nav_button_right = this.dom_nav_button_right();
        let nav_center_logo = this.dom_center_logo();

        let assembly = 
        CComp.element(
            "div",
            CComp.element(
                "div",
                nav_button_left + nav_center_logo + nav_button_right,
                {"display":"flex", "width":"100%", "max-width":"1024px", "margin":"0 auto"}
            ),
            {"line-height":"80px", "height":"80px", "background-color":this.color_combination[this.background].bg, "background-image":this.color_combination[this.background].shade}
        );

        let html = assembly;
        return html;
    }

    dom_nav_button_left(){
        let id = "nav_button_left";
        let title = CImg.menu([this.color_combination[this.background].icon]);
        let style = {"flex-basis":"50px"};
        let attr = null;
        let onclick = ()=>{
            show_page_popup('test_popup', POPUP_FROM_LEFT, 100, ()=>{
                document.querySelector('.test_popup').innerHTML = this.dom_left_menu();
            });
        };
        let html = CComp.button (id, title, style, attr, onclick);
        return html;
    }

    dom_nav_button_right(){
        let id = "nav_button_right";
        let title = CImg.account([this.color_combination[this.background].icon]);
        let style = {"flex-basis":"50px", "visibility":"hidden"};
        let attr = null;
        let onclick = ()=>{
            // alert('Nav right');
        };
        let html = CComp.button (id, title, style, attr, onclick);
        return html;
    }

    dom_center_logo(){
        let img = CComp.element("img", "", {"max-width":"150px", "vertical-align":"middle"}, {src:this.color_combination[this.background].logo});

        let onclick = ()=>{
            location.href = '/';
        };
        let id = "nav_button_center_logo";
        let title = CComp.button(id, img, {"font-size":"22px", "font-weight":900, "display":"inline-block", "color":this.color_combination[this.background].icon, "height":"100%"}, null, onclick);
        let style = {"flex":"1 1 0", "text-align":"center"};
        let html = CComp.div (title, style);
        return html;
    }

    dom_left_menu(){
        let menu1_style = {"padding":"15px 0", "color":"var(--fundamental-white)", "font-size":"20px", "font-weight":"bold", "animation-delay":"0.1s", "animation-duration":"1.5s"};
        let menu2_style = {"padding":"15px 0", "color":"var(--fundamental-white)", "font-size":"20px", "font-weight":"bold", "animation-delay":"0.1s", "animation-duration":"1.5s"};
        let menu3_style = {"padding":"15px 0", "color":"var(--fundamental-white)", "font-size":"20px", "font-weight":"bold", "animation-delay":"0.1s", "animation-duration":"1.5s"};
        let close_style = {"padding":"15px", "color":"var(--fundamental-white)", "position":"absolute", "top":"15px", "right":"15px", "animation-delay":"0.2s", "animation-duration":"1s"};
        let menu1 = CComp.button("menu_search", "찾아 보기", menu1_style, {class:"anim_fade_in"}, ()=>{location.href = "/"});
        let menu2 = CComp.button("menu_mypage", "내 정보", menu2_style, {class:"anim_fade_in"}, ()=>{location.href="/golf_pro/main";});
        let menu3 = CComp.button("menu_messages", "상담 내역", menu2_style, {class:"anim_fade_in"}, ()=>{alert("코치의 경우 받은 상담 리스트, 일반회원의 경우 내가 보낸 상담 리스트")});
        let menu4 = CComp.button("menu_about", "About PTERS", menu3_style, {class:"anim_fade_in"}, ()=>{});
        let close = CComp.button("menu_about", CImg.x(["var(--fundamental-white)"]), close_style, {class:"anim_fade_in"}, ()=>{layer_popup.close_layer_popup()});

        let menu_wrapper = CComp.container("div", menu1 + menu2 + menu3 + menu4, {"position":"absolute", "top":"50%", "left":"50%", "transform":"translate(-50%, -50%)"}, null);
        let box = CComp.container("div", menu_wrapper + close, {"background-color":"var(--fundamental-black)", "width":"100%", "height":"100%", "position":"relative"}, null);
        
        return box;
    }

}
