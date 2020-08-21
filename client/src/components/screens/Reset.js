import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import logo from '../../components/images/first.png'

import swal from 'sweetalert'
const Reset  = ()=>{
      const history = useHistory()
      const [email,setEmail] = useState("")
    
      const PostData = ()=>{

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            // M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            swal("Provide valid email") 
            return
        }
        fetch("/reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
            const html = data.error
            swal({
                title:"OOPS",
                icon : "warning",
                text:html
            })
           
           }
           else{
             
                // const name=state.name
            swal({
                title:"  PhotoGraphyContest !",
                icon : "success",
                text:"Check your Email"
            }) 
            history.push('/login')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
          <img src={logo} alt="" style={{height: "55px"}}/>
           <span id="login-logo" style={{fontSize:"2.1rem", color: "#74d14c", float: "right"}}>PhotoGraphyContest</span>
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            
            <button type="submit" className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
       
            >
                Reset Password
            </button>
            <h5>
                <Link to="/login">Remember password?</Link>
            </h5>
            
    
        </div>
      </div>
   )
}


export default Reset