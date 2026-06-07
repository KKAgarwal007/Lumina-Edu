# Lumina Edu - Next-Gen Learning Dashboard

A high-fidelity, highly interactive student learning dashboard built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, and **Supabase**.

## Architectural Choices

### Server/Client Component Split
This project heavily leverages the Next.js App Router paradigm to maximize performance and security while maintaining rich interactivity.

**Server Components (Default):**
- Components responsible for fetching data directly from Supabase (e.g., `CourseList.tsx`, `TopNav.tsx`, `page.tsx`) were built as async Server Components.
- **Why?** This prevents leaking database secrets or running heavy query logic on the client. It completely eliminates waterfall loading and allows us to securely execute SQL queries directly against Supabase via `@supabase/ssr`.
- Example: The entire dashboard root (`app/page.tsx`) fetches the active user profile, activity logs, and milestones natively on the server before shipping HTML to the client.

**Client Components (`"use client"`):**
- We strictly constrained Client Components to the "leaves" of the component tree—specifically where interactivity and state management are required.
- **Why?** To keep the client bundle size small.
- Examples: 
  - `HeroTile.tsx` and `ConsistencyMap.tsx` use Framer Motion for complex staggered animations and spring hover effects.
  - `CourseListAnimator.tsx` handles the interactive modal overlay that pops up when a user clicks a course card.
  - `ProfileDropdown.tsx` manages the interactive local state (`useState`) to toggle the account switcher menu.

### State Management & The Profile Switcher
Instead of using complex global state management libraries (like Redux or Zustand) to handle user sessions, we utilized **Next.js Server Actions and Cookies**.
When a user switches profiles in the `ProfileDropdown`, a Server Action updates an `active_profile_id` cookie and triggers a `revalidatePath("/")`. This forces Next.js to cleanly re-fetch all Server Components with the new profile ID, completely avoiding tricky client-side state synchronization issues.

## Challenges Faced

1. **The Grid Layout Engine**:
   - Building a responsive Bento Grid that handles a dynamic number of cards while looking symmetrical was challenging.
   - We initially used complex `row-span` logic, but ran into issues on desktop where the "Action Tiles" were forced out of the grid and rendered asymmetrically on the left.
   - **Solution**: We refactored the layout to carefully control `col-span` and `row-span`, ensuring components like `ConsistencyMap` didn't artificially force grid items into empty rows, maintaining a tight, beautiful layout across mobile, tablet, and desktop viewports.

2. **Mobile Nav & Flex Wrapping**:
   - The original `TopNav` was utilizing `flex-col md:flex-row`, which unintentionally caused the user avatar and notification bell to stack weirdly on mobile devices.
   - **Solution**: Rebuilt the navigation bar as a strict `flex-row` container with overflow handling, ensuring the crucial profile switching avatar is always firmly anchored to the top-right corner.

3. **Data Relational Mapping for Mock Data**:
   - Transitioning from hardcoded arrays to a real database meant we had to ensure every single feature—from the GitHub-style activity graph to the course lists—was strictly bound to a `profile_id`.
   - **Solution**: Migrated everything to Supabase and structured the queries to gracefully fallback to "Empty States" if a newly selected user lacked enrolled courses or milestones.
