import React, { Component } from 'react';
import { variables } from '../Environment/Variables';

export class Teacher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teachers: [],
            modalTitle: "",
            FirstName: "",
            LastName: "",
            ContactNo: "",
            EmailAdress: "",
            TeacherId: 0
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'Teacher')
            .then(response => response.json())
            .then(data => {
                this.setState({ teachers: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }
    changeFirstName = (s) => {
        this.setState({ FirstName: s.target.value });
    }
    changeLastName = (s) => {
        this.setState({ LastName: s.target.value });
    }
    changeContactNo = (s) => {
        this.setState({ ContactNo: s.target.value });
    }
    changeEmailAddress = (s) => {
        this.setState({ EmailAdress: s.target.value });
    }

    createClick() {
        fetch(variables.API_URL + 'Teacher', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                ContactNo: this.state.ContactNo,
                EmailAdress: this.state.EmailAdress
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    updateClick() {
        fetch(variables.API_URL + 'Teacher', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                TeacherId: this.state.TeacherId,
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                ContactNo: this.state.ContactNo,
                EmailAdress: this.state.EmailAdress
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'Teacher/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    addClick() {
        this.setState({
            modalTitle: "Add Teacher",
            TeacherId: 0,
            FirstName: "",
            LastName: "",
            ContactNo: "",
            EmailAdress: ""
        });
    }

    editClick(teacher) {
        this.setState({
            modalTitle: "Edit Student",
            TeacherId: teacher.TeacherId,
            FirstName: teacher.FirstName,
            LastName: teacher.LastName,
            ContactNo: teacher.ContactNo,
            EmailAdress: teacher.EmailAdress
        });
    }

    render() {
        const {
            teachers,
            modalTitle,
            FirstName,
            LastName,
            ContactNo,
            EmailAdress,
            TeacherId
        } = this.state;
        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Teacher
                </button>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>
                                First Name
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                Contact No.
                            </th>
                            <th>
                                Email Address
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map(teacher =>
                            <tr key={teacher.FirstName}>
                                <td>{teacher.FirstName}</td>
                                <td>{teacher.LastName}</td>
                                <td>{teacher.ContactNo}</td>
                                <td>{teacher.EmailAdress}</td>
                                <td>
                                    <button type="button" className='btn btn-light mr-1'
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(teacher)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </button>
                                    <button type="button" className='btn btn-light mr-1' onClick={() => this.deleteClick(teacher.TeacherId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">First Name</span>
                                    <input type="text" className="form-control"
                                        value={FirstName}
                                        onChange={this.changeFirstName} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Last Name</span>
                                    <input type="text" className="form-control"
                                        value={LastName}
                                        onChange={this.changeLastName} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Contact No.</span>
                                    <input type="text" className="form-control"
                                        value={ContactNo}
                                        onChange={this.changeContactNo} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Email Address</span>
                                    <input type="text" className="form-control"
                                        value={EmailAdress}
                                        onChange={this.changeEmailAddress} />
                                </div>
                                {TeacherId == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Add Teacher</button>
                                    : null}

                                {TeacherId != 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update Teacher</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}