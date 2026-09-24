"use client";

import type { ReactNode } from "react";
import { profile } from "@/content/data";

const address = profile.links.email.replace("mailto:", "");

// mailto: only works when the visitor has a mail app set up, which many don't
// (webmail users, in-app browsers). So clicking also copies the address and
// shows a confirmation, then still lets the mailto: open for those who have one.
function showToast(text: string) {
  document.getElementById("email-toast")?.remove();
  const toast = document.createElement("div");
  toast.id = "email-toast";
  toast.setAttribute("role", "status");
  toast.textContent = text;
  toast.className =
    "email-toast fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 rounded-full bg-route px-5 py-2.5 font-mono text-xs font-bold tracking-[0.1em] text-bg shadow-lg ring-2 ring-bg/60";
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3500);
}

export function EmailLink({
  children,
  className,
  title,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  ariaLabel?: string;
}) {
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(address);
      showToast(`Email copied: ${address}`);
    } catch {
      // Clipboard blocked; still show the address so it can be copied by hand
      showToast(address);
    }
  };

  return (
    <a href={profile.links.email} onClick={onClick} className={className} title={title} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
