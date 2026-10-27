import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addVehiculo } from "./vehiculosSlice";

export default function VehiculoForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [vehiculo, setVehiculo] = useState({
    matricula: "",
    marca: "",
    modelo: "",
    anioMatriculacion: 2020,
    combustible: "Gasolina",
    itvVigente: true,
    seguroVigente: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setVehiculo({ ...vehiculo, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addVehiculo(vehiculo));
    setVehiculo({
      matricula: "",
      marca: "",
      modelo: "",
      anioMatriculacion: 2020,
      combustible: "Gasolina",
      itvVigente: true,
      seguroVigente: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="vehiculo-form">
      <input name="matricula" value={vehiculo.matricula} onChange={handleChange} placeholder="Matrícula" required />
      <input name="marca" value={vehiculo.marca} onChange={handleChange} placeholder="Marca" required />
      <input name="modelo" value={vehiculo.modelo} onChange={handleChange} placeholder="Modelo" required />
      <input
        type="number"
        name="anioMatriculacion"
        value={vehiculo.anioMatriculacion}
        onChange={handleChange}
        placeholder="Año"
        required
      />
      <select name="combustible" value={vehiculo.combustible} onChange={handleChange}>
        <option>Gasolina</option>
        <option>Diésel</option>
        <option>Eléctrico</option>
        <option>Híbrido</option>
      </select>
      <label>
        ITV vigente
        <input type="checkbox" name="itvVigente" checked={vehiculo.itvVigente} onChange={handleChange} />
      </label>
      <label>
        Seguro vigente
        <input type="checkbox" name="seguroVigente" checked={vehiculo.seguroVigente} onChange={handleChange} />
      </label>
      <button type="submit">➕ Añadir vehículo</button>
    </form>
  );
}
