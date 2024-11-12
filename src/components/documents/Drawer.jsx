import { Drawer, Typography, Upload, Alert, Flex } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import useCreateDocument from '../../hooks/useCreateDocument';
import drawerConfig from './DrawerConfig';

const { Dragger } = Upload;

const CustomDrawer = ({ title, switchDrawer, open }) => {
    const { mutate } = useCreateDocument();

    const customRequest = ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('files', file);

        mutate(formData, {
            onSuccess: (data) => {
                console.log('Arquivo enviado com sucesso:', data);
                onSuccess(data);
                // Fechar o drawer após sucesso
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
