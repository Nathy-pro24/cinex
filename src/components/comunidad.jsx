import { useEffect, useRef, useState } from 'react'
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { db } from '../firebase'
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
} from 'firebase/firestore'

function Comunidad() {
    // usuario
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [foto, setFoto] = useState('')
    const [uid, setUid] = useState('')
    const [cargando, setCargando] = useState(true)

    // editar perfil
    const [nuevoNombre, setNuevoNombre] = useState('')
    const [nuevaFoto, setNuevaFoto] = useState('')

    // posts
    const [contenidoPost, setContenidoPost] = useState('')
    const [posts, setPosts] = useState([])

    // editar post
    const [editandoID, setEditandoID] = useState(null)
    const [nuevoContenido, setNuevoContenido] = useState('')

    // comentarios
    const [comentariosPorPost, setComentariosPorPost] = useState({})
    const [inputComentarioPorPost, setInputComentarioPorPost] = useState({})

    const auth = getAuth()
    const comentariosUnsubsRef = useRef({})

    const formatearFecha = (fecha) => {
        if (!fecha) return ''
        if (fecha.toDate) fecha = fecha.toDate()
        return fecha.toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    // detectar usuario
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
                setEmail(user.email)
                setNombre(user.displayName || 'Usuario sin nombre')
                setFoto(user.photoURL || '/usuario.jpg')
                setNuevoNombre(user.displayName || '')
                setNuevaFoto(user.photoURL || '')
            } else {
                setUid('')
                setEmail('')
                setNombre('')
                setFoto('/usuario.jpg')
            }
            setCargando(false)
        })

        return () => unsubscribe()
    }, [])

    // escuchar posts
    useEffect(() => {
        const q = query(collection(db, 'posts'), orderBy('fecha', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const lista = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
            setPosts(lista)
        })

        return () => unsubscribe()
    }, [])

    // escuchar comentarios por post
    useEffect(() => {
        posts.forEach((p) => {
            if (comentariosUnsubsRef.current[p.id]) return

            const q = query(collection(db, 'posts', p.id, 'comentarios'), orderBy('fecha', 'asc'))

            const unsub = onSnapshot(q, (snap) => {
                const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
                setComentariosPorPost((prev) => ({ ...prev, [p.id]: lista }))
            })

            comentariosUnsubsRef.current[p.id] = unsub
        })

        return () => {
            Object.values(comentariosUnsubsRef.current).forEach((unsub) => unsub())
        }
    }, [posts])

    // actualizar perfil
    const actualizarPerfil = async () => {
        const user = auth.currentUser
        if (!user) return alert('No hay un usuario activo')

        try {
            await updateProfile(user, {
                displayName: nuevoNombre || user.displayName,
                photoURL: nuevaFoto || user.photoURL,
            })

            alert('Perfil actualizado')
            setNombre(nuevoNombre || user.displayName)
            setFoto(nuevaFoto || '/usuario.jpg')
        } catch (err) {
            console.error(err)
            alert('Error al actualizar: ' + err.message)
        }
    }

    // crear post
    const crearPost = async () => {
        if (contenidoPost.trim() === '') return
        await addDoc(collection(db, 'posts'), {
            contenido: contenidoPost,
            fecha: serverTimestamp(),
            autor: nombre,
            autorFoto: foto || '/usuario.jpg',
            autorUid: uid,
            likes: [],
        })
        setContenidoPost('')
    }

    // like
    const toggleLike = async (post) => {
        const ref = doc(db, 'posts', post.id)
        const actuales = post.likes || []
        const nuevos = actuales.includes(uid)
            ? actuales.filter((id) => id !== uid)
            : [...actuales, uid]
        await updateDoc(ref, { likes: nuevos })
    }

    // editar post
    const guardarEdicion = async (id) => {
        await updateDoc(doc(db, 'posts', id), { contenido: nuevoContenido })
        setEditandoID(null)
    }

    // eliminar post
    const eliminarPost = async (id) => {
        if (!confirm('¿Eliminar este post?')) return
        await deleteDoc(doc(db, 'posts', id))
    }

    // agregar comentario
    const agregarComentario = async (postId) => {
        const texto = (inputComentarioPorPost[postId] || '').trim()
        if (!texto) return

        await addDoc(collection(db, 'posts', postId, 'comentarios'), {
            texto,
            autor: nombre,
            autorFoto: foto || '/usuario.jpg',
            autorUid: uid,
            fecha: serverTimestamp(),
        })

        setInputComentarioPorPost((prev) => ({ ...prev, [postId]: '' }))
    }

    // editar comentario
    const editarComentario = async (postId, comentario) => {
        const nuevoTexto = prompt('Editar comentario:', comentario.texto)
        if (!nuevoTexto || nuevoTexto.trim() === '') return

        await updateDoc(doc(db, 'posts', postId, 'comentarios', comentario.id), {
            texto: nuevoTexto,
        })
    }

    // eliminar comentario
    const eliminarComentario = async (postId, comentario) => {
        if (!confirm('¿Eliminar comentario?')) return

        await deleteDoc(doc(db, 'posts', postId, 'comentarios', comentario.id))
    }

    if (cargando) return <p className="text-center mt-10">Cargando...</p>

    return (
        <div className="p-8 max-w-3xl mx-auto text-black bg-white">

            {/* Perfil */}
            <div className="text-center mb-8">
                <img
                    className="w-20 h-20 rounded-full mx-auto"
                    src={foto || '/usuario.jpg'}
                    onError={(e) => (e.target.src = '/usuario.jpg')}
                    alt="foto"
                />
                <h1 className="text-3xl font-bold mt-3 text-black">Bienvenido a la comunidad</h1>
                <p className="text-lg text-black">Hola, <strong className="text-black">{nombre}</strong></p>
                <p className="text-gray-600 text-black">{email}</p>
            </div>

            <hr className="my-6" />

            {/* editar perfil */}
            <h2 className="text-xl font-bold mb-2 text-black">Editar mis datos</h2>
            <input
                type="text"
                placeholder="Nuevo nombre"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                className="border p-2 rounded w-full mb-3 text-black"
            />
            <input
                type="text"
                placeholder="URL nueva foto"
                value={nuevaFoto}
                onChange={(e) => setNuevaFoto(e.target.value)}
                className="border p-2 rounded w-full mb-3 text-black"
            />

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-6"
                onClick={actualizarPerfil}
            >
                Guardar cambios
            </button>

            <hr className="my-6" />

            {/* crear post */}
            <h2 className="text-xl font-bold mb-2 text-black">Crear publicación</h2>
            <textarea
                placeholder="¿Qué estás pensando?"
                value={contenidoPost}
                onChange={(e) => setContenidoPost(e.target.value)}
                className="w-full border p-3 rounded mb-3 text-black"
            />
            <button
                className="bg-green-600 text-white px-4 py-2 rounded w-full mb-6"
                onClick={crearPost}
            >
                Publicar
            </button>

            <hr className="my-6" />

            {/* posts */}
            <h2 className="text-xl font-bold mb-4 text-black">Publicaciones</h2>

            <div className="space-y-6">
                {posts.map((post) => {
                    const comentarios = comentariosPorPost[post.id] || []
                    const liked = (post.likes || []).includes(uid)

                    return (
                        <div key={post.id} className="bg-gray-100 p-4 rounded shadow text-black">

                            {/* encabezado */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={post.autorFoto || '/usuario.jpg'}
                                    onError={(e) => (e.target.src = '/usuario.jpg')}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="text-black font-semibold">{post.autor}</p>
                                    <p className="text-xs text-gray-500 text-black">{formatearFecha(post.fecha)}</p>
                                </div>
                            </div>

                            {/* contenido */}
                            {editandoID === post.id ? (
                                <>
                                    <textarea
                                        value={nuevoContenido}
                                        onChange={(e) => setNuevoContenido(e.target.value)}
                                        className="w-full border p-2 rounded mt-3 text-black"
                                    />
                                    <button
                                        className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
                                        onClick={() => guardarEdicion(post.id)}
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white px-3 py-1 rounded mt-2 ml-2"
                                        onClick={() => setEditandoID(null)}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <p className="mt-3 text-gray-800 text-black">{post.contenido}</p>
                            )}

                            {/* botones */}
                            <div className="flex gap-3 mt-3">
                                <button
                                    className={`px-3 py-1 rounded ${liked ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'}`}
                                    onClick={() => toggleLike(post)}
                                >
                                    ❤️ {post.likes?.length || 0}
                                </button>

                                {post.autorUid === uid && (
                                    <>
                                        <button
                                            className="text-blue-600 text-black"
                                            onClick={() => {
                                                setEditandoID(post.id)
                                                setNuevoContenido(post.contenido)
                                            }}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="text-red-600 text-black"
                                            onClick={() => eliminarPost(post.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* comentarios */}
                            <div className="mt-4">
                                <h4 className="font-semibold mb-2 text-black">
                                    Comentarios ({comentarios.length})
                                </h4>

                                {comentarios.map((c) => (
                                    <div key={c.id} className="bg-white border p-2 rounded mb-2 text-black">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={c.autorFoto || '/usuario.jpg'}
                                                onError={(e) => (e.target.src = '/usuario.jpg')}
                                                className="w-6 h-6 rounded-full"
                                            />
                                            <p className="text-black font-semibold text-sm">{c.autor}</p>
                                            <p className="text-xs text-gray-500 ml-2 text-black">
                                                {formatearFecha(c.fecha)}
                                            </p>
                                        </div>

                                        <p className="ml-8 mt-1 text-black">{c.texto}</p>

                                        {c.autorUid === uid && (
                                            <div className="flex gap-2 mt-2 ml-8">
                                                <button
                                                    className="text-blue-600 text-sm text-black"
                                                    onClick={() => editarComentario(post.id, c)}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="text-red-600 text-sm text-black"
                                                    onClick={() => eliminarComentario(post.id, c)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* input comentario */}
                                <textarea
                                    placeholder="Escribe un comentario..."
                                    value={inputComentarioPorPost[post.id] || ''}
                                    onChange={(e) =>
                                        setInputComentarioPorPost((prev) => ({
                                            ...prev,
                                            [post.id]: e.target.value,
                                        }))
                                    }
                                    className="w-full border p-2 rounded text-black"
                                />

                                <button
                                    className="bg-green-600 text-white px-3 py-1 rounded mt-2"
                                    onClick={() => agregarComentario(post.id)}
                                >
                                    Comentar
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default Comunidad
