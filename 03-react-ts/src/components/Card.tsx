import Saludo from './Saludo';

type Props = {
  titulo: string;
  contenido: string;
};

export default function Card({ titulo, contenido }: Props) {
  return (
    <div
      style={{
        border: "2px solid #333",
        borderRadius: "10px",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h3>{titulo}</h3>
      <p>{contenido}</p>
      <Saludo nombre="Pepito" />
    </div>
  );
}
