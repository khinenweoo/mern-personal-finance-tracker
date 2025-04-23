
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
                    absolute w-full transition duration-200 ease-in-out shadow-lg sm:rounded-lg sm:max-w-[650px] my-4
                    ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
                `}

            >
                <div className="mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-6 bg-white shadow-md rounded border border-gray-400 text-left">
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