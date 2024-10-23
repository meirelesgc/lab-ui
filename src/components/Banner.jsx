import React from "react";
import { Card, Flex, Typography } from "antd";

const Banner = ({ location }) => {
    const { pathname } = location;

    let title, description;

    switch (pathname) {
        case '/document':
            title = 'Gerenciamento de Documentos';
            description = 'Aqui você pode ver a lista de documentos cadastrados e acompanhar o estado atual do processamento.';
            break;
        case '/param':
            title = 'Gerenciamento de Parâmetros';
            description = 'Aqui você pode ver os dados cadastrados para extração, bem como editar seus sinônimos.';
            break;
        case '/patient':
            title = 'Gerenciamento de Pacientes';
            description = 'Aqui você pode gerenciar os pacientes cadastrados, com opções de edição, exclusão e configuração.';
            break;
        case '/':
            title = 'Selecione uma opção';
            description = 'Por favor, selecione um item no menu para ver mais detalhes.';
            break;
        default:
            title = 'Página Não Encontrada';
            description = 'Desculpe, a página que você está procurando não existe.';
            break;
    }

    return (
        <Card style={{ height: 180, padding: '20px' }}>
            <Flex vertical gap='30px'>
                <Flex vertical align="flex-start">
                    <Flex vertical gap="middle">
                        <Typography.Title level={2} strong>
                            {title}
                        </Typography.Title>
                        <Typography.Text type="secondary" strong>
                            {description}
                        </Typography.Text>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
};

export default Banner;
