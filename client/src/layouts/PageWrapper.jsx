import React from "react";

export default function PageWrapper({ title, children }) {
  return (
    <section className="space-y-6">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      {children}
    </section>
  );
}
