import { Flex, Typography, Card } from 'antd'

const ContentSidebar = () => {
    return <div>
        <Card className='card'>
            <Flex vertical gap='large'>
                <Typography.Title level={4} strong>
                    ...
                </Typography.Title>
                <Typography.Title level={4} strong>
                    ...
                </Typography.Title>
            </Flex>
        </Card>
    </div>;
}

export default ContentSidebar