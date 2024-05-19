import dayjs from "dayjs";
import { Button, Space, Table, Row, Col } from "antd";
import type { TableProps, TableColumnType } from "antd";
import { Cliente } from "../../types/Cliente";
import { exportToPDF, exportToExcel } from "../../utils/exporters";

type TablaClientesConMoraProps = {
  data: Cliente[];
  isLoading: boolean;
};

const TablaClientesConMora: React.FC<TablaClientesConMoraProps> = ({
  data,
  isLoading,
}) => {
  const columns: TableProps<Cliente>["columns"] = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Telefono",
      dataIndex: "telefono",
      key: "telefono",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "DUI",
      dataIndex: "dui",
      key: "dui",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "NIT",
      dataIndex: "nit",
      key: "nit",
      responsive: ["xs", "sm", "md", "lg"],
    },
  ];

  const isColumnType = (column: any): column is TableColumnType<Cliente> => {
    return (column as TableColumnType<Cliente>).dataIndex !== undefined;
  };

  const handleExportToPDF = () => {
    const exportColumns = columns.filter(isColumnType).map((col) => ({
      title: col.title as string,
      dataIndex: col.dataIndex as keyof Cliente,
    }));
    exportToPDF(
      data,
      exportColumns,
      `Clientes en mora ${dayjs().format("YYYY-MM-DD")}`
    );
  };

  const handleExportToExcel = () => {
    const exportColumns = columns.filter(isColumnType).map((col) => ({
      title: col.title as string,
      dataIndex: col.dataIndex as keyof Cliente,
    }));
    exportToExcel(
      data,
      exportColumns,
      `Clientes en mora ${dayjs().format("YYYY-MM-DD")}`
    );
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Space style={{ marginBottom: 16 }}>
            <Button type="primary" onClick={handleExportToPDF}>
              PDF
            </Button>
            <Button type="primary" onClick={handleExportToExcel}>
              Excel
            </Button>
          </Space>
        </Col>
      </Row>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        scroll={{ x: 800 }}
      />
    </>
  );
};

export default TablaClientesConMora;
