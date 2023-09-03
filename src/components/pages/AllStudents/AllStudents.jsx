import { MdAdminPanelSettings, MdDeleteForever } from "react-icons/md";
import useUsersData from "../../../hooks/useUserData";

const AllStudents = () => {
    const { users, refetch } = useUsersData();



    const makeAdmin = async (user) => {
        fetch(`https://unipay-server-toushik018.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    alert("User promoted to admin");
                }
            })
    };



    return (
        <div className="min-h-screen bg-gray-100">
            <div className="lg:max-w-5xl mx-auto py-8 px-4 sm:px-6 md:pl-16 lg:pl-16">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-16">
                <h2 className="text-center text-3xl my-4">All Students </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-4 py-3 whitespace-nowrap text-base font-medium text-gray-900">{user.id}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-base text-gray-500">{user.name}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-base text-gray-500">
                                            {user.role === 'admin' ? (
                                                <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                                                    Student
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                            <button onClick={() => makeAdmin(user)}
                                                disabled={user?.role === 'admin'}
                                                className="text-green-600 hover:text-green-900 text-3xl"> <MdAdminPanelSettings /> </button>
                                            <button className="text-red-600 hover:text-red-900 ml-2 text-3xl"> <MdDeleteForever /> </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllStudents;
