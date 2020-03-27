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
    cheese: true||false,
    meat: true||false,
    veggies: true||false,
    other: true||false,
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

  const [button, setButton] = useState(true);

  const [response, setResponse] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButton(!valid);
    });
  }, [formState]);

  const validateChange = (targetName,targetValue) => {
      yup.reach(formSchema, targetName).validate(targetValue).then(valid =>
        {setErrors({
            ...errors,
            [targetName]:''
        })
    })
    .catch(err => {
        setErrors({
            ...errors,
            [targetName]: err.errors
        })
    })
  }

  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/orders", formState)
      .then(res => {
        setPost(res.data);

        setFormState({
          name: "",
          size: "",
          sauce: "",
          cheese: "",
          meat: "",
          veggies: "",
          other: "",
          instructions: ""
        });
      })
      .catch(err =>
        console.log("Something is wrong with your form", err.response)
      );
      
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
        </label>
        <label htmlFor="size">
            Choose your pizza size!
            <select
            id="size"
            name="size"
            onChange={inputChange}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
        </label>
        <label htmlFor="sauce">
            Choose your pizza sauce!
            <select
            id="sauce"
            name="sauce"
            onChange={inputChange}>
                <option value="original red">Original Red</option>
                <option value ="garlic ranch">Garlic Ranch</option>
                <option value="bbq sauce">BBQ Sauce</option>
                <option value="spinach alfredo">Spinach Alfredo</option>

            </select>
        </label>
      </form>
    </div>
  );
}

export default Form;
