"use client";

import { Divider, Tab, Tabs } from "@nextui-org/react";
import { FcPrivacy, FcServices } from "react-icons/fc";

export default function Legal() {
  return (
    <section className="h-full flex	justify-center items-center">
      <div className="lg:h-4/5 flex flex-col h-full w-4/5 lg:w-3/5">
        <Tabs color="danger" aria-label="Tabs colors" radius="full">
          {legalDetails.map((item, index) => (
            <Tab
              key={item.title}
              title={
                <div className="flex items-center space-x-2">
                  {setTabIcon(index)}
                  <span>{item.title}</span>
                </div>
              }
            >
              <div className="mt-5">
                <p className="text-md">{item.desc}</p>

                <div className="text-md h[100%]">
                  {index === 0 ? (
                    <TermsOfService />
                  ) : index === 1 ? (
                    <PrivacyPolicy />
                  ) : (
                    <CookiePolicy />
                  )}
                </div>
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

const legalDetails = [
  {
    title: "Terms of Service",
    desc: "Review our terms of service to understand the terms and conditions governing the use of our platform and services. By using our platform, you agree to abide by these terms, which outline the rights, responsibilities, and obligations of both users and the company.",
  },
  {
    title: "Privacy Policy",
    desc: "Our privacy policy outlines how we collect, use, and protect your personal information when you use our platform and services. We are committed to maintaining the confidentiality and security of your data and ensuring compliance with relevant data protection laws and regulations.",
  },
  {
    title: "Cookie Policy",
    desc: "Learn more about how we use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content and advertisements. Our cookie policy explains your choices regarding cookies and provides information on managing your cookie preferences.",
  },
];

function setTabIcon(index: number) {
  switch (index) {
    case 0:
      return <FcServices size={20} />;
    case 1:
      return <FcPrivacy size={20} />;
    case 2:
      return <FcPrivacy size={20} />;
  }
}

const TermsOfService = () => {
  return (
    <div className="p-5 overflow-y-scroll h-[50vh] scrollbar">
      <p className="text-lg font-semibold">Terms of Service</p>
      <Divider />
      <p className="mt-4">
        Welcome to Patient Fitness Tracker! These Terms of Service govern your
        use of our website and services. By accessing or using our platform, you
        agree to comply with these terms. Please read them carefully before
        using our services.
      </p>
      <p className="mt-4 font-semibold">1. User Responsibilities</p>
      <p className="mt-2">
        You are responsible for maintaining the confidentiality of your account
        credentials and for all activities that occur under your account. You
        agree not to use our services for any illegal or unauthorized purpose
        and to comply with all applicable laws and regulations.
      </p>
      <p className="mt-4 font-semibold">2. Prohibited Activities</p>
      <div className="mt-2">
        You agree not to engage in any of the following prohibited activities:
        <ul className="list-disc ml-8 mt-2">
          <li>Violating any laws or regulations;</li>
          <li>
            Interfering with or disrupting the integrity or performance of our
            platform;
          </li>
          <li>
            Attempting to gain unauthorized access to any portion of our
            platform;
          </li>
          <li>Impersonating another person or entity;</li>
          <li>
            Posting or transmitting any unlawful, threatening, abusive,
            defamatory, obscene, or offensive content;
          </li>
          <li>
            Using our platform for any commercial purpose without our prior
            written consent;
          </li>
          <li>
            Collecting or harvesting any information from our platform without
            our express written permission;
          </li>
        </ul>
      </div>
      <p className="mt-4 font-semibold">3. Intellectual Property Rights</p>
      <p className="mt-2">
        All content included on our platform, such as text, graphics, logos,
        images, audio clips, digital downloads, data compilations, and software,
        is the property of Patient Fitness Tracker or its content suppliers and
        protected by international copyright laws.
      </p>
      <p className="mt-4 font-semibold">4. Privacy Policy</p>
      <p className="mt-2">
        Our Privacy Policy explains how we collect, use, and disclose
        information about you when you use our services. By using our platform,
        you agree to the terms of our Privacy Policy.
      </p>
      <p className="mt-4 font-semibold">5. Service Availability</p>
      <p className="mt-2">
        We strive to ensure that our platform is available at all times;
        however, we cannot guarantee uninterrupted access or that our services
        will be error-free. We may suspend or terminate access to our platform
        without prior notice for any reason, including maintenance or security
        updates.
      </p>
      <p className="mt-4 font-semibold">6. Modifications to Services</p>
      <p className="mt-2">
        We reserve the right to modify, suspend, or discontinue our services at
        any time without prior notice. We may also impose limits on certain
        features or restrict access to parts of our platform without liability
        or obligation.
      </p>
      <p className="mt-4 font-semibold">7. Feedback</p>
      <p className="mt-2">
        We welcome your feedback, comments, and suggestions for improving our
        platform. You may submit feedback to us through the designated channels
        provided on our website.
      </p>
      <p className="mt-4 font-semibold">8. Contact Information</p>
      <p className="mt-2">
        If you have any questions or concerns about these Terms of Service or
        our services, please contact us at [contact email].
      </p>
      <p className="mt-4 font-semibold">9. Governing Law</p>
      <p className="mt-2">
        These Terms of Service are governed by and construed in accordance with
        the laws of [your jurisdiction], without regard to its conflict of laws
        principles. Any disputes arising out of or relating to these terms will
        be resolved exclusively by the courts of [your jurisdiction].
      </p>
      <p className="mt-4 font-semibold">10. Entire Agreement</p>
      <p className="mt-2">
        These Terms of Service constitute the entire agreement between you and
        Patient Fitness Tracker regarding your use of our platform and supersede
        all prior or contemporaneous agreements and understandings, whether oral
        or written.
      </p>
    </div>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="p-5 overflow-y-scroll h-[50vh] scrollbar">
      <p className="text-lg font-semibold">Privacy Policy</p>
      <Divider />
      <p className="mt-4">
        At Patient Fitness Tracker, we are committed to protecting your privacy.
        This Privacy Policy outlines how we collect, use, and safeguard your
        personal information when you use our services.
      </p>
      <p className="mt-4 font-semibold">1. Information Collection</p>
      <p className="mt-2">
        We may collect personal information from you when you register an
        account, use our services, or interact with our platform. This may
        include but is not limited to your name, email address, and demographic
        information.
      </p>
      <p className="mt-4 font-semibold">2. Use of Information</p>
      <p className="mt-2">
        We use the information we collect to provide, maintain, and improve our
        services, as well as to communicate with you about your account and
        updates to our platform. We may also use your information to personalize
        your experience and to comply with legal obligations.
      </p>
      <p className="mt-4 font-semibold">3. Information Sharing</p>
      <p className="mt-2">
        We do not sell, trade, or rent your personal information to third
        parties. However, we may share your information with trusted service
        providers who assist us in operating our platform or servicing you,
        subject to confidentiality agreements.
      </p>
      <p className="mt-4 font-semibold">4. Data Security</p>
      <p className="mt-2">
        We implement reasonable security measures to protect your personal
        information from unauthorized access, alteration, or disclosure.
        However, no method of transmission over the internet or electronic
        storage is completely secure, and we cannot guarantee absolute security.
      </p>
      <p className="mt-4 font-semibold">5. Updates to Privacy Policy</p>
      <p className="mt-2">
        We reserve the right to update this Privacy Policy at any time. We will
        notify you of any changes by posting the new Privacy Policy on this
        page. It is your responsibility to review this Privacy Policy
        periodically for changes.
      </p>
      <p className="mt-4 font-semibold">6. Contact Us</p>
      <p className="mt-2">
        If you have any questions or concerns about our Privacy Policy or our
        handling of your personal information, please contact us at [contact
        email].
      </p>
    </div>
  );
};

const CookiePolicy = () => {
  return (
    <div className="p-5 overflow-y-scroll h-[50vh] scrollbar">
      <p className="text-lg font-semibold">Cookie Policy</p>
      <Divider />
      <p className="mt-4">
        At Patient Fitness Tracker, we use cookies to enhance your browsing
        experience and provide personalized content. This Cookie Policy explains
        how we use cookies and similar technologies on our website.
      </p>
      <p className="mt-4 font-semibold">1. What are Cookies?</p>
      <p className="mt-2">
        Cookies are small text files stored on your device by your web browser
        when you visit a website. They contain information about your browsing
        activities on that website and help recognize your device on subsequent
        visits.
      </p>
      <p className="mt-4 font-semibold">2. How We Use Cookies</p>
      <div className="mt-2">
        We use cookies for various purposes, including:
        <ul className="list-disc ml-8 mt-2">
          <li>Providing personalized content and recommendations;</li>
          <li>Improving website performance and functionality;</li>
          <li>Analyzing website traffic and usage patterns;</li>
          <li>Tracking user preferences and settings;</li>
          <li>Enabling social media integration;</li>
          <li>Managing user sessions and authentication.</li>
        </ul>
      </div>
      <p className="mt-4 font-semibold">3. Types of Cookies We Use</p>
      <p className="mt-2">
        We use both session cookies (which expire when you close your browser)
        and persistent cookies (which remain on your device for a specified
        period). Additionally, we use first-party cookies (set by us) and
        third-party cookies (set by third-party service providers).
      </p>
      <p className="mt-4 font-semibold">4. Your Cookie Choices</p>
      <p className="mt-2">
        You have the option to manage your cookie preferences through your web
        browser settings. You can choose to accept, reject, or delete cookies.
        However, please note that disabling certain cookies may affect your
        browsing experience and functionality of our website.
      </p>
      <p className="mt-4 font-semibold">5. Updates to Cookie Policy</p>
      <p className="mt-2">
        We may update this Cookie Policy from time to time to reflect changes in
        our practices or legal requirements. We will notify you of any
        significant changes by posting the updated policy on our website.
      </p>
      <p className="mt-4 font-semibold">6. Contact Us</p>
      <p className="mt-2">
        If you have any questions or concerns about our Cookie Policy or our use
        of cookies, please contact us at [contact email].
      </p>
    </div>
  );
};
