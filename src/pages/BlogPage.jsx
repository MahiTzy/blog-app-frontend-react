import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isLoggedIn } from '../auth';
import Base from '../components/Base';
import { Base_URL } from '../services/Helper';
import { createComment, getPost } from '../services/PostService';

const BlogPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({
        user: {},
        category: {},
        comments: []
    });
    const [comment, setComment] = useState({ content: '' });

    useEffect(() => {
        getPost(postId)
            .then(response => {
                setPost(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, [postId]);

    const printDate = (date) => {
        return new Date(date).toDateString();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.content.trim() === '') {
            toast.error('Comment cannot be empty');
            return;
        }
        if (!isLoggedIn()) {
            toast.error('Please login to add a comment');
            return;
        }
        createComment(comment, postId)
            .then(response => {
                toast.success('Comment added successfully');
                setPost(prevState => ({
                    ...prevState,
                    comments: [...prevState.comments, response]
                }));
                setComment({ content: '' });
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setComment({ content: e.target.value });
    }

    const { title, content, addedDate, imageName } = post;
    const { categoryTitle: ctitle } = post.category;
    const comments = post.comments;
    const { name } = post.user;

    return (
        <Base>
            <header className="masthead" style={{ backgroundImage: `url(${Base_URL}/post/image/${imageName})` }}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-lg-8 mx-auto position-relative">
                            <div className="post-heading">
                                <h1>{title}</h1>
                                <span className="subtitle">Category: {ctitle}</span>
                                <span className="meta">Posted by <Link to="#">{name}</Link> on {printDate(addedDate)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <article>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-lg-8 mx-auto" dangerouslySetInnerHTML={{ __html: content }}>
                        </div>
                    </div>
                </div>
            </article>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-lg-8 mx-auto">
                            <div className="comment-form">
                                <h3>Leave a Comment</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            placeholder="Write your comment here..."
                                            value={comment.content}
                                            onChange={handleChange}
                                            rows="5"
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                                </form>
                            </div>
                            <div className="comments-list mt-2">
                                {/* {JSON.stringify(comments)} */}
                                <h3>Comments</h3>
                                {comments.length > 0 ? (
                                    comments.map((c, index) => (
                                        <div key={index} className="comment">
                                            <p><strong>Unknown</strong> said: {c.content}</p>
                                            
                                        </div>
                                    ))
                                ) : (
                                    <p>No comments yet. Be the first to comment!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Base>
    )
}

export default BlogPage;
