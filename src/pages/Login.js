/*~~~~~~~~~~~~~~~DESCRIPTION~~~~~~~~~~~~~~~~~~~~~~~~~~~
This page is used for logging users in

~~~~~~~~~~~~~~~~PROPS TO PASS~~~~~~~~~~~~~~~~~~~~~~~~~~
setUser = A function for setting the current session username
*/
import Form from "../components/Form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Div, P, H4 } from "../styles/Login.styled"

function NewUser(props) {
    //for redirecting
    let navigate = useNavigate()
    //this will hold an error message in the event that one is sent back by the backend
    const[error, setError] = useState(null)
    //this lets the dom know wheter a backend request is in progress
    const[loading, setLoading] = useState(false)
    
    //this function is passed into the form and is ran upon form submission, it attempts to login a user via the backend server
    const attemptCreateNewUser = async (FormData) =>{
        setLoading(true)
        const URL = "https://hidden-journey-86205.herokuapp.com/user/login"
        const data = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "Application/json"
            },
            body: JSON.stringify(FormData),
          })
        const response = await data.json()
        //set loading to false
        setLoading(false)
        //if there is an error in the response (ie "username is already taken")
        if (response.error){
            setError(response.error)
        }else{
            //if user is created succesfully set the user to the user sent back by the server then redirect to portfolio
            props.setUser(response)
            navigate("/dashboard")
        }
    }    


    return ( 
        <Div>
            {/* if there is an error then display it within an h3 tag with id errormessage */}
            {(error)? <h3 id="errormessage">{error}</h3>:null}
            {/* if loading then display loading else display the form  */}
            {(loading)?<h3 id="loadingmessage">loading</h3>:<Form onSubmit={attemptCreateNewUser}/>}
            <H4>New User?</H4>
            <P>
            <Link to={`/CreateAccount`}>Create Account</Link>
            </P>
        </Div>
     );
}

export default NewUser;