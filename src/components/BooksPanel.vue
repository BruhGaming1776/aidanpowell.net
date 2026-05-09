<script lang="ts">
import { defineComponent } from "vue";

type SortBy =
    | "best_rating"
    | "worst_rating"
    | "az"
    | "za"
    | "recent"
    | "oldest"
    | "pinned";

const PIN_PREFIX = "!PIN!";

function stripPinPrefix(name: string): string {
    return name.startsWith(PIN_PREFIX) ? name.slice(PIN_PREFIX.length) : name;
}

interface Book {
    image_url: string;
    name: string;
    book_author: string;
    aidan_rating_stars: number;
    aidan_rating_description: string;
}

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
    { value: "recent", label: "Most recent" },
    { value: "oldest", label: "Oldest first" },
    { value: "best_rating", label: "Highest rated" },
    { value: "worst_rating", label: "Lowest rated" },
    { value: "az", label: "Title A→Z" },
    { value: "za", label: "Title Z→A" },
];

const BOOKS_ENDPOINT = "https://books.aidanpowell.net/recent";

export default defineComponent({
    data() {
        return {
            recent: [] as Book[],
            recentLoading: true,
            recentError: "",

            list: [] as Book[],
            listLoading: false,
            listError: "",
            listLoaded: false,

            sortBy: "recent" as SortBy,

            sortOptions: SORT_OPTIONS,
        };
    },
    methods: {
        displayName(name: string): string {
            return stripPinPrefix(name);
        },
        async fetchBooks(limit: number, sortBy: SortBy): Promise<Book[]> {
            const url = `${BOOKS_ENDPOINT}?limit=${limit}&sort_by=${sortBy}`;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Request failed: ${res.status}`);
            }
            const data = await res.json();
            if (!Array.isArray(data)) {
                throw new Error("Unexpected response shape");
            }
            return data as Book[];
        },
        async loadRecent() {
            this.recentLoading = true;
            this.recentError = "";
            try {
                this.recent = await this.fetchBooks(3, "pinned");
            } catch (err) {
                this.recentError =
                    err instanceof Error ? err.message : "Failed to load books";
            } finally {
                this.recentLoading = false;
            }
        },
        async loadList() {
            this.listLoading = true;
            this.listError = "";
            try {
                this.list = await this.fetchBooks(25, this.sortBy);
                this.listLoaded = true;
            } catch (err) {
                this.listError =
                    err instanceof Error ? err.message : "Failed to load books";
            } finally {
                this.listLoading = false;
            }
        },
        starString(stars: number): string {
            const safe = Math.max(0, Math.min(5, Math.round(stars)));
            return "★".repeat(safe) + "☆".repeat(5 - safe);
        },
    },
    mounted() {
        this.loadRecent();
    },
});
</script>

<template>
    <section id="books" class="books-panel">
        <div class="books-header">
            <svg class="books-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12V4a2 2 0 0 0-2-2zm-8 2h6v8l-3-1.8L10 12V4zm10 16H8a1 1 0 0 1 0-2h12v2z"/>
            </svg>
            <h2>What I've Read</h2>
        </div>
        <div class="books-body">
            <p class="books-intro">
                A look at the literary works I've read through
            </p>

            <div v-if="recentLoading" class="books-status">Loading recent reads&hellip;</div>
            <div v-else-if="recentError" class="books-status books-status-error">
                Couldn't load books: {{ recentError }}
            </div>
            <div v-else-if="recent.length === 0" class="books-status">
                
            </div>
            <div v-else class="books-grid books-grid-preview">
                <article
                    v-for="(book, i) in recent"
                    :key="`recent-${i}-${book.name}`"
                    class="book-card"
                >
                    <div class="book-cover">
                        <img
                            v-if="book.image_url"
                            :src="book.image_url"
                            :alt="`Cover of ${displayName(book.name)}`"
                            loading="lazy"
                        />
                        <div v-else class="book-cover-fallback" aria-hidden="true">
                            <svg viewBox="0 0 24 24"><path d="M18 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12V4a2 2 0 0 0-2-2z"/></svg>
                        </div>
                    </div>
                    <div class="book-meta">
                        <h3 class="book-title">{{ displayName(book.name) }}</h3>
                        <p class="book-author">{{ book.book_author }}</p>
                        <div
                            class="book-stars"
                            :aria-label="`${book.aidan_rating_stars} out of 5 stars`"
                        >
                            <span aria-hidden="true">{{ starString(book.aidan_rating_stars) }}</span>
                        </div>
                        <p
                            v-if="book.aidan_rating_description"
                            class="book-blurb"
                        >{{ book.aidan_rating_description }}</p>
                    </div>
                </article>
            </div>

            <div class="books-cta">
                <form class="books-controls" @submit.prevent="loadList">
                    <label class="books-control">
                        <span>Sort by</span>
                        <select v-model="sortBy">
                            <option
                                v-for="opt in sortOptions"
                                :key="opt.value"
                                :value="opt.value"
                            >{{ opt.label }}</option>
                        </select>
                    </label>
                    <button
                        type="submit"
                        class="btn-glossy books-btn"
                        :disabled="listLoading"
                    >
                        <span>{{ listLoading ? "Loading…" : "Load books" }}</span>
                    </button>
                </form>
            </div>

            <div v-if="listError" class="books-status books-status-error">
                Couldn't load books: {{ listError }}
            </div>
            <div
                v-else-if="listLoaded && !listLoading && list.length === 0"
                class="books-status"
            >
                No books returned.
            </div>
            <div
                v-else-if="list.length > 0"
                class="books-grid books-grid-full"
            >
                <article
                    v-for="(book, i) in list"
                    :key="`list-${i}-${book.name}`"
                    class="book-card"
                >
                    <div class="book-cover">
                        <img
                            v-if="book.image_url"
                            :src="book.image_url"
                            :alt="`Cover of ${displayName(book.name)}`"
                            loading="lazy"
                        />
                        <div v-else class="book-cover-fallback" aria-hidden="true">
                            <svg viewBox="0 0 24 24"><path d="M18 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12V4a2 2 0 0 0-2-2z"/></svg>
                        </div>
                    </div>
                    <div class="book-meta">
                        <h3 class="book-title">{{ displayName(book.name) }}</h3>
                        <p class="book-author">{{ book.book_author }}</p>
                        <div
                            class="book-stars"
                            :aria-label="`${book.aidan_rating_stars} out of 5 stars`"
                        >
                            <span aria-hidden="true">{{ starString(book.aidan_rating_stars) }}</span>
                        </div>
                        <p
                            v-if="book.aidan_rating_description"
                            class="book-blurb"
                        >{{ book.aidan_rating_description }}</p>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.books-panel {
    border: 1px solid #d4b85a;
    border-radius: 6px;
    margin-bottom: 24px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(180, 130, 30, 0.22);
    background:
        radial-gradient(circle at 12% 0%, rgba(255, 235, 175, 0.55) 0%, transparent 55%),
        radial-gradient(circle at 88% 100%, rgba(255, 215, 130, 0.45) 0%, transparent 60%),
        linear-gradient(180deg, #fffaee 0%, #fff4d8 100%);
}

.books-header {
    background: linear-gradient(180deg, #fff2c8 0%, #f5d878 50%, #e9c854 51%, #d4ae34 100%);
    border-bottom: 1px solid #b88e1f;
    padding: 10px 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #5a3d04;
}

.books-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    fill: #a8730a;
    filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.8));
}

.books-header h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #5a3d04;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
    letter-spacing: 0.2px;
}

.books-body {
    padding: 22px;
}

.books-intro {
    margin: 0 0 18px 0;
    font-size: 14px;
    color: #6b4d18;
}

.books-status {
    padding: 18px 4px;
    color: #6b4d18;
    font-size: 14px;
}

.books-status-error {
    color: #8a1f12;
}

.books-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
}

.books-grid-preview {
    margin-bottom: 24px;
}

.books-grid-full {
    margin-top: 18px;
}

.book-card {
    display: flex;
    gap: 14px;
    padding: 14px;
    background: linear-gradient(180deg, #fffefa 0%, #fff5d9 100%);
    border: 1px solid #e0c46c;
    border-radius: 5px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85), 0 1px 2px rgba(120, 80, 10, 0.08);
    transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}

.book-card:hover {
    border-color: #b88e1f;
    background: linear-gradient(180deg, #fffefa 0%, #ffeec0 100%);
    box-shadow: 0 2px 10px rgba(180, 130, 30, 0.18);
}

.book-cover {
    flex-shrink: 0;
    width: 72px;
    height: 104px;
    border-radius: 3px;
    overflow: hidden;
    background: #f1dba0;
    border: 1px solid #b88e1f;
    box-shadow: 0 1px 3px rgba(90, 61, 4, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
}

.book-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.book-cover-fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a8730a;
}

.book-cover-fallback svg {
    width: 32px;
    height: 32px;
    fill: currentColor;
}

.book-meta {
    flex: 1;
    min-width: 0;
}

.book-title {
    margin: 0 0 2px 0;
    font-size: 15px;
    font-weight: 700;
    color: #5a3d04;
    line-height: 1.25;
}

.book-author {
    margin: 0 0 6px 0;
    font-size: 12.5px;
    font-style: italic;
    color: #6b4d18;
}

.book-stars {
    color: #c98714;
    font-size: 14px;
    letter-spacing: 1px;
    margin-bottom: 6px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
}

.book-blurb {
    margin: 0;
    font-size: 12.5px;
    color: #5a4a23;
    line-height: 1.45;
}

.books-cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
    padding: 16px 18px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 240, 195, 0.55) 100%);
    border: 1px solid #e0c46c;
    border-radius: 5px;
    margin-top: 6px;
}

.books-cta-text {
    flex: 1;
    min-width: 240px;
}

.books-cta-text h3 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 700;
    color: #5a3d04;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
}

.books-cta-text p {
    margin: 0;
    font-size: 13px;
    color: #6b4d18;
    line-height: 1.5;
}

.books-controls {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 10px;
}

.books-control {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    color: #6b4d18;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
}

.books-control input,
.books-control select {
    font-family: inherit;
    font-size: 13px;
    color: #5a3d04;
    padding: 5px 8px;
    border: 1px solid #b88e1f;
    border-radius: 3px;
    background: linear-gradient(180deg, #fffefa 0%, #fff4d8 100%);
    box-shadow: inset 0 1px 2px rgba(120, 80, 10, 0.1);
    text-transform: none;
    letter-spacing: normal;
    font-weight: 500;
}

.books-control input {
    width: 70px;
}

.books-control input:focus,
.books-control select:focus {
    outline: none;
    border-color: #a8730a;
    box-shadow: 0 0 0 2px rgba(180, 130, 30, 0.25);
}

.books-btn {
    flex-shrink: 0;
}

.books-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

@media (max-width: 600px) {
    .books-cta {
        align-items: stretch;
    }

    .books-controls {
        width: 100%;
    }

    .book-cover {
        width: 60px;
        height: 88px;
    }
}
</style>
