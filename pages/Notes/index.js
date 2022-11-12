import React, {useState, useEffect} from 'react'
import {createNote} from '../../utils/NoteFnc'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {motion} from 'framer-motion'

function Notes(props) {
  const [Open, setOpen] = useState(false)
  const data = props.data
  const [form, setForm] = useState({title: '', description: ''})
  const router = useRouter()
  const [Loader, setLoader] = useState(false)
  const [Success, setSuccess] = useState(false)
  const variants = {
    open: {opacity: 1, x: 0},
    closed: {opacity: 1, x: 0},
    hidden: {opacity: 0, x: 0, y: 800},
    enter: {opacity: 1, x: 0, y: 0},
    exit: {opacity: 0, x: 0, y: -800},
  }
  const handleSubmit = (e) => {
    e?.preventDefault()
    setLoader(true)
    const success = createNote(form)
    success?.then((value) => {
      setSuccess(value)
      router.reload(window.location.pathname)
    })
  }
  return (
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{
        type: 'spring',
        stiffness: 80,
        duration: 0.2,
      }}>
      <div className="bg-black text-white relative">
        <div className="relative overflow-hidden h-screen ">
          <div className="flex justify-between px-5 items-center h-20">
            <Link href={`/`}>
              <h1 className="title-font sm:text-4xl text-4xl font-bold text-white">
                <svg className="w-9 h-9 mb-2  text-blue-500 inline" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Notes
              </h1>
            </Link>
            <div className="border-gray-800 bg-blue-900 bg-opacity-20 p-2 text-gray-500 rounded-xl border m-2 text-xl ">
              Total Notes<p className="inline text-blue-500 font-bold"> {data.length}</p>
            </div>
          </div>
          <div className="h-screen scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-300 overflow-y-scroll  dark:scrollbar-thumb-blue-900 dark:scrollbar-track-black">
            <div className="flex justify-end items-center md:flex-wrap md:flex-row-reverse flex-col-reverse">
              {data?.map((note, index) => {
                return (
                  <Link key={index} href={`/Notes/${note?._id}`}>
                    <div className="m-2 p-2 relative">
                      <div className="p-5 h-72 w-72 bg-blue-900  rounded-3xl ">
                        <h5 className="mb-2 text-3xl break-words leading-10 font-bold tracking-tight text-gray-900 dark:text-white">{note?.title}</h5>
                        <p className="font-thin text-xl break-words leading-6 text-gray-700 dark:text-gray-100">{note?.description}</p>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <svg className="w-12 h-12 text-blue-500 -rotate-45" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
            <div className="h-40"></div>
          </div>
        </div>
        <div className={Open === true ? 'top-0 z-10 absolute h-screen w-full duration-700 backdrop-blur-md' : 'duration-700 backdrop-blur-none'}>
          <div className="absolute bottom-10 right-2">
            <motion.div
              layout
              animate={Open === false ? 'open' : 'closed'}
              variants={variants}
              transition={{type: 'spring', stiffness: 80, duration: 0.4}}
              className={
                Open === false
                  ? 'text-white absolute z-20 bottom-10 right-0 bg-gray-900 transition-all focus:ring-4 h-14 w-14 duration-700  focus:outline-none focus:ring-gray-300 font-medium rounded-3xl text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-900  dark:focus:ring-gray-800'
                  : 'text-white absolute z-20 bottom-10 right-0 overflow-hidden  transition-all bg-gray-900 duration-700 font-medium rounded-3xl  h-[80vh] w-80 text-sm p-1 text-center inline-flex items-center mr-2 '
              }>
              <div className="absolute duration-300  top-10 flex shadow-2xl pr-4  w-80  m-1 justify-start flex-col">
                <form onSubmit={handleSubmit} className={Open === false ? 'hidden  ml-2 flex-col' : 'overflow-hidden flex ml-2 flex-col'}>
                  <h1 className="flex text-2xl mb-5 items-center duration-500 justify-center text-gray-100">Create Note</h1>
                  <div className="relative mb-4">
                    <input
                      type="title"
                      required
                      placeholder="Title"
                      id="title"
                      name="title"
                      onChange={(e) => {
                        setForm({...form, [e?.target?.name]: e?.target?.value})
                      }}
                      className="w-full shadow-xl  bg-slate-800 rounded-xl border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-500 ease-in-out"
                    />
                  </div>
                  <div className="relative mb-4">
                    <textarea
                      id="description"
                      placeholder="Description"
                      required
                      name="description"
                      onChange={(e) => {
                        setForm({...form, [e?.target?.name]: e?.target?.value})
                      }}
                      className="w-full bg-slate-800 shadow-xl rounded-xl border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  {Loader === true ? (
                    <button
                      disabled
                      type="button"
                      className="text-white shadow-xl type='submit' bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
                      <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Loading...
                    </button>
                  ) : (
                    <button
                      className={
                        Open === true
                          ? "text-white shadow-xl type='submit' bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-xl text-lg"
                          : 'duration-300 border-gray-900 hidden bg-gray-900 border-0 text-xs text-gray-900'
                      }>
                      Create Note
                    </button>
                  )}
                </form>
              </div>

              <div className="absolute bottom-1 right-2">
                {Open === false ? (
                  <button
                    onClick={() => {
                      setOpen(true)
                    }}
                    type="button">
                    {' '}
                    <svg className="w-10 h-10 text-gray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(false)
                    }}
                    type="button">
                    <svg className="w-10 h-10 text-gray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
        <div className="fixed bottom-0 flex p-2 bg-black w-full items-center justify-center">
          <p className="text-xs font-thin text-gray-500   sm:border-gray-200 ">
            Copyright © 2020 Notes —
            <a href="https://twitter.com/jayant_rohila" className="text-gray-500 ml-1" rel="noopener noreferrer" target="_blank">
              @jayantrohila57
            </a>
          </p>
        </div>
      </div>{' '}
    </motion.main>
  )
}

export default Notes
export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/notes`)
  const data = await res.json()
  return {
    props: data, // will be passed to the page component as props
  }
}
