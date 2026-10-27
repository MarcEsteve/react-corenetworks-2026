import type { User } from "../types/user";

const BASE =
  "https://dgtdb-706d2-default-rtdb.europe-west1.firebasedatabase.app";

export async function listUsers(): Promise<User[]> {
  const res = await fetch(`${BASE}/usuarios.json`);
  if (!res.ok) throw new Error("Error listando usuarios");
  const data = await res.json(); // { key1: {...}, key2: {...} } | null
  if (!data) return [];
  return Object.entries(data).map(([id, val]: [string, any]) => ({
    id,
    ...val,
  }));
}

export async function createUser(payload: Omit<User, "id">): Promise<string> {
  const res = await fetch(`${BASE}/usuarios.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error creando usuario");
  const data = await res.json(); // { name: "<generatedKey>" }
  return data.name;
}

export async function updateUser(
  id: string,
  partial: Partial<Omit<User, "id">>,
): Promise<void> {
  const res = await fetch(`${BASE}/usuarios/${id}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(partial),
  });
  if (!res.ok) throw new Error("Error actualizando usuario");
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`${BASE}/usuarios/${id}.json`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error eliminando usuario");
}
