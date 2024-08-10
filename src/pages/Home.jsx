import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Container } from 'reactstrap'
import Base from '../components/Base'
import PaginationComponent from '../components/PaginationComponent'
import { getAllPosts } from '../services/PostService'

const Home = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [posts, setPosts] = React.useState(
        {
            content: [],
            totalElements: 0
        }
    )

    useEffect(() => {
        if (location.state?.message) {
            const { message, type } = location.state;

            // Display the toast message
            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
            }

            // Clear the state to prevent the toast from showing again on reload
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, navigate, location.pathname]);

    useEffect(() => {
        document.title = "PostSphere - Home"
        getAllPosts(0, 5).then(response => {
            // console.log(response);
            setPosts(response);
        }
        ).catch(error => {
            console.log(error)
        })
    }, [])

    const changePage = (pageNumber = 0, pageSize = 5) => {
        getAllPosts(pageNumber, pageSize).then(response => {
            setPosts(response);
        }).catch(error => {
            toast.error("Error in loading posts!")
        })
    }

    return (
        <Base>
            {/* {JSON.stringify(posts)} */}
            <header className="masthead" style={{ backgroundImage: "url('/assets/img/home-bg.jpg')" }}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-lg-8 mx-auto position-relative">
                            <div className="site-heading">
                                <h1>PostSphere</h1><span className="subheading">Your Space to Share and Explore.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-lg-8">
                        {posts.content.map(post => (
                            <>
                                <div key={post.postId} className="post-preview">
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
                            </>
                        ))}
                        {
                            <Container className='mt-2'>
                                <PaginationComponent post={posts} pageChange={changePage} />
                            </Container>
                        }
                    </div>
                </div>
            </div>

        </Base>
    )
}

export default Home
