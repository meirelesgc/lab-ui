import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import { Form, Input, Space, Flex, Button, Typography } from "antd";

const ParamForm = ({ form }) => {
    return <Form form={form} initialValues={{ "parameter": "", "synonyms": [] }} layout='vertical'>

        <Typography.Title level={5} strong>Parâmetro</Typography.Title>
        <Form.Item name='parameter' rules={[{ required: true, message: "Por favor, insira um parâmetro." }]}>
            <Input placeholder='Digite o parâmetro...' />
        </Form.Item>

        <Typography.Text type="secondary" strong>Sinônimos</Typography.Text>
        <Form.List name='synonyms'>
            {(fields, { add, remove }) => (
                <Flex vertical>
                    {fields.map((field) => (
                        <Form.Item key={field.key} rules={[{ required: true, message: "Sinônimo obrigatório." }]}>
                            <Space.Compact>
                                <Input
                                    placeholder='Digite o Sinônimo...'
                                    onPressEnter={(e) => {
                                        const synonyms = e.target.value.split(',').map((syn) => syn.trim());
                                        synonyms.forEach((synonym) => {
                                            if (synonym) add(synonym);
                                        });
                                        e.target.value = '';
                                    }} />
                                <Button onClick={() => remove(field.name)} icon={<CloseOutlined />} />
                            </Space.Compact>
                        </Form.Item>
                    ))}
                    <Button type="dashed" icon={<PlusOutlined />} onClick={() => add()}>Adicionar Sinônimo</Button>
                </Flex>
            )}
        </Form.List>
    </Form>
};

export default ParamForm;
