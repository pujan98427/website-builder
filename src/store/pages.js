import { defineStore } from "pinia";

export const usePagesStore = defineStore("pages", {
  state: () => ({
    pages: {},
    currentPage: null,
  }),

  actions: {
    savePage(pageId, content) {
      // Add lastModified timestamp
      const pageContent = {
        ...content,
        lastModified: new Date().toISOString(),
      };

      // Save to state
      this.pages[pageId] = pageContent;

      // Save to localStorage
      const pagesData = JSON.parse(localStorage.getItem("pages") || "{}");
      pagesData[pageId] = pageContent;
      localStorage.setItem("pages", JSON.stringify(pagesData));
    },

    loadPage(pageId) {
      // Try to load from localStorage first
      const pagesData = JSON.parse(localStorage.getItem("pages") || "{}");
      if (pagesData[pageId]) {
        this.pages[pageId] = pagesData[pageId];
        this.currentPage = pageId;
        return pagesData[pageId];
      }

      // If not found, return empty page structure
      const emptyPage = {
        rows: [
          {
            columns: [{ elements: [] }, { elements: [] }],
          },
        ],
        lastModified: new Date().toISOString(),
      };
      this.pages[pageId] = emptyPage;
      this.currentPage = pageId;
      return emptyPage;
    },

    getCurrentPage() {
      return this.currentPage ? this.pages[this.currentPage] : null;
    },

    updatePageContent(content) {
      if (this.currentPage) {
        this.savePage(this.currentPage, content);
      }
    },

    deletePage(pageId) {
      // Remove from state
      delete this.pages[pageId];

      // Remove from localStorage
      const pagesData = JSON.parse(localStorage.getItem("pages") || "{}");
      delete pagesData[pageId];
      localStorage.setItem("pages", JSON.stringify(pagesData));

      // Clear current page if it was deleted
      if (this.currentPage === pageId) {
        this.currentPage = null;
      }
    },
  },
});
