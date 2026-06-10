"use client";

import type { Session } from "@supabase/supabase-js";
import { LogOut, Plus, RefreshCcw, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type AdminTable =
  | "portfolio_settings"
  | "projects"
  | "certifications"
  | "achievements"
  | "skills"
  | "education"
  | "experience"
  | "blogs"
  | "resume_files";

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "array" | "file" | "url";
};

const tableFields: Record<AdminTable, Field[]> = {
  portfolio_settings: [
    { name: "name", label: "Name" },
    { name: "headline", label: "Headline" },
    { name: "bio", label: "Bio", type: "textarea" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    { name: "location", label: "Location" },
    { name: "github", label: "GitHub" },
    { name: "linkedin", label: "LinkedIn" },
    { name: "leetcode", label: "LeetCode" },
    { name: "codeforces", label: "Codeforces" },
    { name: "hackerrank", label: "HackerRank" },
    { name: "resume_url", label: "Resume URL", type: "url" },
    { name: "profile_image", label: "Profile Image URL", type: "url" },
    { name: "profile_banner", label: "Profile Banner URL", type: "url" },
    { name: "recruiter_message", label: "Recruiter Message", type: "textarea" },
  ],
  projects: [
    { name: "slug", label: "Slug" },
    { name: "title", label: "Title" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "github_url", label: "GitHub URL", type: "url" },
    { name: "live_url", label: "Live URL", type: "url" },
    { name: "category", label: "Category" },
    { name: "tech_stack", label: "Tech Stack", type: "array" },
    { name: "achievements", label: "Achievements", type: "array" },
    { name: "image_url", label: "Image URL", type: "url" },
    { name: "featured", label: "Featured", type: "checkbox" },
    { name: "start_date", label: "Start Date" },
    { name: "end_date", label: "End Date" },
  ],
  certifications: [
    { name: "title", label: "Title" },
    { name: "issuer", label: "Issuer" },
    { name: "issue_date", label: "Issue Date" },
    { name: "credential_id", label: "Credential ID" },
    { name: "credential_url", label: "Credential URL", type: "url" },
    { name: "image_url", label: "Image URL", type: "url" },
    { name: "skills", label: "Skills", type: "array" },
  ],
  achievements: [
    { name: "title", label: "Title" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "organization", label: "Organization" },
    { name: "date", label: "Date" },
    { name: "image_url", label: "Image URL", type: "url" },
  ],
  skills: [
    { name: "name", label: "Name" },
    { name: "category", label: "Category" },
    { name: "proficiency", label: "Proficiency", type: "number" },
  ],
  education: [
    { name: "institution", label: "Institution" },
    { name: "degree", label: "Degree" },
    { name: "cgpa", label: "CGPA" },
    { name: "start_date", label: "Start Date" },
    { name: "end_date", label: "End Date" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  experience: [
    { name: "company", label: "Company" },
    { name: "role", label: "Role" },
    { name: "duration", label: "Duration" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "skills", label: "Skills", type: "array" },
  ],
  blogs: [
    { name: "title", label: "Title" },
    { name: "slug", label: "Slug" },
    { name: "excerpt", label: "Excerpt", type: "textarea" },
    { name: "content", label: "Content", type: "textarea" },
    { name: "tags", label: "Tags", type: "array" },
    { name: "cover_image", label: "Cover Image URL", type: "url" },
    { name: "published", label: "Published", type: "checkbox" },
  ],
  resume_files: [
    { name: "title", label: "Title" },
    { name: "file_url", label: "File URL", type: "url" },
    { name: "version", label: "Version" },
    { name: "is_active", label: "Active", type: "checkbox" },
  ],
};

const tables = Object.keys(tableFields) as AdminTable[];

function emptyRecord(table: AdminTable) {
  return Object.fromEntries(
    tableFields[table].map((field) => [
      field.name,
      field.type === "checkbox" ? false : field.type === "array" ? [] : "",
    ]),
  );
}

function toInputValue(value: unknown) {
  return Array.isArray(value) ? value.join(", ") : String(value ?? "");
}

function normalizeValue(field: Field, value: FormDataEntryValue | null) {
  if (field.type === "checkbox") {
    return value === "on";
  }

  if (field.type === "number") {
    return Number(value ?? 0);
  }

  if (field.type === "array") {
    return String(value ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return String(value ?? "");
}

export function AdminDashboard() {
  const supabase = getSupabaseBrowserClient();
  const [session, setSession] = useState<Session | null>(null);
  const [table, setTable] = useState<AdminTable>("projects");
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [editingRow, setEditingRow] = useState<Record<string, unknown>>(
    emptyRecord("projects"),
  );
  const [status, setStatus] = useState("Ready");

  const fields = useMemo(() => tableFields[table], [table]);

  useEffect(() => {
    if (!supabase) {
      setStatus("Supabase environment variables are not configured.");
      return;
    }

    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => data.subscription.unsubscribe();
  }, [supabase]);

  async function loadRows(nextTable = table) {
    if (!supabase || !session) {
      return;
    }

    setStatus("Loading...");
    const { data, error } = await supabase
      .from(nextTable)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setStatus(error.message);
      return;
    }

    setRows((data ?? []) as Record<string, unknown>[]);
    setEditingRow(emptyRecord(nextTable));
    setStatus("Loaded");
  }

  useEffect(() => {
    if (session) {
      void loadRows(table);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, table]);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    setStatus(error ? error.message : "Signed in");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(
      fields.map((field) => [
        field.name,
        normalizeValue(field, formData.get(field.name)),
      ]),
    );
    const id = editingRow.id;
    const query = id
      ? supabase.from(table).update(payload).eq("id", id)
      : supabase.from(table).insert(payload);
    const { error } = await query;

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus(id ? "Updated" : "Created");
    await loadRows();
  }

  async function handleDelete(id: unknown) {
    if (!supabase || typeof id !== "string") {
      return;
    }

    const { error } = await supabase.from(table).delete().eq("id", id);
    setStatus(error ? error.message : "Deleted");
    await loadRows();
  }

  if (!supabase) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          Supabase is not configured. Add the public URL and anon key to enable admin
          login.
        </CardContent>
      </Card>
    );
  }

  if (!session) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <form className="mt-6 grid gap-4" onSubmit={handleLogin}>
            <input
              required
              name="email"
              type="email"
              placeholder="Admin email"
              className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              required
              name="password"
              type="password"
              placeholder="Password"
              className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="submit">Login</Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">{status}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Portfolio Admin</h1>
          <p className="text-sm text-muted-foreground">{status}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => loadRows()}>
            <RefreshCcw /> Refresh
          </Button>
          <Button variant="outline" onClick={() => setEditingRow(emptyRecord(table))}>
            <Plus /> New
          </Button>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>
            <LogOut /> Logout
          </Button>
        </div>
      </div>

      <select
        value={table}
        onChange={(event) => {
          const nextTable = event.target.value as AdminTable;
          setTable(nextTable);
          setEditingRow(emptyRecord(nextTable));
        }}
        className="h-11 w-fit rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        aria-label="Select admin table"
      >
        {tables.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardContent className="p-4">
            <div className="grid gap-2">
              {rows.length ? (
                rows.map((row) => (
                  <button
                    className="rounded-md border p-3 text-left text-sm transition-colors hover:bg-muted"
                    key={String(row.id)}
                    onClick={() => setEditingRow(row)}
                  >
                    <span className="block font-semibold">
                      {String(
                        row.title ?? row.name ?? row.institution ?? row.company ?? row.id,
                      )}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {String(
                        row.slug ?? row.category ?? row.created_at ?? "Editable record",
                      )}
                    </span>
                  </button>
                ))
              ) : (
                <p className="p-4 text-sm text-muted-foreground">No records yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <form
              className="grid gap-4"
              key={`${table}-${String(editingRow.id ?? "new")}`}
              onSubmit={handleSubmit}
            >
              {fields.map((field) => (
                <label className="grid gap-2 text-sm font-medium" key={field.name}>
                  {field.label}
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      rows={5}
                      defaultValue={toInputValue(editingRow[field.name])}
                      className="rounded-md border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  ) : field.type === "checkbox" ? (
                    <input
                      name={field.name}
                      type="checkbox"
                      defaultChecked={Boolean(editingRow[field.name])}
                      className="size-5"
                    />
                  ) : (
                    <input
                      name={field.name}
                      type={
                        field.type === "number"
                          ? "number"
                          : field.type === "url"
                            ? "url"
                            : "text"
                      }
                      defaultValue={toInputValue(editingRow[field.name])}
                      placeholder={
                        field.type === "array"
                          ? "Comma-separated values"
                          : field.type === "url"
                            ? "https://example.com"
                            : undefined
                      }
                      className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  )}
                </label>
              ))}
              <div className="flex flex-wrap gap-2">
                <Button type="submit">
                  <Save /> Save
                </Button>
                {editingRow.id ? (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleDelete(editingRow.id)}
                  >
                    <Trash2 /> Delete
                  </Button>
                ) : null}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
