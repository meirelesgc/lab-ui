import React from 'react';
import { Form, Input, Button, Card, Flex } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const CustomForm = ({ form }) => {

    return (
        <Form
            layout='vertical'
            form={form}
            initialValues={{ parameter: '', synonyms: [''] }} >
            <Flex vertical gap={'1.3rem'}>
                <Card title="Parâmetro">
                    <Form.Item
                        name="parameter"
                        rules={[{ required: true, message: 'Por favor, insira o parâmetro!' }]} >
                        <Input placeholder="Digite o parâmetro" />
                    </Form.Item>
                </Card>

                <Form.List name="synonyms">
                    {(fields, { add, remove }) => (
                        <Flex vertical gap='middle'>
                            {fields.map(({ key, name, ...restField }) => (
                                <Card
                                    title={'Sinônimo ' + (key + 1)}
                                    key={key}
                                    extra={<Button icon={<DeleteOutlined />} onClick={() => remove(name)} />} >
                                    <Form.Item {...restField} name={[name]} >
                                        <Input placeholder="Digite o sinônimo" />
                                    </Form.Item>
                                </Card>
                            ))}
                            <Button type="dashed" onClick={() => add()} block>
                                + Adicionar Sinônimo
                            </Button>
                        </Flex>
                    )}
                </Form.List>
            </Flex>
        </Form>
    );
};

export default CustomForm;
