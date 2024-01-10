import React, { Component } from 'react';
import { variables } from '../Environment/Variables';

export class Student extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
            classrooms: [],
            modalTitle: "",
            FirstName: "",
            LastName: "",
            ContactPerson: "",
            ContactNo: "",
            EmailAdress: "",
            DateofBirth: "",
            Age: "",
            Classroom: "",
            StudentId: 0
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'Classroom')
            .then(response => response.json())
            .then(data => {
                this.setState({ classrooms: data });
            });

        fetch(variables.API_URL + 'Student')
            .then(response => response.json())
            .then(data => {
                this.setState({ students: data });
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
    changeContactPerson = (s) => {
        this.setState({ ContactPerson: s.target.value });
    }
    changeContactNo = (s) => {
        this.setState({ ContactNo: s.target.value });
    }
    changeEmailAddress = (s) => {
        this.setState({ EmailAdress: s.target.value });
    }
    changeDateofBirth = (s) => {
        this.setState({ DateofBirth: s.target.value });
    }
    changeClassroom = (s) => {
        this.setState({ Classroom: s.target.value });
    }

    createClick() {
        fetch(variables.API_URL + 'Student', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                ContactPerson: this.state.ContactPerson,
                ContactNo: this.state.ContactNo,
                EmailAdress: this.state.EmailAdress,
                DateofBirth: this.state.DateofBirth,
                // Age: this.state.Age,
                Classroom: this.state.Classroom
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
        fetch(variables.API_URL + 'Student', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                StudentId: this.state.StudentId,
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                ContactPerson: this.state.ContactPerson,
                ContactNo: this.state.ContactNo,
                EmailAdress: this.state.EmailAdress,
                DateofBirth: this.state.DateofBirth,
                // Age: this.state.Age,
                Classroom: this.state.Classroom
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
            fetch(variables.API_URL + 'Student/' + id, {
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
            modalTitle: "Add Student",
            StudentId: 0,
            FirstName: "",
            LastName: "",
            ContactPerson: "",
            ContactNo: "",
            EmailAdress: "",
            DateofBirth: "",
            // Age: "",
            Classroom: ""
        });
    }

    editClick(student) {
        this.setState({
            modalTitle: "Edit Student",
            StudentId: student.StudentId,
            FirstName: student.FirstName,
            LastName: student.LastName,
            ContactPerson: student.ContactPerson,
            ContactNo: student.ContactNo,
            EmailAdress: student.EmailAdress,
            DateofBirth: student.DateofBirth,
            Age: student.Age,
            Classroom: student.Classroom
        });
    }

    render() {
        const {
            students,
            classrooms,
            modalTitle,
            FirstName,
            LastName,
            ContactPerson,
            ContactNo,
            EmailAdress,
            DateofBirth,
            Age,
            Classroom,
            StudentId
        } = this.state;
        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Student
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
                                Contact Person
                            </th>
                            <th>
                                Contact No.
                            </th>
                            <th>
                                Email Address
                            </th>
                            <th>
                                Date of Birth
                            </th>
                            <th>
                                Age
                            </th>
                            <th>
                                Classroom
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student =>
                            <tr key={student.FirstName}>
                                <td>{student.FirstName}</td>
                                <td>{student.LastName}</td>
                                <td>{student.ContactPerson}</td>
                                <td>{student.ContactNo}</td>
                                <td>{student.EmailAdress}</td>
                                <td>{student.DateofBirth}</td>
                                <td>{student.Age}</td>
                                <td>{student.Classroom}</td>
                                <td>
                                    <button type="button" className='btn btn-light mr-1'
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(student)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </button>
                                    <button type="button" className='btn btn-light mr-1' onClick={() => this.deleteClick(student.StudentId)}>
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
                                    <span className="input-group-text">Contact Person</span>
                                    <input type="text" className="form-control"
                                        value={ContactPerson}
                                        onChange={this.changeContactPerson} />
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
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Date of Birth</span>
                                    <input type="date" className="form-control"
                                        value={DateofBirth}
                                        onChange={this.changeDateofBirth} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Classroom</span>
                                    <select className="form-select"
                                        onChange={this.changeClassroom}
                                        value={Classroom}>
                                        {classrooms.map(classroom => <option key={classroom.ClassroomId}>
                                            {classroom.ClassroomName}
                                        </option>)}
                                    </select>

                                </div>
                                {StudentId == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Add Student</button>
                                    : null}

                                {StudentId != 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update Student</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}