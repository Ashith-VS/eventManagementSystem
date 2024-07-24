import { isEmpty } from 'lodash';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
const [errors, setErrors] = useState({});
const [formData, setFormData] = useState({
  email: "",
  password: "",
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
  setErrors({ ...errors, [name]: "" });
};

const inputs = [
  {
    id: "email",
    label: "Email",
    type: "text",
    name: "email",
    placeholder: "enter your email",
    isrequired: true,
    ispattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "enter your password",
    isrequired: true,
  },
];

const renderedInputs = (item, i) => {
    return (
      <div key={i} className="form-outline mb-4">
        <label className="form-label" htmlFor={item.id}>
          {item.label}
        </label>
        <input
          id={item.id}
          type={item.type}
          name={item.name}
          placeholder={item.placeholder}
          className="form-control"
          onChange={handleChange}
          value={formData[item.name]}
        />
      </div>
    );
};

const handleValidation = () => {
  let error = {};
  inputs.forEach((rule) => {
    const { name, label, ispattern, isrequired } = rule;
    const value = formData[name];
    if (!value && isrequired) {
      error[name] = `${label} is required`;
    } else if (ispattern && !RegExp(ispattern).test(value)) {
      error[name] = `${label} is invalid`;
    }
  });
  return error;
};

const handleSubmit = (e) => {
e.preventDefault()
const valid =handleValidation()
setErrors(valid)
if(isEmpty(valid)){
  console.log('formData: ', formData);
}
}

  return (
    <section className="gradient-form d-flex justify-content-center align-items-center"style={{ height: "100vh" }}>
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card rounded-3 text-black">
            <div className="card-body p-md-5 mx-md-4">
              <div className="text-center">
                {Object.keys(errors).length > 0 && (
                  <div style={{background: "rgb(230, 190, 199)"}}>
                    {Object.entries(errors).map(([key, value]) => (
                      <li key={key} style={{ display: value ? "" : "none" }}>
                        {value}
                      </li>
                    ))}
                  </div>
                )}
                <h4 className="mt-1 mb-5 pb-1">Login</h4>
              </div>
              <form onSubmit={handleSubmit}>
                {inputs.map((item, i) => renderedInputs(item, i))}
                <div className="d-flex justify-content-end mb-3 ">
                  <button className="btn btn-primary" type="submit" >Submit</button>
                </div>
              </form>
              <div className="text-center">
                <span>Dont have an Account?</span><Link to="/register" className="text-muted"> Register</Link>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Login