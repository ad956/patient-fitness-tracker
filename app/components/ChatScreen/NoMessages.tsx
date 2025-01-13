import { motion } from "framer-motion";
import React from "react";
import { LuInbox } from "react-icons/lu";

export default function NoMessages() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-full w-full max-w-lg mx-auto flex items-center justify-center p-4"
    >
      <div className="h-full w-full bg-white p-12">
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="mb-6"
          >
            <div className="bg-blue-50 rounded-full p-5">
              <LuInbox className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your inbox is empty
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
              When you receive new messages, they&#39;ll appear here. Start a
              conversation to get things going.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
