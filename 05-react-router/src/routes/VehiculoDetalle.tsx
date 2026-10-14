import { useParams } from "react-router-dom";

export default function VehiculoDetalle() {
  const { matricula } = useParams<{ matricula: string }>();
  return <h2>Detalle de vehículo: {matricula}</h2>;
}
