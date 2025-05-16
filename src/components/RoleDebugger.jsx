import { useAuth } from "../firebase/auth-context";
import { toast } from "sonner";

const RoleDebugger = () => {
  const { user, loading, setUserRole } = useAuth();

  if (loading) return <p>Loading...</p>;

  const handleSetAdmin = async () => {
    try {
      await setUserRole("admin");
      toast.success("User role set to Admin");
    } catch (error) {
      console.error("Error setting admin role:", error);
      toast.error("Failed to set admin role");
    }
  };

  const handleSetStaff = async () => {
    try {
      await setUserRole("staff");
      toast.success("User role set to Staff");
    } catch (error) {
      console.error("Error setting staff role:", error);
      toast.error("Failed to set staff role");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg opacity-75 z-50">
      <h3 className="font-bold">Auth Debug</h3>
      <p>User: {user ? user.email : "Not logged in"}</p>
      <p>UID: {user ? user.uid : "No UID"}</p>
      <p>Role: {user ? (user.role || "No role") : "Not logged in"}</p>
      {user && (
        <div className="mt-2">
          <button 
            onClick={handleSetAdmin}
            className="bg-red-500 text-white px-2 py-1 rounded mr-2 text-xs"
          >
            Set Admin
          </button>
          <button 
            onClick={handleSetStaff}
            className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
          >
            Set Staff
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleDebugger;
