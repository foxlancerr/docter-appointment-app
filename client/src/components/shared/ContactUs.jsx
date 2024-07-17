import React from "react";
import HomeLayout from "../HomeLayout";

const ContactUs = () => {
  return (
    <HomeLayout>
      <section>
        <div className="px-4 mx-auto max-w-screen-md">
          <h2 className="text-center text-4xl font-bold text-gray-900">
            Contact Us
          </h2>
          <p className="mb-10 lg:mb-12 font-light text-center text-gray-500">
            Got any issue? Want to reach us? Let us know.
          </p>

          <form action="#" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@tmail.com"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Let us know how we can help you?"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                id="message"
                rows="10"
                placeholder="Leave a Message..."
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 py-3 px-6 rounded-full text-white font-medium mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
