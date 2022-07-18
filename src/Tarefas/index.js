import React, { useEffect, useState } from "react";
import "../App.css";
import api from "../server/api";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// import { useNavigate } from "react-router-dom";

function Tarefas() {
  const [allTarefas, setAllTarefas] = useState([]);
  const [clickCompleted, setclickCompleted] = useState([]);
  const [title, setTitle] = useState("");
  var url = window.location.href;
  var idDoUser =  window.location.href;
  idDoUser = idDoUser.split("id=");
  idDoUser = idDoUser[1].split("/todos");
  url = url.split("id=");
  url = url[1];

  useEffect(() => {
    async function getTarefas() {
      const response = await api.get("/users/" + url);

      setAllTarefas(response.data);
    }

    getTarefas();
  }, [url]);

  // ADICIONAR TAREFA --------------
  async function addTarefa(e) {
    e.preventDefault();

    await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: idDoUser[0],
        title: title,
        completed: true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => allTarefas.push(json));

      setclickCompleted(!clickCompleted);

      
  }
  

  // ADICIONAR STATUS -------------------
  async function statusTarefa(e) {
    e.preventDefault();

    var idButton = e.target.getAttribute("idButton");

    allTarefas.forEach((prod) => {
      if (prod.id == idButton) {
        prod.completed = !prod.completed;
      }
    });
    setclickCompleted(!clickCompleted);
  }

  return (
    <>
      <div className="containerVoltar">
      <Link to="/">
        <Button variant="warning">
          Voltar
        </Button>
      </Link>
      </div>
      <div class=" z-depth-1 subpages container2 collection">
        <div >
          <h5 className="title-form">Lista de Tarefas</h5>
        </div>
        <form onSubmit={addTarefa}>
          <div className="btn-novo">
            <input
            className="form-control"
              value={title}
              placeholder="Titulo"
              onChange={(e) => setTitle(e.target.value)}
              id="title"
            />
          </div>
          <div>
            <Button type="submit" variant="secondary">
              Adicionar nova tarefa
            </Button>
          </div>
        </form>
      </div>

      <div class="container">
        <div class="section">
          <div className="row ">
            <div className="col divResponsive s12 pad-0">
              <table className="striped colored primary">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Tarefa</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {allTarefas.map((data) => (
                    <tr>
                      <td id="idButton">{data.id}</td>
                      <td>{data.title}</td>
                      <td>{data.completed ? "Concluida" : "Pendente"}</td>
                      {data.completed ? (
                        <td>
                          <Button
                            variant="danger"
                            onClick={statusTarefa}
                            idButton={data.id}
                            className="waves-effect waves-light btn brown lighten-2"
                          >
                            Desfazer
                          </Button>
                        </td>
                      ) : (
                        <td>
                          <Button
                            variant="success"
                            onClick={statusTarefa}
                            idButton={data.id}
                            className="waves-effect waves-light btn brown lighten-2"
                          >
                            Concluir
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tarefas;
