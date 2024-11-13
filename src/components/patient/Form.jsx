import React from 'react';
import { Form, Input, Button, Card } from 'antd';

const CustomForm = ({ form }) => {
    return (
        <Form
            form={form}
            layout="vertical" >
            <Card title="Nome do Paciente">
                <Form.Item name="name" rules={[{ required: true, message: 'Por favor, insira o nome do paciente!' }]} >
                    <Input placeholder="Digite o nome do paciente" />
                </Form.Item>
            </Card>
        </Form>
    );
};

export default CustomForm;
