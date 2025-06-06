import { h } from "vue";

// Basic Elements
export const HeadingIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("path", { d: "M4 12h16" }),
        h("path", { d: "M4 6h16" }),
        h("path", { d: "M4 18h16" }),
      ]
    );
  },
};

export const TextIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("path", { d: "M4 6h16" }),
        h("path", { d: "M4 12h16" }),
        h("path", { d: "M4 18h16" }),
      ]
    );
  },
};

export const ButtonIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("rect", {
          x: "3",
          y: "6",
          width: "18",
          height: "12",
          rx: "2",
          ry: "2",
        }),
        h("line", {
          x1: "8",
          y1: "12",
          x2: "16",
          y2: "12",
        }),
      ]
    );
  },
};

export const ListIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        class: "w-6 h-6",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M4 6h16M4 10h16M4 14h16M4 18h16",
        }),
      ]
    );
  },
};

export const QuoteIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        class: "w-6 h-6",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
        }),
      ]
    );
  },
};

// Media Elements
export const ImageIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("rect", {
          x: "3",
          y: "3",
          width: "18",
          height: "18",
          rx: "2",
          ry: "2",
        }),
        h("circle", {
          cx: "8.5",
          cy: "8.5",
          r: "1.5",
        }),
        h("polyline", {
          points: "21 15 16 10 5 21",
        }),
      ]
    );
  },
};

export const VideoIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("polygon", {
          points: "23 7 16 12 23 17 23 7",
        }),
        h("rect", {
          x: "1",
          y: "5",
          width: "15",
          height: "14",
          rx: "2",
          ry: "2",
        }),
      ]
    );
  },
};

export const CarouselIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("rect", {
          x: "2",
          y: "3",
          width: "20",
          height: "18",
          rx: "2",
          ry: "2",
        }),
        h("circle", {
          cx: "8",
          cy: "12",
          r: "1",
        }),
        h("circle", {
          cx: "16",
          cy: "12",
          r: "1",
        }),
      ]
    );
  },
};

export const GalleryIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("rect", {
          x: "3",
          y: "3",
          width: "18",
          height: "18",
          rx: "2",
          ry: "2",
        }),
        h("circle", {
          cx: "8.5",
          cy: "8.5",
          r: "1.5",
        }),
        h("polyline", {
          points: "21 15 16 10 5 21",
        }),
      ]
    );
  },
};

// Layout Elements
export const DividerIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("line", {
          x1: "3",
          y1: "12",
          x2: "21",
          y2: "12",
        }),
      ]
    );
  },
};

export const SpacerIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("line", {
          x1: "12",
          y1: "3",
          x2: "12",
          y2: "21",
        }),
      ]
    );
  },
};

// Advanced Elements
export const FormIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("rect", {
          x: "3",
          y: "3",
          width: "18",
          height: "18",
          rx: "2",
          ry: "2",
        }),
        h("line", {
          x1: "8",
          y1: "8",
          x2: "16",
          y2: "8",
        }),
        h("line", {
          x1: "8",
          y1: "12",
          x2: "16",
          y2: "12",
        }),
        h("line", {
          x1: "8",
          y1: "16",
          x2: "16",
          y2: "16",
        }),
      ]
    );
  },
};

export const TableIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("rect", {
          x: "3",
          y: "3",
          width: "18",
          height: "18",
          rx: "2",
          ry: "2",
        }),
        h("line", {
          x1: "3",
          y1: "9",
          x2: "21",
          y2: "9",
        }),
        h("line", {
          x1: "3",
          y1: "15",
          x2: "21",
          y2: "15",
        }),
        h("line", {
          x1: "9",
          y1: "3",
          x2: "9",
          y2: "21",
        }),
        h("line", {
          x1: "15",
          y1: "3",
          x2: "15",
          y2: "21",
        }),
      ]
    );
  },
};

export const SocialIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        class: "w-6 h-6",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        }),
      ]
    );
  },
};

export const MapIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("polygon", {
          points: "1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6",
        }),
        h("line", {
          x1: "8",
          y1: "2",
          x2: "8",
          y2: "18",
        }),
        h("line", {
          x1: "16",
          y1: "6",
          x2: "16",
          y2: "22",
        }),
      ]
    );
  },
};

export const IframeIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("rect", {
          x: "2",
          y: "3",
          width: "20",
          height: "18",
          rx: "2",
          ry: "2",
        }),
        h("line", {
          x1: "2",
          y1: "9",
          x2: "22",
          y2: "9",
        }),
        h("line", {
          x1: "2",
          y1: "15",
          x2: "22",
          y2: "15",
        }),
      ]
    );
  },
};

export const CodeIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        class: "w-6 h-6",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
        }),
      ]
    );
  },
};

export const RowIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("rect", {
          x: "3",
          y: "3",
          width: "18",
          height: "18",
          rx: "2",
          ry: "2",
        }),
        h("line", {
          x1: "3",
          y1: "9",
          x2: "21",
          y2: "9",
        }),
        h("line", {
          x1: "3",
          y1: "15",
          x2: "21",
          y2: "15",
        }),
      ]
    );
  },
};

export const SocialMediaIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("path", {
          d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
        }),
      ]
    );
  },
};
