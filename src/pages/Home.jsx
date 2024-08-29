import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from 'reactstrap';
import Article from '../components/Article';
import Base from '../components/Base';
import PaginationComponent from '../components/PaginationComponent';
import { getAllPosts } from '../services/PostService';

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState({
        content: [],
        totalElements: 0
    });

    useEffect(() => {
        if (location.state?.message) {
            const { message, type } = location.state;

            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
            }

            navigate(location.pathname, { replace: true });
        }
    }, [location.state, navigate, location.pathname]);

    useEffect(() => {
        document.title = "PostSphere - Home";
        getAllPosts(0, 5)
            .then(response => {
                setPosts(response);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const changePage = (pageNumber = 0, pageSize = 5) => {
        setLoading(true);
        getAllPosts(pageNumber, pageSize)
            .then(response => {
                setPosts(response);
                setLoading(false);
            })
            .catch(error => {
                toast.error("Error in loading posts!");
                setLoading(false);
            });
    };

    return (
        <Base>
            <header className="masthead" style={{ backgroundImage: "url('/assets/img/home-bg.jpg')" }}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-lg-8 mx-auto position-relative">
                            <div className="site-heading">
                                <h1>PostSphere</h1>
                                <span className="subheading">Your Space to Share and Explore.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-lg-8">
                        {loading ? (
                            // Show loader while loading
                            <Article />
                        ) : (
                            // Check if there are posts
                            posts.content.length > 0 ? (
                                // Display posts
                                posts.content.map(post => (
                                    <React.Fragment key={post.postId}>
                                        <div className="post-preview">
                                            <Link to={'/blog-page/' + post.postId}>
                                                <h2 className="post-title">{post.title}</h2>
                                                {post.content.length > 100 ? (
                                                    <h3
                                                        className="post-subtitle"
                                                        dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) + "..." }}
                                                    ></h3>
                                                ) : (
                                                    <h3
                                                        className="post-subtitle"
                                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                                    ></h3>
                                                )}
                                            </Link>
                                            <p className="post-meta">Posted by&nbsp;<Link to="#">{post.user.name}</Link>&nbsp;on {new Date(post.addedDate).toDateString()}</p>
                                        </div>
                                        <hr />
                                    </React.Fragment>
                                ))
                            ) : (
                                // Display no posts message
                                <div className="no-posts">
                                    <h3>No posts available</h3>
                                </div>
                            )
                        )}
                        {
                            !loading && posts.content.length > 0 && (
                                <Container className='mt-2'>
                                    <PaginationComponent post={posts} pageChange={changePage} />
                                </Container>
                            )
                        }
                    </div>
                </div>
            </div>
        </Base>
    );
};

export default Home;
