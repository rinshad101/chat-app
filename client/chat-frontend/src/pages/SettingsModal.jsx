import { useState } from 'react';
import { 
  X, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Key, 
  Smartphone,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Camera,
  Edit3,
  Save,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  MessageCircle
} from 'lucide-react';

export default function SettingsModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // Profile Settings
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    bio: 'Product Manager at TechCorp',
    avatar: null,
    
    // Notification Settings
    pushNotifications: true,
    emailNotifications: true,
    soundNotifications: true,
    desktopNotifications: true,
    notifyOnMention: true,
    notifyOnDM: true,
    notifyOnRoomActivity: false,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00',
    
    // Appearance Settings
    theme: 'light', // 'light', 'dark', 'auto'
    accentColor: '#3B82F6',
    fontSize: 'medium',
    compactMode: false,
    
    // Privacy Settings
    showOnlineStatus: true,
    showLastSeen: true,
    allowDirectMessages: true,
    allowRoomInvites: true,
    dataCollection: true,
    
    // Security Settings
    twoFactorEnabled: false,
    sessionTimeout: 30,
    loginAlerts: true
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Save to backend/localStorage
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'appearance', name: 'Appearance', icon: <Palette className="w-5 h-5" /> },
    { id: 'privacy', name: 'Privacy', icon: <Shield className="w-5 h-5" /> },
    { id: 'security', name: 'Security', icon: <Key className="w-5 h-5" /> },
    { id: 'advanced', name: 'Advanced', icon: <Globe className="w-5 h-5" /> }
  ];

  const accentColors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B',
    '#EF4444', '#F97316', '#06B6D4', '#84CC16'
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
            
            {/* Avatar Upload */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {settings.firstName[0]}{settings.lastName[0]}
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Profile Picture</h4>
                <p className="text-sm text-gray-600">JPG, PNG or GIF. Max size 2MB</p>
                <div className="flex space-x-2 mt-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Upload</button>
                  <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
                </div>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={settings.firstName}
                  onChange={(e) => handleSettingChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={settings.lastName}
                  onChange={(e) => handleSettingChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={settings.bio}
                onChange={(e) => handleSettingChange('bio', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Tell others about yourself..."
                maxLength={160}
              />
              <p className="text-sm text-gray-500 mt-1">{settings.bio.length}/160 characters</p>
            </div>

            {/* Change Password */}
            <div className="border-t pt-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Change Password</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.current}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.new}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      value={passwordData.confirm}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
            
            {/* General Notifications */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">General</h4>
              
              <div className="space-y-3">
                {[
                  { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive notifications on your device' },
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                  { key: 'soundNotifications', label: 'Sound Notifications', desc: 'Play sound for new messages' },
                  { key: 'desktopNotifications', label: 'Desktop Notifications', desc: 'Show desktop notifications' }
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900">{label}</h5>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[key]}
                        onChange={(e) => handleSettingChange(key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Specific Notifications */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Message Notifications</h4>
              
              <div className="space-y-3">
                {[
                  { key: 'notifyOnMention', label: 'When mentioned', desc: 'Get notified when someone mentions you' },
                  { key: 'notifyOnDM', label: 'Direct messages', desc: 'Get notified for private messages' },
                  { key: 'notifyOnRoomActivity', label: 'All room activity', desc: 'Get notified for all messages in joined rooms' }
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900">{label}</h5>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[key]}
                        onChange={(e) => handleSettingChange(key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiet Hours */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Quiet Hours</h4>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h5 className="font-medium text-gray-900">Enable Quiet Hours</h5>
                  <p className="text-sm text-gray-600">Pause notifications during specified hours</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.quietHours}
                    onChange={(e) => handleSettingChange('quietHours', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {settings.quietHours && (
                <div className="grid grid-cols-2 gap-4 pl-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={settings.quietStart}
                      onChange={(e) => handleSettingChange('quietStart', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <input
                      type="time"
                      value={settings.quietEnd}
                      onChange={(e) => handleSettingChange('quietEnd', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Appearance Settings</h3>
            
            {/* Theme */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Theme</h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'light', label: 'Light', icon: <Sun className="w-5 h-5" /> },
                  { value: 'dark', label: 'Dark', icon: <Moon className="w-5 h-5" /> },
                  { value: 'auto', label: 'Auto', icon: <Smartphone className="w-5 h-5" /> }
                ].map(({ value, label, icon }) => (
                  <div
                    key={value}
                    onClick={() => handleSettingChange('theme', value)}
                    className={`p-4 border rounded-xl cursor-pointer transition-colors text-center ${
                      settings.theme === value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`mx-auto mb-2 ${
                      settings.theme === value ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {icon}
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Accent Color</h4>
              <div className="flex space-x-3">
                {accentColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleSettingChange('accentColor', color)}
                    className={`w-10 h-10 rounded-full transition-transform hover:scale-110 ${
                      settings.accentColor === color ? 'ring-2 ring-gray-400 ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Font Size</h4>
              <select
                value={settings.fontSize}
                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="extra-large">Extra Large</option>
              </select>
            </div>

            {/* Compact Mode */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">Compact Mode</h5>
                <p className="text-sm text-gray-600">Reduce spacing and padding for a denser layout</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.compactMode}
                  onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>
            
            <div className="space-y-3">
              {[
                { key: 'showOnlineStatus', label: 'Show Online Status', desc: 'Let others see when you\'re online' },
                { key: 'showLastSeen', label: 'Show Last Seen', desc: 'Let others see when you were last active' },
                { key: 'allowDirectMessages', label: 'Allow Direct Messages', desc: 'Allow others to send you private messages' },
                { key: 'allowRoomInvites', label: 'Allow Room Invites', desc: 'Allow others to invite you to rooms' },
                { key: 'dataCollection', label: 'Analytics & Improvements', desc: 'Help improve the app by sharing anonymous usage data' }
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">{label}</h5>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[key]}
                      onChange={(e) => handleSettingChange(key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>

            {/* Data Management */}
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Data Management</h4>
              <div className="space-y-3">
                <button className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-left">
                    <h5 className="font-medium text-gray-900">Download Your Data</h5>
                    <p className="text-sm text-gray-600">Get a copy of all your data</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="flex items-center justify-between w-full p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <div className="text-left">
                    <h5 className="font-medium text-red-900">Delete Account</h5>
                    <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                  </div>
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            
            {/* Two-Factor Authentication */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div>
                <h5 className="font-medium text-gray-900">Two-Factor Authentication</h5>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium ${
                  settings.twoFactorEnabled ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {settings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </span>
                <button
                  onClick={() => handleSettingChange('twoFactorEnabled', !settings.twoFactorEnabled)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    settings.twoFactorEnabled
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {settings.twoFactorEnabled ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>

            {/* Session Timeout */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Session Timeout</h4>
              <p className="text-sm text-gray-600 mb-3">Automatically log out after inactivity</p>
              <select
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={240}>4 hours</option>
                <option value={480}>8 hours</option>
                <option value={-1}>Never</option>
              </select>
            </div>

            {/* Login Alerts */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">Login Alerts</h5>
                <p className="text-sm text-gray-600">Get notified of new login attempts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.loginAlerts}
                  onChange={(e) => handleSettingChange('loginAlerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Active Sessions */}
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Active Sessions</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Current Session</h5>
                      <p className="text-sm text-gray-600">Chrome on Windows • Active now</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 font-medium">CURRENT</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Mobile App</h5>
                      <p className="text-sm text-gray-600">iPhone • 2 hours ago</p>
                    </div>
                  </div>
                  <button className="text-sm text-red-600 hover:text-red-800">Revoke</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Advanced Settings</h3>
            
            {/* Developer Options */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Developer Options</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">Developer Mode</h5>
                    <p className="text-sm text-gray-600">Enable advanced debugging features</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <button className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-left">
                    <h5 className="font-medium text-gray-900">Clear Cache</h5>
                    <p className="text-sm text-gray-600">Clear stored data to free up space</p>
                  </div>
                  <Trash2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* App Information */}
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">App Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Version</span>
                  <span className="font-medium">2.1.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Build</span>
                  <span className="font-medium">20250820</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">Aug 15, 2025</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Support & Legal</h4>
              <div className="space-y-2">
                {[
                  'Help Center',
                  'Terms of Service',
                  'Privacy Policy',
                  'Contact Support',
                  'Report a Bug'
                ].map((item) => (
                  <button
                    key={item}
                    className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="ml-2 text-lg font-bold text-gray-900">Settings</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span className="ml-3 text-sm font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderTabContent()}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 flex items-center justify-between bg-gray-50">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSettings}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}