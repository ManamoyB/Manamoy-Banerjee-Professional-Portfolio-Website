"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { analyticsEvents } from "@/config/analytics";
import { trackEvent } from "@/lib/analytics";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");

    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      const { error } = await supabase.from("contact_messages").insert({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        subject: String(formData.get("subject") ?? "Portfolio inquiry"),
        message: String(formData.get("message") ?? ""),
      });

      if (!error) {
        form.reset();
        setStatus("sent");
        trackEvent(analyticsEvents.contactSubmission, { channel: "supabase" });
        return;
      }
    }

    if (!endpoint) {
      const subject = encodeURIComponent(
        String(
          formData.get("subject") ??
            `Portfolio inquiry from ${formData.get("name") ?? "Visitor"}`,
        ),
      );
      const body = encodeURIComponent(
        `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\nCompany: ${formData.get("company")}\n\n${formData.get("message")}`,
      );
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Unable to send message.");
      }

      form.reset();
      setStatus("sent");
      trackEvent(analyticsEvents.contactSubmission, { channel: "formspree" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <label className="grid gap-2 text-sm font-medium">
        Name
        <input
          required
          name="name"
          className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="Your name"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Email
        <input
          required
          type="email"
          name="email"
          className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="you@example.com"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Company / context
        <input
          name="company"
          className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="Company, project, or role"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Subject
        <input
          required
          name="subject"
          className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="Hiring conversation, project, or collaboration"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Message
        <textarea
          required
          name="message"
          rows={5}
          className="resize-none rounded-md border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="Tell me what you want to discuss..."
        />
      </label>
      <Button type="submit" disabled={status === "sending"} className="w-fit">
        <Send />
        {status === "sending" ? "Sending..." : "Send message"}
      </Button>
      {status === "sent" ? (
        <p className="text-sm text-primary">Message sent. Thank you.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-destructive">
          Something went wrong. Please use the email fallback.
        </p>
      ) : null}
    </form>
  );
}
