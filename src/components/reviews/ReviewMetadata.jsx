import { Card } from "antd";
import { useParams } from "react-router-dom";
import useDocument from "../../hooks/useDocument";
import usePatients from "../../hooks/usePatients";
import { Flex, Typography, Select, DatePicker } from "antd";
import dayjs from 'dayjs';

const ReviewMetadata = ({ setPatient, setDate }) => {
    const { document_id } = useParams();
    const { data: document, isLoading: isLoadingDocument } = useDocument(document_id);
    const { data: patients, isLoading: isLoadingPatients } = usePatients();

    const handleChange = (selectedPatients) => {
        setPatient(selectedPatients);
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const renderIdentifiedPatients = () => {
        return <Select.OptGroup label="Pacientes Identificados">
            {document.unverified_patient?.map((patient) => (
                <Select.Option key={`document_${patient.patient_id}`} value={patient.patient_id}>
                    {patient.name}
                </Select.Option>
            ))}
        </Select.OptGroup>;
    };

    const renderAllPatients = () => {
        return <Select.OptGroup label="Todos os pacientes">
            {patients?.map((patient) => (
                <Select.Option key={`patient_${patient.patient_id}`} value={patient.patient_id}>
                    {patient.name}
                </Select.Option>
            ))}
        </Select.OptGroup>;
    };

    const defaultSelectedPatients = document?.patients?.map(patient => patient.patient_id) || [];
    const defaultDate = dayjs(document.document_date);

    return (
        <Card style={{ padding: "20px" }}>
            <Flex vertical gap="small">
                <Typography.Title level={2} strong>Metadados</Typography.Title>
                <Flex vertical justify="space-between" gap="0.5rem" style={{ display: "flex", width: "100%" }} >
                    <Typography.Text type="secondary" strong>Data de admissão</Typography.Text>
                    <DatePicker value={defaultDate} format="DD-MM-YYYY" onChange={handleDateChange} />

                    <Typography.Text type="secondary" strong>Paciente</Typography.Text>
                    <Select
                        size="large"
                        mode="tags"
                        style={{ width: "100%" }}
                        loading={isLoadingDocument || isLoadingPatients}
                        placeholder="Selecione um paciente"
                        onChange={handleChange}
                        defaultValue={defaultSelectedPatients} >
                        {renderIdentifiedPatients()}
                        {renderAllPatients()}
                    </Select>
                </Flex>
            </Flex>
        </Card>
    );
};

export default ReviewMetadata;
