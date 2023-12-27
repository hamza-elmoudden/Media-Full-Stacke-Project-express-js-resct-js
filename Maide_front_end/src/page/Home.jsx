import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faVideo,faImage,faInbox} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';

import { useState,useEffect } from "react"
import Swal from 'sweetalert2';
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import Nav from "../component/Nav"
import AddPost from "../component/AddPost"
import GetUSer from "../component/GetUSer"
import GetPost from "../component/GetPost";
import "./Home.css"


const Home = () => {
  const Navigate = useNavigate()
  const [data,setdata] = useState([])
  const [dataPost,setdataPost] = useState([])


  function switeAlrte(title,text,icone ){
      return Swal.fire({
         title: `${title}`,
         text: `${text}`,
         icon: `${icone}`,
         confirmButtonText: 'OK'
       });
     }
     



async function GetUser(){
      try {
          const response = await fetch('http://127.0.0.1:3032/User', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'autorisation':Cookies.get("autorisation"),
            },
          });

          const responseData = await response.json();
          

          if(responseData.error){

           return switeAlrte('Error in Data!',responseData.error,'error')

          }

          if(responseData.message){

            return switeAlrte('Rowing Email OR Password!',responseData.message,'error')

          }
          
          setdata(responseData.data)

        } catch (error) {

          console.error(error);

        }
  }

async function GetallPost(){
    try {
        const response = await fetch('http://127.0.0.1:3032/Post', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'autorisation':Cookies.get("autorisation"),
              },
            });

            const responseData = await response.json();

            if(responseData.error){
             return switeAlrte('Error in Data!',responseData.error,'error')
            }

            setdataPost(responseData.data)
        
    } catch (error) {
        console.error(error)
    }
}

useEffect(()=>{
    GetUser()
    GetallPost()
  },[])


  console.log(dataPost)

  return (
    <section >
        <Nav/>
        <div className="screne flex">
          <div className="w-1/4 p-10 space-y-10">
              <h1 className=" border-b-2 pb-2 block text-2xl font-bold text-center uppercase text-blue-700 tracking-wide">Follow</h1>
              <div className="space-y-5">
                {
                  data.map((user)=>{
                    return <GetUSer user={user}/>
                  })
                }
              </div>
          </div>
          <div className="w-1/2 border border-spacing-2 p-10 space-y-3 overflow-y-auto">
            <AddPost/>
            <div className="space-y-10">
            {
              dataPost.map((post)=>{
                return <GetPost post={post} className="space-y-10"/>
              })
            }
            </div>
          </div>
          <div className="w-1/4">
            <div className="text-end  border-b-4">
              <Link className="text-3xl font-bold text-blue-600 flex justify-end items-center">Home
              <FontAwesomeIcon icon={faHouse} className="md:hover:-translate-y-2 md:hover:shadow-lg p-4 md:rounded-md" style={{ height:"28px",  color:"blue"}} /></Link>
            </div>
            <div className="text-end border-b-4">
              <Link className="text-3xl font-bold text-blue-600 flex justify-end items-center">Video
                <FontAwesomeIcon icon={faVideo} className="md:hover:-translate-y-2 md:hover:shadow-lg p-4 md:rounded-md" style={{ height:"28px",  color:"blue"}} /></Link>
            </div>
            <div className="text-end border-b-4">
              <Link className="text-3xl font-bold text-blue-600 flex justify-end items-center">Image
              <FontAwesomeIcon icon={faImage} className="md:hover:-translate-y-2 md:hover:shadow-lg p-4 md:rounded-md" style={{ height:"28px",  color:"blue"}} /></Link>
            </div>
            <div className="text-end border-b-4">
              <Link className="text-3xl font-bold text-blue-600 flex justify-end items-center">inbox
              <FontAwesomeIcon icon={faInbox} className="md:hover:-translate-y-2 md:hover:shadow-lg p-4 md:rounded-md" style={{ height:"28px",  color:"blue"}} /></Link>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Home