import React, { useEffect } from 'react'
import Base from '../components/Base'

const AboutUs = () => {
    useEffect(() => {
        document.title = "PostSphere - About Us"
    }
    , [])
    return (
        <Base>
            <header class="masthead" style={{ backgroundImage: "url('assets/img/about-bg.jpg')" }}>
                <div class="overlay"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-10 col-lg-8 mx-auto position-relative">
                            <div class="site-heading">
                                <h1>About Us</h1><span class="subheading">This is what we do</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div class="container">
                <div class="row">
                    <div class="col-md-10 col-lg-8 mx-auto">
                        <p>Welcome to PostSphere, a vibrant platform where ideas come to life and voices find their echo. Our mission is to create a space where creativity, knowledge, and inspiration flow freely, allowing you to share your thoughts, engage with others, and build a community that thrives on meaningful connections.</p>

                        <p>At PostSphere, we believe that everyone has a story to tell, an idea to share, and a perspective worth hearing. Whether you're a seasoned writer, a curious reader, or someone simply looking to express themselves, our platform provides the tools you need to post, update, and delete content with ease. You can also engage in thoughtful discussions through comments, connecting with like-minded individuals who share your passions.</p>

                        <p>We are committed to fostering a positive and inclusive environment where everyone feels welcome to contribute and grow. Our user-friendly interface ensures that your blogging experience is smooth and enjoyable, whether you're sharing your latest thoughts, discovering new perspectives, or simply exploring the diverse content created by our community.</p>

                        <p>Join us on this journey of expression and exploration. Let's write, read, and inspire each other, one post at a time.</p>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default AboutUs
