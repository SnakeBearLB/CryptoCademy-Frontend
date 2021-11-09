/*~~~~~~~~~~~~~~~DESCRIPTION~~~~~~~~~~~~~~~~~~~~~~~~~~~
This component is used for creating or logging in a user
it takes in two text inputs within a form then runs a
function with that form data

~~~~~~~~~~~~~~~~PROPS TO PASS~~~~~~~~~~~~~~~~~~~~~~~~~~
onSubmit = A function to run upon submission of the form, this is ran within the handle submit function input will be the form data
setUser = A function for setting the current session username*/

import { useState } from "react"
import { Div, Input } from "../styles/Form.styled"

const Form = (props) => {
  //~~~~~~~~~State functions/variables~~~~~~~~~~~~~~~~

  //this state variable keeps track of the current stats of the form
  const [ Form, setForm ] = useState({
    userName: "",
    password: ""
  });

  //this handles changes within the form
  const handleChange = (event) => {
    setForm({...Form, [event.target.name]: event.target.value});
  }

  //this handles a form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    //run the onsubmit function passed in through props
    props.onSubmit(Form)
    //reset the form
    setForm({userName: "", password: ""})
  }


  return (
    <div className="form">
      <Div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={Form.userName}
          name="userName"
          placeholder="username"
          onChange={handleChange}
          required="required"
        />
        <Input
          type="text"
          value={Form.password}
          name="password"
          placeholder="password"
          onChange={handleChange}
          required="required"
        />
        <Input type="submit" value="Login"/>
      </form>
      </Div>
    </div>
  )
}

export default Form;