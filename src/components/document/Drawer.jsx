import { Drawer, Typography, Upload, Alert, Flex, Switch } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';
import useCreateDocument from '../../hooks/useCreateDocument';
import drawerConfig from './DrawerConfig';

const { Dragger } = Upload;

const CustomDrawer = ({ title, switchDrawer, open }) => {
    const { mutate } = useCreateDocument();
    const [sanitize, setSanitize] = useState(false);

    const handleSwitchChange = (checked) => {
        setSanitize(checked);
    };

    const customRequest = ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('files', file);

        mutate({ newDocument: formData, flag: sanitize }, {
            onSuccess: (data) => {
                console.log('Arquivo enviado com sucesso:', data);
                onSuccess(data);
                switchDrawer();
            },
            onError: (error) => {
                console.error('Erro ao enviar o arquivo:', error);
                onError(error);
            },
        });
    };

    return (
        <Drawer title={title} onClose={switchDrawer} open={open} >
            <Flex justify='space-between' align='center' style={{ marginBottom: '10px' }}>
                <Typography.Text>Sanitizar documento</Typography.Text>
                <Switch checked={sanitize} onChange={handleSwitchChange} />
            </Flex>
            <Dragger customRequest={customRequest} {...drawerConfig}>
                <Flex vertical align='center'>
                    <InboxOutlined className='logo' style={{ fontSize: '48px' }} />
                    <Typography.Title level={5} style={{ marginTop: '10px' }}>
                        Clique ou arraste o arquivo para esta área para fazer upload
                    </Typography.Title>
                    <Typography.Text>
                        Suporte para upload único ou em massa.
                    </Typography.Text>
                </Flex>
            </Dragger>
        </Drawer>
    );
};

export default CustomDrawer;
