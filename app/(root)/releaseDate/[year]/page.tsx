/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Pagination from '@/app/components/Pagination';
import Loading from '@/app/loading';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ReleaseDate = () => {
    const { year } = useParams();
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    const api_url = process.env.NEXT_PUBLIC_API_URL;

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [releaseData, setReleaseData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


    const fetchReleaseData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${api_url}/discover/movie?api_key=${api_key}&sort_by=&primary_release_year=${year}&page=${page}`);
            const data = await res.json();
            setReleaseData(data.results);
            setTotalPage(data?.total_pages);
        }
        catch (error: any) {
            console.log(error);
            setError(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchReleaseData();
    }, [year, page])

    const redirectToDetails = (id: number) => {
        router.push(`/singleDetail/${id}`);
    }

    if (isLoading) return <p className='text-center'><Loading /></p>;
    if (error) return <p className='text-center text-red-500'>{error}</p>;
    if (!releaseData || releaseData.length === 0) {
        return <p className='text-center text-red-500'>No movie data found</p>;
    }





    return (
        <div>
            <div className='flex justify-between my-5'>
                <div className="flex gap-2 items-center">
                    <div className="bg-blue-800 h-6 w-[3px]"></div>
                    <p className="font-bold">{year}</p>
                </div>
                <div className="flex justify-center">
                    <Pagination
                        setPage={setPage}
                        totalPage={totalPage}
                        page={page}
                    ></Pagination>
                </div>
                <div></div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {
                    releaseData?.map((yearData: any, index: number) => (
                        <div onClick={() => redirectToDetails(yearData?.id)} key={index} className="bg-gray-800 text-white rounded-md shadow-md overflow-hidden cursor-pointer">
                            <div className="relative w-full h-[250px]">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${yearData.poster_path}`}
                                    alt={yearData.title}
                                    fill
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-md font-bold truncate">{yearData.title}</h1>
                                    <p className="text-sm opacity-50">{yearData?.release_date?.slice(0, 4)}</p>
                                </div>
                                <div className="flex items-center gap-1 mt-2">
                                    <StarIcon className="h-5 w-5 text-yellow-400" />
                                    <span className="text-sm">{yearData.vote_average.toFixed(1)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="flex justify-center mt-10">
                <Pagination
                    setPage={setPage}
                    totalPage={totalPage}
                    page={page}
                ></Pagination>
            </div>
        </div>
    );
}

export default ReleaseDate;