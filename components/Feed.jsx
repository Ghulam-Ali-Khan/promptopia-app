"use client";

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';
import { useDebouncedCallback } from 'use-debounce';

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {
                data.map((post) => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleTagClick={handleTagClick}
                    />
                ))
            }
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSearchChange = useDebouncedCallback(async (e) => {

        let response = [];
        if (e.target.value) {
            response = await fetch(`/api/prompt/search/${e.target.value}/${e.target.value}`);
        } else {
            response = await fetch('/api/prompt');
        }

        const data = await response.json();

        setPosts(data);

    }, 500);

    const handleTagClicked = async (tag) => {

        const response = await fetch(`/api/prompt/search/${tag}/${tag}`);
        const data = await response.json();

        setPosts(data);

    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();

            setPosts(data);
        }

        fetchPosts();
    }, []);

    return (
        <section className='feed'>
            <form className='relative w-full flex-center' >
                <input
                    type='text'
                    placeholder='Search for a tag or a username'
                    // value={searchText}
                    onChange={e => handleSearchChange(e)}
                    required
                    className='search_input peer'
                />
            </form>

            <PromptCardList
                data={posts}
                handleTagClick={handleTagClicked}
            />
        </section>
    )
}

export default Feed