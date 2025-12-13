'use client'
import { useChat } from 'ai/react'
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react'
import { Send, Sparkles } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea';

const transitionDebug = {
    type: "easeOut",
    duration: 0.2,
};

const AskAI = ({ isCollapsed }: { isCollapsed: boolean }) => {
    const [accountId] = useLocalStorage('accountId', '')
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 44,
        maxHeight: 200,
    });
    const [isFocused, setIsFocused] = React.useState(false);

    const { input, handleInputChange, handleSubmit, messages, setInput } = useChat({
        api: "/api/chat",
        body: {
            accountId,
        },
        onError: (error) => {
            if (error.message.includes('Limit reached')) {
                toast.error('You have reached the limit for today.')
            }
        },
        initialMessages: [],
    });

    React.useEffect(() => {
        const messageContainer = document.getElementById("message-container");
        if (messageContainer) {
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    const handleQuickAction = (text: string) => {
        setInput(text);
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(e);
        setInput('');
        adjustHeight(true);
    };

    if (isCollapsed) return null;

    return (
        <div className='p-4 mb-14'>
            <motion.div 
                className="flex flex-col rounded-2xl bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Messages Area */}
                <div className="max-h-[40vh] overflow-y-auto p-4" id='message-container'>
                    <AnimatePresence mode="wait">
                        {messages.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-6"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    Ask AI about your emails
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    Get instant answers about your inbox
                                </p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {['What can I ask?', 'Summarize my inbox', 'Find important emails'].map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            onClick={() => handleQuickAction(suggestion)}
                                            className="px-3 py-1.5 text-xs font-medium rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        layout="position"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={cn(
                                            "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                                            message.role === 'user'
                                                ? 'self-end bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                                : 'self-start bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                                        )}
                                        transition={transitionDebug}
                                    >
                                        {message.content}
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input Area */}
                <form onSubmit={onSubmit} className="p-3 border-t border-gray-200 dark:border-gray-800">
                    <div
                        className={cn(
                            "relative flex items-end rounded-xl transition-all duration-200",
                            "bg-white dark:bg-gray-800 border",
                            isFocused 
                                ? "border-blue-400 dark:border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900/30" 
                                : "border-gray-200 dark:border-gray-700"
                        )}
                    >
                        <Textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => {
                                handleInputChange(e);
                                adjustHeight();
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    onSubmit(e);
                                }
                            }}
                            placeholder="Ask anything about your emails..."
                            className="flex-1 min-h-[44px] max-h-[200px] px-4 py-3 bg-transparent border-none resize-none focus-visible:ring-0 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className={cn(
                                "m-2 p-2 rounded-lg transition-all duration-200",
                                input.trim()
                                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                            )}
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default AskAI
