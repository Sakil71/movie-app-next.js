/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Loading from '@/app/loading';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Genre = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const { id } = params;
    const genreName = searchParams.get('name');

    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    const api_url = process.env.NEXT_PUBLIC_API_URL;

    const [genresData, setGenresData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const router = useRouter();


    useEffect(() => {
        const fetchGenreData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${api_url}/discover/movie?api_key=${api_key}&with_genres=${id}&language=en-US&page=${page}`);
                const data = await res.json();
                setGenresData(data?.results);
                setTotalPage(data?.total_pages);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGenreData();
    }, [id, page]);

    const redirectToDetails = (id: number) => {
        router.push(`/singleDetail/${id}`);
    }

    if (isLoading) return <p className='text-center'><Loading /></p>;
    if (error) return <p className='text-center text-red-500'>{error}</p>;
    if (!genresData || genresData.length === 0) {
        return <p className='text-center text-red-500'>No movie data found</p>;
    }

    return (
        <div>
            <div className='flex justify-between my-5'>
                <div className="flex gap-2 items-center">
                    <div className="bg-blue-800 h-6 w-[3px]"></div>
                    <p className="font-bold">{genreName}</p>
                </div>
                <div className="flex justify-center">
                    <div className="flex mb-4 items-center">
                        <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} className="cursor-pointer bg-gray-300 text-gray-700 px-4 py-1 rounded-s-sm disabled:opacity-50 disabled:cursor-default" disabled={page === 1}>
                            <ChevronLeftIcon className="w-8 h-6" />
                        </button>

                        <p className="bg-gray-200 text-gray-800 px-4 py-1 font-medium">{page}/{totalPage}</p>


                        <button onClick={() => setPage(previosPage => Math.min(previosPage + 1, totalPage))} className="cursor-pointer bg-gray-300 text-gray-700 px-4 py-1 rounded-e-sm disabled:opacity-50 disabled:cursor-default" disabled={page === totalPage || totalPage === 0}>
                            <ChevronRightIcon className="w-8 h-6" />
                        </button>
                    </div>
                </div>
                <div></div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {
                    genresData?.map((genre: any, index: number) => (
                        <div onClick={() => redirectToDetails(genre?.id)} key={index} className="bg-gray-800 text-white rounded-md shadow-md overflow-hidden cursor-pointer">
                            <div className="relative w-full h-[250px]">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${genre.poster_path}`}
                                    alt={genre.title}
                                    fill
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-md font-bold truncate">{genre.title}</h1>
                                    <p className="text-sm opacity-50">{genre?.release_date?.slice(0, 4)}</p>
                                </div>
                                <div className="flex items-center gap-1 mt-2">
                                    <StarIcon className="h-5 w-5 text-yellow-400" />
                                    <span className="text-sm">{genre.vote_average.toFixed(1)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="flex justify-center mt-10">
                <div className="flex mb-4 items-center">
                    <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} className="cursor-pointer bg-gray-300 text-gray-700 px-4 py-1 rounded-s-sm disabled:opacity-50 disabled:cursor-default" disabled={page === 1}>
                        <ChevronLeftIcon className="w-8 h-6" />
                    </button>

                    <p className="bg-gray-200 text-gray-800 px-4 py-1 font-medium">{page}/{totalPage}</p>


                    <button onClick={() => setPage(previosPage => Math.min(previosPage + 1, totalPage))} className="cursor-pointer bg-gray-300 text-gray-700 px-4 py-1 rounded-e-sm disabled:opacity-50 disabled:cursor-default" disabled={page === totalPage || totalPage === 0}>
                        <ChevronRightIcon className="w-8 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Genre;
