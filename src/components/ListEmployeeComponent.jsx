import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const ListEmployeeComponent = () => {
    const emp = []
    const [employees, setEmployees] = useState(emp)
    const navigate = useNavigate();

    useEffect(() => {
        EmployeeService.getEmployees().then((response => {
            setEmployees(response.data);
        }))
    }, [employees]);

    const addEmployee = () => {
        navigate("/add-employee/_add")
    }

    const editEmployee = (id) => {
        navigate(`/add-employee/${id}`)
    }

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id).then(() => {
            setEmployees(employees.filter(employee => employee.id !== id))
        })
    }

    const viewEmployee = (id) => {
        navigate(`/view-employee/${id}`)
    }

    return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className='row'>
                    <button className='btn btn-primary' onClick={addEmployee}> Add Employee </button>
                </div>
                <div className="row">
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map((employee) => {
                                    return (
                                        <tr key = {employee.id}>
                                            <td> {employee.firstName} </td>
                                            <td> {employee.lastName} </td>
                                            <td> {employee.emailId} </td>
                                            <td>
                                                <button onClick={()=> editEmployee(employee.id)} className='btn btn-info'>UPDATE</button>
                                                <button onClick={()=> deleteEmployee(employee.id)} className='btn btn-danger' style={{marginLeft: "10px"}}>DELETE</button>
                                                <button onClick={()=> viewEmployee(employee.id)} className='btn btn-info' style={{marginLeft: "10px"}}>VIEW DETAILS</button>
                                            </td>
                                        </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
    );
}
 
export default ListEmployeeComponent;