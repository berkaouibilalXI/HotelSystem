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
    <div className="p-4 bg-gray-400 rounded-lg mb-4 dark:bg-inherit">
      <h3 className="font-bold mb-2">Role Debugger</h3>
      <p>User ID: {user?.uid || "Not logged in"}</p>
      <p>Email: {user?.email || "N/A"}</p>
      <p>Role: {user?.role || "No role"}</p>
      <div className="mt-2 space-x-2">
        <button 
          onClick={handleSetAdmin}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Set Admin
        </button>
        <button 
          onClick={handleSetStaff}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Set Staff
        </button>
      </div>
    </div>
  );
};

export default RoleDebugger;
