import React,{useState,useEffect} from 'react'
// import M from 'materialize-css'
import swal from 'sweetalert'

import {useHistory} from 'react-router-dom'
const CretePost = ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [picture, setPicture] = useState(null)

    const [url,setUrl] = useState("")
    useEffect(()=>{
       if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
            //   M.toast({html: data.error,classes:"#c62828 red darken-3"})
            const html=data.error
            swal({title:"OOPS !", 
            icon:"warning",
            text:html})   
        }
           else{
            //    M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
            
            swal({title:" Successfully Created Post", 
            icon:"success",
            text:"be honest win prize and enjoy...!"})    
            history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    
    },[url])
    
    
  
   const postDetails = ()=>{
       const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","photo-contest")
       data.append("cloud_name","dyqw1ro1v")
       fetch("https://api.cloudinary.com/v1_1/dyqw1ro1v/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
       })
       .catch(err=>{
           console.log(err)
       })
    
   }
   const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }

}
 

   return(
       <div className="card input-filed"
       style={{
           margin:"30px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center"
       }}
       >
           <input 
           type="text"
            placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
           <input
            type="text"
             placeholder="body"
             value={body}
            onChange={(e)=>setBody(e.target.value)}
             />
           <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Uplaod Image</span>
                {/* <input type="file" onChange={(e)=>setImage(e.target.files[0])} /> */}
                <input type="file" onChange={onChangePicture}/>
            </div>
            <div className='imgPreview'>
                <img  className="playerProfilePic_home_tile" src={image} alt ="" style={{width: "auto", height: "130px",borderRadius: "5px"}}/>
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()}
            
            >
                Submit post
            </button>

       </div>
   )
}


export default CretePost