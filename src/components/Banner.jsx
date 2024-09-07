import React from "react";
import { Card, Flex, Typography } from "antd";

const CustomCard = ({ title, description }) => (
    <Flex vertical gap="middle">
        <Typography.Title level={2} strong>
            {title}
        </Typography.Title>

        <Typography.Text type="secondary" strong>
            {description}
        </Typography.Text>
    </Flex>
);

const Banner = ({ selectedItem }) => {
    let title = '';
    let description = '';

    switch (selectedItem) {
        case 'document_sider_key':
            title = 'Gerenciamento de Documentos';
            description = 'Aqui você pode ver a lista de documentos cadastrados e acompanhar o estado atual do processamento.';
            break;
        case 'parameters_sider_key':
            title = 'Gerenciamento de Parâmetros';
            description = 'Aqui você pode ver os dados cadastrados para extração, bem como editar seus sinônimos.';
            break;
        case 'patients_sider_key':
            title = 'Gerenciamento de Pacientes';
            description = 'Aqui você pode gerenciar os pacientes cadastrados, com opções de edição, exclusão e configuração.';
            break;
        default:
            title = 'Selecione uma opção';
            description = 'Por favor, selecione um item no menu para ver mais detalhes.';
    }

    return (
        <Card style={{ height: 180, padding: '20px' }}>
            <Flex vertical gap='30px'>
                <Flex vertical align="flex-start">
                    <CustomCard title={title} description={description} />
                </Flex>
            </Flex>
        </Card>
    );
};

export default Banner;
