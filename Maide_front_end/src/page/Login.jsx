import Forme from "../component/Forme"



const Login = () => {
  return (
    <>
    <section className="h-screen flex flex-col md:flex-row p-6 min-h-screen justify-center items-center bg-slate-200">
        <div className="w-1/2 flex justify-center ">
            <div className="space-y-8 md:block hidden">
                <div>
                    <img className="rounded-lg shadow-xl hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-300" src="https://picsum.photos/500/300/?blur" alt="" />
                </div>
                <h1 className="text-blue-800 font-bold text-4xl w-fit line-clamp-2 uppercase max-w-full hover:text-blue-300 hover:cursor-pointer">Title of page</h1>
                <p className="line-clamp-4 text-sm opacity-80  text-blue-950 font-bold max-w-full capitalize">descripton of page</p>
            </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
            <Forme/>
        </div>
    </section>
    </>
  )
}

export default Login