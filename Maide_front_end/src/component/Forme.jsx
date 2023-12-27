import { useState } from "react"
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"



const Forme = () => {
    const Naviger = useNavigate()

    const [formdata,setformdata] = useState({
        email:'',
        password:''
    })

    function Handelform(e){
        setformdata({
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

          email:formdata.email,
          password:formdata.password,

        }

        try {

          const response = await fetch('http://127.0.0.1:3032/User/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          const responseData = await response.json();

          if(responseData.token){
            Cookies.set("autorisation",responseData.token,{ expires: 1 })

            setTimeout(()=>{
              Naviger("/Home")
            },1000)

            return switeAlrte('LOGIN',responseData.message,'success')

            }

          if(responseData.error){
           return switeAlrte('Error in Data!',responseData.error,'error')
          }

          if(responseData.message){

            return switeAlrte('Rowing Email OR Password!',responseData.message,'error')
          }

        } catch (error) {
          console.error(error);
        }
      }

  return (
    <>
    <form action="Post" onSubmit={HandelSubmit} className="w-1/2">
    <div
  className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
  <div
    className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
    <h3
      className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
      Sign In
    </h3>
  </div>
  <div className="flex flex-col gap-4 p-6">
    <div className="relative h-11 w-full min-w-[200px]">
      <input
        placeholder=""
        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        name="email"
        value={formdata.email}
        onChange={Handelform}
        />
      <label
        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
        
        >
        Email
      </label>
    </div>
    <div className="relative h-11 w-full min-w-[200px]">
      <input
        placeholder=""
        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        value={formdata.password}
        name="password"
        onChange={Handelform}
        />
      <label
        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
        >
        Password
      </label>
    </div>
    <div className="-ml-2.5">
      <div className="inline-flex items-center">
      </div>
    </div>
  </div>
  <div className="p-6 pt-0">
    <button
      data-ripple-light="true"
      type="Submit"
      className="block w-full select-none rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
      Sign In
    </button>
    <p
      className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased"
    >
      Don't have an account?
      <Link
        className="ml-1 block font-sans text-sm font-bold leading-normal text-cyan-500 antialiased"
        to="/Register"
      >
        Register
      </Link>
    </p>
        </div>
        </div>

    </form>
    </>
  )
}

export default Forme