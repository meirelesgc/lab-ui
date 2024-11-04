import { Flex, Button } from "antd";
import PatientInfo from "./PatientInfo";
import DocumentData from "./DocumentData";
import useCreateOpenAiJson from '../../hooks/useCreateOpenAiJson';

const SideContent = ({ id: document_id }) => {
    const { mutate } = useCreateOpenAiJson();

    const handleButtonClick = () => {
        mutate(document_id);
    };

    return (
        <Flex vertical gap='large'>
            {/* <PatientInfo id={document_id} /> */}
            <Button onClick={handleButtonClick}>Recarregar os dados</Button>
            <DocumentData id={document_id} />
        </Flex>
    );
};

export default SideContent;
