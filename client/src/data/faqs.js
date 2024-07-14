const faqs = {
  title: "Frequently Asked Questions",
  description: "Can’t find an answer to your question? Feel free to contact us",
  QuestionsData: [
    {
      category_name: "General",
      faqs: [
        {
          id: 1,
          faq_section_id: 1,
          question: "What is the doctor appointment app?",
          answer:
            "<p>It is a platform that allows patients to book appointments with doctors, view their medical records, and access healthcare services online.</p>",
          faq_category_id: 1,
          sort_id: 1,
        },
        {
          id: 2,
          faq_section_id: 1,
          question: "How do I create an account?",
          answer:
            "<p>To create an account, download the app, click on 'Sign Up', and fill in your personal details. You will need to verify your email address before you can start booking appointments.</p>",
          faq_category_id: 1,
          sort_id: 2,
        },
        {
          id: 3,
          faq_section_id: 1,
          question: "How do I reset my password?",
          answer:
            "<p>If you forget your password, click on 'Forgot Password' on the login screen. Enter your registered email address to receive a password reset link.</p>",
          faq_category_id: 1,
          sort_id: 3,
        },
      ],
    },
    {
      category_name: "Appointments",
      faqs: [
        {
          id: 4,
          faq_section_id: 2,
          question: "How do I book an appointment?",
          answer:
            "<p>Log in to your account, select the 'Book Appointment' option, choose a doctor, select a date and time, and confirm your booking.</p>",
          faq_category_id: 2,
          sort_id: 1,
        },
        {
          id: 5,
          faq_section_id: 2,
          question: "Can I reschedule my appointment?",
          answer:
            "<p>Yes, you can reschedule your appointment by going to 'My Appointments', selecting the appointment you wish to reschedule, and choosing a new date and time.</p>",
          faq_category_id: 2,
          sort_id: 2,
        },
        {
          id: 6,
          faq_section_id: 2,
          question: "What if I need to cancel my appointment?",
          answer:
            "<p>You can cancel your appointment by going to 'My Appointments', selecting the appointment you wish to cancel, and clicking 'Cancel Appointment'. Please note that cancellation policies may vary depending on the doctor.</p>",
          faq_category_id: 2,
          sort_id: 3,
        },
      ],
    },
    {
      category_name: "Billing & Insurance",
      faqs: [
        {
          id: 7,
          faq_section_id: 3,
          question: "How do I pay for my appointment?",
          answer:
            "<p>You can pay for your appointment using a credit card, debit card, or online payment methods available within the app at the time of booking.</p>",
          faq_category_id: 3,
          sort_id: 1,
        },
        {
          id: 8,
          faq_section_id: 3,
          question: "Does the app accept insurance?",
          answer:
            "<p>Yes, the app accepts a variety of insurance plans. You can enter your insurance details in your profile settings and check if your insurance is accepted before booking an appointment.</p>",
          faq_category_id: 3,
          sort_id: 2,
        },
        {
          id: 9,
          faq_section_id: 3,
          question: "Can I get a refund for a canceled appointment?",
          answer:
            "<p>Refund policies vary depending on the doctor's cancellation policy. Please check the specific policy at the time of booking.</p>",
          faq_category_id: 3,
          sort_id: 3,
        },
      ],
    },
    {
      category_name: "Technical Support",
      faqs: [
        {
          id: 10,
          faq_section_id: 4,
          question: "What should I do if I encounter a technical issue?",
          answer:
            "<p>If you encounter a technical issue, please contact our support team through the 'Help' section in the app. Provide a detailed description of the issue for prompt assistance.</p>",
          faq_category_id: 4,
          sort_id: 1,
        },
        {
          id: 11,
          faq_section_id: 4,
          question: "How do I update my app?",
          answer:
            "<p>To update your app, go to the App Store or Google Play Store, search for the doctor appointment app, and click 'Update' if an update is available.</p>",
          faq_category_id: 4,
          sort_id: 2,
        },
        {
          id: 12,
          faq_section_id: 4,
          question: "How do I delete my account?",
          answer:
            "<p>If you wish to delete your account, please contact our support team through the 'Help' section in the app. They will guide you through the account deletion process.</p>",
          faq_category_id: 4,
          sort_id: 3,
        },
      ],
    },
  ],
};
export default faqs;
