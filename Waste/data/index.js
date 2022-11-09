import React, {useState, useEffect} from 'react'
import {createNote} from '../../utils/NoteFnc'
import Card from '../../components/Card'
import {useRouter} from 'next/router'

function Index(props) {
  const data = props.data
  const [form, setForm] = useState({title: '', description: ''})
  const router = useRouter()
  const [Success, setSuccess] = useState(false)
  const handleSubmit = (e) => {
    e?.preventDefault()
    const success = createNote(form)
    success?.then((value) => {
      setSuccess(value)
      router.reload(window.location.pathname)
    })
  }
  return (
    <div className="flex flex-row flex-wrap justify-start bg-slate-900">
      <main className="flex  flex-col w-[30vw] justify-center bg-slate-900 items-center">
        <div className="flex  top-32 right-40 flex-wrap flex-col m-1">
          <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <h1 className="flex text-2xl mb-5 items-center justify-center text-gray-100">
                <svg className="w-6 h-6 inline mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Create Note {Success}
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
                  onChange={(e) => {
                    setForm({...form, [e?.target?.name]: e?.target?.value})
                  }}
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
                  onChange={(e) => {
                    setForm({...form, [e?.target?.name]: e?.target?.value})
                  }}
                  className="w-full bg-slate-800 shadow-xl rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
              </div>
              <button className="text-white shadow-xl type='submit' bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Create Note</button>
            </form>
          </div>
        </div>
      </main>{' '}
      <main className="flex  justify-center h-screen flex-col min-w-[70vw] bg-slate-900 ">
        <div className="flex justify-center p-5 space-x-10 items-end h-[30vh] w-70vw">
          <h1 className="text-gray-200 font-bold text-4xl">
            <svg className="w-9 h-9 inline mb-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                clipRule="evenodd"
              />
            </svg>
            All Notes
          </h1>
        </div>
      </main>
    </div>
  )
}

export default Index
export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/notes`)
  const data = await res.json()
  return {
    props: data, // will be passed to the page component as props
  }
}
