import { useState } from 'react'
import './App.css'

function App() {
  const [ideias, setIdeias] = useState([])
  const [novaIdeia, setNovaIdeia] = useState('')
  const [erro, setErro] = useState('')

  function aoAdicionar(event) {
    event.preventDefault()

    if (novaIdeia.trim() === '') {
      setErro('Digite sua ideia antes de adicionar.')
      return
    }

    const ideia = {
      id: Date.now(),
      texto: novaIdeia.trim(),
      feita: false
    }

    setIdeias(atual => [...atual, ideia])
    setNovaIdeia('')
    setErro('')
  }

  function aoConcluir(id) {
    setIdeias(atual =>
      atual.map(ideia =>
        ideia.id === id
          ? { ...ideia, feita: !ideia.feita }
          : ideia
      )
    )
  }

  function aoRemover(id) {
    setIdeias(atual => atual.filter(ideia => ideia.id !== id))
  }

  const concluidas = ideias.filter(ideia => ideia.feita).length

  return (
    <main className="painel">
      <h1>Painel de Ideias 💡</h1>
      <p>Organize suas ideias em um só lugar!</p>

      <form onSubmit={aoAdicionar}>
        <input
          value={novaIdeia}
          onChange={event => {
            setNovaIdeia(event.target.value)
            setErro('')
          }}
          placeholder="Digite sua ideia..."
        />
        <button type="submit">Adicionar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      <ul>
        {ideias.map(ideia => (
          <li key={ideia.id}>
            <label>
              <input
                type="checkbox"
                checked={ideia.feita}
                onChange={() => aoConcluir(ideia.id)}
              />
              <span className={ideia.feita ? 'concluida' : ''}>
                {ideia.texto}
              </span>
            </label>

            <button type="button" onClick={() => aoRemover(ideia.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      <footer>
        {`${ideias.length} ideias no painel · ${concluidas} concluídas`}
      </footer>
    </main>
  )
}

export default App