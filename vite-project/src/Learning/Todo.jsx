import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Todo.css";

function Todo() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [details, setDetails] = useState([{ name: "Aadithya", age: 19 }]);

    const navigate = useNavigate();

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleAgeChange(event) {
        setAge(event.target.value);
    }

    function handleAdd() {
        if (!name || !age) {
            alert("Please enter both name and age");
            return;
        }

        const newDetails = [...details, { name, age }];
        setDetails(newDetails);
        setName("");
        setAge("");

        // Navigate to display page with details
        navigate("/display", { state: { details: newDetails } });
    }

    function handleEdit(index) {
        const person = details[index];
        setName(person.name);
        setAge(person.age);

        // Remove the person being edited
        const newDetails = details.filter((_, i) => i !== index);
        setDetails(newDetails);

        // Navigate back to the form
        navigate("/");
    }

    function handleDelete(index) {
        const newDetails = details.filter((_, i) => i !== index);
        setDetails(newDetails);

        // Navigate to display page with updated details
        navigate("/display", { state: { details: newDetails } });
    }

    return (
        <>
            <div className="todo-container">
                <label>Name</label>
                <input type="text" value={name} onChange={handleNameChange} />

                <label>Age</label>
                <input type="text" value={age} onChange={handleAgeChange} />

                <button onClick={handleAdd}>Add</button>
            </div>
        </>
    );
}

export default Todo;
