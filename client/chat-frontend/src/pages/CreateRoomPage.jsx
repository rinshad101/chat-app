import { useState } from 'react';
import { 
  ArrowLeft, 
  Hash, 
  Lock, 
  Globe, 
  Users, 
  Image, 
  Palette,
  Info,
  UserPlus,
  Settings,
  Check
} from 'lucide-react';

export default function CreateRoomPage() {
  const [roomData, setRoomData] = useState({
    name: '',
    description: '',
    type: 'public', // 'public' or 'private'
    category: 'general',
    allowInvites: true,
    requireApproval: false,
    maxMembers: 100
  });
  
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [selectedEmoji, setSelectedEmoji] = useState('💬');
  const [inviteEmails, setInviteEmails] = useState(['']);
  const [currentStep, setCurrentStep] = useState(1); // 1: Basic Info, 2: Settings, 3: Invite Members

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

  const addInviteEmail = () => {
    setInviteEmails(prev => [...prev, '']);
  };

  const updateInviteEmail = (index, value) => {
    setInviteEmails(prev => prev.map((email, i) => i === index ? value : email));
  };

  const removeInviteEmail = (index) => {
    setInviteEmails(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateRoom = () => {
    const finalRoomData = {
      ...roomData,
      color: selectedColor,
      emoji: selectedEmoji,
      invitedMembers: inviteEmails.filter(email => email.trim())
    };
    console.log('Creating room:', finalRoomData);
    // Navigate back or show success message
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
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
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Settings</h3>
            
            {/* Member Limits */}
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

            {/* Permission Settings */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Permissions</h4>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h5 className="font-medium text-gray-900">Allow Invites</h5>
                  <p className="text-sm text-gray-600">Members can invite others to join</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roomData.allowInvites}
                    onChange={(e) => handleInputChange('allowInvites', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h5 className="font-medium text-gray-900">Require Approval</h5>
                  <p className="text-sm text-gray-600">New members need approval to join</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roomData.requireApproval}
                    onChange={(e) => handleInputChange('requireApproval', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <UserPlus className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Invite Members</h3>
              <p className="text-gray-600">Add people to your new room</p>
            </div>

            {/* Email Invites */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Invite by Email (Optional)
              </label>
              <div className="space-y-3">
                {inviteEmails.map((email, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => updateInviteEmail(index, e.target.value)}
                      placeholder="Enter email address..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {inviteEmails.length > 1 && (
                      <button
                        onClick={() => removeInviteEmail(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addInviteEmail}
                  className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  + Add another email
                </button>
              </div>
            </div>

            {/* Skip Option */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                You can always invite members later from the room settings
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return roomData.name.trim().length > 0;
      case 2:
        return true;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mr-3">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Create New Room</h1>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep} of 3
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < currentStep ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : null}
              disabled={currentStep === 1}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>

            <div className="flex space-x-3">
              {currentStep < 3 ? (
                <>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Skip
                  </button>
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!isStepValid()}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCreateRoom}
                  disabled={!isStepValid()}
                  className="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Create Room
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}