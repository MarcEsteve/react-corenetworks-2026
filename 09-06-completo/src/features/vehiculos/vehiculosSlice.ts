import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import type { Vehiculo, VehiculoInput } from "../../types/vehiculo";

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

function requireDatabase() {
  if (!db) throw new Error("Configura Firebase para gestionar vehículos.");
  return db;
}

export const fetchVehiculos = createAsyncThunk<
  Vehiculo[],
  void,
  { rejectValue: string }
>("vehiculos/fetch", async (_, { rejectWithValue }) => {
  try {
    const database = requireDatabase();
    const snapshot = await getDocs(collection(database, "vehiculos"));
    return snapshot.docs.map((vehicleDoc) => ({
      id: vehicleDoc.id,
      ...vehicleDoc.data(),
    })) as Vehiculo[];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "No se pudo cargar el listado.",
    );
  }
});

export const createVehiculo = createAsyncThunk<
  Vehiculo,
  VehiculoInput,
  { rejectValue: string }
>("vehiculos/create", async (vehicle, { rejectWithValue }) => {
  try {
    const database = requireDatabase();
    const createdBy = auth?.currentUser?.uid;
    if (!createdBy) throw new Error("La sesión ha caducado. Inicia sesión de nuevo.");
    const document = await addDoc(collection(database, "vehiculos"), {
      ...vehicle,
      createdBy,
    });
    return { ...vehicle, id: document.id, createdBy };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "No se pudo guardar el vehículo.",
    );
  }
});

export const updateVehiculo = createAsyncThunk<
  Vehiculo,
  Vehiculo,
  { rejectValue: string }
>("vehiculos/update", async ({ id, ...vehicle }, { rejectWithValue }) => {
  try {
    const database = requireDatabase();
    await updateDoc(doc(database, "vehiculos", id), vehicle);
    return { id, ...vehicle };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "No se pudo actualizar el vehículo.",
    );
  }
});

export const deleteVehiculo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("vehiculos/delete", async (id, { rejectWithValue }) => {
  try {
    const database = requireDatabase();
    await deleteDoc(doc(database, "vehiculos", id));
    return id;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "No se pudo eliminar el vehículo.",
    );
  }
});

const vehiculosSlice = createSlice({
  name: "vehiculos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehiculos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehiculos.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchVehiculos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Error al cargar vehículos.";
      })
      .addCase(createVehiculo.fulfilled, (state, action) => {
        state.lista.push(action.payload);
      })
      .addCase(updateVehiculo.fulfilled, (state, action) => {
        const index = state.lista.findIndex((vehicle) => vehicle.id === action.payload.id);
        if (index !== -1) state.lista[index] = action.payload;
      })
      .addCase(deleteVehiculo.fulfilled, (state, action) => {
        state.lista = state.lista.filter((vehicle) => vehicle.id !== action.payload);
      });
  },
});

export default vehiculosSlice.reducer;
