import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
const User = () => {
    const fetchURL = 'http://127.0.0.1:8000';
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ first_name: '', last_name: '', email: '', contact_number: '' });
    const [editing, setEditing] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const btnRef = React.useRef(null);
    const closeModalRef = React.useRef(null);
    const handleEditBtnClick = React.useCallback(() => btnRef.current?.click(), []);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get(`${fetchURL}/api/users`);
        setUsers(response.data);
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await axios.put(`${fetchURL}/api/update/${currentUserId}`, user);
        } else {
            await axios.post(`${fetchURL}/api/store`, user);
        }
        fetchUsers();
        setUser({ first_name: '', last_name: '', email: '', contact_number: '' });
        setEditing(false);
    };

    const handleEdit = (user) => {
        handleEditBtnClick();
        setUser(user);
        setEditing(true);
        setCurrentUserId(user.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${fetchURL}/api/destroy/${id}`);
        fetchUsers();
    };

    const handleCloseBtnClick = () => {
        fetchUsers();
        setUser({ first_name: '', last_name: '', email: '', contact_number: '' });
        setEditing(false);
        closeModalRef.current?.click();
    };

    return (
        <div className="container p-5 mx-auto">
            <h1 className="float-start">Laravel React CRUD</h1>
            <div className="d-grid d-md-flex justify-content-md-end">
                <button type="button" className="btn btn-outline-none float-end" data-bs-toggle="modal" data-bs-target="#staticBackdrop" ref={btnRef}><span className="material-symbols-outlined">person_add</span></button>
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">{editing ? 'Update' : 'Add'} User Modal</h1>
                    <button type="button" className="btn-close d-none" data-bs-dismiss="modal" aria-label="Close" ref={closeModalRef}></button>
                </div>
                <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="first_name" className="form-label float-start">First Name</label>
                            <input className="form-control" type="text" name="first_name" value={user.first_name} onChange={handleChange} placeholder="" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="last_name" className="form-label float-start">Last Name</label>
                            <input className="form-control" type="text" name="last_name" value={user.last_name} onChange={handleChange} placeholder="" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label float-start">Email</label>
                            <input className="form-control" type="email" name="email" value={user.email} onChange={handleChange} placeholder="" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="contact_number" className="form-label float-start">Contact Number</label>
                            <input className="form-control" type="number" name="contact_number" value={user.contact_number} onChange={handleChange} placeholder="" required />
                        </div>
                        <button className="btn btn-outline-none col-md-6 p-2" type="submit"><span className="material-symbols-outlined align-bottom">{editing ? 'update' : 'group_add'}</span>{editing ? 'Update User' : 'Add User'}</button>
                        <button className="btn btn-outline-none col-md-6 p-2" onClick={ () => handleCloseBtnClick()}><span className="material-symbols-outlined align-bottom">do_not_disturb_on</span>Cancel</button>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>
                <div className="card mt-5 p-auto mx-auto table-responsive">
                    <table className="table table-sm table-hover">
                    <caption>List of users</caption>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Contact Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.contact_number}</td>
                                    <td>
                                        <button className="btn btn-outline-none" onClick={() => handleEdit(user)}><span className="material-symbols-outlined">edit</span></button>
                                        <button className="btn btn-outline-none" onClick={() => handleDelete(user.id)}><span className="material-symbols-outlined">delete_forever</span></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default User;
