import './contacto.css'

function Contacto() {
    return (
        <section className="contacto" id="contacto">
            <div className="container">
                <h3>Contacto</h3>
                <p>¿Tienes alguna pregunta? ¡Nos encantaría saber de ti! Completa el formulario y te responderemos a la brevedad.</p>
                <form className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Mensaje:</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" className="btn">Enviar</button>
                </form>

                <div className="contact-info">
                    <h4>Otras formas de contactarnos:</h4>
                    <ul>
                        <li>Teléfono: +34 123 456 789</li>
                        <li>Email: contacto@mipagina.com</li>
                        <li>Dirección: Calle Falsa 123, Ciudad, País</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Contacto;