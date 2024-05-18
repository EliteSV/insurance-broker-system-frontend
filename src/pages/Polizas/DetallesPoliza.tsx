import { Typography } from 'antd';
import { TipoPoliza } from '../../types/Poliza';

const { Text } = Typography;

type DetallesPolizaProps = {
    tipo_poliza_id: number;
    detalles: any;
}

function DetallesPoliza({ tipo_poliza_id, detalles }: DetallesPolizaProps) {
    return (
        <>
            {tipo_poliza_id === TipoPoliza.Incendio && (
                <>
                    <Text strong>Propietario: </Text>
                    {detalles.propietario}
                    <br />
                    <Text strong>Dirección propiedad: </Text>
                    {detalles.direccion_propiedad}
                    <br />
                    <Text strong>Tipo propiedad: </Text>
                    {detalles.tipo_propiedad}
                    <br />
                    <Text strong>Valor asegurado: </Text>
                    {detalles.valor_asegurado}
                    <br />
                    <Text strong>Año construcción: </Text>
                    {detalles.anio_construccion}
                    <br />
                    <Text strong>Materiales construcción: </Text>
                    {detalles.materiales_construccion}
                    <br />
                    <Text strong>Sistemas seguridad: </Text>
                    {detalles.sistemas_seguridad}
                    <br />
                </>
            )}
            {tipo_poliza_id === TipoPoliza.Automovil && (
                <>
                    <Text strong>Propietario: </Text>
                    {detalles.propietario}
                    <br />
                    <Text strong>Valor asegurado: </Text>
                    {detalles.valor_asegurado}
                    <br />
                    <Text strong>Tipo vehículo: </Text>
                    {detalles.tipo_vehiculo}
                    <br />
                    <Text strong>Marca: </Text>
                    {detalles.marca}
                    <br />
                    <Text strong>Modelo: </Text>
                    {detalles.modelo}
                    <br />
                    <Text strong>Número motor: </Text>
                    {detalles.numero_motor}
                    <br />
                    <Text strong>Número chasis: </Text>
                    {detalles.numero_chasis}
                    <br />
                    <Text strong>Capacidad: </Text>
                    {detalles.capacidad}
                    <br />
                    <Text strong>Año fabricación: </Text>
                    {detalles.anio_fabricacion}
                    <br />
                    <Text strong>Placa: </Text>
                    {detalles.placa}
                    <br />
                    <Text strong>Color: </Text>
                    {detalles.color}
                    <br />
                    <Text strong>Combustible: </Text>
                    {detalles.combustible}
                    <br />
                    <Text strong>Toneladas: </Text>
                    {detalles.toneladas}
                    <br />
                </>
            )}
            {tipo_poliza_id === TipoPoliza.Medico && (
                <>
                    <Text strong>Nombre asegurado: </Text>
                    {detalles.nombre_asegurado}
                    <br />
                    <Text strong>Fecha nacimiento: </Text>
                    {detalles.fecha_nacimiento}
                    <br />
                    <Text strong>Género: </Text>
                    {detalles.genero}
                    <br />
                    <Text strong>Número documento: </Text>
                    {detalles.numero_documento}
                    <br />
                    <Text strong>Valor asegurado: </Text>
                    {detalles.valor_asegurado}
                    <br />
                    <Text strong>Tipo plan:</Text>
                    {detalles.tipo_plan}
                    <br />
                    <Text strong>Coberturas adicionales:</Text>
                    {detalles.coberturas_adicionales}
                    <br />
                </>
            )}
            {tipo_poliza_id === TipoPoliza.Vida && (
                <>
                    <Text strong>Nombre asegurado: </Text>
                    {detalles.nombre_asegurado}
                    <br />
                    <Text strong>Fecha nacimiento: </Text>
                    {detalles.fecha_nacimiento}
                    <br />
                    <Text strong>Género: </Text>
                    {detalles.genero}
                    <br />
                    <Text strong>Número documento: </Text>
                    {detalles.numero_documento}
                    <br />
                    <Text strong>Valor asegurado: </Text>
                    {detalles.valor_asegurado}
                    <br />
                    <Text strong>Beneficiarios: </Text>
                    {detalles.beneficiarios}
                    <br />
                </>

            )}
        </>
    )
}

export default DetallesPoliza