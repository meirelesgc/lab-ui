import { Flex } from "antd";
import PatientInfo from "./PatientInfo";


const SideContent = ({ id: document_id }) => {

    return <Flex>
        <PatientInfo id={document_id} />
    </Flex>

};

export default SideContent;
