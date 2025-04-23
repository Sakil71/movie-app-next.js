/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SideNav = () => {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    const url = process.env.NEXT_PUBLIC_API_URL;
    const [genres, setGenres] = useState<any[]>([]);
    const [visibleYears, setVisibleYears] = useState(6);

    const router = useRouter();

    const fetchGenres = async () => {
        try {
            const res = await fetch(`${url}/genre/movie/list?api_key=${api_key}&language=en-US`);
            const data = await res.json();
            setGenres(data.genres);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    const handleGenreData = (id: number, name: string) => {
        router.push(`/genreData/${id}?name=${encodeURIComponent(name)}`);
    };
    const handleReleaseDateData = (year: number) => {
        router.push(`/releaseDate/${year}`);
    };

    const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 2025 - i);


    useEffect(() => {
        fetchGenres();
    }, []);

    return (
        <div className='px-4 mt-20'>
            <div className='mb-5'>
                <h1 className='text-xl font-bold mb-4'>Genres</h1>
                <ul className='space-y-2 flex flex-wrap gap-2'>
                    {
                        genres.map((gen: any) => (
                            <li key={gen.id}>
                                <button onClick={() => handleGenreData(gen.id, gen.name)} className='bg-zinc-700 py-1 text-xs px-4 truncate cursor-pointer'>
                                    {gen.name}
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div>
                <h1 className='text-xl font-bold mb-4'>Release Date</h1>
                <ul className='space-y-2 flex flex-wrap gap-2'>
                    {
                        years.slice(0, visibleYears).map((year: number) => (
                            <li key={year}>
                                <button onClick={() => handleReleaseDateData(year)} className='bg-zinc-700 py-1 text-xs px-4 truncate cursor-pointer'>
                                    {year}
                                </button>
                            </li>
                        ))
                    }
                </ul>

                {visibleYears < years.length && (
                    <button
                        onClick={() => setVisibleYears(prev => prev + 6)}
                        className="mt-3 text-sm text-blue-400 hover:underline"
                    >
                        See more
                    </button>
                )}
            </div>

        </div>
    )
}

export default SideNav;