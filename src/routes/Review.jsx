import React from 'react';
import { Flex } from 'antd';
import MainContent from '../components/reviews/MainContent';
import SideContent from '../components/reviews/SideContent';

const Review = () => {
    return <Flex justify="space-between" gap='large' style={{ height: '100vh' }}>
        <MainContent />
        <SideContent />
    </Flex>;
};

export default Review;
