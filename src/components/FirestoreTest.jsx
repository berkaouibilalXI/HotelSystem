import { useState } from "react";
import { useAuth } from "../firebase/auth-context";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

const FirestoreTest = () => {
  const { user } = useAuth();
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runReadTest = async () => {
    setLoading(true);
    try {
      // Try to read from a test collection
      const testCollection = collection(db, "test_collection");
      const snapshot = await getDocs(testCollection);
      
      setTestResult({
        success: true,
        operation: "read",
        message: `Successfully read ${snapshot.docs.length} documents`,
        data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      });
      
      toast.success("Read test successful");
    } catch (error) {
      console.error("Read test error:", error);
      setTestResult({
        success: false,
        operation: "read",
        message: error.message,
        code: error.code
      });
      
      toast.error(`Read test failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const runWriteTest = async () => {
    setLoading(true);
    try {
      // Try to write to a test collection
      const testCollection = collection(db, "test_collection");
      const docRef = await addDoc(testCollection, {
        text: "Test document",
        createdBy: user?.uid || "anonymous",
        createdAt: serverTimestamp()
      });
      
      setTestResult({
        success: true,
        operation: "write",
        message: `Successfully wrote document with ID: ${docRef.id}`,
        data: { id: docRef.id }
      });
      
      toast.success("Write test successful");
    } catch (error) {
      console.error("Write test error:", error);
      setTestResult({
        success: false,
        operation: "write",
        message: error.message,
        code: error.code
      });
      
      toast.error(`Write test failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4">
      <h3 className="font-bold mb-2">Firestore Test</h3>
      <p>User ID: {user?.uid || "Not logged in"}</p>
      <p>Email: {user?.email || "N/A"}</p>
      <p>Role: {user?.role || "No role"}</p>
      
      <div className="mt-2 space-x-2">
        <button 
          onClick={runReadTest}
          disabled={loading}
          className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Test Read
        </button>
        <button 
          onClick={runWriteTest}
          disabled={loading}
          className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Test Write
        </button>
      </div>
      
      {loading && <p className="mt-2">Loading...</p>}
      
      {testResult && (
        <div className={`mt-4 p-3 rounded ${testResult.success ? 'bg-green-100' : 'bg-red-100'}`}>
          <p><strong>Operation:</strong> {testResult.operation}</p>
          <p><strong>Result:</strong> {testResult.success ? 'Success' : 'Failure'}</p>
          <p><strong>Message:</strong> {testResult.message}</p>
          {testResult.code && <p><strong>Error Code:</strong> {testResult.code}</p>}
          {testResult.data && (
            <div>
              <p><strong>Data:</strong></p>
              <pre className="bg-gray-200 p-2 rounded mt-1 text-xs overflow-auto">
                {JSON.stringify(testResult.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FirestoreTest;