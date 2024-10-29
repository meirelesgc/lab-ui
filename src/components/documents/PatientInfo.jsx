import React from 'react';
import { Select, Spin, Typography, Flex, Card } from 'antd';
import useDocuments from "../../hooks/useDocuments";
import usePatients from "../../hooks/usePatients";

const { Title, Text } = Typography;

const PatientInfo = ({ id: document_id }) => {
    const { data: documents, isLoading: loadingDocuments } = useDocuments();
    const { data: patients, isLoading: loadingPatients } = usePatients();

    if (loadingDocuments || loadingPatients) {
        return <Spin size="large" />;
    }

    const document = documents.find(doc => doc.document_id === document_id);

    if (!document) {
        return <Text type="danger">Document not found.</Text>;
    }

    const patient = document.patient;
    const doctor = document.doctor;

    return (
        <Flex vertical gap='2.3rem' style={{ width: 350 }}>
            <Card className='card'>
                <Title level={3}>{document.name.slice(0, -4)}</Title>
                <Title level={5}>Adicionado em: {new Date(document.created_at).toLocaleString()}</Title>

                <Flex vertical gap='small'>
                    <Text strong>Paciente:</Text>
                    <Select defaultValue={patient.name || ''} placeholder='Paciente não atribuido' style={{ width: 200 }}>
                        {patients.map(p => (
                            <Select.Option key={p.patient_id} value={p.name}>
                                {p.name}
                            </Select.Option>
                        ))}
                    </Select>
                    <Text strong>Médico:</Text>
                    <Select defaultValue={doctor.name || ''} placeholder='Médico não atribuido' style={{ width: 200 }}>
                        {patients.map(p => (
                            <Select.Option key={p.patient_id} value={p.name}>
                                {p.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Flex>
            </Card>
        </Flex>
    );
};

export default PatientInfo;
