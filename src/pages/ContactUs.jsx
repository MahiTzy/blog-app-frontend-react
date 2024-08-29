import React, { useEffect } from 'react'
import Base from '../components/Base'

const ContactUs = () => {
    useEffect(() => {
        document.title = "PostSphere - Contact Us"
    }
        , [])
    return (
        <Base>
            <header class="masthead" style={{backgroundImage:"url('assets/img/contact-bg.jpg')"}}>
                <div class="overlay"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-10 col-lg-8 mx-auto position-relative">
                            <div class="site-heading">
                                <h1>Contact Me</h1><span class="subheading">Have questions? I have answers.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div class="container">
                <div class="row">
                    <div class="col-md-10 col-lg-8 mx-auto">
                        <p>Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
                        <form id="contactForm" name="sentMessage">
                            <div class="control-group">
                                <div class="form-floating controls mb-3"><input class="form-control" type="text" id="name" required="" placeholder="Name" /><label class="form-label" htmlFor="name">Name</label><small class="form-text text-danger help-block"></small></div>
                            </div>
                            <div class="control-group">
                                <div class="form-floating controls mb-3"><input class="form-control" type="email" id="email" required="" placeholder="Email Address" /><label class="form-label">Email Address</label><small class="form-text text-danger help-block"></small></div>
                            </div>
                            <div class="control-group">
                                <div class="form-floating controls mb-3"><input class="form-control" type="tel" id="phone" required="" placeholder="Phone Number" /><label class="form-label">Phone Number</label><small class="form-text text-danger help-block"></small></div>
                            </div>
                            <div class="control-group">
                                <div class="form-floating controls mb-3"><textarea class="form-control" id="message" data-validation-required-message="Please enter a message." required="" placeholder="Message" style={{height: "150px"}}></textarea><label class="form-label">Message</label><small class="form-text text-danger help-block"></small></div>
                            </div>
                            <div id="success"></div>
                            <div class="mb-3"><button class="btn btn-primary" id="sendMessageButton" type="submit">Send</button></div>
                        </form>
                    </div>
                </div>
            </div >
        </Base >
    )
}

export default ContactUs
