import { Card, Skeleton } from "antd";

const Loading = () => (
    <div style={{ width: 650, display: "flex", flexDirection: "column", gap: "3.2rem" }}>
        <Card style={{ height: 260, padding: "20px" }}>
            <Skeleton active />
        </Card>
    </div>
);

export default Loading;
