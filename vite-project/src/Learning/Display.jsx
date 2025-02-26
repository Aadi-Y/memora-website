import { useLocation, useNavigate } from "react-router-dom";

function Display() {
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve details from state (if available)
    const details = location.state?.details || [];

    function handleEdit(index) {
        // Navigate back to `Todo.js` with edit index
        navigate("/", { state: { editIndex: index, details } });
    }

    function handleDelete(index) {
        const newDetails = details.filter((_, i) => i !== index);

        // Navigate to refresh the display with updated details
        navigate("/display", { state: { details: newDetails } });
    }

    return (
        <>
            <h1>All Persons</h1>
            {details.length > 0 ? (
                details.map((item, index) => (
                    <div className="display-container" key={index}>
                        <p>Person: {index + 1}</p>
                        <p>Name: {item.name}</p>
                        <p>Age: {item.age}</p>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No details available.</p>
            )}
            <button onClick={() => navigate("/")}>Back</button>
        </>
    );
}

export default Display;

