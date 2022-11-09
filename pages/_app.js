import '../styles/globals.css'
import {AnimatePresence} from 'framer-motion'

function MyApp({Component, pageProps}) {
  return (
    <AnimatePresence exitBeforeEnter initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <div className="h-[100vh] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 overflow-y-scroll dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
        <div className="bg-slate-900">
          <Component {...pageProps} />
        </div>
      </div>
    </AnimatePresence>
  )
}

export default MyApp
