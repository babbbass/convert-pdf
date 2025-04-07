"use client"
import { ACCOUNTANT, COSTS, INVOICE_CUSTOMER } from "@/lib/constants"

export function DocumentFilterSelect({
  filter,
  setFilter,
}: {
  filter: string
  setFilter: (
    filter: typeof ACCOUNTANT | typeof INVOICE_CUSTOMER | typeof COSTS
  ) => void
}) {
  return (
    <div className='flex justify-center gap-4 mb-6'>
      <button
        onClick={() => setFilter(ACCOUNTANT)}
        className={`px-4 py-2 rounded-2xl cursor-pointer ${
          filter === ACCOUNTANT ? "bg-secondary text-white" : "bg-gray-200"
        }`}
      >
        Tous
      </button>
      <button
        onClick={() => setFilter(INVOICE_CUSTOMER)}
        className={`px-4 py-2 rounded-2xl cursor-pointer ${
          filter === INVOICE_CUSTOMER
            ? "bg-secondary text-white"
            : "bg-gray-200"
        }`}
      >
        Factures clients
      </button>
      <button
        onClick={() => setFilter(COSTS)}
        className={`px-4 py-2 rounded-2xl cursor-pointer ${
          filter === COSTS ? "bg-secondary text-white" : "bg-gray-200"
        }`}
      >
        Dépenses
      </button>
    </div>
  )
}
