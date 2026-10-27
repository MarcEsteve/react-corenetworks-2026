import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export interface Vehiculo {
  id?: string;
  matricula: string;
  marca: string;
  modelo: string;
  anioMatriculacion: number;
  combustible: string;
  itvVigente: boolean;
  seguroVigente: boolean;
}

interface VehiculosState {
  lista: Vehiculo[];
  loading: boolean;
  error: string | null;
}

const initialState: VehiculosState = {
  lista: [],
  loading: false,
  error: null,
};

// 🔹 Thunks asincrónicos (CRUD)
export const fetchVehiculos = createAsyncThunk("vehiculos/fetch", async () => {
  const query = await getDocs(collection(db, "vehiculos"));
  return query.docs.map((d) => ({ id: d.id, ...d.data() })) as Vehiculo[];
});

export const addVehiculo = createAsyncThunk("vehiculos/add", async (vehiculo: Vehiculo) => {
  const docRef = await addDoc(collection(db, "vehiculos"), vehiculo);
  return { id: docRef.id, ...vehiculo };
});

export const updateVehiculo = createAsyncThunk(
  "vehiculos/update",
  async ({ id, ...data }: Vehiculo) => {
    const ref = doc(db, "vehiculos", id!);
    await updateDoc(ref, data);
    return { id, ...data };
  }
);

export const deleteVehiculo = createAsyncThunk("vehiculos/delete", async (id: string) => {
  await deleteDoc(doc(db, "vehiculos", id));
  return id;
});

// 🔹 Slice principal
const vehiculosSlice = createSlice({
  name: "vehiculos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchVehiculos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVehiculos.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchVehiculos.rejected, (state) => {
        state.loading = false;
        state.error = "Error al obtener vehículos";
      })
      // ADD
      .addCase(addVehiculo.fulfilled, (state, action) => {
        state.lista.push(action.payload);
      })
      // UPDATE
      .addCase(updateVehiculo.fulfilled, (state, action) => {
        const i = state.lista.findIndex((v) => v.id === action.payload.id);
        if (i !== -1) state.lista[i] = action.payload;
      })
      // DELETE
      .addCase(deleteVehiculo.fulfilled, (state, action) => {
        state.lista = state.lista.filter((v) => v.id !== action.payload);
      });
  },
});

export default vehiculosSlice.reducer;
