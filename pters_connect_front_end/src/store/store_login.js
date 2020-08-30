import { observable, action } from "mobx";
import CFunc from "../func/CFunc";

class StoreOfLogin{
    @observable AToken;
    @observable RToken;
    @observable ExpireIn;
    @observable ReceivedTimeStamp;

    @action getCurrentUser = () => {
        return localStorage.getItem("ptersAToken");
    }

    @action setToken = (AToken, RToken, ExpireIn) => {
        this.AToken = AToken;
        this.RToken = RToken;
        this.ExpireIn = ExpireIn;
        this.ReceivedTimeStamp = new Date().getTime()/1000;

        localStorage.setItem("ptersAToken", this.AToken);
        localStorage.setItem("ptersRToken", this.RToken);
        localStorage.setItem("ptersATokenExpireIn", this.ExpireIn);
        localStorage.setItem("ptersATokenReceivedTimeStamp", this.ReceivedTimeStamp)
    }

    @action getToken = async () => {
        
        //Token 만료 검사
        let currentTimeStamp = new Date().getTime()/1000;
        let localStorageATokenExpireIn = localStorage.getItem("ptersATokenExpireIn");
        let localStorageATokenReceivedTimeStamp = localStorage.getItem("ptersATokenReceivedTimeStamp");
        if(this.getCurrentUser() != null){
            if(Number(currentTimeStamp) - Number(localStorageATokenReceivedTimeStamp) > Number(localStorageATokenExpireIn) - 10){
                //만료되었으면 새로 요청
                console.log("토큰 만료됨");
                await this.refreshToken().then(()=>{
                    //새로운 토큰을 setToken()한 후 새로운 토큰 리턴
                    return {
                        AToken:localStorage.getItem("ptersAToken"),
                        RToken:localStorage.getItem("ptersRToken")
                    };
                });
            }
        }

        return {
            AToken:localStorage.getItem("ptersAToken"),
            RToken:localStorage.getItem("ptersRToken")
        };
    }

    @action clearToken = () => {
        localStorage.removeItem("ptersAToken");
        localStorage.removeItem("ptersRToken");
        localStorage.removeItem("ptersATokenExpireIn");
        localStorage.removeItem("ptersATokenReceivedTimeStamp")
        console.log("Pters Token Removed");
    }

    @action refreshToken = async () => {
        let dataForAjaxPost = {
            data:{
                client_id:'F2uZBimau8peRE2uYCHYeHJnFQ86gWCa8REndPsk',
                client_secret:'PNyNkrY4MrfmRNN6Bg5radEUe9MfMEeEoo9VIVpXc6Z0XmGldzOdoOqUrPQx5wyfSBFedT9WQJv7oxQWpYXG7F4DUvrELUaH7IiVPPQwGZRNaRMICp4AvwculIjXzNeH',
                grant_type:'refresh_token',
                refresh_token:localStorage.getItem("ptersRToken")
            },
            url:'https://api.pters.co.kr/oauth2/token/',
        }

        return CFunc.ajaxPost(dataForAjaxPost.url, null, dataForAjaxPost.data).then((data)=>{
            var oldAToken = localStorage.getItem("ptersAToken");
            this.setToken(data.data.access_token, data.data.refresh_token, data.data.expires_in);
            console.log(`A토큰 갱신됨 ${oldAToken} -> ${data.data.access_token}`);
        });
    }

    @action signIn = (id, password) => {
        let dataForAjaxPost = {
            data:{
                client_id:'F2uZBimau8peRE2uYCHYeHJnFQ86gWCa8REndPsk',
                client_secret:'PNyNkrY4MrfmRNN6Bg5radEUe9MfMEeEoo9VIVpXc6Z0XmGldzOdoOqUrPQx5wyfSBFedT9WQJv7oxQWpYXG7F4DUvrELUaH7IiVPPQwGZRNaRMICp4AvwculIjXzNeH',
                grant_type:'password',
                username:id,
                password:password
            },
            url:'https://api.pters.co.kr/oauth2/token/',
        }

        CFunc.ajaxPost(dataForAjaxPost.url, null, dataForAjaxPost.data).then((data)=>{
            this.setToken(data.data.access_token, data.data.refresh_token, data.data.expires_in);
            location.href = "/";
        }).catch((errorMsg)=>{
            console.log("에러콜백"+errorMsg);
        })
    }

    @action signOut = () => {
        var tokenToRevoke = this.getCurrentUser();

        let dataForAjaxPost = {
            data:{
                client_id:'F2uZBimau8peRE2uYCHYeHJnFQ86gWCa8REndPsk',
                client_secret:'PNyNkrY4MrfmRNN6Bg5radEUe9MfMEeEoo9VIVpXc6Z0XmGldzOdoOqUrPQx5wyfSBFedT9WQJv7oxQWpYXG7F4DUvrELUaH7IiVPPQwGZRNaRMICp4AvwculIjXzNeH',
                token:tokenToRevoke
            },
            url:'https://api.pters.co.kr/oauth2/revoke_token/',
        }

        CFunc.ajaxPost(dataForAjaxPost.url, null, dataForAjaxPost.data).then(()=>{
            this.clearToken();
            location.href = "/";
        }).catch((errorMsg)=>{
            console.log("에러콜백"+errorMsg);
        })
    }

}

export default StoreOfLogin;
