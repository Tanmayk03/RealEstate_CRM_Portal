export const SOURCES = ["Website", "Referral", "Walk-in", "Social", "Other"];
export const STATUSES = ["New", "Contacted", "Site Visit", "Negotiation", "Closed", "Lost"];

export const initialLeads = [
  {
    id: "1",
    name: "Priya Nair",
    phone: "+91 99887 76655",
    email: "priya@example.com",
    source: "Website",
    budget: "₹1.2 Cr",
    propertyType: "Villa",
    status: "New",
    notes: "Looking for gated community.",
    agent: "Amit K.",
    followUps: [{ date: "2026-04-01", note: "Called — interested in site visit." }],
  },
  {
    id: "2",
    name: "Vikram Singh",
    phone: "+91 90123 44556",
    email: "vikram@example.com",
    source: "Referral",
    budget: "₹85 L",
    propertyType: "Apartment",
    status: "Contacted",
    notes: "Prefers 3 BHK.",
    agent: "Neha R.",
    followUps: [],
  },
];
