import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Moviecard = ({ allMovies }: any) => {
    const router = useRouter();
    const redirectToDetails = (id: number) => {
        router.push(`/singleDetail/${id}`);
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                allMovies?.results?.map((movie: any, index: number) => (
                    <div onClick={() => redirectToDetails(movie?.id)} key={index} className="bg-gray-800 text-white rounded-md shadow-md overflow-hidden cursor-pointer">
                        <div className="relative w-full h-[250px]">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                fill
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                                <h1 className="text-md font-bold truncate">{movie.title}</h1>
                                <p className="text-sm opacity-50">{movie?.release_date?.slice(0, 4)}</p>
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                                <StarIcon className="h-5 w-5 text-yellow-400" />
                                <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Moviecard;
