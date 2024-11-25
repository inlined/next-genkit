"use server";

if (process.env.NODE_ENV === "development") {
    require("@/flows/chat");
}