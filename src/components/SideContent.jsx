import React from "react";
import { Flex, Statistic, Row, Col } from 'antd';
import ContentSidebar from "./ContentSidebar";
import { useParams } from "react-router-dom";

const SideContent = () => {
    const { document_id } = useParams();
    const jsonData = {
        CPF: 123,
        Sacarose: 123,
        'Ano da carreira': 123,
    };
    const renderSideContent = () => {
        if (document_id) {
            console.log(document_id)
            return <Row gutter={[16, 16]}>
                {[jsonData].map(([key, value], index) => (
                    <Col span={8} key={index}>
                        <Statistic
                            title={key}
                            value={value !== null ? value : 'N/A'}
                        />
                    </Col>
                ))}
            </Row>;
        }
    }

    return <Flex vertical gap="2.3rem" style={{ width: 350 }}>
        <ContentSidebar />
        {renderSideContent()}
    </Flex>
}
export default SideContent;