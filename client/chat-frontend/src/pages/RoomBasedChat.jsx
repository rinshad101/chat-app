import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  Plus,
  Search,
  MoreVertical,
  Users,
  Hash,
  Lock,
  Globe,
  Paperclip,
  Smile,
  Phone,
  Video,
  Settings,
  Bell,
  BellOff,
  UserPlus,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RoomBasedChat() {
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showRoomOptions, setShowRoomOptions] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Sample rooms data
  const [rooms] = useState([
    {
      id: 1,
      name: "General Discussion",
      type: "public",
      members: 45,
      lastMessage: "Hey everyone! How's the project going?",
      lastMessageTime: "2 min ago",
      unreadCount: 3,
      isOnline: true,
    },
    {
      id: 2,
      name: "Development Team",
      type: "private",
      members: 8,
      lastMessage: "The new feature is ready for testing",
      lastMessageTime: "5 min ago",
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: 3,
      name: "Design Reviews",
      type: "private",
      members: 12,
      lastMessage: "Sarah: I love the new color scheme!",
      lastMessageTime: "1 hour ago",
      unreadCount: 7,
      isOnline: false,
    },
    {
      id: 4,
      name: "Random",
      type: "public",
      members: 23,
      lastMessage: "Anyone up for lunch?",
      lastMessageTime: "3 hours ago",
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: 5,
      name: "Project Alpha",
      type: "private",
      members: 6,
      lastMessage: "Meeting scheduled for tomorrow",
      lastMessageTime: "1 day ago",
      unreadCount: 2,
      isOnline: false,
    },
  ]);

  // Sample messages for the selected room
  const [messages] = useState([
    {
      id: 1,
      sender: "Alex Chen",
      avatar: "AC",
      message:
        "Hey everyone! I've just pushed the latest updates to the repository.",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      avatar: "You",
      message: "Great work! I'll review it this afternoon.",
      timestamp: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      avatar: "SJ",
      message:
        "The UI improvements look fantastic! Really love the new design direction we're taking.",
      timestamp: "10:35 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "Mike Rodriguez",
      avatar: "MR",
      message: "Should we schedule a team meeting to discuss the next sprint?",
      timestamp: "10:40 AM",
      isOwn: false,
    },
    {
      id: 5,
      sender: "You",
      avatar: "You",
      message: "That sounds like a great idea. How about tomorrow at 2 PM?",
      timestamp: "10:42 AM",
      isOwn: true,
    },
    {
      id: 6,
      sender: "Alex Chen",
      avatar: "AC",
      message: "Perfect! I'll send out calendar invites to everyone.",
      timestamp: "10:43 AM",
      isOwn: false,
    },
  ]);

  const currentRoom = rooms[selectedRoom];
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message, "to room:", currentRoom.name);
      setMessage("");
    }
  };

  const getRoomIcon = (type) => {
    switch (type) {
      case "private":
        return <Lock className="w-4 h-4" />;
      case "public":
        return <Hash className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
    ];
    const index = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Rooms List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">ChatFlow</h1>
            </div>
            <button
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={() => navigate("/create-room")}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Rooms List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <h2 className="text-sm font-semibold text-gray-500 mb-2 px-2">
              ROOMS
            </h2>
            {filteredRooms.map((room, index) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(index)}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors relative ${
                  selectedRoom === index
                    ? "bg-blue-50 border-r-2 border-blue-500"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center flex-1 min-w-0">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-lg mr-3 ${
                      room.type === "private"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {getRoomIcon(room.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {room.name}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2">
                        {room.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 truncate">
                      {room.lastMessage}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {room.members}
                      </span>
                      {room.unreadCount > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                          {room.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRoomOptions(
                      showRoomOptions === room.id ? null : room.id
                    );
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {/* Room Options Dropdown */}
                {showRoomOptions === room.id && (
                  <div className="absolute right-2 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 min-w-[160px]">
                    <button className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                    </button>
                    <button className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Members
                    </button>
                    <button className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                      <Settings className="w-4 h-4 mr-2" />
                      Room Settings
                    </button>
                    <hr className="my-1" />
                    <button className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                      <LogOut className="w-4 h-4 mr-2" />
                      Leave Room
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-lg mr-3 ${
                  currentRoom?.type === "private"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {getRoomIcon(currentRoom?.type)}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {currentRoom?.name}
                </h2>
                <p className="text-sm text-gray-500 flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {currentRoom?.members} members
                  {currentRoom?.isOnline && (
                    <span className="ml-2 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1 inline-block"></span>
                      Active
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => navigate("/settings")}
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-xs lg:max-w-md ${
                  msg.isOwn ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className={`flex-shrink-0 ${msg.isOwn ? "ml-3" : "mr-3"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      msg.isOwn ? "bg-blue-500" : getAvatarColor(msg.sender)
                    }`}
                  >
                    {msg.avatar === "You" ? "You" : msg.avatar}
                  </div>
                </div>
                <div>
                  {!msg.isOwn && (
                    <p className="text-xs text-gray-600 mb-1">{msg.sender}</p>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      msg.isOwn
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <p
                    className={`text-xs text-gray-500 mt-1 ${
                      msg.isOwn ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(e);
                    }
                  }}
                  placeholder={`Message ${currentRoom?.name}...`}
                  className="w-full px-4 py-3 pr-24 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Smile className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
