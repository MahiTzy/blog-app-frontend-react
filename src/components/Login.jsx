import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { doLogin } from '../auth';
import { login } from '../services/UserService';


const Login = ({ isOpen, toggleModal }) => {

    const navigate = useNavigate()

    const [data, setData] = React.useState({
        username: '',
        password: ''
    })

    const handleSubmit = () => {
        return (e) => {
            e.preventDefault()
            // console.log(data);
            if (!data.username || !data.password) {
                toast.error('Please fill all the fields')
                return
            }
            login(data).then(response => {
                // console.log("response", response);
                doLogin(response);
                navigate('/user/dashboard', { state: { message: 'User logged in successfully', type: 'success'} });
                // console.log(navigate);
                // toast.success('User logged in successfully');
            }
            ).catch(error => {
                console.log(error)
                if (error.response.status === 500) {
                    toast.error('Server Error')
                }
                else if (error.response.status === 400) {
                    toast.error(error.response.data.message)
                } else
                    toast.error('Something went wrong')
            })
        }
    }

    const handleChange = (e) => {
        console.log(e.target.id, e.target.value)
        setData({ ...data, [e.target.id]: e.target.value })
    }

    return (
        <div>
            <Modal fade={false} isOpen={isOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                <Form onSubmit={handleSubmit()}>
                    <ModalBody>
                        <Container>
                            <FormGroup>
                                <Label for='username'>Email</Label>
                                <Input onChange={handleChange} type='email' placeholder='Email' id='username' />
                            </FormGroup>
                            <FormGroup>
                                <Label for='password'>Password</Label>
                                <Input onChange={handleChange} type='password' placeholder='Password' id='password' />
                            </FormGroup>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='dark' type='submit'>Submit</Button>
                        <Button color="secondary" onClick={toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div >
    )
}

export default Login
