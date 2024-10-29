import React from "react";
import { Button, Drawer, Flex, Form, message } from "antd";
import useCreateParameter from '../../hooks/useCreateParameter'
import ParamForm from "./Form";

const ParamDrawer = ({ visibleDrawer, switchVisibleDrawer }) => {
    const [form] = Form.useForm();
    const { mutate } = useCreateParameter();

    const handleSubmit = () => {
        const values = form.getFieldValue();

        mutate(values, {
            onSuccess: () => {
                message.success('Parâmetro adicionado com sucesso!');
                form.resetFields();
                switchVisibleDrawer(false);
            },
            onError: (error) => {
                message.error('Erro ao adicionar parâmetro:', error.message);
            },
        });
    };

    return <Drawer
        title="Adicionando novo parâmetro"
        open={visibleDrawer}
        onClose={switchVisibleDrawer}
        footer={<Flex gap="large">
            <Button size="large" onClick={handleSubmit} type="primary">
                Enviar
            </Button>
            <Button size="large" onClick={switchVisibleDrawer}>
                Cancelar
            </Button>
        </Flex>} >

        <ParamForm form={form} />

    </Drawer>
};

export default ParamDrawer;