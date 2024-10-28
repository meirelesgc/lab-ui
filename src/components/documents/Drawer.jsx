import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Drawer, Upload, message, Flex } from "antd";

import useCreateDocument from "../../hooks/useCreateDocument";

const { Dragger } = Upload;

const DocDrawer = ({ visibleDrawer, switchVisibleDrawer }) => {
    const { mutate } = useCreateDocument();
    const [fileList, setFileList] = useState([]);

    const handleChange = (info) => {
        setFileList(info.fileList);
    };

    const handleSubmit = () => {
        if (!fileList.length) {
            message.error("Por favor, anexe pelo menos um arquivo.");
            return;
        }

        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files', file.originFileObj);
        });

        mutate(formData, {
            onSuccess: () => {
                message.success("Documentos enviados com sucesso!");
                setFileList([]);
                switchVisibleDrawer();
            },
            onError: () => {
                message.error("Erro ao enviar documentos. Tente novamente.");
            }
        });
    };

    return <Drawer
        title="Formulario de anexo"
        width={720}
        open={visibleDrawer}
        onClose={switchVisibleDrawer}
        footer={<Flex gap='large'>
            <Button size="large" onClick={handleSubmit} type="primary">Enviar</Button>
            <Button size="large" onClick={switchVisibleDrawer}>Cancelar</Button>
        </Flex>} >

        <Dragger
            customRequest={({ file, onSuccess }) => { onSuccess(null, file) }}
            fileList={fileList}
            onChange={handleChange}
            multiple
            accept={'.pdf'}>
            <UploadOutlined />
            Clique ou arraste arquivos para enviar
        </Dragger>

    </Drawer>
}

export default DocDrawer