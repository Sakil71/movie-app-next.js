/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import React from 'react'

const Pagination = ({setPage, page, totalPage} : any) => {
    return (
        <div>
            <div className="flex mb-4 items-center">
                <button onClick={() => setPage((prevPage: any) => Math.max(prevPage - 1, 1))} className="cursor-pointer bg-gray-300 text-gray-700 px-4 py-1 rounded-s-sm disabled:opacity-50 disabled:cursor-default" disabled={page === 1}>
                    <ChevronLeftIcon className="w-8 h-6" />
                </button>

                <p className="bg-gray-200 text-gray-800 px-4 py-1 font-medium">{page}/{totalPage}</p>


                <button onClick={() => setPage((prevPage: any) => Math.min(prevPage + 1, totalPage))} className="cursor-pointer bg-gray-300 text-gray-700 px-4 py-1 rounded-e-sm disabled:opacity-50 disabled:cursor-default" disabled={page === totalPage || totalPage === 0}>
                    <ChevronRightIcon className="w-8 h-6" />
                </button>
            </div>
        </div>
    )
}

export default Pagination;