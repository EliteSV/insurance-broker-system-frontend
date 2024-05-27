import React, { useState } from "react";
import { Button, Space, Table, Row, Col, Select } from "antd";
import type { TableProps, TableColumnType } from "antd";
import { PolizaPorEstado } from "../../types/Poliza";
import { exportToPDF, exportToExcel } from "../../utils/exporters";
import dayjs from "dayjs";

const { Option } = Select;

type TablaPolizasPorEstadoProps = {
  data: PolizaPorEstado;
  isLoading: boolean;
};

const TablaPolizasPorEstado: React.FC<TablaPolizasPorEstadoProps> = ({
  data = { vigentes: [], vencidas: [], expiradas: [], canceladas: [] },
  isLoading,
}) => {
  const [selectedType, setSelectedType] =
    useState<keyof PolizaPorEstado>("vigentes");

  const handleChange = (value: keyof PolizaPorEstado) => {
    setSelectedType(value);
  };

  const columns: TableProps<PolizaPorEstado["vigentes"][number]>["columns"] = [
    {
      title: "Codigo",
      dataIndex: "codigo",
      key: "codigo",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Monto",
      dataIndex: "monto",
      key: "monto",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Cliente",
      dataIndex: ["cliente", "nombre"],
      key: "cliente",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Aseguradora",
      dataIndex: ["aseguradora", "nombre"],
      key: "aseguradora",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Tipo de Poliza",
      dataIndex: ["tipo_poliza", "nombre"],
      key: "tipo_poliza",
      responsive: ["xs", "sm", "md", "lg"],
    },
  ];

  const isColumnType = (
    column: any
  ): column is TableColumnType<PolizaPorEstado["vigentes"][number]> => {
    return (
      (column as TableColumnType<PolizaPorEstado["vigentes"][number]>)
        .dataIndex !== undefined
    );
  };

  const handleExportToPDF = () => {
    const exportColumns = columns.filter(isColumnType).map((col) => ({
      title: col.title as string,
      dataIndex: col.dataIndex as keyof PolizaPorEstado["vigentes"][number],
    }));
    console.log("Exported columns", exportColumns);
    exportToPDF(
      data[selectedType],
      exportColumns,
      `Polizas ${selectedType} ${dayjs().format("YYYY-MM-DD")}`
    );
  };

  const handleExportToExcel = () => {
    const exportColumns = columns.filter(isColumnType).map((col) => ({
      title: col.title as string,
      dataIndex: col.dataIndex as keyof PolizaPorEstado["vigentes"][number],
    }));
    exportToExcel(
      data[selectedType],
      exportColumns,
      `Polizas ${selectedType} ${dayjs().format("YYYY-MM-DD")}`
    );
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col>
          <Select
            defaultValue="vigentes"
            style={{ width: 200 }}
            onChange={handleChange}
          >
            {Object.keys(data).map((key) => (
              <Option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Option>
            ))}
          </Select>
        </Col>
        <Col>
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
        dataSource={data[selectedType]}
        loading={isLoading}
        scroll={{ x: 800 }}
      />
    </>
  );
};

export default TablaPolizasPorEstado;
