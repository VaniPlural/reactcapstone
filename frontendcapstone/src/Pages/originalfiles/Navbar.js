import { Link } from "react-router-dom";
export function Navbar(){
    return(<>
        <Link to="/">
            <button>Home</button>
            </Link>

            <Link to="/displayToDo">
        <button>display ToDo</button>
        </Link>
         <Link to="/userRegistration">
        <button>user Registration</button>
        </Link>
        <Link to="/addToDo">
        <button>Add To Do</button>
        </Link>
    
                 </>
    )
}