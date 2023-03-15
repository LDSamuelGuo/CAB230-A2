import React, { useState } from "react"
import { Input, Button } from "reactstrap"
export default function Register() {
    const API_URL = "http://sefdb02.qut.edu.au:3001";
    const [email, setEmailValue] = useState("");
    const [password, setPasswordValue] = useState("");

    function TackleAssociation(event) {
        event.preventDefault();

        fetch(`${API_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password}),
        })
            .then(response => {
                console.log(response.status + ": " + response.statusText);
                if (response.status > 200 && response.status < 205) {
                    alert("Registration succeed.");
                }
                else if (response.status > 400) {
                    throw new Error(response.statusText);
                
                }
              
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setEmailValue("");
                setPasswordValue("");
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(`User already exist: ${error}`);
                setEmailValue("");
                setPasswordValue("");
            });
    }
    return (
        <div className="login__container">
        <div className="login__wrapper">
          <h1 className="login__header">Register</h1>
                <form onSubmit={(event) => TackleAssociation(event)}>
                    <div>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmailValue(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPasswordValue(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Button type="submit">Login</Button>
                    </div>                   
                    <p>
          Already a member?{" "}
          <a className="register__link" href="/Login">
            Click here to Login!
          </a>
        </p>
                </form>
            </div>
        </div>
    );
}