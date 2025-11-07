import react, {useState, useRef, useEffect} from "react";
import Chatbotimage from "../assets/ChatBot-images/Chatbot-image.png";
import { X, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

<ExternalLink />

const Chatbot = () => {
    const [ open, setOpen ] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I assis you today?" },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);
    const navigate = useNavigate(); // ✅ for redirection

     // Auto-scroll to latest message
    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // ✅ Keyword-based bot replies
    const getBotReply = (userText) => {
    const lower = userText.toLowerCase();

    if (lower.includes("hello") || lower.includes("hi"))
      return "Hi there! 👋 How can I help you today?";
    if (lower.includes("project")){
        setTimeout(() => navigate("/Projects"), 1200);
        return "Sure! Redirecting you to our Projects page 🚀";
    }
    if (lower.includes("career") || lower.includes("job")){
        setTimeout(() => navigate("/careers"), 1200);
        return "Let’s take you to our Careers page 💼";
    }
    if (lower.includes("contact")){
        setTimeout(() => navigate("/contact"), 1200);
        return "Heading over to the Contact page ☎️";
    }
    if (lower.includes("service"))
      return "We offer mechanical design, automation, and AI integration services.";
    if (lower.includes("location"))
      return "We’re located in Bengaluru, India. 📍";

    return "I’m here to help! You can explore Projects, Careers, or Contact us!";
    };

    

    const handleSend = (text = input) => {
        if (!text.trim()) return;
        
        const newMessages = [
        ...messages,
        { sender: "user", text: text.trim() },
        { sender: "bot", text: getBotReply(text.trim()) },
       ];
        setMessages(newMessages);
        setInput("");
        };

        // 🎯 Keyword-based responses
    //     if (userMessage.includes("hello") || userMessage.includes("hi")) {
    //     botReply = "Hi there! 👋 How can I assist you ?";
    //     } else if (userMessage.includes("project")) {
    //     botReply = "You can explore our latest projects on the 'Projects' page!";
    //     } else if (userMessage.includes("contact")) {
    //     botReply = "You can reach us via the Contact page or email us at 'info@mechyam.com' or 'hr@mechyam.com'.";
    //     } else if (userMessage.includes("service")) {
    //     botReply = "We offer mechanical design, automation, and AI integration services.";
    //     } else if (userMessage.includes("location")) {
    //     botReply = "We’re located in Bengaluru, India. 📍";
    //     } else if (userMessage.includes("help")) {
    //     botReply = "Sure! You can ask about projects, contact info, or services.";
    //  }

        // ✅ Handle redirect for suggestion buttons
       const handleRedirect = (path, message) => {
        handleSend(message);
        setTimeout(() => {
            navigate(path);
            setOpen(false); // Close chatbot after redirect
        }, 1000); // Delay to allow user to see bot message
  };

    // ✅ Suggestion buttons with redirect
  const suggestions = [
    { label: "View Projects", message: "Show me projects", path: " /Projects" },
    { label: "Careers", message: "Show me careers", path: "/careers" },
    { label: "Contact Us", message: "How can I contact you?", path: "/contact" },
  ];

    
      // ✅ Add messages to chat window   

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating Button */}
            {!open && (
                <button 
                    onClick={() => setOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition "
                    >
                      <img
                        src={Chatbotimage}
                        alt="chatbot"
                        className="w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl transition"
                       />
                       
                </button>
            )}

            {/* Chatbot Window */}
            {open && (
                <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                        <h3 className="font-semibold text-lg">Chat Assistant</h3>
                        <button onClick={() => setOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-2">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-lg max-w-[75%] ${
                                    msg.sender === "bot"
                                        ? "bg-gray-200 self-start"
                                        : "bg-blue-600 text-white self-end ml-auto"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {/* <div ref={messagesEndRef} /> */}
                    

                     {/* Suggestion buttons shown when chat opens */}
                    {messages.length === 1 && (
                        <div className="flex flex-col  gap-2 mt-3">
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleRedirect(s.path, s.message)}
                                    className="flex items-center justify-center px-3 py-1 text-md border border-blue-500 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
                        >
                            {s.label}
                            <ExternalLink />
                        </button>
                        ))}
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                   </div>

                    {/* Input Area */}
                    <div className="p-4 border-t flex border-gray-200 items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type your message..."
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;