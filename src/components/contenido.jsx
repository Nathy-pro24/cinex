import './contenido.css';

function Contenido() {
  const productos = [
    {
      nombre: "Combo Clásico",
      descripcion: "Palomitas grandes + Bebida mediana",
      precio: "S/15.99",
      imagen: "clasico.jpg"
    },
    {
      nombre: "Combo Dúo",
      descripcion: "2 Palomitas medianas + 2 Bebidas",
      precio: "S/30.99",
      imagen: "duo.jfif"
    },
    {
      nombre: "Combo Nachos",
      descripcion: "Nachos con queso + Bebida grande",
      precio: "S/49.50",
      imagen: "nachos.jfif"
    },
    {
      nombre: "Combo Infantil",
      descripcion: "Palomitas pequeñas + Jugo + Sorpresa",
      precio: "S/34.00",
      imagen: "infantil.jfif"
    },
    {
      nombre: "Combo Pro para 2",
      descripcion: "Palomitas + 2 CocaCola personal + 2 Hot dog",
      precio: "S/59.00",
      imagen: "combopro.png"
    },
    {
      nombre: "Combo Familiar",
      descripcion: "2 Palomitas grandes + 4 CocaCola personales + 2 Cuates + 4 Hot Dog + 2 Mayonesas y 2 mostazas pequeñas",
      precio: "S/89.00",
      imagen: "familiar.png"
    },
    {
      nombre: "Combo Nuggets",
      descripcion: "4 piesas de Nuggets + Papas Fritas + 1 CocaCola",
      precio: "S/54.00",
      imagen: "nuggets.jfif"
    },
    {
      nombre: "Combo Crunchy",
      descripcion: "12 piesas de Nuggets + Papas fritas familar + 2 CocaCola personales + 2 Chocolates + 2 cremas",
      precio: "S/104.00",
      imagen: "crunchy.jfif"
    },
    {
      nombre: "Combo Feliz",
      descripcion: "Palomitas grande + 1 vaso de CocaCola y 1 vaso de Fanta +  2 Chocolates",
      precio: "S/67.00",
      imagen: "choco.jpg"
    }
    ]

  return (
    <section className="combos" id="alimentos">
      <div className="container">
        <h3>Combos de Cine</h3>
        <div className="combo-grid">
          {productos.map((producto, index) => (
            <div className="combo-card" key={index}>
              <img src={producto.imagen} alt={producto.nombre} className="combo-img" />
              <h4>{producto.nombre}</h4>
              <p>{producto.descripcion}</p>
              <span className="combo-precio">{producto.precio}</span>
              <button className="combo-boton">Comprar</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contenido;

