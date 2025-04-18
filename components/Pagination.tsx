import React from "react"

export function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: {
  currentPage: number
  setCurrentPage: (value: number | ((prev: number) => number)) => void
  totalPages: number
}) {
  return (
    <div className='flex items-center justify-between mt-4'>
      <button
        onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-secondary text-white hover:bg-secondary-dark cursor-pointer"
        }`}
      >
        Précédent
      </button>

      <div className='flex space-x-1'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-full ${
              currentPage === page
                ? "bg-secondary text-white "
                : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-secondary text-white hover:bg-secondary-dark cursor-pointer"
        }`}
      >
        Suivant
      </button>
    </div>
  )
}
