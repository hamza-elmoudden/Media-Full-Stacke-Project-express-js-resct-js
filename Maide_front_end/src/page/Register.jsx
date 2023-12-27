import { useState } from "react"
import Swal from 'sweetalert2';
import "./Register.css"
import { Link } from "react-router-dom"


const  Register = () => {
  const [formdata,setformedata] = useState({
    name:"",
    Username:"",
    email:"",
    password:""
    
  })

  function Handelform(e){
    setformedata({
      ...formdata,[e.target.name]:e.target.value
    })
  }

  function switeAlrte(title,text,icone ){
    return Swal.fire({
       title: `${title}`,
       text: `${text}`,
       icon: `${icone}`,
       confirmButtonText: 'OK'
     });
   }

  const HandelSubmit = async (e)=>{
    e.preventDefault()
    const data = {
      name:formdata.name,
      Username:formdata.Username,
      email:formdata.email,
      password:formdata.password,
    }
    try {
      const response = await fetch('http://127.0.0.1:3032/User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();

      console.log(responseData.data)
      if(responseData.token){
        return switeAlrte('Register',responseData.message,'success')
      }

      if(responseData.error){
       return switeAlrte('Error in Data!',responseData.error,'error')
      }

      if(responseData.data._id){
        return switeAlrte('Register OK',responseData.data._id,'success')
      }

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
    <section className="h-screen min-h-screen flex justify-center items-center p-10 bg-slate-200">
            <div>
              
            <form className="form" onSubmit={HandelSubmit}>
                <p className="title">Register </p>
                <p className="message">Signup now and get full access to our app. </p>
            <div className="flex">

          <label>
                <input className="input" type="text" placeholder="" required="" name="name" value={formdata.name} onChange={Handelform}/>
                <span>Name</span>
            </label>

             <label>
                  <input className="input" type="text" placeholder="" required="" name="Username" value={formdata.Username} onChange={Handelform}/>
                  <span>Username</span>
              </label>
            </div>  
            
              <label>
                  <input className="input" type="email" placeholder="" required="" name="email" value={formdata.email} onChange={Handelform}/>
                  <span>Email</span>
              </label> 
        
             <label>
                 <input className="input" type="password" placeholder="" required="" name="password" value={formdata.password} onChange={Handelform}/>
                 <span>Password</span>
            </label>
                <button className="submit">Submit</button>
                <p className="signin">Already have an acount ? <Link to="/">Signin</Link> </p>
              </form>
            </div>
    </section>
    </>
  )
}

export default  Register