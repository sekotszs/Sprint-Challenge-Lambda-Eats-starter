import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";
import { Link, useParams } from "react-router-dom";

const formSchema = yup.object().shape({
    name: yup.string().required("Please input your name").min(2,"Name must have more than two characters"),
    size: yup.string().required("Please choose a size"),
    cheese: yup.boolean().oneOf([true||false]),
    meat: yup.boolean().oneOf([true||false]),
    veggies: yup.boolean().oneOf([true||false]),
    other: yup.boolean().oneOf([true||false]),
    instructions: yup.string()

});

function form() {

    const [button, setButton] =useState (true);

    const [formState, setFormState] = useState({
        name: "",
        size: "",
        cheese: "",
        meat: "",
        veggies: "",
        other: "",
        instructions: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        size: "",
        cheese: "",
        meat: "",
        veggies: "",
        other: "",
        instructions: ""
    })

    const [post, setPost] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButton(!valid);
        });
    }, [formState]);
}