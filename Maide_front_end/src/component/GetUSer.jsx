


const GetUSer = (props) => {
   const {user}  =props
  return (
    <>
    <section className="flex space-x-6 items-center" key={user._id}>
        <div >
            <img src="https://picsum.photos/id/237/200/300" alt="" className="rounded-full w-14 h-14"/>
        </div>
        <div>
            <h1 className="line-clamp-1 font-bold text-xl uppercase">{user.Username}</h1>
        </div>
        <div>
            <button class="bg-purple-500 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none">Follow</button>
        </div>
    </section>
    </>
  )
}

export default GetUSer