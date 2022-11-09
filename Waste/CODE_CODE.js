{
  data?.map((note, index) => {
    return <Card key={index} title={note?.title} id={note?._id} dec={note?.description} />
  })
}

;<motion.div
  layout
  animate={Open === false ? 'open' : 'closed'}
  variants={variants}
  transition={{type: 'spring', stiffness: 80, duration: 0.2}}
  className={
    Open === false
      ? 'text-white bg-indigo-500 transition-all hover:bg-indigo-800 focus:ring-4 	duration-1000 focus:outline-none focus:ring-indigo-300 font-medium rounded-3xl text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800'
      : 'text-white relative transition-all bg-indigo-500 	duration-1000 font-medium rounded-3xl  h-[70vh]  w-80 text-sm p-1.5 text-center inline-flex items-center mr-2 '
  }>
  {Open === false ? (
    <button
      onClick={() => {
        setOpen(true)
      }}
      type="button">
      {' '}
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
      </svg>
    </button>
  ) : (
    <button
      className="absolute bottom-2 right-0.5"
      onClick={() => {
        setOpen(false)
      }}
      type="button">
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  )}
</motion.div>
