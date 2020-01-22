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

    draw_init(install_target){

        let search_box = CComponent.container(/*type*/ "article", /*title*/ "", /*style*/ null, /*attr*/ {id:this.install_target.search_box.replace(/#/, '')});
        let program_guide = CComponent.container(/*type*/ "article", /*title*/ "", /*style*/ null, /*attr*/ {id:this.install_target.program_guide.replace(/#/, '')});
        let magazine = CComponent.container(/*type*/ "article", /*title*/ "", /*style*/ null, /*attr*/ {id:this.install_target.magazine.replace(/#/, '')});
        let leading_partner_pro = CComponent.container(/*type*/ "article", /*title*/ "", /*style*/ null, /*attr*/ {id:this.install_target.leading_partner_pro.replace(/#/, '')});

        let html = search_box + program_guide + magazine + leading_partner_pro;

        this.render(install_target, html);
    }

    draw_search_box(install_target){
        install_target = install_target == undefined ? this.install_target.search_box : install_target;
        let html = "search_box";
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

}
