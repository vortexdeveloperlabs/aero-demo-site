// Init data
import data from "./data.js";

const repo = document.getElementById("repo");
if (repo instanceof HTMLAnchorElement) repo.href = data.repo;

const sponsor = document.getElementById("sponsor");
if (sponsor instanceof HTMLParagraphElement) sponsor.innerHTML = data.sponsor;
