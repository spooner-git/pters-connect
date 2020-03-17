const kakao_ak = "KakaoAK 2223d3c0765e40d0ff687f4df91f5bde";
const CLOSE = 0;
const OPEN = 1;
const OFF = 0;
const ON = 1;
//프로그램 리스트
const PROGRAM_CATEGORY = {
    TR:{name:"스포츠",
        sub_category:{
            WT:{name:"웨이트 트레이닝"},
            PI:{name:"필라테스"},
            YG:{name:"요가"},
            BL:{name:"발레"},
            GOLF:{name:"골프"},
            TENNIS:{name:"테니스"},
            BILLIARD:{name:"당구"},
            SPINNING:{name:"스피닝"}
        }
    },
    MU:{name:"음악", 
        sub_category:{
            PIANO:{name:"피아노"},
            FLUTE:{name:"플룻"},
            VIOLIN:{name:"바이올린"},
            CELLO:{name:"첼로"},
            VOCAL_MUSIC:{name:"성악"},
            CLARINET:{name:"클라리넷"},
            GUITAR:{name:"기타"},
            DRUM:{name:"드럼"},
            VOCAL:{name:"보컬"},
            COMPOSITION:{name:"작곡"}
        }
    },
    // PL:{name:"과외", 
    //     sub_category:{
    //         KO:{name:"국어"},
    //         EG:{name:"영어"},
    //         EG_CM:{name:"영어회화"},
    //         MA:{name:"수학"},
    //         CH:{name:"중국어"},
    //         CH_CM:{name:"중국어 회화"},
    //         JP:{name:"일본어"},
    //         JP_CM:{name:"일본어 회화"},
    //         SCIENCE:{name:"과학"}
    //     }
    // },
    // ETC:{name:"기타",
    //     sub_category:{
    //         ETC:{name:"기타"}
    //     }},
};

export {kakao_ak, CLOSE, OPEN, OFF, ON, PROGRAM_CATEGORY};