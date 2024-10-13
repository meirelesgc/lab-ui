import { Flex, Typography, Card } from 'antd'

const ContentSidebar = () => {
    return <div>
        <Card className='card'>
            <Flex vertical gap='large'>
                <Typography.Title level={4} strong>
                    Today<br />5 Orders
                </Typography.Title>
                <Typography.Title level={4} strong>
                    This Month<br />240 Orders
                </Typography.Title>
            </Flex>
        </Card>
    </div>;
}

export default ContentSidebar