import { useState } from "react";
import "./App.css";

function App() {
  const [ideias, setIdeias] = useState([]);
  const [novaIdeia, setNovaIdeia] = useState("");
  const [erro, setErro] = useState("");

  function aoAdicionar(event) {
    event.preventDefault();

    if (novaIdeia.trim() === "") {
      setErro("Digite sua ideia antes de adicionar.");
      return;
    }

    const ideia = {
      id: Date.now(),
      texto: novaIdeia.trim(),
      feita: false,
    };

    setIdeias((atual) => [...atual, ideia]);
    setNovaIdeia("");
    setErro("");
  }

  function aoAlterarIdeia(event) {
    setNovaIdeia(event.target.value);
    setErro("");
  }

  function aoConcluir(id) {
    setIdeias((atual) =>
      atual.map((ideia) =>
        ideia.id === id
          ? { ...ideia, feita: !ideia.feita }
          : ideia
      )
    );
  }

  function aoRemover(id) {
    setIdeias((atual) =>
      atual.filter((ideia) => ideia.id !== id)
    );
  }

  const concluidas = ideias.filter((ideia) => ideia.feita).length;

  return (
    <main className="painel">
      <section className="container">
        <header>
          <h1>Painel de Ideias</h1>
          <p>Registre suas ideias e acompanhe seus projetos.</p>
        </header>

        <form onSubmit={aoAdicionar} className="formulario">
          <input
            type="text"
            value={novaIdeia}
            onChange={aoAlterarIdeia}
            placeholder="Digite uma nova ideia..."
          />

          <button type="submit">Adicionar</button>
        </form>

        {erro && <p className="erro">{erro}</p>}

        <section className="lista">
          {ideias.map((ideia) => (
            <div className="ideia" key={ideia.id}>
              <label className={ideia.feita ? "concluida" : ""}>
                <input
                  type="checkbox"
                  checked={ideia.feita}
                  onChange={() => aoConcluir(ideia.id)}
                />

                <span>{ideia.texto}</span>
              </label>

              <button
                className="remover"
                onClick={() => aoRemover(ideia.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </section>

        <footer>
          {`${ideias.length} ideias no painel · ${concluidas} concluídas`}
        </footer>
      </section>
    </main>
  );
}

export default App;