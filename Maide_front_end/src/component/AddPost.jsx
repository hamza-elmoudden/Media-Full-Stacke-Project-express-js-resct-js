import { useState } from "react"
import Swal from 'sweetalert2';
import Cookies from "js-cookie"


const AddPost = () => {
    const [formdata,setformdata] = useState({
        content:""
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
            content:formdata.content,
        }

        try {
            const response = await fetch('http://127.0.0.1:3032/Post', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'autorisation':Cookies.get("autorisation"),
              },
              body: JSON.stringify(data)
            });
            const responseData = await response.json();

            if(responseData.error){
             return switeAlrte('Error in Data!',responseData.error,'error')
            }
  
            if(responseData.Creat_Post){
  
              return switeAlrte('Post  Add ',responseData.Creat_Post._id,'success')
            }

            
  
          } catch (error) {
            console.error(error);
          }
    }
  return (
   <>
    <form action="Post" className="space-y-3 pb-6 border-b-2" onSubmit={HandelSubmit}>
        <label htmlFor="content" className="text-2xl font-bold block uppercase text-blue-900">Post</label>
            <div class="mt-4">
            <textarea placeholder="Add You Post Here" class="w-full rounded-md border-gray-700 px-2 py-1 h-48" id="story-output" onChange={Handelform} name="content" value={formdata.content}></textarea>
            </div>        
            <div className="space-x-4 block text-end">
            <button className="ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 inline-flex items-center justify-center px-6 py-2 border-0 rounded-full text-sm font-medium text-white bg-gradient-to-l from-blue-500 to-purple-600 shadow-lg hover:from-purple-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="Submit">ADD</button>
            <button className="ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 inline-flex items-center justify-center px-6 py-2 border-0 rounded-full text-sm font-medium text-white bg-gradient-to-l from-blue-500 to-purple-600 shadow-lg hover:from-purple-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">CLEAN</button>
        </div>
    </form>
   </>
  )
}

export default AddPost