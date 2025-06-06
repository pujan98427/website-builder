import { defineStore } from "pinia";

export const useBuilderStore = defineStore("builder", {
  state: () => ({
    pages: [],
    currentPage: null,
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
    createPage(name) {
      const page = {
        id: Date.now().toString(),
        name,
        elements: [],
      };
      this.pages.push(page);
      this.saveToLocalStorage();
      return page;
    },

    setCurrentPage(pageId) {
      this.currentPage = this.pages.find((p) => p.id === pageId);
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
