import React from 'react';
import { Form, Input, Button, Card, Flex } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const CustomForm = ({ form }) => {

    return (
        <Form
            layout='vertical'
            form={form}
            initialValues={{ parameter: '', synonyms: [''] }}
        >
            <Flex vertical gap={'1.3rem'}>
                <Card title="Parameter">
                    <Form.Item
                        name="parameter"
                        rules={[{ required: true, message: 'Please input the parameter!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Card>

                <Form.List name="synonyms">
                    {(fields, { add, remove }) => (
                        <Flex vertical gap='middle'>
                            {fields.map(({ key, name, ...restField }) => (
                                <Card
                                    title={'Synonym ' + (key + 1)}
                                    key={key}
                                    extra={<Button icon={<DeleteOutlined />} onClick={() => remove(name)} />} >
                                    <Form.Item {...restField} name={[name]} >
                                        <Input placeholder="Synonym" />
                                    </Form.Item>
                                </Card>
                            ))}
                            <Button type="dashed" onClick={() => add()} block>
                                + Add Synonym
                            </Button>
                        </Flex>
                    )}
                </Form.List>
            </Flex>
        </Form>
    );
};

export default CustomForm;
