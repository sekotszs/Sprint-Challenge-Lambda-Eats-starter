import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please input your name")
    .min(2, "Name must have more than two characters"),
  size: yup.string().required("Please choose a size"),
  sauce: yup.string().required("Please choose a sauce"),
  cheese: yup.boolean().oneOf([true || false]),
  meat: yup.boolean().oneOf([true || false]),
  veggies: yup.boolean().oneOf([true || false]),
  other: yup.boolean().oneOf([true || false]),
  instructions: yup.string().required("Special instructions?")
});

function Form() {
  const [formState, setFormState] = useState({
    name: "",
    size: "",
    sauce: "",
    cheese: true || false,
    meat: true || false,
    veggies: true || false,
    other: true || false,
    instructions: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    size: "",
    sauce: "",
    cheese: "",
    meat: "",
    veggies: "",
    other: "",
    instructions: ""
  });

  
  const [user, setUser] = useState([]);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [response, setResponse] = useState();

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const validateChange = (targetName, targetValue) => {
    yup
      .reach(formSchema, targetName)
      .validate(targetValue)
      .then(valid => {
        setErrors({
          ...errors,
          [targetName]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [targetName]: err.errors
        });
      });
  };

  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/orders", formState)
      .then(res => {
        setUser(existing => [...existing, res.data]);
        console.log("success", response);

        setFormState({
          name: "",
          size: "",
          sauce: "",
          cheese: false,
          meat: false,
          veggies: false,
          other: false,
          instructions: ""
        });
      })
      .catch(err =>
        console.log(err.response)
      );
  };

  const inputChange = e => {
    e.persist();
    const targetName = e.target.name;
    const targetValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const newFormData = {
      ...formState,
      [targetName]: targetValue
    };
    validateChange(targetName, targetValue);
    setFormState(newFormData);
  };

  return (
    <div>
      <form onSubmit={formSubmit}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            value={formState.name}
            onChange={inputChange}
          />
          {errors.name.length > 0 ? (
            <p className="error">{errors.name}</p>
          ) : null}
        </label>{" "}
        <br />
        <label htmlFor="size">
          Choose your pizza size!
          <select id="size" name="size" onChange={inputChange}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>{" "}
        <br />
        <label htmlFor="sauce">
          Choose your pizza sauce!
          <select id="sauce" name="sauce" onChange={inputChange}>
            <option value="original red">Original Red</option>
            <option value="garlic ranch">Garlic Ranch</option>
            <option value="bbq sauce">BBQ Sauce</option>
            <option value="spinach alfredo">Spinach Alfredo</option>
          </select>
        </label>{" "}
        <br />
        <label htmlFor="cheese">
          Cheese
          <input
            id="cheese"
            type="checkbox"
            name="cheese"
            value={formState.cheese}
            onChange={inputChange}
          />
          {errors.cheese.length > 0 ? (
            <p className="error">{errors.cheese}</p>
          ) : null}
        </label>{" "}
        <br />
        <label htmlFor="meat">
          Meat
          <input
            id="meat"
            type="checkbox"
            name="meat"
            value={formState.meat}
            onChange={inputChange}
          />
          {errors.meat.length > 0 ? (
            <p className="error">{errors.meat}</p>
          ) : null}
        </label>{" "}
        <br />
        <label htmlFor="veggies">
          Veggies
          <input
            id="veggies"
            type="checkbox"
            name="veggies"
            value={formState.veggies}
            onChange={inputChange}
          />
          {errors.veggies.length > 0 ? (
            <p className="error">{errors.veggies}</p>
          ) : null}
        </label>{" "}
        <br />
        <label htmlFor="other">
          Other
          <input
            id="other"
            type="checkbox"
            name="other"
            value={formState.other}
            onChange={inputChange}
          />
          {errors.other.length > 0 ? (
            <p className="error">{errors.other}</p>
          ) : null}
        </label>{" "}
        <br />
        <label htmlFor="instructions">
          Special Instructions
          <input
            id="instructions"
            type="text"
            name="instructions"
            value={formState.instructions}
            onChange={inputChange}
          />
          {errors.instructions.length > 0 ? (
            <p className="error">{errors.instructions}</p>
          ) : null}
        </label>{" "}
        <br />
        <button disabled={buttonDisabled}>Submit</button>
      </form>
      {user.map(user => (
        <p>
          {user.name} {user.size} {user.sauce} {user.instructions}
        </p>
      ))}
    </div>
  );
}

export default Form;
