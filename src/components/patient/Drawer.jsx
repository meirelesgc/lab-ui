import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Drawer, Form, Flex, Button } from 'antd'
import CustomForm from './Form'
import useCreatePatient from '../../hooks/useCreatePatient'

const CustomDrawer = ({ title, switchDrawer, open }) => {
    const { mutate } = useCreatePatient()
    const [form] = Form.useForm();

    const handleCancel = () => {
        form.resetFields();
        switchDrawer();
    };

    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                mutate(values.name);
                handleCancel()
            })
            .catch(errorInfo => {
                console.log('Erro na validação do formulário:', errorInfo);
            });
    };

    return (
        <Drawer
            title={title}
            open={open}
            onClose={switchDrawer}
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
