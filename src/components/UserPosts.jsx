import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUser } from '../auth'
import { deletePostOfUser, loadPostByUser } from '../services/PostService'

const UserPosts = () => {
  const [posts, setPosts] = React.useState([])

  useEffect(() => {
    document.title = 'Dashboard | Your Posts'
    loadPostByUser(getUser().user.id)
      .then(response => {
        setPosts(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const deletePost = (postId) => {
    return (event) => {
      event.preventDefault()
      deletePostOfUser(postId)
        .then(response => {
          setPosts(prevState => {
            return prevState.filter(post => post.postId !== postId)
          })
          toast.success("Post deleted successfully!")
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <div className="container">
      <h2 className="text-center">Your Posts</h2>
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index}>
              <div className="card mb-2">
                <div className="card-body">
                  <div className="post-preview">
                    <Link to={"/blog-page/"+post.postId}>
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
                  </div>
                  <Link to={'/user/update-post/' + post.postId} className="btn btn-primary rounded-0 me-2">
                    Edit
                  </Link>
                  <Link onClick={deletePost(post.postId)} href="#" className="btn btn-danger rounded-0">
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <h3 className="text-center">You have no posts yet.</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserPosts
