class DomController{
    render(install_target, html){
        document.querySelector(install_target).innerHTML = html;
    }
}

class ConnectBase{
    constructor(install_target){
        this.install_target = install_target;
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

        let assembly = CComponent.div(
            nav_button_left + nav_center_logo + nav_button_right,
            {"display":"flex", "line-height":"80px"}
        );

        let html = assembly;
        return html;
    }

    dom_nav_button_left(){
        let id = "nav_button_left";
        let title = CImg.menu();
        let style = {"flex-basis":"50px"};
        let onclick = ()=>{
            alert('Nav left');
        };
        let html = CComponent.button (id, title, style, onclick);
        return html;
    }

    dom_nav_button_right(){
        let id = "nav_button_right";
        let title = CImg.account();
        let style = {"flex-basis":"50px"};
        let onclick = ()=>{
            alert('Nav right');
        };
        let html = CComponent.button (id, title, style, onclick);
        return html;
    }

    dom_center_logo(){
        let onclick = ()=>{
            alert('로고');
        };
        let id = "nav_button_center_logo";
        let title = CComponent.button(id, "PTERS 골프 커넥트", {"font-size":"20px", "font-weight":900, "display":"inline-block"}, onclick);
        let style = {"flex":"1 1 0", "text-align":"center"};
        let html = CComponent.div (title, style);
        return html;
    }
}
