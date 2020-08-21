import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import swal from 'sweetalert'
import logo from '../../components/images/first.png'


const SignIn  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [picture, setPicture] = useState(null)
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{    
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = ()=>{
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
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            
            swal({text:"Enter Valid Email Address"})
            
            if(!name || !email || !password || !confirmPassword){

                swal({text:" Fill out all fields",icon: "warning"})
                }
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url,
                confirmPassword
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
            //   M.toast({html: data.error,classes:"#c62828 red darken-3"})
            const html = data.error
            swal({        
                title: "OOPS!",
                icon: "warning",
                text: html ,
              })
                // history.push('/login')
        }
           else{
          
            const html = data.message
            
                swal({                    
                    title:"Signup Successfully Login to continue !",
                   text:html,
                    icon: "success",
                  })   
            history.push('/login')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            
            uploadPic()
        }else{
            uploadFields()
        }
       
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
    

   return (
      <div className="mycard">
          <div className="card auth-card input-field">
          <img src={logo} alt="" style={{height: "55px"}}/>
           <span id="login-logo" style={{fontSize:"2.1rem", float: "right",  color: "#74d14c"}}>PhotoGraphyContest</span>                                 
            <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span >Upload pic</span>
                <input type="file" id='imgInp' onChange={onChangePicture}/>
                </div>
                <div className='imgPreview'>
                <img className="playerProfilePic_home_tile" src={image} alt="" style={{width: "130px", height: "130px",borderRadius: "5px"}}/>
                </div>
        
          
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
                SignUP
            </button>
            <h5>
                <Link to="/login">Already have an account? Login </Link>
            </h5>
            <h6>
                <Link to="/reset">Forget Password</Link>
            </h6>
             
               
         
            
    
        </div>
      </div>
   )
}


export default SignIn