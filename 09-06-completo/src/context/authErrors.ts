export function getFirebaseErrorMessage(error: unknown) {
  if (error instanceof Error) {
    const code = "code" in error ? String(error.code) : "";
    if (code === "auth/invalid-credential") return "Correo o contraseña incorrectos.";
    if (code === "auth/email-already-in-use") return "Ese correo ya está registrado.";
    if (code === "auth/weak-password") return "La contraseña debe tener al menos 6 caracteres.";
    if (code === "auth/invalid-email") return "Introduce un correo electrónico válido.";
    return error.message;
  }
  return "Ha ocurrido un error inesperado.";
}
