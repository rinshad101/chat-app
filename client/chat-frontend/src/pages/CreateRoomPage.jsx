import { useState } from 'react';
import { 
  ArrowLeft, 
  Hash, 
  Lock, 
  Globe, 
  Users, 
  Info
} from 'lucide-react';

export default function CreateRoomPage() {
  const [roomData, setRoomData] = useState({
    name: '',
    description: '',
    type: 'public', // 'public' or 'private'
    category: 'general',
    maxMembers: 100
  });
  
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [selectedEmoji, setSelectedEmoji] = useState('💬');

  const colors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B',
    '#EF4444', '#F97316', '#06B6D4', '#84CC16'
  ];

  const emojis = ['💬', '🚀', '💻', '🎨', '📊', '🎮', '📚', '☕', '🌟', '🔥'];

  const categories = [
    { value: 'general', label: 'General Discussion', icon: <Hash className="w-4 h-4" /> },
    { value: 'work', label: 'Work & Projects', icon: <Users className="w-4 h-4" /> },
    { value: 'social', label: 'Social & Fun', icon: <Globe className="w-4 h-4" /> },
    { value: 'announcements', label: 'Announcements', icon: <Info className="w-4 h-4" /> }
  ];

  const handleInputChange = (field, value) => {
    setRoomData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateRoom = () => {
    const finalRoomData = {
      ...roomData,
      color: selectedColor,
      emoji: selectedEmoji
    };
    console.log('Creating room:', finalRoomData);
    alert('Room created successfully! Check console for details.');
  };

  const isFormValid = () => {
    return roomData.name.trim().length > 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mr-3">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Create New Room</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Room Icon & Color */}
            <div className="text-center">
              <div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl text-3xl mb-4"
                style={{ backgroundColor: selectedColor }}
              >
                {selectedEmoji}
              </div>
              
              {/* Emoji Selection */}
              <div className="flex justify-center space-x-2 mb-4">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`w-10 h-10 rounded-lg text-xl hover:bg-gray-100 transition-colors ${
                      selectedEmoji === emoji ? 'bg-blue-100 ring-2 ring-blue-500' : ''
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Color Selection */}
              <div className="flex justify-center space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                      selectedColor === color ? 'ring-2 ring-gray-400 ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Room Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Name *
              </label>
              <input
                type="text"
                value={roomData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter room name..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={50}
              />
              <p className="text-sm text-gray-500 mt-1">{roomData.name.length}/50 characters</p>
            </div>

            {/* Room Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={roomData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="What's this room about?"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                maxLength={200}
              />
              <p className="text-sm text-gray-500 mt-1">{roomData.description.length}/200 characters</p>
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Room Privacy
              </label>
              <div className="space-y-3">
                <div 
                  className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                    roomData.type === 'public' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleInputChange('type', 'public')}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                      roomData.type === 'public' 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {roomData.type === 'public' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <Hash className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Public Room</h4>
                      <p className="text-sm text-gray-600">Anyone can join and see all messages</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                    roomData.type === 'private' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleInputChange('type', 'private')}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                      roomData.type === 'private' 
                        ? 'border-purple-500 bg-purple-500' 
                        : 'border-gray-300'
                    }`}>
                      {roomData.type === 'private' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <Lock className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Private Room</h4>
                      <p className="text-sm text-gray-600">Only invited members can join</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category
              </label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <div
                    key={category.value}
                    className={`border rounded-xl p-3 cursor-pointer transition-colors ${
                      roomData.category === category.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInputChange('category', category.value)}
                  >
                    <div className="flex items-center">
                      <div className={`mr-3 ${
                        roomData.category === category.value ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {category.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{category.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Maximum Members */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Members
              </label>
              <select
                value={roomData.maxMembers}
                onChange={(e) => handleInputChange('maxMembers', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={10}>10 members</option>
                <option value={25}>25 members</option>
                <option value={50}>50 members</option>
                <option value={100}>100 members</option>
                <option value={250}>250 members</option>
                <option value={500}>500 members</option>
                <option value={-1}>Unlimited</option>
              </select>
            </div>
          </div>

          {/* Create Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleCreateRoom}
              disabled={!isFormValid()}
              className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}