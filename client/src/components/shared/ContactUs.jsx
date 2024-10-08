import React, { useState } from "react";
import HomeLayout from "../HomeLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_API_URL } from "@/constants";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/api/v1/patients/contact-us`,
        { email, subject, message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;

      if (result.success) {
        setEmail("");
        setMessage("");
        setSubject("");
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(result.message);
    }
  };
  return (
    <HomeLayout>
      <section>
        <div className="py-10 px-10 sm:px-auto mx-auto sm:container">
          <h2 className="text-center text-4xl font-bold text-[#023e7d]">
            Contact Us
          </h2>
          <p className="mb-10 lg:mb-12 font-light text-center text-gray-500">
            Got any issue? Want to reach us? Let us know.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#023e7d]"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@tmail.com"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-[#023e7d]"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Let us know how we can help you?"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[#023e7d]"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows="10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a Message..."
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#023e7d] py-3 px-10 rounded-full text-white font-medium mt-4 hover:bg-[#023e7d]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </HomeLayout>
  );
};

export default ContactUs;
