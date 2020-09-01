import axios from 'axios';
import { inject } from 'mobx-react';

class CFunc{
    // static ajax(essential_data, option_data){
    //     let essential = {
    //         data:null,
    //         type:null,
    //         url:null,
    //         header:null
    //     };

    //     let option = {
    //         callback:null,
    //         error_callback:null
    //     };
        
    //     let formData = new FormData();
    //     for(let data in essential_data){
    //         if(data == "data"){
    //             for(let el in essential_data[data]){
    //                 formData.append(el, essential_data[data][el])
    //             }
    //             essential[data] = formData;
    //         }else{
    //             essential[data] = essential_data[data];
    //         }
    //     }

    //     for(let data in option_data){
    //         option[data] = option_data[data];
    //     }
        
    //     axios({
    //       method:essential.type,
    //       url:essential.url,
    //       params:essential.data != null ? essential.data : {},
    //       headers:essential.header != null ? essential.header : "",
    //       // dataType:"JSON"
    //     }).then((resp)=>{
    //       if(option.callback != null){
    //           option.callback(resp.data);
    //       }
    //     }).catch((error)=>{
    //       if(option.error_callback != null){
    //           option.error_callback(error);
    //       }
    //     })
    // }

    static ajax(url, type, header, data){
        let formData = new FormData();
        for(let el in data){
            formData.append(el, data[el])
        }
        
        return axios({
          method:type,
          url:url,
          params:data != null ? formData : {},
          headers:header != null ? header : "",
        }).then((resp)=>{
            return resp;
        }).catch((error)=>{
            return error;
        })
    }

    static ajaxPost(url, header, data){
        
        let formData = new FormData();
        for(let el in data){
            formData.append(el, data[el])
        }

        return axios.post(
            url,
            data != null ? formData : {},
            {
                headers:header
            }
        ).then((resp)=>{
            return resp;
        }).catch((error)=>{
            return error.response;
        })
    }

    static ajaxGet(url, header, data){
        
        // let formData = new FormData();
        // for(let el in data){
        //     formData.append(el, data[el])
        // }

        return axios.get(
            url,
            data != null ? {params:data} : {},
            {
                headers:header
            },
        ).then((resp)=>{
            return resp;
        }).catch((error)=>{
            return error.response;
        })
    }

    static ajaxPut(url, header, data){
        
        let formData = new FormData();
        for(let el in data){
            formData.append(el, data[el])
        }

        return axios.put(
            url,
            data != null ? formData : {},
            {
                headers:header
            },
        ).then((resp)=>{
            return resp;
        }).catch((error)=>{
            return error.response;
        })
    }

    static ajaxDelete(url, header, data){
        
        let formData = new FormData();
        for(let el in data){
            formData.append(el, data[el])
        }

        return axios.delete(
            url,
            data != null ? formData : {},
            {
                headers:header
            },
        ).then((resp)=>{
            return resp;
        }).catch((error)=>{
            return error.response;
        })
    }
}

export default CFunc;