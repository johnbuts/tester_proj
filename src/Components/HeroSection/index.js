import React from 'react';
import Video from '../../videos/video.mp4';
import { HeroContainer,HeroBg, VideoBg,HeroContent,HeroH1, Info, InfoWrapper}  from './HeroElement';
const HeroSection = () => {
 
  return (
    <HeroContainer>
        <HeroBg>
            <VideoBg autoPlay loop muted src={Video} type='video/
            mp4'/>
        </HeroBg>
        <HeroContent>
            <HeroH1>Stock strengths made simple</HeroH1>
            <InfoWrapper>
            <Info>Tracking stocks data has never been easier, prompt the indicator of the stock you want to track and also the time frame</Info>
            </InfoWrapper>
        </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection
