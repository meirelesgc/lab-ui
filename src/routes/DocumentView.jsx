import { Splitter } from 'antd';
import { useParams } from 'react-router-dom';


import Document from '../components/documentView/Document';
import SideContent from '../components/documentView/SideContent';

const DocumentView = () => {
    const { document_id } = useParams();
    return <Splitter>
        <Splitter.Panel defaultSize="40%" min="20%" max="70%" >
            <Document document_id={document_id} />
        </Splitter.Panel>
        <Splitter.Panel style={{ padding: '20px' }}>
            <SideContent document_id={document_id} />
        </Splitter.Panel>
    </Splitter>
};

export default DocumentView;
