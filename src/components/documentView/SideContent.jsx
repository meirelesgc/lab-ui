import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Button, Card, Flex, Skeleton, message } from 'antd';
import { DiffOutlined, SnippetsOutlined, CheckOutlined, RedoOutlined } from '@ant-design/icons';

import Banner from '../Banner';
import CustomTable from './Table';
import CustomCard from './Card';

import useDocument from '../../hooks/useDocument';
import useUpdateDocumentData from '../../hooks/useUpdateDocumentData';
import useCreateDocumentData from '../../hooks/useCreateDocumentData';

const SideContent = ({ document_id }) => {
    const { data, isLoading } = useDocument(document_id);

    const [option, setOption] = useState('data');
    const [evalData, setEvalData] = useState([]);
    const [docDate, setDocDate] = useState([]);
    const [docPatient, setDocPatient] = useState([]);

    const { mutate: updateData } = useUpdateDocumentData();
    const { mutate: createData, isLoading: isCreating } = useCreateDocumentData();

    useEffect(() => {
        if (!isLoading && data) {
            setDocDate(data.document_date ? new Date(data.document_date) : null);
            setDocPatient(data.unverified_patient?.map((p) => p.patient_id) || []);
            const initialEvalData = data.document_data.evaluated_document_data
                ? Object.keys(data.document_data.evaluated_document_data).reduce((acc, key) => {
                    acc[key] = data.document_data.evaluated_document_data[key];
                    return acc;
                }, {})
                : data.document_data.document_data;
            setEvalData(initialEvalData);
        }
    }, [data, isLoading]);

    if (isLoading || isCreating)
        return <Skeleton />;

    const created_at = new Date(data.created_at).toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,
    });

    const handleDataButton = {
        label: "Dados",
        icon: <SnippetsOutlined />,
        type: "primary",
        onClick: () => setOption('data'),
    };

    const handleMetadataButton = {
        label: "Metadados",
        icon: <DiffOutlined />,
        type: 'default',
        onClick: () => setOption('meta'),
    };

    const options = {
        'meta': <CustomCard rawData={data}
            setDocDate={setDocDate}
            setDocPatient={setDocPatient} />,
        'data': <CustomTable rawData={data}
            setEvalData={setEvalData}
            evalData={evalData} />
    }

    const validateData = (data) => {
        console.log(data)
        if (!Object.values(data).every((values) => values.length <= 1)) {
            message.error('Os dados devem conter exatamente um único valor.');
            return false;
        }

        return true;
    };

    const validatePatient = (patient) => {
        if (patient.length !== 1) {
            message.error('Deve haver exatamente um paciente selecionado.');
            return false;
        }
        return true;
    };

    const handleSendClick = () => {
        if (validateData(evalData) && validatePatient(docPatient)) {
            const formattedDate = docDate ? dayjs(docDate).toISOString() : docDate.created_at;
            const dataToSubmit = {
                document_id: document_id,
                data_id: data.document_data.data_id, document_data: evalData, rating: 0, patient_id: docPatient, document_date: formattedDate,
            };
            updateData(dataToSubmit);
            message.success('Dados atualizados')
        }
    };

    return <Flex vertical gap="2.3rem" justify='space-between'>
        <Banner
            title={data.name.slice(0, -4)}
            description={'Adicionado em ' + created_at}
            buttons={[handleDataButton, handleMetadataButton]} />
        {options[option]}
        <Card >
            <Flex justify='flex-start' gap='large'>
                <Button size="large" type='primary' icon={<CheckOutlined />} onClick={handleSendClick} >
                    Enviar
                </Button>
                <Button size="large" icon={<RedoOutlined />} onClick={() => createData(document_id)}>
                    Refazer extração
                </Button>
            </Flex>
        </Card>
    </Flex>
};

export default SideContent;
