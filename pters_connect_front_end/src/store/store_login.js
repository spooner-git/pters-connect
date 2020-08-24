import { observable, action } from "mobx";

export default class StoreOfLogin{
    @observable accessToken = null;

    @action setToken = (token) => {
        this.accessToken = token;
    }

    @action getToken = () => {
        return this.accessToken;
    }
}
