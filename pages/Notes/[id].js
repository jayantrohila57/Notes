import React, {useState, useEffect} from 'react'
import useSWR from 'swr'
import {useRouter} from 'next/router'
import {motion} from 'framer-motion'
const variants = {
  hidden: {opacity: 0, x: 0, y: 200},
  enter: {opacity: 1, x: 0, y: 0},
  exit: {opacity: 0, x: 0, y: -300},
}
function Index(props) {
  const data = props.data
  console.log(data)
  const [form, setForm] = useState({title: data?.title, description: data?.description})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [Loader, setLoader] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  const router = useRouter()
  useEffect(
    () => {
      if (!data) {
        router.push('/Notes')
      }
    },
    [],
    [data]
  )
  useEffect(() => {
    if (isDelete === true) {
      handleDelete()
    } else {
      setIsDelete(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete])
  useEffect(() => {
    if (isSubmitting === true) {
      editNote()
      setIsSubmitting(false)
    } else {
      setIsSubmitting(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting, Loader])
  const editNote = async () => {
    setLoader(true)
    const {id} = router.query
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      setTimeout(() => {
        setLoader(false)
        router.reload(window.location.pathname)
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  //------Setup submit note----------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
  }
  //------fetch  note by id----------------------------------------------------------
  const handleDelete = async () => {
    setIsDelete(true)
    const {id} = router.query
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/notes/${id}`, {
        method: 'Delete',
      })
      setTimeout(() => {
        router.push('/Notes')
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }
  //----------------------------------------------------------------
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
      <section className="text-gray-600 bg-slate-900 h-screen flex body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-start">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-5">
            <div className="flex justify-center p-5 space-x-10 items-start h-[20vh] w-70vw">
              <h1 className="text-gray-200 font-bold text-4xl">
                <svg className="w-9 h-9 inline mb-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Manage Note
              </h1>
            </div>

            <div className="block p-5 max-w-2xl h-[40vh] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              {data ? (
                <div>
                  <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{data?.title}</h5>
                  <p className="font-normal text-xl text-gray-700 dark:text-gray-400">{data?.description}</p>
                </div>
              ) : (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
            <div>
              {isDelete === true ? (
                <button
                  disabled
                  type="button"
                  className="text-white my-2 shadow-xl type='submit' bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
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
                  Deleting...
                </button>
              ) : (
                <button onClick={handleDelete} class="text-white my-2 bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
                  <svg className="inline mr-1 w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>{' '}
                  Delete
                </button>
              )}
            </div>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-slate-900 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <div className="flex  top-32 right-40 flex-wrap flex-col m-1">
              <div className="flex flex-col">
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <h1 className="flex text-2xl mb-5 items-center justify-start text-gray-100">
                    <svg className="w-6 h-6 inline mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit Note
                  </h1>
                  <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-400">
                      Title
                    </label>
                    <input
                      type="title"
                      required
                      id="title"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full shadow-xl bg-slate-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative mb-4">
                    <label htmlFor="message" className="leading-7 text-sm text-gray-400">
                      Description
                    </label>
                    <textarea
                      id="description"
                      required
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full bg-slate-800 shadow-xl rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                  </div>
                  {Loader === true ? (
                    <button
                      disabled
                      type="button"
                      className="text-white shadow-xl type='submit' bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
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
                      Updating...
                    </button>
                  ) : (
                    <button className="text-white shadow-xl type='submit' bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                      Update Note
                    </button>
                  )}
                </form>
              </div>
            </div>{' '}
          </div>
        </div>
      </section>
    </motion.main>
  )
}

export default Index
export async function getServerSideProps({query: {id}}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/notes/${id}`)
  const data = await res.json()
  return {
    props: data, // will be passed to the page component as props
  }
}
