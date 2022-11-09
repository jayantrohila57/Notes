import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {motion} from 'framer-motion'
const variants = {
  hidden: {opacity: 0, x: 0, y: 0},
  enter: {opacity: 1, x: 0, y: 0},
  exit: {opacity: 0, x: 0, y: 0},
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
      <section className=" text-gray-600 bg-black min-h-screen flex flex-col body-font justify-start items-center">
        <div className="my-5 items-start">
          <Link href={`/`}>
            <h1 className="title-font sm:text-4xl text-4xl font-bold text-white">
              <svg className="w-10 h-10 mr-2 inline mb-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
              Edit Notes
            </h1>
          </Link>{' '}
        </div>
        <form onSubmit={handleSubmit} className="m-2 p-5 relative bg-gray-900 rounded-3xl">
          <div className="p-3">
            <textarea
              id="title"
              required
              placeholder="Enter Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full h-36 text-indigo-500 bg-gray-100 bg-opacity-0 rounded text-4xl break-words leading-10 font-bold tracking-tight outline-none  transition-colors duration-200 ease-in-out"
            />
            <textarea
              id="description"
              required
              placeholder="Enter Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full h-48 bg-gray-100 bg-opacity-0 rounded text-xl outline-none text-gray-100  resize-none leading-6 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="m-2">
            {' '}
            {Loader === true ? (
              <button disabled type="button" className="p-2 text-white shadow-xl  bg-indigo-500 border-0  focus:outline-none hover:bg-indigo-600 rounded-2xl text-lg">
                <svg role="status" className="inline w-10 h-10 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            ) : (
              <button className="text-white shadow-xl type='submit' bg-indigo-500 border-0 p-2 focus:outline-none hover:bg-indigo-600 rounded-2xl text-lg">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </form>{' '}
        <div className="flex flex-row">
          <Link href={'/Notes'}>
            <div className="m-4">
              <button className="text-white font-semibold shadow-xl px-3 py-2  bg-indigo-500 border-0 p-1 focus:outline-none hover:bg-indigo-600 rounded-2xl text-2xl">
                <svg className="w-8 h-8 mb-1 mr-1 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Go Back
              </button>
            </div>
          </Link>
          <div className="m-4">
            {isDelete === true ? (
              <button disabled type="button" className="p-2  px-10 text-white shadow-xl  bg-red-500 border-0  focus:outline-none hover:bg-red-600 rounded-2xl text-lg">
                <svg role="status" className="inline w-10 h-10 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleDelete}
                className="text-white font-semibold shadow-xl px-4 pt-2.5  bg-red-500 border-0 p-1 focus:outline-none hover:bg-red-600 rounded-2xl text-2xl">
                <svg className="w-8 h-8 mb-2 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
