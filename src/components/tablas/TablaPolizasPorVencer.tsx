import { useState, useEffect } from 'react';
import { Button, Space, Table, Row, Col, Select } from 'antd';
import type { TableProps, TableColumnType } from 'antd';
import dayjs from 'dayjs';
import { exportToPDF, exportToExcel } from '../../utils/exporters';
import { VigenciaPoliza } from '../../types/Poliza';
import { useGetPolizasPorVencerQuery } from '../../api/api';

const { Option } = Select;

const TablaPolizasPorVencer = () => {
  const [weeks, setWeeks] = useState(1);

  const { data, refetch, isLoading } = useGetPolizasPorVencerQuery(weeks);

  useEffect(() => {
    refetch();
  }, [weeks, refetch]);

  const handleChange = (value: string) => {
    switch (value) {
      case '1 Mes':
        setWeeks(4);
        break;
      case '2 Semanas':
        setWeeks(2);
        break;
      case '1 Semana':
      default:
        setWeeks(1);
        break;
    }
  };

  const columns: TableProps<VigenciaPoliza>['columns'] = [
    {
      title: 'Fecha Inicio',
      dataIndex: 'fecha_inicio',
      key: 'fecha_inicio',
      responsive: ['lg'],
    },
    {
      title: 'Fecha Vencimiento',
      dataIndex: 'fecha_vencimiento',
      key: 'fecha_vencimiento',
    },
    {
      title: 'Código de Poliza',
      dataIndex: ['poliza', 'codigo'],
      key: 'poliza_codigo',
    },
    {
      title: 'Nombre de Poliza',
      dataIndex: ['poliza', 'nombre'],
      key: 'poliza_nombre',
      responsive: ['lg'],
    },
    {
      title: 'Nombre de Aseguradora',
      dataIndex: ['poliza', 'aseguradora', 'nombre'],
      key: 'aseguradora_nombre',
      responsive: ['lg'],
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
      data || [],
      exportColumns,
      `Polizas por vencer ${dayjs().format('YYYY-MM-DD')}`
    );
  };

  const handleExportToExcel = () => {
    const exportColumns = columns.filter(isColumnType).map((col) => ({
      title: col.title as string,
      dataIndex: col.dataIndex as keyof VigenciaPoliza,
    }));
    exportToExcel(
      data || [],
      exportColumns,
      `Polizas por vencer ${dayjs().format('YYYY-MM-DD')}`
    );
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col xs={24} sm={12}>
          <Select
            defaultValue="1 Semana"
            style={{ width: 200 }}
            onChange={handleChange}
          >
            <Option value="1 Semana">1 Semana</Option>
            <Option value="2 Semanas">2 Semanas</Option>
            <Option value="1 Mes">1 Mes</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
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
      />
    </>
  );
};

export default TablaPolizasPorVencer;
