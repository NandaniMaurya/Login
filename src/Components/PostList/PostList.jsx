// src/components/PostList/PostList.jsx
import React, { useState, useEffect, useRef } from 'react';
import './PostList.css';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const loader = useRef(null);

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`);
            setPosts(prevPosts => [...prevPosts, ...response.data]);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        setLoading(false);
    };

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <div className="container">
            <h1 className="heading">MelodyVerse Posts</h1>
            <div className="grid-container">
                {posts.map((post, index) => (
                    <div key={index} className="post-card">
                        <h2 className="title">{post.title}</h2>
                        <p className="postbody">{post.body}</p>
                    </div>
                ))}
            </div>
            {loading && <p>Loading...</p>}
            <div ref={loader}></div>
        </div>
    );
};

export default PostList;
