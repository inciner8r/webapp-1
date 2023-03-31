import React from 'react'

const Footer = () => {
  return (
    <div className="mt-10 pt-3 sm:pt-3 lg:pt-3 bg-black">
      <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-center border-t pt-6">
          <nav className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start md:gap-6">
            <a href="/" className="text-2xl font-bold text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400">Netsepio</a>
          </nav>
          <nav className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start md:gap-6">
            <a href="https://chrome.google.com/webstore/detail/netsepio/bbkfclgnbddljhepbfpongcollhocghd" className="text-green-200 transition duration-100 hover:text-teal-800 active:text-teal-700">Extension</a>
            <a href="https://github.com/NetSepio" className="text-green-200 transition duration-100 hover:text-teal-800 active:text-teal-700">Collaborate</a>
          </nav>
    
          <div className="flex gap-4">
            <a href="https://github.com/NetSepio" target="_blank" rel="noreferrer" className="text-green-200 transition duration-100 hover:text-green-400 active:text-green-600">
              <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.25 3.438 9.688 8.205 11.266.6.111.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.204.084 1.838 1.236 1.838 1.236 1.07 1.836 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.306-.54-1.527.105-3.18 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.874.12 3.18.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.21.69.825.57C20.565 21.684 24 17.25 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
    
            <a href="https://twitter.com/NetSepio" target="_blank" rel="noreferrer" className="text-green-200 transition duration-100 hover:text-green-400 active:text-green-600">
              <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
    
            <a href="https://www.linkedin.com/company/lazarusnetwork/mycompany/" target="_blank" rel="noreferrer" className="text-green-200 transition duration-100 hover:text-green-400 active:text-green-600">
              <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
  
          </div>
        </div>
    
        <div className="py-5 text-center text-sm text-green-200">© 2023 - Netsepio. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default Footer
