import React from "react";
import { Button, Space, Table, Row, Col } from "antd";
import type { TableProps, TableColumnType } from "antd";
import dayjs from "dayjs";
import { exportToPDF, exportToExcel } from "../../utils/exporters";
import { VigenciaPoliza } from "../../types/Poliza";

type TablaPolizasPorVencerProps = {
  data: VigenciaPoliza[];
  isLoading: boolean;
};

const TablaPolizasPorVencer: React.FC<TablaPolizasPorVencerProps> = ({
  data,
  isLoading,
}) => {
  const columns: TableProps<VigenciaPoliza>["columns"] = [
    {
      title: "Fecha Inicio",
      dataIndex: "fecha_inicio",
      key: "fecha_inicio",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Fecha Vencimiento",
      dataIndex: "fecha_vencimiento",
      key: "fecha_vencimiento",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Nombre de Poliza",
      dataIndex: ["poliza", "nombre"],
      key: "poliza_nombre",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Nombre de Aseguradora",
      dataIndex: ["poliza", "aseguradora", "nombre"],
      key: "aseguradora_nombre",
      responsive: ["xs", "sm", "md", "lg"],
    },
  ];

  const isColumnType = (
    column: any
  ): column is TableColumnType<VigenciaPoliza> => {
    return (column as TableColumnType<VigenciaPoliza>).dataIndex !== undefined;
  };

  const handleExportToPDF = () => {
    const exportColumns = columns.filter(isColumnType).map((col) => ({
      title: col.title as string,
      dataIndex: col.dataIndex as keyof VigenciaPoliza,
    }));
    exportToPDF(
      data,
      exportColumns,
      `Polizas Detalles ${dayjs().format("YYYY-MM-DD")}`
    );
  };

  const handleExportToExcel = () => {
    const exportColumns = columns.filter(isColumnType).map((col) => ({
      title: col.title as string,
      dataIndex: col.dataIndex as keyof VigenciaPoliza,
    }));
    exportToExcel(
      data,
      exportColumns,
      `Polizas Detalles ${dayjs().format("YYYY-MM-DD")}`
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

export default TablaPolizasPorVencer;
