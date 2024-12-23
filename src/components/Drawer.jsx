import { Drawer, Flex, Form, Input, Typography } from 'antd'

const CustomDrawer = ({ collapsed }) => {

    const [form] = Form.useForm();
    const email = Form.useWatch('e-mail', form)

    console.log(email)

    return <Drawer title='Login' open={collapsed}>
        <Flex vertical>
            <Form form={form}>
                <Typography.Text>E-mail</Typography.Text>
                <Form.Item>
                    <Input label='E-mail' name='e-mail' />
                </Form.Item>
            </Form>
        </Flex>
    </Drawer>
}

export default CustomDrawer