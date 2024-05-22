import React from "react";
import { Col, Row, Button, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

type Document = {
  id: number;
  url: string;
};

type DocumentListProps = {
  title: string;
  documents: Document[];
  onRemove?: (url: string) => void;
};

const DocumentList: React.FC<DocumentListProps> = ({
  title,
  documents,
  onRemove,
}) => (
  <div style={{ padding: 16 }}>
    <Typography.Title level={4}>{title}</Typography.Title>
    <Row gutter={[16, 16]} style={{ flexDirection: "column" }}>
      {documents.map((item) => {
        const fileName = item.url.split("/").pop() || "Documento";
        const fileExtension = fileName.split(".").pop() || "";

        return (
          <Col xs={24} key={item.id}>
            <div
              style={{
                position: "relative",
                border: "1px solid #d9d9d9",
                borderRadius: 4,
                padding: 16,
                textAlign: "center",
                backgroundColor: "#fafafa",
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => window.open(item.url, "_blank")}
            >
              {onRemove && (
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(item.url);
                  }}
                  style={{ position: "absolute", top: 8, right: 8 }}
                />
              )}
              <div style={{ fontSize: 24, color: "gray", marginBottom: 8 }}>
                {fileExtension.toUpperCase()}
              </div>
              <Text ellipsis={{ tooltip: fileName }}>{fileName}</Text>
            </div>
          </Col>
        );
      })}
    </Row>
  </div>
);

export default DocumentList;
