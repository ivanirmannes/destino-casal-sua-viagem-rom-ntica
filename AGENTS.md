<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- One visible section = one file in `src/components/sections/`; `src/routes/index.tsx` only sets page metadata and the order of sections. Why: the client edits copy often, and a single 500-line route file makes every small change risky.
- Contact details (WhatsApp number, pre-filled messages) live only in `src/config/site.ts`; no component may hardcode a phone number. Why: the number is the conversion channel and has to change in exactly one place.
- Marketing copy (destinations, hotel/flight services, process steps) is data in `src/data/`, not JSX. Why: content and layout change on different schedules.
- Business rules (Brazilian phone validation, agenda readiness, the `wa.me` link) are pure functions in `src/lib/whatsapp.ts` and `src/lib/schedule.ts`, covered by tests in `src/test/`. Why: these rules are the site's whole conversion path, so they need to be provable without a browser.
- Colors, fonts and radii come from the tokens in `src/styles.css`; components use semantic utilities (`bg-whatsapp`, `text-primary`, `font-display`), never literal hex values. Why: the palette is re-themed per brand.
- All user-facing copy is Brazilian Portuguese (`pt-BR`), including the 404 and error screens. Why: the audience is Brazilian couples.
