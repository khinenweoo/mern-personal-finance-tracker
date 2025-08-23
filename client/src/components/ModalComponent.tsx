
const ModalComponent: React.FC<{ open: boolean; onClose: () => void; children: React.ReactNode}> = ({ open, onClose, children}) => {
  return (

        <div 
            onClick={onClose}
            className={`
                fixed inset-0 flex z-50 justify-center items-center
                transition-colors
                ${open ? "visible bg-black/80" : "invisible"}
            `}
        > {/* backdrop */}

            {/* modal */}
            <div 
                onClick={(e) => e.stopPropagation()} 
                className={`
                    absolute w-full transition duration-300 ease-in shadow-lg sm:rounded-lg sm:max-w-[650px] my-4
                    ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
                `}

            >
              <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                        {children}
                        <button
                            onClick={onClose}
                            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-950 hover:text-gray-600 transition duration-150 ease-in-out focus:outline-none" aria-label="close modal" role="button">
                            <i className='bx bx-x text-xl'></i>
                        </button>
                    </div>
                </div>

            </div>
        </div>


  )
}

export default ModalComponent