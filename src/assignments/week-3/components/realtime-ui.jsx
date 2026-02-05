/*
1st Question

Uber - Real-time UI

Build a live-stream chat UI that receives messages at a high frequency and renders them efficiently while avoiding unnecessary re-renders.

Since there is no real backend provided, you may simulate incoming messages locally using:setInterval / setTimeout
a mock WebSocket-like abstraction or any local message emitterMessages should arrive frequently (e.g., every 100–300ms).

Explain why useRef is used instead of state in certain places and how this improves performance.

Basic UI Requirements (Keep It Simple)
The UI should include:
A scrollable chat containerMessages displayed in a vertical list
New messages appended at the bottom
Automatic scroll to the latest message. A simple message format (e.g., timestamp + text)No advanced styling is required.

Performance Expectations
1. Avoid re-rendering the entire message list on every incoming message.
2. Clean up timers/subscriptions on unmount.
3. Ensure UI remains responsive under frequent updates.

 */

import { memo, useEffect, useRef, useState } from "react";

const chatMessages = [
  {
    timestamp: "2026-02-01T01:45:52.121Z",
    text: "Hello",
    isSelf: false,
    id: crypto.randomUUID(),
  },
  {
    timestamp: "2026-02-01T01:46:12.223Z",
    text: "Hai",
    isSelf: true,
    id: crypto.randomUUID(),
  },
  {
    timestamp: "2026-02-01T01:48:12.223Z",
    text: "How are you",
    isSelf: false,
    id: crypto.randomUUID(),
  },
  {
    timestamp: "2026-02-01T01:48:22.123Z",
    text: "Are you doing good?",
    isSelf: false,
    id: crypto.randomUUID(),
  },
  {
    timestamp: "2026-02-01T01:48:42.123Z",
    text: "Yeah, I'm fine, how r u?",
    isSelf: true,
    id: crypto.randomUUID(),
  },
]
  .map((message) => {
    const dateTimeParsed = new Date(message.timestamp);
    return {
      ...message,
      dateTimeParsed,
      timestamp: dateTimeParsed.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
  })
  .sort((a, b) => a.dateTimeParsed - b.dateTimeParsed);

const Message = memo(function ({ isSelf, text, timestamp }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: isSelf ? "end" : "start",
        alignItems: isSelf ? "flex-end" : "flex-start",
      }}
    >
      <p>{text}</p>
      <span style={{ fontSize: "0.75rem" }}>{timestamp}</span>
    </div>
  );
});

const generateRandomText = () => {
  return `${Math.floor(Math.random() * 1e7)}`
    .split("")
    .map((digit) => String.fromCharCode(Number(digit) + "a".charCodeAt(0)))
    .join("");
};

export default function RealTimeUI() {
  const chatContainerRef = useRef();
  const [messages, setMessages] = useState(() => chatMessages);
  const messagesBufferRef = useRef([]);

  useEffect(() => {
    let isMounted = true;

    function emitMessage() {
      if (!isMounted) return;

      const now = new Date();
      messagesBufferRef.current.push({
        timestamp: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        isSelf: Math.floor(Math.random() * 1e7) % 2 === 0,
        text: generateRandomText(),
        id: crypto.randomUUID(),
      });
      setTimeout(emitMessage, Math.floor(100 + Math.random() * 200));
    }

    emitMessage();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (messagesBufferRef.current.length === 0) return;
      const batch = messagesBufferRef.current;
      messagesBufferRef.current = [];
      setMessages((messages) => messages.concat(batch));
    }, 200);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      // why requestAnimationFrame? - to do the any transition / animation stuff prior to next repaint so that respective animation / transitiion feels better
      chatContainerRef.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    });
  }, [messages]);

  return (
    <div
      style={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minHeight: "100%",
        margin: "2rem 1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
        ref={chatContainerRef}
      >
        {messages.map((message) => (
          <Message {...message} key={message.id} />
        ))}
      </div>
    </div>
  );
}

/*

1st Attempt
Timetaken: 1hr 30min
Have taken GenAI help on the optimization part

 */
