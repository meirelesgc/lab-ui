import { Flex } from "antd";
import PatientInfo from "./PatientInfo";
import DocumentData from "./DocumentData";

const SideContent = ({ id: document_id }) => {

    return <Flex vertical gap='large'>
        <PatientInfo id={document_id} />
        <DocumentData id={document_id} />
    </Flex>

};

export default SideContent;
