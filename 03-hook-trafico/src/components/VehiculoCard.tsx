type Props = {
  matricula: string;
  modelo: string;
  color: string;
  itv: boolean;
};

export default function VehiculoCard({ matricula, modelo, color, itv }: Props) {
  return (
    <article>
      <h3>🚗 {modelo}</h3>
      <p>Matrícula: {matricula}</p>
      <p>Color: {color}</p>
      <p>ITV: {itv ? "Vigente" : "Caducada"}</p>
    </article>
  );
}