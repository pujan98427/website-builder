# Website Builder

A modern, drag-and-drop website builder built with Vue 3 and Vite. This application allows users to create and manage websites through an intuitive visual interface.

## Features

- 🎨 **Visual Drag-and-Drop Interface**
  - Intuitive element placement
  - Real-time preview
  - Responsive grid layout using Gridstack.js

- 📝 **Rich Element Library**
  - Basic elements (Headings, Text, Buttons, Lists)
  - Media elements (Images, Videos, Carousels, Galleries)
  - Layout elements (Dividers, Spacers)
  - Advanced elements (Forms, Tables, Social Media, Maps, Iframes)

- 🛠️ **Page Management**
  - Create multiple pages
  - Preview pages before publishing
  - Delete pages
  - Save and load page layouts

- 💅 **Customization**
  - Inline editing
  - Element settings panel
  - Responsive design
  - Custom styling options

## Tech Stack

- Vue 3 with Composition API
- Vite for fast development
- Gridstack.js for drag-and-drop functionality
- Tailwind CSS for styling
- Pinia for state management
- Vue Router for navigation

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/website-builder.git
cd website-builder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Creating a New Page**
   - Click "New Page" in the dashboard
   - Enter a page name
   - Start building your page

2. **Adding Elements**
   - Drag elements from the sidebar
   - Drop them onto the canvas
   - Customize using the settings panel

3. **Editing Elements**
   - Click on any element to select it
   - Use the settings panel to modify properties
   - Preview changes in real-time

4. **Managing Pages**
   - View all pages in the dashboard
   - Preview pages before publishing
   - Delete pages when needed

## Project Structure

```
src/
├── components/
│   ├── builder/         # Builder components
│   │   ├── elements/    # Element components
│   │   └── icons/       # UI icons
├── layouts/             # Page layouts
├── pages/              # Application pages
├── store/              # Pinia store
└── router/             # Vue Router configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Gridstack.js](https://gridstackjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
