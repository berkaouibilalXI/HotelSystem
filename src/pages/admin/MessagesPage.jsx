import { useState, useEffect } from "react";
import { getContactMessages, markMessageAsRead, deleteMessage } from "@/firebase/firestore";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import { toast } from "sonner";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesData = await getContactMessages();
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await markMessageAsRead(id);
      setMessages(
        messages.map((message) =>
          message.id === id ? { ...message, read: true } : message
        )
      );
      toast.success("Message marked as read");
    } catch (error) {
      console.error("Error marking message as read:", error);
      toast.error("Failed to mark message as read");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteMessage(id);
        setMessages(messages.filter((message) => message.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
        toast.success("Message deleted");
      } catch (error) {
        console.error("Error deleting message:", error);
        toast.error("Failed to delete message");
      }
    }
  };

  const filteredMessages = filter === "all" 
    ? messages 
    : filter === "read" 
    ? messages.filter(message => message.read) 
    : messages.filter(message => !message.read);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1 md:ml-64 pt-16 md:pt-0">
        <div className="p-4 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
          </div>

          <div className="mb-6">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md ${
                  filter === "all"
                    ? "bg-hotel-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-4 py-2 rounded-md ${
                  filter === "unread"
                    ? "bg-hotel-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter("read")}
                className={`px-4 py-2 rounded-md ${
                  filter === "read"
                    ? "bg-hotel-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Read
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hotel-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 bg-white rounded-lg shadow overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">Messages</h2>
                </div>
                <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => {
                        setSelectedMessage(message);
                        if (!message.read) {
                          handleMarkAsRead(message.id);
                        }
                      }}
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${
                        selectedMessage?.id === message.id ? "bg-gray-50" : ""
                      } ${!message.read ? "font-semibold" : ""}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {message.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {message.email}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {!message.read && (
                            <span className="w-2 h-2 bg-hotel-600 rounded-full"></span>
                          )}
                          <p className="text-xs text-gray-500 ml-2">
                            {message.createdAt
                              ? new Date(message.createdAt.seconds * 1000).toLocaleDateString()
                              : ""}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 truncate">
                        {message.message}
                      </p>
                    </div>
                  ))}
                  {filteredMessages.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No messages found with the selected filter.
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2 bg-white rounded-lg shadow">
                {selectedMessage ? (
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-medium text-gray-900">
                          {selectedMessage.name}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedMessage.email}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedMessage.phone}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedMessage.createdAt
                            ? new Date(selectedMessage.createdAt.seconds * 1000).toLocaleString()
                            : ""}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {!selectedMessage.read && (
                          <button
                            onClick={() => handleMarkAsRead(selectedMessage.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(selectedMessage.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-md font-medium text-gray-800 mb-2">Message:</h3>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                    {selectedMessage.subject && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Subject:</span> {selectedMessage.subject}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    Select a message to view details
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
