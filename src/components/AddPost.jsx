import JoditEditor from 'jodit-react'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { getUser } from '../auth'
import { loadAllCategories } from '../services/CategoryService'
import { createPost, uploadImage } from '../services/PostService'

const AddPost = () => {

    const editor = React.useRef(null)
    const imageRef = React.useRef(null)  // Create a ref for the file input
    const [categories, setCategories] = React.useState([])
    const [post, setPost] = React.useState({
        title: '',
        content: '',
        categoryId: ''
    })
    const [image, setImage] = React.useState(null)

    useEffect(() => {
        document.title = 'Dashboard | Add Post'
        loadAllCategories().then(response => {
            setCategories(response);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const resetPost = () => {
        setPost({
            title: '',
            content: '',
            categoryId: ''
        })
        setImage(null)
        if (imageRef.current) {
            imageRef.current.value = null  // Reset the file input using ref
        }
    }

    const handleChange = () => {
        return (event) => {
            setPost({
                ...post,
                [event.target.id]: event.target.value
            })
        }
    }

    const handleContentChange = () => {
        return (content) => {
            setPost({
                ...post,
                content: content
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!post.title || !post.content || !post.categoryId || !image) {
            toast.error('Please fill all the fields')
            return
        }
        post['userId'] = getUser().user.id
        createPost(post).then(response => {
            uploadImage(image, response.postId).then(response => {
                // Image uploaded successfully
            }).catch(error => {
                console.log(error)
            })
            resetPost();
            toast.success('Post added successfully');
        }).catch(error => {
            console.log(error)
            toast.error('Failed to add post')
        })
    }

    const handleFileChange = (event) => {
        setImage(event.target.files[0])
    }

    return (
        <div className='mt-2'>
            <Container>
                <Card className="shadow-sm">
                    <CardHeader className="text-center">
                        <h3>What's on your mind?</h3>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={e => handleSubmit(e)}>
                            <FormGroup>
                                <Label for="title">Post Title</Label>
                                <Input
                                    value={post.title}
                                    onChange={handleChange()}
                                    type="text"
                                    placeholder="Enter title"
                                    id="title"
                                    className="rounded"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="content">Post Content</Label>
                                <JoditEditor
                                    ref={editor}
                                    value={post.content}
                                    onChange={handleContentChange()}
                                />
                            </FormGroup>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="image">Post Image</Label>
                                        <Input
                                            type="file"
                                            ref={imageRef}  // Attach the ref to the file input
                                            id="image"
                                            onChange={handleFileChange}
                                            className="rounded"
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md="6">
                                    <FormGroup>
                                        <Label for="category">Post Category</Label>
                                        <Input
                                            value={post.categoryId || 0}
                                            onChange={handleChange()}
                                            type="select"
                                            id="categoryId"
                                            className="rounded"
                                        >
                                            <option value="0" disabled>Choose category</option>
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
                                    Add Post
                                </Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

export default AddPost
