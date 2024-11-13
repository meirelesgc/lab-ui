import CustomForm from './Form'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Drawer, Form, Button, Flex } from 'antd'
import useCreateParameter from '../../hooks/useCreateParameter'

const CustomDrawer = ({ title, switchDrawer, open }) => {
    const { mutate } = useCreateParameter()
    const [form] = Form.useForm();

    const handleCancel = () => {
        form.resetFields();
        switchDrawer();
    };

    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                mutate(values);
                handleCancel()
            })
            .catch(errorInfo => {
                console.log('Erro na validação do formulário:', errorInfo);
            });
    };

    return (
        <Drawer
            title={title}
            onClose={handleCancel}
            open={open}
            footer={
                <Flex gap='large' justify='space-around'>
                    <Button type="primary" icon={<CheckOutlined />} onClick={handleSubmit}>Enviar</Button>
                    <Button icon={<CloseOutlined />} onClick={handleCancel}>Cancelar</Button>
                </Flex>
            } >
            <CustomForm form={form} />
        </Drawer>
    );
}

export default CustomDrawer;
