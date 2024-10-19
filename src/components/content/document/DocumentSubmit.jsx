import React, { useState } from "react";
import { Modal, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import useCreateDocument from '../../../hooks/useCreateDocument';

const { Dragger } = Upload;

const DocumentSubmit = ({ open, setOpen }) => {
    const { mutate } = useCreateDocument();
    const [fileList, setFileList] = useState([]);

    const handleChange = (info) => {
        setFileList(info.fileList);
    };

    const handleSubmit = () => {
        if (fileList.length === 0) {
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
                setOpen();
            },
            onError: () => {
                message.error("Erro ao enviar documentos. Tente novamente.");
            }
        });
    };

    return (
        <Modal
            title="Anexe os documentos abaixo"
            open={open}
            onOk={handleSubmit}
            onCancel={setOpen} >
            <Dragger
                customRequest={({ file, onSuccess }) => { onSuccess(null, file) }}
                fileList={fileList}
                onChange={handleChange}
                multiple
                accept={'.pdf'}>
                <UploadOutlined />
                Clique ou arraste arquivos para enviar
            </Dragger>
        </Modal >
    );
};

export default DocumentSubmit;