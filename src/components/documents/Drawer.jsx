import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Drawer, Upload, message, Flex, DatePicker, Select, Typography } from "antd";
import useCreateDocument from "../../hooks/useCreateDocument";
import usePatients from "../../hooks/usePatients";

const { Dragger } = Upload;

const DocDrawer = ({ visibleDrawer, switchVisibleDrawer }) => {
    const { mutate } = useCreateDocument();
    const { data, isLoading } = usePatients();

    const [fileList, setFileList] = useState([]);
    const [metaData, setMetaData] = useState({ patient_id: null, document_date: null });

    const handleChange = (info) => {
        setFileList(info.fileList);
    };

    const handleDateChange = (date, dateString) => {
        setMetaData((prev) => ({ ...prev, document_date: dateString }));
    };

    const handlePatientChange = (value) => {
        setMetaData((prev) => ({ ...prev, patient_id: value }));
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

        mutate({ document: formData, documentMetadata: metaData }, {
            onSuccess: () => {
                message.success("Documentos enviados com sucesso!");
                setFileList([]);
                setMetaData({ patient_id: null, document_date: null });
                switchVisibleDrawer();
            },
            onError: () => {
                message.error("Erro ao enviar documentos. Tente novamente.");
            },

        });
    };

    return (
        <Drawer
            title="Formulario de anexo"
            footer={
                <Flex gap='large'>
                    <Button size="large" onClick={handleSubmit} type="primary">Enviar</Button>
                    <Button size="large" onClick={switchVisibleDrawer}>Cancelar</Button>
                </Flex>
            }
            open={visibleDrawer}
            onClose={switchVisibleDrawer} >

            <Flex vertical justify="space-between" gap='2.3rem'>
                <Flex vertical gap='small'>
                    <Typography.Text type="secondary" strong>Metadados do documento</Typography.Text>
                    <DatePicker
                        placeholder="Esse documento se refere ao dia..."
                        onChange={handleDateChange} />
                    <Select
                        loading={isLoading}
                        placeholder="Selecione o paciente"
                        options={data?.map(({ patient_id, name }) => ({
                            value: patient_id,
                            label: name,
                        }))}
                        onChange={handlePatientChange}
                    />
                </Flex>

                <Dragger
                    customRequest={({ file, onSuccess }) => { onSuccess(null, file) }}
                    fileList={fileList}
                    onChange={handleChange}
                    multiple
                    accept={'.pdf'}>
                    <p className="logo" style={{ fontSize: 40 }}><InboxOutlined /></p>
                    Clique ou arraste arquivos para enviar
                </Dragger>
            </Flex>
        </Drawer>
    );
}

export default DocDrawer;
