import { useContext, useState } from "react";
import { AppContext } from "../../ContextProvider/ContextProvider";


export default function PreferenceModal() {
    const { currentUser } = useContext(AppContext);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const closeDialog = ({target}) => {
        if (target.id === "preference-modal") {
            target.close();
        }
    };
    return (
        <dialog id="preference-modal" className="modal" onClick={closeDialog}>
            <div className="dialog-body">
                <h2>Preference Modal
                </h2>
                { currentUser?.name && <p>Welcome: <strong>{currentUser?.name}</strong></p> }
                <button>Theme</button>
                {
                    currentUser?.name && <>
                        <form >
                            <input type="text" placeholder="Name" value={currentUser?.name || user.name} onChange={({target}) => setUser(prev => ({...prev, name:target.value}))}/>
                            <br />
                            <input type="email" placeholder="Email" value={currentUser?.email ||user.email} onChange={({target}) => setUser(prev => ({...prev, email:target.value}))}/>
                            <br />
                            <input type="password" placeholder="Password" value={user.password} onChange={({target}) => setUser(prev => ({...prev, password:target.value}))}/>
                            {
                                user.password.length > 0 && <>
                                    <br />
                                    <input type="password" placeholder="Confirm Password" value={user.confirmPassword} onChange={({target}) => setUser(prev => ({...prev, confirmPassword:target.value}))}/>
                                </>
                            }
                            <br />
                            <input type="submit" value="Update" />
                        </form>
                    </>
                }
                <form method="dialog">
                    <button>Close</button>
                </form>
            </div>
        </dialog>
    );
}
