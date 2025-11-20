import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import { useNavigate } from "react-router-dom"; // <-- IMPORTANTE

function Usuario() {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);

  const navigate = useNavigate(); // <-- Para redirigir

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setNewName(currentUser.displayName || "");
    }
  }, []);

  // Cambiar nombre y/o foto
  const handleUpdateProfile = async () => {
    try {
      const updates = { displayName: newName };
      if (newPhoto) {
        updates.photoURL = newPhoto;
      }

      await updateProfile(auth.currentUser, updates);
      setUser({ ...auth.currentUser });

      alert("Perfil actualizado correctamente");

      navigate("/peliculas"); // <-- REDIRECCIÓN

      setNewPhoto(null);
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el perfil");
    }
  };

  // Cambiar contraseña seguro
  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert("Debes escribir la contraseña actual y la nueva.");
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert("Usuario no autenticado.");
        return;
      }

      const providerId = currentUser.providerData[0].providerId;
      if (providerId !== "password") {
        alert(
          "No puedes cambiar la contraseña porque tu cuenta se autenticó con Google, Facebook u otro proveedor."
        );
        return;
      }

      // Reautenticación
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);

      // Cambiar contraseña
      await updatePassword(currentUser, newPassword);

      alert("Contraseña actualizada correctamente");

      navigate("/peliculas"); // <-- REDIRECCIÓN

      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/wrong-password") {
        alert("La contraseña actual es incorrecta.");
      } else if (error.code === "auth/weak-password") {
        alert("La nueva contraseña es demasiado débil (mínimo 6 caracteres).");
      } else {
        alert("Error al actualizar la contraseña. Intenta nuevamente.");
      }
    }
  };

  if (!user)
    return (
      <p className="text-center text-gray-400 mt-10 text-lg animate-pulse">
        Cargando usuario...
      </p>
    );

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-black via-[#0c0c0c] to-[#1a1a1a] flex justify-center items-center">

      <div className="w-full max-w-3xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10 shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center gap-8 mb-12">
          <div className="relative">
            <img
              src={user.photoURL || "/usuario.jpg"}
              alt="foto"
              className="w-32 h-32 rounded-2xl object-cover border-2 border-[#e50914] shadow-[0_0_25px_#e50914aa]"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black animate-pulse"></span>
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-wide drop-shadow-xl">
              {user.displayName || "Usuario"}
            </h1>
            <button
              onClick={handleUpdateProfile}
              className="mt-2 text-[#e50914] hover:text-red-400 transition-all text-sm"
            >
              Guardar cambios del perfil
            </button>
          </div>
        </div>

        {/* CAMBIAR NOMBRE Y FOTO */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Editar perfil</h2>

          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-white/20 focus:ring-2 focus:ring-[#e50914] outline-none transition-all mb-4"
            placeholder="Nuevo nombre"
          />

          <button
            onClick={handleUpdateProfile}
            className="mt-3 w-full py-3 bg-[#e50914] hover:bg-[#f6121d] rounded-lg font-semibold text-white transition-all shadow-lg"
          >
            Guardar perfil
          </button>
        </div>

        {/* CAMBIAR CONTRASEÑA */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="text-2xl font-semibold text-white mb-4">Cambiar contraseña</h2>

          <label className="text-gray-300 text-sm mb-2 block">Contraseña actual</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-white/20 mb-4 focus:ring-2 focus:ring-[#e50914] outline-none transition-all"
          />

          <label className="text-gray-300 text-sm mb-2 block">Nueva contraseña</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-white/20 mb-4 focus:ring-2 focus:ring-[#e50914] outline-none transition-all"
          />

          <button
            onClick={handleUpdatePassword}
            className="mt-3 w-full py-3 bg-gradient-to-r from-[#e50914] to-[#b00610] hover:opacity-90 rounded-lg text-white font-semibold shadow-xl transition-all"
          >
            Guardar contraseña
          </button>
        </div>

      </div>
    </div>
  );
}

export default Usuario;
