import React from 'react';
import { toast } from 'react-toastify';
import { Button, Container, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { signup } from '../services/UserService';

const Register = ({ isOpen, toggleModal }) => {

    const [data, setData] = React.useState({
        name: '',
        email: '',
        password: '',
        about: ''
    });

    const [error, setError] = React.useState({
        errors: {},
        isError: false
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const resetData = () => {
        setData({
            name: '',
            email: '',
            password: '',
            about: ''
        });
        setError({
            errors: {},
            isError: false
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(data).then(response => {
            toast.success('User created successfully');
            resetData();
            toggleModal();
        }).catch(error => {
            console.log(error);
            toast.error('Something went wrong');
            setError({
                errors: error,
                isError: true
            });
        });
    };

    const handleToggle = () => {
        resetData(); // Reset data and error state when the modal is toggled
        toggleModal();
    };

    return (
        <div>
            <Modal fade={false} isOpen={isOpen} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Register</ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <ModalBody>
                        <Container>
                            <FormGroup>
                                <Label htmlFor='name'>Name</Label>
                                <Input invalid={error.errors?.response?.data?.name ? true : false} value={data.name} onChange={handleChange} type='text' placeholder='Name' id='name' />
                                <FormFeedback>{error.errors?.response?.data?.name}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='email'>Email</Label>
                                <Input invalid={error.errors?.response?.data?.email ? true : false} value={data.email} onChange={handleChange} type='email' placeholder='Email' id='email' />
                                <FormFeedback>{error.errors?.response?.data?.email}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password'>Password</Label>
                                <Input invalid={error.errors?.response?.data?.password ? true : false} value={data.password} onChange={handleChange} type='password' placeholder='Password' id='password' />
                                <FormFeedback>{error.errors?.response?.data?.password}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='about'>About</Label>
                                <Input invalid={error.errors?.response?.data?.about ? true : false} value={data.about} onChange={handleChange} type='textarea' placeholder='About' id='about' />
                                <FormFeedback>{error.errors?.response?.data?.about}</FormFeedback>
                            </FormGroup>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='dark' type='submit'>Submit</Button>
                        <Button color='secondary' className='ms-2' type='reset'>Reset</Button>
                        <Button color="secondary" onClick={handleToggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
};

export default Register;
