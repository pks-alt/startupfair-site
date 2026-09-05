"use client";

import { useState, type ComponentProps } from "react";
import { EMAIL_ROUTES, categoryForInterest, type EmailCategory } from "@/lib/email-routing";

type Props = ComponentProps<"form"> & {
  category: EmailCategory;
  routeByInterest?: boolean;
  showEmailContact?: boolean;
};

export function EmailRecipientNotice({ category }: { category: EmailCategory }) {
  const email = EMAIL_ROUTES[category];
  return (
    <p className="wide email-recipient-notice" style={{ gridColumn: "1 / -1", margin: "8px 0 0", fontSize: "14px", lineHeight: 1.5 }}>
      Email this team directly: <a className="text-link" href={`mailto:${email}`}>{email}</a>
    </p>
  );
}

/**
 * Preserves the existing PREVIEW submit handler and layout. Recipient metadata
 * and direct email links are NOT evidence that a form has sent an email.
 * No user input is transmitted, persisted, or copied into a mailto URL here.
 */
export function EmailRoutingForm({ category, routeByInterest = false, showEmailContact = false, children, onChange, ...props }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<EmailCategory>(category);
  const recipientCategory = routeByInterest ? selectedCategory : category;
  return (
    <form
      {...props}
      data-email-category={recipientCategory}
      data-email-recipient={EMAIL_ROUTES[recipientCategory]}
      data-delivery-mode="preview-only"
      onChange={(event) => {
        const target = event.target;
        if (routeByInterest && target instanceof HTMLSelectElement && target.name === "interest") {
          setSelectedCategory(categoryForInterest(target.value));
        }
        onChange?.(event);
      }}
    >
      {children}
      {showEmailContact && <EmailRecipientNotice category={recipientCategory} />}
    </form>
  );
}
