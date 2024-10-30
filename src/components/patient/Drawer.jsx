import { Drawer, Form, Input, Button } from 'antd';
import useCreatePatient from '../../hooks/useCreatePatient';

const PatientDrawer = ({ visibleDrawer, switchVisibleDrawer }) => {
    const { mutate } = useCreatePatient();
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                mutate(values.patientName, {
                    onSuccess: () => {
                        form.resetFields();
                        switchVisibleDrawer();
                    }
                });
            })
            .catch(info => {
                console.log('Erro ao validar os campos:', info);
            });
    };

    return (
        <Drawer
            title="Adicionar Paciente"
            onClose={switchVisibleDrawer}
            open={visibleDrawer}
            footer={
                <div style={{ textAlign: 'right' }}>
                    <Button onClick={switchVisibleDrawer} style={{ marginRight: 8 }}>
                        Cancelar
                    </Button>
                    <Button type="primary" onClick={handleSubmit}>
                        Salvar
                    </Button>
                </div>
            }
        >
            <Form form={form} id="patientForm" layout="vertical">
                <Form.Item
                    label="Nome do Paciente"
                    name="patientName"
                    rules={[{ required: true, message: 'Por favor, insira o nome do paciente!' }]}
                >
                    <Input placeholder="Nome do Paciente" />
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default PatientDrawer;
