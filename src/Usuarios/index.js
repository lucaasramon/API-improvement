import React, { useEffect, useState } from "react";
import "../App.css";
import api from "../server/api";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Usuarios() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function getUser() {
      const response = await api.get("/users");

      setAllUsers(response.data);
    }

    getUser();
  }, []);

  return (
    <>
      <div class="container">
        <div class="section">
          <div className="row ">
            <div className="col divResponsive s12 pad-0">
              <div>
                <h5 className="title-form">Lista de Usuarios</h5>
              </div>
              <table className="striped colored primary">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((data) => (
                    <tr>
                      <td>{data.name}</td>
                      <td>{data.username}</td>
                      <td>{data.email}</td>
                      <td>
                        <Button
                          variant="secondary"
                          href={"/Tarefas/id=" + data.id + "/todos"}
                          class="waves-effect waves-light btn brown lighten-2"
                        >
                          Tarefas
                        </Button>
                      </td>
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

export default Usuarios;
