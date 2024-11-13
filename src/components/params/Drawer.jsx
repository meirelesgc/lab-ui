import { Drawer, Form, Flex, Button } from 'antd'
import CustomForm from './Form'

const CustomDrawer = ({ title, switchDrawer, open }) => {
    const [form] = Form.useForm();

    const handleClear = () => {
        form.resetFields();
    };

    return <Drawer
        title={title}
        onClose={switchDrawer}
        open={open}
        footer={<Button />}>
        <CustomForm form={form} />
    </Drawer >
}

export default CustomDrawer