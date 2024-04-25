import { FunctionComponent } from "preact";

// Componente footer que muistra el código fuente, la fecha y el autor
const Footer: FunctionComponent = () => {
  return (
    <footer class="footer">
      <p>
        <a href="https://github.com/Jesuscbart/P4-Frontend" target="_blank">
          Source code
        </a>
      </p>
      <p>&copy; Abril 2024</p>
      <p>Jesús Cuesta Bartolomé</p>
    </footer>
  );
};

export default Footer;