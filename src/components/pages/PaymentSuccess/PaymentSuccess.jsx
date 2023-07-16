
import { Link, useParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const { tranId } = useParams();


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 mt-16">
      <div className="bg-white w-4/5 lg:max-w-md mx-auto p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful</h2>
        <p className="text-gray-800 text-lg mb-6">
          Thank you for your payment. Your transaction has been completed successfully. <br />
          Transaction Id is:<span className='badge badge-success font-semibold'> {tranId} </span>
        </p>
        <Link to='/'>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Go back to main page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
