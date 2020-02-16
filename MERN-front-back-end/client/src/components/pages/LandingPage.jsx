import React from 'react';
import { Fragment } from 'react';
import styled from 'styled-components';

const SectionTop = styled.div`
	width:100%;
	height:auto;
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
`;

const Content = styled.div`
    width:100%;
	height: 500px;
    background-image: linear-gradient(0deg, rgba(223,201,137,1) 0%, rgba(255,255,255,0) 100%),
    url(https://pixabay.com/get/55e6d4424855ab14f6da8c7dda6d49214b6ac3e456597041722d78d494/wedding-rings-3611277_1280.jpg); 
	background-size: cover;
	background-position: center;
    background-repeat: no-repeat;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
`;

const Text =  styled.div`
    font-size: 30px;
	color:#1A021E;
	font-family: sans-serif;
	text-shadow: 0px 15px 12px #000;
`;

const Footer = styled.footer`
	width:100%;
	height: auto;
	background-color: #DFC989;
	color: #1A021E;
	font-size: 15px;
	text-align: center;
	line-height: 50px;
`;

const LandingPage = () => {
    return(
        <Fragment>
            <SectionTop>
                <Content>
                    <Text>
                        It is a Landing Page section
                    </Text>
                </Content>
            </SectionTop>
            <Footer> 2020 D.Hristoskov</Footer>        
        </Fragment>
    );
};

export default LandingPage;