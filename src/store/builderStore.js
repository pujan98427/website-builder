import { defineStore } from "pinia";

export const useBuilderStore = defineStore("builder", {
  state: () => ({
    pages: [],
    currentPage: null,
    layouts: {},
    selectedElement: null,
    elements: [],
    user: {
      username: "",
      email: "",
    },
  }),

  actions: {
    // Authentication
    login(credentials) {
      // Dummy authentication
      if (credentials.password) {
        this.user = {
          username: credentials.username || "Demo User",
          email: credentials.email || "demo@example.com",
        };
        localStorage.setItem("isAuthenticated", "true");
        return true;
      }
      return false;
    },

    logout() {
      localStorage.removeItem("isAuthenticated");
      this.user = { username: "", email: "" };
    },

    // Page Management
    async createPage(page) {
      try {
        // Add page to state
        this.pages.push(page);
        return page;
      } catch (error) {
        console.error("Error creating page:", error);
        throw error;
      }
    },

    async updatePage(pageId, updates) {
      try {
        const index = this.pages.findIndex((p) => p.id === pageId);
        if (index !== -1) {
          this.pages[index] = { ...this.pages[index], ...updates };
          return this.pages[index];
        }
        throw new Error("Page not found");
      } catch (error) {
        console.error("Error updating page:", error);
        throw error;
      }
    },

    async deletePage(pageId) {
      try {
        const index = this.pages.findIndex((p) => p.id === pageId);
        if (index !== -1) {
          this.pages.splice(index, 1);
          // Remove layout from state
          delete this.layouts[pageId];
          return true;
        }
        throw new Error("Page not found");
      } catch (error) {
        console.error("Error deleting page:", error);
        throw error;
      }
    },

    async getPage(pageId) {
      try {
        const page = this.pages.find((p) => p.id === pageId);
        if (!page) {
          throw new Error("Page not found");
        }
        return page;
      } catch (error) {
        console.error("Error getting page:", error);
        throw error;
      }
    },

    async getAllPages() {
      try {
        return this.pages;
      } catch (error) {
        console.error("Error getting pages:", error);
        throw error;
      }
    },

    async saveLayout(pageId, layout) {
      try {
        this.layouts[pageId] = layout;
        return true;
      } catch (error) {
        console.error("Error saving layout:", error);
        throw error;
      }
    },

    async getLayout(pageId) {
      try {
        return this.layouts[pageId] || [];
      } catch (error) {
        console.error("Error getting layout:", error);
        throw error;
      }
    },

    // Element Management
    addElement(element, parentId = null) {
      const newElement = {
        id: Date.now().toString(),
        type: element.type,
        content: element.content || "",
        style: element.style || {},
        children: [],
        parentId,
      };

      if (parentId) {
        const parent = this.findElement(parentId);
        if (parent) {
          parent.children.push(newElement);
        }
      } else {
        this.elements.push(newElement);
      }

      this.saveToLocalStorage();
      return newElement;
    },

    updateElement(elementId, updates) {
      const element = this.findElement(elementId);
      if (element) {
        Object.assign(element, updates);
        this.saveToLocalStorage();
      }
    },

    deleteElement(elementId) {
      const removeElement = (elements) => {
        const index = elements.findIndex((el) => el.id === elementId);
        if (index !== -1) {
          elements.splice(index, 1);
          return true;
        }
        for (const el of elements) {
          if (el.children && removeElement(el.children)) {
            return true;
          }
        }
        return false;
      };

      removeElement(this.elements);
      this.saveToLocalStorage();
    },

    // Helper Methods
    findElement(elementId) {
      const find = (elements) => {
        for (const el of elements) {
          if (el.id === elementId) return el;
          if (el.children) {
            const found = find(el.children);
            if (found) return found;
          }
        }
        return null;
      };
      return find(this.elements);
    },

    // Persistence
    saveToLocalStorage() {
      localStorage.setItem(
        "builderState",
        JSON.stringify({
          pages: this.pages,
          elements: this.elements,
        })
      );
    },

    loadFromLocalStorage() {
      const saved = localStorage.getItem("builderState");
      if (saved) {
        const { pages, elements } = JSON.parse(saved);
        this.pages = pages;
        this.elements = elements;
      }
    },
  },
});
