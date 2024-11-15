import { Card } from "antd";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useDocument from "../../hooks/useDocument";
import Loading from "../Loading";
import DocumentViewer from "./DocumentViewer";

const ReviewData = ({ setEvalData }) => {
    const { document_id } = useParams();
    const { data, isLoading } = useDocument(document_id);

    if (isLoading) {
        return <Loading />;
    }

    const document_data = Object.keys(data.document_data.document_data).map((key, index) => ({
        key: index,
        attribute: key,
        values: data.document_data.document_data[key],
    }));

    const [evaluatedData, setLocalEvaluatedData] = useState(
        data.document_data.evaluated_document_data
            ? Object.keys(data.document_data.evaluated_document_data).map((key, index) => ({
                key: index,
                attribute: key,
                values: data.document_data.evaluated_document_data[key],
            }))
            : document_data
    );

    const updateEvaluatedData = (index, newValues) => {
        const updatedData = [...evaluatedData];
        updatedData[index] = { ...updatedData[index], values: newValues };
        setLocalEvaluatedData(updatedData);
    };

    useEffect(() => {
        setEvalData(evaluatedData);
    }, [evaluatedData, setEvalData]);

    return (
        <Card style={{ padding: "20px" }}>
            <DocumentViewer
                documentData={document_data}
                evaluatedDocumentData={evaluatedData}
                updateEvaluatedData={updateEvaluatedData} />
        </Card>
    );
};

export default ReviewData;
