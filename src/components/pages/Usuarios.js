import React from 'react';
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";


const data = [
];

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PATH_USUARIOS = process.env.REACT_APP_API_USUARIOS_PATH;

const Usuarios = () => {


  const [modalActualizar, setModalActualizar] = React.useState(false);
  const [modalInsertar, setModalInsertar] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const [newVal, setNewVal] = React.useState(0);


  const [usuario, setUsuario] = React.useState({
    data: data,
    form: {
      documento: "",
      nombres: "",
      apellidos: "",
      correo: "",
      telefono: "",
      direccion: "",
      rol: "",
      estado: ""
    }
  });

  //React.useEffect(() => {
  //if (loading) return;
  //if (!user) return history.replace("/");
  //}, [user, loading]);

  React.useEffect(() => {


    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',

      },
    };

    fetch(`${BASE_URL}${PATH_USUARIOS}`, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          //setIsLoaded(true);
          setUsuario({
            ...usuario,
            data: result
          });
        },
        (error) => {
          //setIsLoaded(true);
          setErrors(error);
        }
      )

  },[newVal]);

  const handleChange = (e) => {
    setUsuario((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [e.target.name]: e.target.value,
      }
    }));
  };

  const mostrarModalActualizar = (e) => {
    let arregloUsuarios = usuario.data;
    let userToModify;
    arregloUsuarios.map((registro) => {
      if (e.target.id === registro._id) {
        userToModify = registro;
      }
    });
    setUsuario({
      ...usuario,
      form: userToModify
    });
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const editar = () => {
    let usuarioAModificar = { ...usuario.form };
    actualizarUsuario(usuarioAModificar);
    setModalActualizar(false);
    setNewVal(newVal + 1);
  };

  const eliminar = (e) => {
    let arregloUsuarios = usuario.data;
    arregloUsuarios.map((registro) => {
      if (e.target.id === registro._id) {
        let opcion = window.confirm("¿Está seguro que desea eliminar el usuario " + registro.nombres + " " + registro.apellidos + "?");
        if (opcion) {
          borrarUsuario(registro._id);
        }
      }
    });
    setNewVal(newVal + 1);
  };

  const insertar = () => {
    let usuarioACrear = { ...usuario.form };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(usuarioACrear)
    };
    fetch(`${BASE_URL}${PATH_USUARIOS}`, requestOptions)
      .then(
        (response) => {
          response.json();
          setNewVal(newVal + 1);
        },
        (error) => {
          //setIsLoaded(true);
          setErrors(error);
        })
    setModalInsertar(false);
  }

  const borrarUsuario = (id) => {

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(`${BASE_URL}${PATH_USUARIOS}/${id}`, requestOptions)
      .then(result => result.json())
      .then(
        (result) => {
          setNewVal(newVal + 1);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const actualizarUsuario = (usuario) => {

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(usuario)
    };
    fetch(`${BASE_URL}${PATH_USUARIOS}/${usuario._id}`, requestOptions)
      .then(result => result.json())
      .then(
        (result) => {
          setNewVal(newVal + 1);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (

    <>

      <Container>

        <br />
        <Button color="success" onClick={mostrarModalInsertar}>Crear usuario</Button>
        <br />
        <br />

        <div>

          <Table>

            <thead>
              <tr>
                <th>Documento</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Telefóno</th>
                <th>Dirección</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>

              {usuario.data.map((dato) => (
                <tr key={dato._id}>
                  <td>{dato.documento}</td>
                  <td>{dato.nombres}</td>
                  <td>{dato.apellidos}</td>
                  <td>{dato.correo}</td>
                  <td>{dato.telefono}</td>
                  <td>{dato.direccion}</td>
                  <td>{dato.rol}</td>
                  <td>{dato.estado}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      id={dato._id}
                      onClick={mostrarModalActualizar}>
                      Editar
                    </button>
                    {"  "}
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      id={dato._id}
                      onClick={eliminar}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>

          </Table>
        </div>

      </Container>



      <Modal isOpen={modalActualizar}>
        <ModalHeader>
          <div><h3>Actualizar Usuario</h3> {usuario.form.documento}</div>
        </ModalHeader>

        <ModalBody>

          <FormGroup>
            <label>Documento:</label>
            <input
              className="form-control"
              name="documento"
              type="text"
              onChange={handleChange}
              value={usuario.form.documento}
            />
          </FormGroup>

          <FormGroup>
            <label>Nombres:</label>
            <input
              className="form-control"
              name="nombres"
              type="text"
              onChange={handleChange}
              value={usuario.form.nombres}
            />
          </FormGroup>

          <FormGroup>
            <label>Apellidos:</label>
            <input
              className="form-control"
              name="apellidos"
              type="text"
              onChange={handleChange}
              value={usuario.form.apellidos}
            />
          </FormGroup>

          <FormGroup>
            <label>Correo:</label>
            <input
              className="form-control"
              name="correo"
              type="text"
              onChange={handleChange}
              value={usuario.form.correo}
            />
          </FormGroup>

          <FormGroup>
            <label>Telefono:</label>
            <input
              className="form-control"
              name="telefono"
              type="text"
              onChange={handleChange}
              value={usuario.form.telefono}
            />
          </FormGroup>

          <FormGroup>
            <label>Direccion:</label>
            <input
              className="form-control"
              name="direccion"
              type="text"
              onChange={handleChange}
              value={usuario.form.direccion}
            />
          </FormGroup>

          <FormGroup>
            <label>Rol:</label>
            <select
              className="form-select"
              name="rol"
              type="text"
              onChange={handleChange}
              value={usuario.form.rol}
            >
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-select"
              name="estado"
              type="text"
              onChange={handleChange}
              value={usuario.form.estado}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Autorizado">Autorizado</option>
              <option value="No Autorizado">No Autorizado</option>
            </select>
          </FormGroup>

        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={editar}>Actualizar</Button>
          <Button color="info" onClick={cerrarModalActualizar}>Cancelar</Button>
        </ModalFooter>
      </Modal>



      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div><h3>Insertar Usuario</h3></div>
        </ModalHeader>

        <ModalBody>

          <FormGroup>
            <label>Documento:</label>
            <input
              className="form-control"
              name="documento"
              type="text"
              onChange={handleChange}
              required
            />
          </FormGroup>


          <FormGroup>
            <label> Nombres:</label>
            <input
              className="form-control"
              name="nombres"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Apellidos:</label>
            <input
              className="form-control"
              name="apellidos"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Correo:</label>
            <input
              className="form-control"
              name="correo"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Teléfono:</label>
            <input
              className="form-control"
              name="telefono"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Dirección:</label>
            <input
              className="form-control"
              name="direccion"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Rol:</label>
            <select
              className="form-select"
              name="rol"
              type="text"
              onChange={handleChange}
            >
              <option selected>Seleccione un Rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-select"
              name="estado"
              type="text"
              onChange={handleChange}
            >
              <option selected>Seleccione un Estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Autorizado">Autorizado</option>
              <option value="No Autorizado">No Autorizado</option>
            </select>
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={insertar}>Insertar</Button>
          <Button color="info" onClick={cerrarModalInsertar}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </>
  );

}
export default Usuarios;

