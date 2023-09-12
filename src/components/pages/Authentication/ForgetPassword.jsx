import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; // Import react-toastify

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailSent(true);
        // Show success notification using react-toastify
        toast.success("An email with reset instructions has been sent to your inbox.", {
          onClose: () => {
            setEmailSent(false);
            navigate("/login");
          },
        });
      })
      .catch((error) => {
        console.error("Error sending reset password email:", error);
        // Show error notification using react-toastify
        toast.error(error.message);
      });
  };

  return (
    <div>
      {emailSent ? (
        <div className="p-10 flex justify-center items-center">
          <div>
            <h2 className="text-2xl text-center mb-4">Please Check your email and reset your password.</h2>
          </div>
        </div>
      ) : (
        <div className="p-10 flex justify-center items-center">
          <div>
            <h2 className="text-2xl text-center mb-4">Forgot Password</h2>
            <div className="p-10 bg-slate-200 rounded-lg">
              <div>
                <label className="pr-2">Email: </label>
                <input
                  className="p-2 rounded"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Give your email"
                />
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  className="btn btn-warning"
                  onClick={handleResetPassword}
                >
                  Send Reset Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
