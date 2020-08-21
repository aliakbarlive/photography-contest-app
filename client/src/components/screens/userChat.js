import {useEffect} from 'react'

const Chat=()=>{
    useEffect(() => {
    window.$crisp=[];
    window.CRISP_WEBSITE_ID="0a0a3855-262c-45ce-8c6b-1720ef3521a4";
    (function(){
      const d=document;
      const s=d.createElement("script");
      s.src="https://client.crisp.chat/l.js";
      s.async=1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })()

},[])
}

export default Chat