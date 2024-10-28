import React from "react";
import { Button, Drawer, Flex, Form, Input, Typography, Space, message } from "antd";
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import useCreateParameter from '../../hooks/useCreateParameter'

const ParamDrawer = ({ visibleDrawer, switchVisibleDrawer }) => {
    const [form] = Form.useForm();
    const { mutate } = useCreateParameter();

    const handleSubmit = async () => {
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

    return (
        <Drawer
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

            <Form form={form} name="param_form" autoComplete="off">

                <Typography.Title level={4}>
                    Parâmetro
                </Typography.Title>
                <Form.Item
                    name="parameter"
                    rules={[{ required: true, message: "Por favor, insira um parâmetro." }]}>
                    <Input placeholder="Digite o parâmetro" />
                </Form.Item>

                <Typography.Title level={4}>
                    Sinônimos
                </Typography.Title>
                <Form.List name="synonyms">
                    {(fields, { add, remove }) => (
                        <Flex wrap gap="small">
                            {fields.map((field) => (

                                <Space.Compact key={field.name}>
                                    <Form.Item
                                        name={[field.name]}
                                        rules={[{ required: true, message: "Sinônimo obrigatório." }]}>
                                        <Input
                                            placeholder="Sinônimo"
                                            onPressEnter={(e) => {
                                                e.preventDefault();
                                                const input = e.target.value;
                                                const synonyms = input.split(',').map((syn) => syn.trim());
                                                synonyms.forEach((synonym) => {
                                                    if (synonym) add(synonym);
                                                });
                                                e.target.value = '';
                                            }} />
                                    </Form.Item>
                                    <Button onClick={() => remove(field.name)} icon={<CloseOutlined />} />
                                </Space.Compact>))}

                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Adicionar Sinônimo
                            </Button>
                        </Flex>)}
                </Form.List>
            </Form>

        </Drawer>
    );
};

export default ParamDrawer;