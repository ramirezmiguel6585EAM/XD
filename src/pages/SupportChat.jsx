import React, { useState, useEffect, useRef } from 'react';

export default function SupportChat() {
  const [messages, setMessages] = useState([
    {
      id: "bot_1",
      sender: "bot",
      text: "Hello! Welcome to OmniMarket Support Center. I am your automated assistant. How can I help you today? Please click on one of the common topics below, or type your question.",
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const presetTopics = [
    {
      id: "escrow",
      question: "How does Escrow Protection work?",
      answer: "OmniMarket Protection secures your payment in our registry escrow. When you check out, the funds are held securely and are NOT released to the seller immediately. Once you meet the seller, inspect the item, and confirm you have it in your possession, you click 'Confirm Purchase Received'. The funds are then safely released to the seller."
    },
    {
      id: "meetup",
      question: "Tips for arranging a safe meetup?",
      answer: "Safety first! 1) Meet in public, well-lit spaces like coffee shops, grocery store parking lots, or local police station safe-exchange zones. 2) Never meet in secluded areas or invite strangers to your home. 3) Bring a friend if possible. 4) Carefully inspect and test the item BEFORE you confirm receipt and release payment."
    },
    {
      id: "quantity",
      question: "How do I specify listing quantities?",
      answer: "When creating a listing on the 'Sell Your Item' page or editing one on the 'Edit Listing' page, look for the 'Quantity Available' field. You can input any number of units (default is 1). Buyers can purchase multiple units at checkout, and the system automatically decrements the quantity. The item displays 'Sold Out' when the quantity reaches 0."
    },
    {
      id: "deploy",
      question: "How do I deploy this app to Vercel & GitHub?",
      answer: "Deployment is easy! 1) Push the codebase to a GitHub repository. 2) Go to Vercel, sign in, and import the repository. 3) Vercel automatically detects the Vite template and runs the build command. We have already added a 'vercel.json' file to the root which handles routing rewrites, ensuring that refreshing subpages (like details or chat) does not result in 404 errors."
    }
  ];

  const handleSelectPreset = (topic) => {
    const userTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const botTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    setMessages((prev) => [
      ...prev,
      {
        id: `user_${Date.now()}`,
        sender: "user",
        text: topic.question,
        time: userTime
      }
    ]);

    // Bot responds instantly
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          sender: "bot",
          text: topic.answer,
          time: botTime
        }
      ]);
    }, 500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim().toLowerCase();
    const userTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    setMessages((prev) => [
      ...prev,
      {
        id: `user_${Date.now()}`,
        sender: "user",
        text: inputText.trim(),
        time: userTime
      }
    ]);

    setInputText('');

    // Process typed query for preset matches
    setTimeout(() => {
      const botTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      let replyText = "I'm sorry, I didn't quite catch that. Could you please clarify your question, or select one of our pre-set topics in the sidebar list?";

      if (query.includes('escrow') || query.includes('protection') || query.includes('money') || query.includes('release')) {
        replyText = presetTopics[0].answer;
      } else if (query.includes('meet') || query.includes('meetup') || query.includes('safe') || query.includes('security')) {
        replyText = presetTopics[1].answer;
      } else if (query.includes('quantity') || query.includes('unit') || query.includes('item') || query.includes('stock')) {
        replyText = presetTopics[2].answer;
      } else if (query.includes('deploy') || query.includes('vercel') || query.includes('github') || query.includes('hosting')) {
        replyText = presetTopics[3].answer;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          sender: "bot",
          text: replyText,
          time: botTime
        }
      ]);
    }, 700);
  };

  return (
    <div className="flex-1 w-full max-w-container-max mx-auto px-md md:px-lg py-lg flex flex-col md:flex-row gap-lg items-stretch h-[calc(100vh-140px)] min-h-[500px]">
      
      {/* Topics Sidebar */}
      <aside className="w-full md:w-[320px] shrink-0 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md flex flex-col gap-md shadow-sm h-full overflow-hidden">
        <h2 className="font-headline-md text-[18px] font-bold text-on-background border-b border-outline-variant/20 pb-sm">
          Support Topics
        </h2>
        <div className="flex-1 overflow-y-auto flex flex-col gap-sm custom-scrollbar pr-xs">
          {presetTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleSelectPreset(topic)}
              className="w-full text-left bg-surface-bright hover:bg-primary/5 hover:border-primary/30 border border-outline-variant/30 rounded-xl p-md transition-all duration-200 cursor-pointer shadow-sm group"
            >
              <h3 className="font-bold text-body-md text-on-background group-hover:text-primary transition-colors text-[14px]">
                {topic.question}
              </h3>
              <p className="text-[12px] text-on-surface-variant line-clamp-2 mt-xs">
                {topic.answer}
              </p>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Chat Panel */}
      <section className="flex-1 w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
        {/* Header */}
        <div className="p-md border-b border-surface-container-high bg-surface-bright/50 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-body-lg text-on-background">OmniMarket Helper Bot</span>
              <span className="text-[11px] text-tertiary font-semibold flex items-center gap-base">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                Online &amp; Active
              </span>
            </div>
          </div>
        </div>

        {/* Message Bubble List */}
        <div className="flex-grow p-md overflow-y-auto bg-surface-container-low custom-scrollbar flex flex-col gap-md">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[75%] ${isBot ? 'self-start items-start' : 'self-end items-end'}`}
              >
                <div
                  className={`rounded-2xl p-md text-body-md shadow-sm leading-relaxed ${
                    isBot
                      ? 'bg-surface-container-lowest text-on-background border border-outline-variant/20 rounded-tl-none'
                      : 'bg-primary text-on-primary rounded-tr-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-on-surface-variant/70 mt-1 px-sm">
                  {msg.time}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Area */}
        <form onSubmit={handleSendMessage} className="p-md border-t border-surface-container-high bg-surface-bright/30 flex gap-sm items-center shrink-0">
          <input
            type="text"
            placeholder="Type your support question here..."
            className="flex-1 bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[12px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="bg-primary text-on-primary p-md rounded-xl font-bold flex items-center justify-center hover:bg-primary/95 transition-all active:scale-95 disabled:opacity-40 cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      </section>

    </div>
  );
}
