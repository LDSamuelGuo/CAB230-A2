import React, { useState } from "react"
import { Input, Button } from "reactstrap"
export default function Login() {
    const API_URL = "http://sefdb02.qut.edu.au:3001";
    const [email, setEmailValue] = useState("");
    const [password, setPasswordValue] = useState("");

    function TackleAssociation(event) {
        event.preventDefault();
        fetch(`${API_URL}/user/login`, {
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
            
                
                if (response.status >= 400) {
                    alert("Incorrect password or email - " + response.status + ": " + response.statusText);
                }
                return response.json();
            })
            .then(res => {
                
                if (res.token !== undefined) {
                    localStorage.setItem("token", res.token);
                    setEmailValue("");
                    setPasswordValue("");
                    alert("Login succeed!");
                }
                else {
                    console.log(" null.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Network error occur!" + error);
                setEmailValue("");
                setPasswordValue("");
            });
    }
    return (
       <div className="login__container">
        <div className="login__wrapper">
          <h1 className="login__header">Login</h1>
            
                {localStorage.getItem("token") ?
                    (<p>logged in.</p>) :
                    (<div>
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
          Not a member?{" "}
          <a className="register__link" href="/register">
            Click here to register now!
          </a>
        </p>
                        </form>
                   </div>
                    )}
            </div>
        </div >
    );
}