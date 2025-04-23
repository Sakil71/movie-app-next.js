/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'

const FilterMovie = ({ setCategory, setModalOpen, setSelectedLanguages, setLanguageName }: any) => {
    const [languages, setLanguages] = useState<any[]>([]);
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    const api_url = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const res = await fetch(`${api_url}/configuration/languages?api_key=${api_key}`);
                const data = await res.json();
                setLanguages(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLanguages();
    }, []);


    return (
        <div className='bg-zinc-600 p-4 rounded-md pb-10'>
            <div className='flex justify-between mb-5'>
                <h1 className='text-xl font-bold'>Filter</h1>
                <button
                    type="button"
                    className='cursor-pointer bg-red-600 px-2'
                    onClick={() => setModalOpen(false)}
                >
                    X
                </button>
            </div>
            <div className='flex flex-col mb-4'>
                <small className='mb-2'>Category</small>
                <select onChange={(e) => {
                    setCategory(e.target.value);
                    setModalOpen(false);
                }}
                    className="border rounded-sm px-4 py-1" >
                    <option className="text-black" value="popular">Popular</option>
                    <option className="text-black" value="top_rated">Top rated</option>
                    <option className="text-black" value="upcoming">Upcoming</option>
                </select>
            </div>

            <div className='flex flex-col'>
                <small className='mb-2'>Language</small>
                <select
                    onChange={(e) => {
                        const selected = languages.find(lang => lang.iso_639_1 === e.target.value);
                        setSelectedLanguages(e.target.value);
                        if (selected) setLanguageName(selected.english_name);
                        setModalOpen(false);
                    }}
                    className="border rounded-sm px-4 py-1">
                    {
                        languages?.map((lang) => (
                            <option onClick={() => setLanguageName(lang?.english_name)} key={lang.iso_639_1} className="text-black" value={lang.iso_639_1}>
                                {lang.english_name}
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
};

export default FilterMovie;
