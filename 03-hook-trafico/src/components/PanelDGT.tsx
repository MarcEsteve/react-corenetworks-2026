type Props = {
  titulo: string;
  children: React.ReactNode;
};

export default function PanelDGT({ titulo, children }: Props) {
  return (
    <section style={{
      border: "2px solid #047857",
      borderRadius: "8px",
      padding: "1rem",
      marginTop: "1rem"
    }}>
      <h2>📢 {titulo}</h2>
      {children}
    </section>
  );
}