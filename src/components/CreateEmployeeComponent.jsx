import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const CreateEmployeeComponent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailId, setEmailId] = useState("")

    useEffect(() => {
        if(params.id >= 0){
            EmployeeService.getEmployeeById(params.id).then((response => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmailId(response.data.emailId);
            }))
        }
    }, [params.id]);

    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value)
    }
    const changelastNameHandler = (event) => {
        setLastName(event.target.value)
    }
    const changeEmailHandler = (event) => {
        setEmailId(event.target.value)
    }
    const saveEmployee = (e) => {
        e.preventDefault()
        let employee = {firstName: firstName, lastName: lastName, emailId: emailId}
        console.log("employee =>  " + JSON.stringify(employee))

        if(params.id >= 0){
            EmployeeService.updateEmployee(employee, params.id).then(() => {
                navigate('/employees')
            })
        }else{
            EmployeeService.createEmployee(employee).then(() => {
                navigate('/employees')
            })
        }
    }
    const cancel = () => {
        navigate("/employees")
    }
    const getTitle = () => {
        if(params.id >= 0){
            return <h3 className='text-center'>Update Employee</h3>
        }else{
            return <h3 className='text-center'>Add Employee</h3>
        }
    }
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        {getTitle()}
                        <div className='card-body'>
                            <form action="">
                                <div className='form-group'>
                                    <label>First Name: </label>
                                    <input placeholder='First Name' name='firstName' className='form-control'
                                        value={firstName} onChange={changeFirstNameHandler} />
                                </div>
                                <div className='form-group'>
                                    <label>Last Name: </label>
                                    <input placeholder='Last Name' name='lastName' className='form-control'
                                        value={lastName} onChange={changelastNameHandler} />
                                </div>
                                <div className='form-group'>
                                    <label>Email ID: </label>
                                    <input placeholder='Email Address' name='emailId' className='form-control'
                                        value={emailId} onChange={changeEmailHandler} />
                                </div>

                                <button className='btn btn-success' onClick={saveEmployee}>SAVE</button>
                                <button className='btn btn-danger' onClick={cancel} style={{marginLeft: "10px"}}>CANCEL</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CreateEmployeeComponent;