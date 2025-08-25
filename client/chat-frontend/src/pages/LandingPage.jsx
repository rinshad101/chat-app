import { MessageCircle, Users, Shield, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";

export default function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);

  const features = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Instant Messaging",
      description:
        "Send messages instantly with real-time delivery and read receipts",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Group Chats",
      description:
        "Create unlimited group conversations with friends and colleagues",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "End-to-End Encryption",
      description:
        "Your conversations are secured with military-grade encryption",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description:
        "Experience blazing fast performance across all your devices",
    },
  ];

  const handleButtonClick = async () => {
    if (isAuth) {
      navigate("/room-chat");
    } else {
      console.log("Not logged in");
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    dispatch(logoutUser());
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">
                ChatFlow
              </span>
            </div>
            <div>
              {!isAuth ? (
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              ) : (
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
                  onClick={() => handleLogout()}
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Connect, Chat, and
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Collaborate
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the future of communication with our lightning-fast,
              secure chat platform. Connect with friends, family, and colleagues
              like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => handleButtonClick()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg flex items-center"
              >
                Start Chatting Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Hero Animation/Mockup */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      A
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-2 max-w-xs">
                      <p className="text-gray-800">
                        Hey! How's the project going?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl px-4 py-2 max-w-xs">
                      <p>Great! Just finished the final touches 🎉</p>
                    </div>
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      You
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      B
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-2 max-w-xs">
                      <p className="text-gray-800">Awesome work team! 👏</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50M+</div>
              <div className="text-blue-100">Messages Sent</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Communication
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to stay connected, organized, and productive
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer bg-white/50 hover:bg-white hover:shadow-md`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-xl transition-colors bg-gradient-to-r from-blue-500 to-purple-600 text-white`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">Team Chat</h4>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                        <div className="flex-1 bg-gray-100 rounded-lg p-2">
                          <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 justify-end">
                        <div className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-2">
                          <div className="h-2 bg-white/50 rounded w-1/2 ml-auto"></div>
                        </div>
                        <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                        <div className="flex-1 bg-gray-100 rounded-lg p-2">
                          <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer content */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold">ChatFlow</h2>
            <p className="mt-2 text-gray-300 text-sm">
              Connecting people, one chat at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
