import Link from 'next/link'
import React from 'react'

function Card({title, dec, id}) {
  return (
    <Link href={`/Notes/${id}`}>
      <div className="m-2">
        <div className="pl-4 h-full flex border shadow-lg bg-slate-800 border-gray-700 rounded-lg p-2 items-start">
          <div className="flex-grow ">
            <div className="flex flex-row text-gray-400 hover:text-indigo-500 justify-between">
              <h1 className="title-font text-xl font-medium text-gray-200 mb-3">{title}</h1>
            </div>
            <p className="leading-relaxed text-gray-400 ">{dec}</p>
          </div>
          <svg className="w-6 h-6 text-gray-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default Card
