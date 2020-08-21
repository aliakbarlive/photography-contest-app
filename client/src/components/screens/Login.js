import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import logo from '../../components/images/first.png'
import swal from 'sweetalert'
const SignIn  = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            
            swal("Provide valid email/password") 
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
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
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
              // const name=state.name
            swal({
                title:" Wellcome to PhotoGraphyContest !",
                icon : "success",
                text:"Now Create a Post"
            }) 
            history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
             
       <img src={logo} alt="" style={{height: "55px"}}/>
           <span id="login-logo" style={{fontSize:"2.1rem", float: "right", color: "#74d14c"}}>PhotoGraphyContest</span>                             
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
            <button type="submit" className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
       
            >
                Login
            </button>
            <h5>
                <Link to="/signup">Dont have an account ?</Link>
            </h5>
            <h6>
                <Link to="/reset">Forgot password ?</Link>
            </h6>
    
        </div>
      </div>
   )
}


export default SignIn