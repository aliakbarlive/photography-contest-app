import React,{useState,useContext,} from 'react'
import {Link,useHistory, useParams} from 'react-router-dom'
import swal from 'sweetalert'
import logo from '../../components/images/first.png'

const ConfirmPassword  = ()=>{
    
    const [password,setPasword] = useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
      const history = useHistory()
     
      const {token} = useParams()
    
      const PostData = ()=>{
               if(password !==confirmPassword){
                swal({text:"Confirm Password do not match",icon: "warning"})
              
                return
            }
        
        fetch("/new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                token,
                password,
                confirmPassword
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
                text:"Login to continue"
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
           <span id="login-logo" style={{fontSize:"2.1rem", float: "right"}}>PhotoGraphyContest</span>                             
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
            
            <button type="submit" className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
       
            >
                ConfirmPassword Password
            </button>
           
            
    
        </div>
      </div>
   )
}


export default ConfirmPassword