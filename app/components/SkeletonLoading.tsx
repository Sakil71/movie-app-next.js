import React from 'react'

const SkeletonLoading = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
            {
                Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className='w-full bg-gray-200 rounded-md shadow-md animate-pulse overflow-hidden'>
                        <div className="h-72 bg-gray-300"></div>
                        <div className='p-4'>
                            <div className='h-4 bg-gray-300 w-3/4 mb-2'></div>
                            <div className='h-3 bg-gray-300 w-1/2 mb-2'></div>
                            <div className='h-3 bg-gray-300 w-1/2'></div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default SkeletonLoading