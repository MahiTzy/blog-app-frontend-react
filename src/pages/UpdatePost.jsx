import JoditEditor from 'jodit-react'
import React, { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import Base from '../components/Base'
import { loadAllCategories } from '../services/CategoryService'
import { getPost, updatePost, uploadImage } from '../services/PostService'

const UpdatePost = () => {
    const editor = useRef(null)
    const { postId } = useParams()
    const [categories, setCategories] = React.useState([])
    const [post, setPost] = React.useState({
        title: '',
        imageName: '',
        content: '',
        category: {
            categoryId: 0
        }
    })
    const [image, setImage] = React.useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadAllCategories().then(response => {
            // console.log(response);
            setCategories(response);
            getPost(postId).then(response => {
                // console.log(response)
                setPost(response)
            }
            ).catch(error => {
                console.log(error)
            })
        }
        ).catch(error => {
            console.log(error)
        })
    }, [postId])

    useEffect(() => {
        // console.log(post)
    }, [post])

    const handleChange = (event) => {
        // console.log(event.target.value)
        setPost({
            ...post,
            [event.target.id]: event.target.value
        })
    }

    const handleCategoryChange = (event) => {
        // console.log(event.target.value)
        setPost({
            ...post,
            category: {
                categoryId: event.target.value
            }
        })
    }

    const handleFileChange = (event) => {
        setImage(event.target.files[0])
        // console.log(event.target.files[0])
    }


    const handleContentChange = () => {
        return (content) => {
            // console.log(content)
            setPost({
                ...post,
                content: content
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log("Post: ", post);
        updatePost(post).then(response => {
            if (image === null) {
                navigate('/user/dashboard', { state: { message: 'Post updated successfully', type: 'success' } });
                return;
            }
            uploadImage(image, response.postId).then(response => {
                // console.log(response);
            }).catch(error => {
                console.log(error);
            });
            navigate('/user/dashboard', { state: { message: 'Post updated successfully', type: 'success' } });
        }).catch(error => {
            console.log(error);
            toast.error('Failed to update post');
        });
    };
    
  return (
    <Base>
      <header className="masthead" style={{backgroundImage:"url('../../assets/img/dashboard.jpg')"}}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-8 mx-auto position-relative">
              <div className="site-heading">
                <h1>Dashboard</h1>
                <span className="subheading">Manage, Create, and Connect</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-10 col-lg-8 mx-auto">
          <Container>
                <Card className="shadow-sm">
                    <CardHeader className="text-center">
                        <h3>Update your post</h3>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="title">Post Title</Label>
                                <Input
                                    value={post.title}
                                    onChange={(e)=>handleChange(e)}
                                    type="text"
                                    placeholder="Enter title"
                                    id="title"
                                    className="rounded"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="content">Post Content</Label>
                                <JoditEditor
                                    ref={editor}
                                    value={post.content}
                                    onChange={handleContentChange()}
                                />
                            </FormGroup>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label htmlFor="image">Post Image</Label>
                                        <Input
                                            type="file"
                                            id="image"
                                            onChange={handleFileChange}
                                            className="rounded"
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md="6">
                                    <FormGroup>
                                        <Label htmlFor="category">Post Category</Label>
                                        <Input
                                            value={post.categoryId}
                                            onChange={(e)=>handleCategoryChange(e)}
                                            type="select"
                                            id="categoryId"
                                            className="rounded"
                                        >
                                            {categories.map((category) => {
                                                return (
                                                    <option key={category.categoryId} value={category.categoryId}>{category.categoryTitle}</option>
                                                )
                                            })}
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Container className="text-center mt-3">
                                <Button type="submit" color="primary">
                                    Update Post
                                </Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
          </div>
        </div>
      </div>
    </Base>
  )
}

export default UpdatePost
