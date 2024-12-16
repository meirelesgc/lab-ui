import { Card, Flex, Typography, DatePicker, Select } from "antd";
import usePatients from '../../hooks/usePatients';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';

const CustomCard = ({ rawData, setDocPatient, setDocDate }) => {
    const { data, isLoading } = usePatients();

    const defaultSelectedPatients = rawData?.patients?.map(patient => patient.patient_id) || [];
    const documentDate = useMemo(() => dayjs(document.document_date), [document.document_date]);

    useEffect(() => {
        setDocDate(documentDate);
        setDocPatient(defaultSelectedPatients);
    }, [setDocDate, documentDate]);

    const handlePatientChange = (patients) => {
        setDocPatient(patients);
    };

    const handleDateChange = (date) => {
        setDocDate(date);
    };

    const renderPatients = () => {
        return <Select.OptGroup label="Todos os pacientes">
            {data?.map((patient) => (
                <Select.Option key={'patient_' + patient.patient_id} value={patient.patient_id}>
                    {patient.name}
                </Select.Option>
            ))}
        </Select.OptGroup>;
    };

    const renderTrackedPatients = () => {
        return <Select.OptGroup label="Pacientes Identificados">
            {rawData.unverified_patient?.map((patient) => (
                <Select.Option key={'document_' + patient.patient_id} value={patient.patient_id}>
                    {patient.name}
                </Select.Option>
            ))}
        </Select.OptGroup>;
    };

    return (
        <Card style={{ padding: "20px" }}>
            <Flex vertical gap="small">
                <Typography.Title level={2} strong>Metadados</Typography.Title>
                <Flex vertical justify="space-between" gap="0.5rem" style={{ display: "flex", width: "100%" }}>
                    <Typography.Text type="secondary" strong>Data de admissão</Typography.Text>
                    <DatePicker onChange={handleDateChange} format="DD-MM-YYYY" defaultValue={documentDate} />

                    <Typography.Text type="secondary" strong>Paciente</Typography.Text>
                    <Select mode="tags" loading={isLoading} placeholder="Selecione um paciente" onChange={handlePatientChange} defaultValue={defaultSelectedPatients} >
                        {renderTrackedPatients()}
                        {renderPatients()}
                    </Select>
                </Flex>
            </Flex>
        </Card>
    );
};

export default CustomCard;
