import { Button, Flex, message, Card } from 'antd';
import Banner from '../Banner';
import { RedoOutlined, CheckOutlined, DiffOutlined, SnippetsOutlined } from '@ant-design/icons';
import useDocument from '../../hooks/useDocument';
import { useParams } from "react-router-dom";
import ReviewData from '../reviews/ReviewData';
import ReviewMetadata from '../reviews/ReviewMetadata';
import Loading from '../Loading';
import { useState, useEffect } from "react";
import useCreateDocumentData from '../../hooks/useCreateDocumentData';
import useUpdateDocumentData from '../../hooks/useUpdateDocumentData';
import dayjs from 'dayjs';

const SideContent = () => {
    const { document_id } = useParams();
    const { mutate: createData, isLoading: isCreating } = useCreateDocumentData();
    const { mutate: updateData } = useUpdateDocumentData();
    const { data, isLoading } = useDocument(document_id);

    const [content, setContent] = useState('data');
    const [evalData, setEvalData] = useState([]);
    const [patient, setPatient] = useState([]);
    const [date, setDate] = useState('');

    useEffect(() => {
        if (data) {
            setPatient(data.patients.map(patient => patient.patient_id));
            setDate(data.document_date);
        }
    }, [data]);

    if (isLoading || isCreating) {
        return <Loading />;
    }

    const validateData = (data) => {
        for (const item of data) {
            if (item.values.length > 1) {
                message.error('Um dos itens não foi verificado: ' + item.attribute);
                return false;
            }
        }
        return true;
    };
    const validatePatient = (patient) => {
        if (patient.length > 1) {
            message.error('Selecione apenas um paciente');
            return false;
        }
        return true;
    };

    const formatSubmitData = (data) => {
        return data.reduce((acc, item) => {
            acc[item.attribute] = item.values;
            return acc;
        }, {});
    };

    const handleSendClick = () => {
        if (validateData(evalData) && validatePatient(patient)) {
            const submitData = formatSubmitData(evalData);
            const formattedDate = date ? dayjs(date).toISOString() : data.created_at;
            const dataToSubmit = {
                document_id: document_id, data_id: data.document_data.data_id, document_data: submitData, rating: 0, patient_id: patient, document_date: formattedDate,
            };
            updateData(dataToSubmit);
            message.success('Dados atualizados')
        }
    };

    const handleDataButton = {
        label: "Dados",
        icon: <SnippetsOutlined />,
        type: "primary",
        onClick: () => setContent('data'),
    };

    const handleMetadataButton = {
        label: "Metadados",
        icon: <DiffOutlined />,
        type: 'default',
        onClick: () => setContent('metadata'),
    };

    const created_at = new Date(data.created_at).toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,
    });

    const review = {
        metadata: <ReviewMetadata setPatient={setPatient} setDate={setDate} />,
        data: <ReviewData setEvalData={setEvalData} />,
    };

    return (
        <Flex vertical justify='space-between' style={{ width: 650 }}>
            <Flex vertical gap='3.2rem' >
                <Banner
                    title={data.name.slice(0, -4)}
                    description={'Adicionado em ' + created_at}
                    buttons={[handleDataButton, handleMetadataButton]}
                />
                {review[content]}
            </Flex>

            <Card style={{ padding: '20px' }}>
                <Flex justify='flex-start' gap='large'>
                    <Button size="large" type='primary' icon={<CheckOutlined />} onClick={handleSendClick}>
                        Enviar
                    </Button>
                    <Button size="large" icon={<RedoOutlined />} onClick={() => createData(document_id)}>
                        Refazer extração
                    </Button>
                </Flex>
            </Card>
        </Flex>
    );
};

export default SideContent;
