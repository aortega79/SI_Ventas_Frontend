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
const PATH_PRODUCTOS = process.env.REACT_APP_API_PRODUCTOS_PATH;

const Productos = () => {

    const [modalActualizar, setModalActualizar] = React.useState(false);
    const [modalInsertar, setModalInsertar] = React.useState(false);
    const [errors, setErrors] = React.useState(null);
    const [newVal, setNewVal] = React.useState(0);

    const [producto, setProducto] = React.useState({
        data: data,
        form: {
            idProducto: "",
            descripcion: "",
            valorUnitario: "",
            estado: ""
        }
    });

    React.useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log("Alexander Orteta")
        fetch(`${BASE_URL}${PATH_PRODUCTOS}`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    //setIsLoaded(true);
                    setProducto({
                        ...producto,
                        data: result
                    });
                },
                (error) => {
                    //setIsLoaded(true);
                    setErrors(error);
                }
            )
    }, [newVal]);

    const handleChange = (e) => {
        setProducto((prevState) => ({
            ...prevState,
            form: {
                ...prevState.form,
                [e.target.name]: e.target.value,
            }
        }));
    };

    const mostrarModalActualizar = (e) => {
        let arregloProductos = producto.data;
        let userToModify;
        arregloProductos.map((registro) => {
            if (e.target.id === registro._id) {
                userToModify = registro;
            }
        });
        setProducto({
            ...producto,
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
        let productoAModificar = { ...producto.form };
        actualizarProducto(productoAModificar);
        setModalActualizar(false);
        setNewVal(newVal + 1);
    };

    const eliminar = (e) => {
        let arregloProductos = producto.data;
        arregloProductos.map((registro) => {
            if (e.target.id === registro._id) {
                let opcion = window.confirm("¿Está seguro que desea eliminar el producto " + registro.idProducto + " : " + registro.descripcion + "?");
                if (opcion) {
                    borrarProducto(registro._id);
                }
            }
        });
        setNewVal(newVal + 1);
    };

    const insertar = () => {
        let productoACrear = { ...producto.form };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productoACrear)
        };
        fetch(`${BASE_URL}${PATH_PRODUCTOS}`, requestOptions)
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

    const borrarProducto = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`${BASE_URL}${PATH_PRODUCTOS}/${id}`, requestOptions)
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

    const actualizarProducto = (producto) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto)
        };
        fetch(`${BASE_URL}${PATH_PRODUCTOS}/${producto._id}`, requestOptions)
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
                <Button color="success" onClick={mostrarModalInsertar}>Crear producto</Button>
                <br />
                <br />
                <div>
                    <Table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id Producto</th>
                                <th>Descripción</th>
                                <th>Valor Unitario</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {producto.data.map((dato) => (
                                <tr key={dato._id}>
                                    <td>{dato.idProducto}</td>
                                    <td>{dato.descripcion}</td>
                                    <td>{dato.valorUnitario}</td>
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
                    <div><h5>Actualizar Producto</h5> {producto.form.idProducto}</div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Id Producto:</label>
                        <input
                            className="form-control"
                            name="idProducto"
                            type="number"
                            onChange={handleChange}
                            value={producto.form.idProducto}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Descripcion:</label>
                        <input
                            className="form-control"
                            name="descripcion"
                            type="text"
                            onChange={handleChange}
                            value={producto.form.descripcion}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Valor Unitario:</label>
                        <input
                            className="form-control"
                            name="valorUnitario"
                            type="text"
                            onChange={handleChange}
                            value={producto.form.valorUnitario}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Estado:</label>
                        <select
                            className="form-select"
                            name="estado"
                            type="text"
                            onChange={handleChange}
                            value={producto.form.estado}
                        >
                            <option value="Disponible">Disponible</option>
                            <option value="No Disponible">No Disponible</option>
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
                    <div><h3>Insertar Producto</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Id Producto:</label>
                        <input
                            className="form-control"
                            name="idProducto"
                            type="text"
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Descripcion:</label>
                        <input
                            className="form-control"
                            name="descripcion"
                            type="text"
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label> Valor Unitario:</label>
                        <input
                            className="form-control"
                            name="valorUnitario"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Estado:</label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name="estado"
                            type="text"
                            onChange={handleChange}
                        >
                            <option selected>Seleccione un estado</option>
                            <option value="Disponible">Disponible</option>
                            <option value="No Disponible">No Disponible</option>
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
export default Productos;

