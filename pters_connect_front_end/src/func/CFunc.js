import axios from 'axios';

class CFunc{
    static ajax(essential_data, option_data){
        let essential = {
            data:null,
            type:null,
            url:null,
            header:null
        };

        let option = {
            callback:null,
            error_callback:null
        };

        for(let data in essential_data){
            essential[data] = essential_data[data];
        }
        for(let data in essential){
            if(essential[data] == null){
                return false;
            }
        }
        for(let data in option_data){
            option[data] = option_data[data];
        }

        axios({
          method:essential.type,
          url:essential.url,
          params:essential.data,
          headers:essential.header != null ? essential.header : "",
          // dataType:"JSON"
        }).then((resp)=>{
          if(option.callback != null){
              option.callback(resp.data);
          }
        }).catch((error)=>{
          if(option.error_callback != null){
              option.error_callback(error);
          }
        })
    }
}

export default CFunc;