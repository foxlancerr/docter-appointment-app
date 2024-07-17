import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import faqs from "../../../data/faqs.js";

const FaqAccordion = () => {
  return (
    <div className="max-w-4xl mx-auto py-24 px-5">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">Frequently Asked Questions</h1>
      <p className="text-center mb-8 text-gray-600">{faqs.description}</p>
      <Tabs defaultValue={faqs.QuestionsData[0].category_name}>
        <TabsList className="flex mb-2 border-b border-gray-300 bg-black/80 rounded-md text-white p-10">
          {faqs?.QuestionsData?.map((category) => (
           <TabsTrigger
           key={category.category_name}
           value={category.category_name}
           className="px-4 py-3 mx-2 text-xl font-semibold text-white hover:underline cursor-pointer bg-transparent"
         >
           {category.category_name}
         </TabsTrigger>
          ))}
        </TabsList>
        {faqs?.QuestionsData?.map((category) => (
          <TabsContent
            key={category.category_name}
            value={category.category_name}
            className="py-4 "
          >
            <Accordion type="single" collapsible>
              {category?.faqs?.map((faq) => (
                <AccordionItem key={faq.id} value={`item-${faq.id}`}
                className="mb-2 px-6 py-3 bg-black/80 text-white rounded-lg text-2xl "
                >
                  <AccordionTrigger className="">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="p-4 border-t text-2xl">
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FaqAccordion;
