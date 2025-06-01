import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// TreeViewItem Component: Represents a single node in the TreeView (either a collapsible section or a leaf item).
const TreeViewItem = ({ item, level = 0, onSelect, selectedItem }) => {
  // State to manage the expanded/collapsed status of the current item.
  // Initialize 'expanded' based on the 'active' property in the item data.
  const [expanded, setExpanded] = useState(item.active || false);

  // Determine if the current item is selected.
  const isSelected = selectedItem && selectedItem.id === item.id;

  // Function to handle the click event for toggling the accordion.
  const handleToggle = () => {
    if (item.children && item.children.length > 0) {
      setExpanded(!expanded); // Only toggle if it has children
    }
  };

  // Function to handle selecting the item.
  const handleSelect = () => {
    // Only allow selection for items that are not parent categories (i.e., don't have children or are explicitly selectable)
    if (!item.children || item.children.length === 0 || item.selectableParent) {
      onSelect(item);
    } else {
      // If it's a parent, just toggle the expansion
      handleToggle();
    }
  };

  // Determine indentation based on the level.
  // The original CSS uses ps-7 and ms-3 ps-3, which translates to a left padding.
  // We'll use a combination of padding-left and a pseudo-element for the line.
  const indentationClasses = level > 0 ? "ps-7 relative" : "";
  const beforeClasses =
    level > 0
      ? "before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-sky-200 dark:before:bg-sky-800"
      : "";

  return (
    <motion.div
      className={`hs-accordion ${expanded ? "active" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      role={item.children && item.children.length > 0 ? "treeitem" : "none"} // Only treeitem if it has children
      aria-expanded={
        item.children && item.children.length > 0 ? expanded : undefined
      }
      id={`hs-customize-tree-heading-${item.id}`}
    >
      <div
        className={`hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full ${indentationClasses}`}
      >
        {item.children && item.children.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-sky-100 rounded-md focus:outline-hidden focus:bg-sky-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-sky-900 dark:focus:bg-sky-900"
            aria-expanded={expanded}
            aria-controls={`hs-customize-tree-collapse-${item.id}`}
            onClick={handleToggle}
          >
            <motion.svg
              animate={{ rotate: expanded ? 90 : 0 }}
              className="size-2.5 text-sky-500 dark:text-sky-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </motion.svg>
          </motion.button>
        )}
        {!(item.children && item.children.length > 0) && level > 0 && (
          // Placeholder for leaf nodes to maintain alignment if no toggle button
          <div className="size-6 flex-shrink-0" />
        )}

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`grow hs-accordion-selectable px-1.5 rounded-md cursor-pointer ${
            isSelected
              ? "bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300"
              : "hover:bg-sky-50 dark:hover:bg-sky-800"
          }`}
          onClick={handleSelect}
          role="treeitem" // Leaf nodes are also treeitems
          aria-selected={isSelected}
        >
          <div className="flex items-center gap-x-3">
            {item.icon && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="shrink-0 size-4 text-sky-500 dark:text-sky-400"
                dangerouslySetInnerHTML={{ __html: item.icon }}
              />
            )}
            <div className="grow">
              <span className="text-sm text-gray-800 dark:text-neutral-200">
                {item.name}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {item.children && item.children.length > 0 && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            id={`hs-customize-tree-collapse-${item.id}`}
            className="hs-accordion-content w-full overflow-hidden"
            role="group"
            aria-labelledby={`hs-customize-tree-heading-${item.id}`}
          >
            <div
              className={`${
                level > 0 ? "ms-3 ps-3" : ""
              } relative ${beforeClasses}`}
            >
              <div
                className="hs-accordion-group"
                role="group"
                data-hs-accordion-always-open=""
              >
                {item.children.map((child) => (
                  <TreeViewItem
                    key={child.id}
                    item={child}
                    level={level + 1}
                    onSelect={onSelect}
                    selectedItem={selectedItem}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main App component for the Detailed TreeView
const App = () => {
  // State to keep track of the currently selected item.
  const [selectedItem, setSelectedItem] = useState(null);

  // Data structure for the TreeView content.
  // Each item has an 'id', 'name', optional 'icon', and optional 'children'.
  // 'active' determines if the section is expanded by default.
  // 'selectableParent' allows a parent node to also be selectable, not just its children.
  const treeData = [
    {
      id: "features",
      name: "Features",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" x2="15" y1="20" y2="20"></line><line x1="12" x2="12" y1="4" y2="20"></line></svg>',
      active: true, // Expanded by default
      children: [
        {
          id: "core-functionality",
          name: "Core Functionality",
          active: true, // Expanded by default
          children: [
            {
              id: "movie-browsing",
              name: "Movie Browsing: Browse through a collection of movies with a responsive grid layout",
            },
            {
              id: "search-system",
              name: "Search System: Real-time search functionality to find movies quickly",
            },
            {
              id: "movie-details",
              name: "Movie Details: Detailed movie information displayed in a modal view",
            },
            {
              id: "responsive-design",
              name: "Responsive Design: Fully responsive layout that works on mobile, tablet, and desktop devices",
            },
          ],
        },
        {
          id: "ui-components",
          name: "UI Components",
          children: [
            {
              id: "navbar",
              name: "Navigation Bar: Clean and intuitive navigation interface",
            },
            {
              id: "movie-cards",
              name: "Movie Cards: Visually appealing movie presentation cards",
            },
            {
              id: "search-component",
              name: "Search Component: Interactive search with real-time results",
            },
            {
              id: "modal-view",
              name: "Modal View: Smooth and responsive movie detail modal",
            },
            {
              id: "shining-button",
              name: "Shining Button: Custom animated button component for enhanced user interaction",
            },
            {
              id: "no-results-handler",
              name: "No Results Handler: Graceful handling of empty search results",
            },
          ],
        },
      ],
    },
    {
      id: "tech-stack",
      name: "Tech Stack",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="6" x="2" y="2" rx="2"></rect><path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path><rect width="4" height="6" x="8" y="16" rx="1"></rect></svg>',
      children: [
        {
          id: "core-technologies",
          name: "Core Technologies: React, Vite, Tailwind CSS",
        },
        {
          id: "development-tools",
          name: "Development Tools: ESLint, PostCSS, Node.js",
        },
      ],
    },
    {
      id: "project-structure",
      name: "Project Structure",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>',
      children: [
        { id: "src-folder", name: "src/" },
        { id: "components-folder", name: "Components/" },
        { id: "app-jsx", name: "App.jsx" },
        { id: "main-jsx", name: "main.jsx" },
      ],
    },
    {
      id: "component-documentation",
      name: "Component Documentation",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path><path d="m2.3 2.3 7.286 7.286"></path><circle cx="11" cy="11" r="2"></circle></svg>',
      children: [
        {
          id: "movie-component",
          name: "MovieComponent: Displays individual movie information, Handles click events for movie selection, Responsive image loading",
        },
        {
          id: "movie-detail-modal",
          name: "MovieDetailModal: Shows detailed movie information, Implements modal behavior, Manages state for open/close actions",
        },
        {
          id: "search-component-doc",
          name: "SearchComponent: Handles user input for movie search, Implements debounced search, Updates results in real-time",
        },
        {
          id: "shining-button-doc",
          name: "ShiningButton: Custom animated button component, Includes hover effects, Customizable styling",
        },
      ],
    },
    {
      id: "getting-started",
      name: "Getting Started",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="10" y2="9"></line></svg>',
      children: [
        {
          id: "prerequisites",
          name: "Prerequisites: Node.js (latest LTS version recommended), npm or yarn",
        },
        {
          id: "installation",
          name: "Installation: Clone the repository, Install dependencies",
        },
      ],
    },
    {
      id: "contributing",
      name: "Contributing",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>',
      children: [
        { id: "fork-project", name: "Fork the project" },
        {
          id: "create-branch",
          name: "Create your feature branch (git checkout -b feature/AmazingFeature)",
        },
        {
          id: "commit-changes",
          name: "Commit your changes (git commit -m 'Add some AmazingFeature')",
        },
        {
          id: "push-branch",
          name: "Push to the branch (git push origin feature/AmazingFeature)",
        },
        { id: "open-pull-request", name: "Open a Pull Request" },
        {
          id: "coding-standards",
          name: "Coding Standards: Follow ESLint configuration, Maintain component structure, Write meaningful commit messages, Update documentation for new features",
        },
      ],
    },
    {
      id: "license",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2.2V6H21.8L15 2.2z"></path><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9l7 7v10a2 2 0 0 1-2 2z"></path></svg>',
      name: "License: This project is licensed under the MIT License - see the LICENSE file for details.",
      selectableParent: true, // Allows the parent to be selected and display its text
    },
    {
      id: "acknowledgments",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.869 6.908-1.004 3.086-6.257 3.086 6.257 6.908 1.004-4.993 4.869 1.179 6.873z"></path></svg>',
      name: "Acknowledgments: React team for the amazing framework, Vite team for the build tool, Tailwind CSS team for the styling framework.",
      selectableParent: true, // Allows the parent to be selected and display its text
    },
  ];

  // Function to handle item selection.
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // Removed the background gradient as requested
      className="min-h-screen bg-gray-100 dark:bg-slate-900 flex items-start justify-center p-4 font-sans"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white dark:bg-black  shadow-xl rounded-lg p-6 w-full max-w-2xl flex backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
      >
        {/* Left pane: TreeView */}
        <div className="hs-accordion-treeview-root custom-scrollbar w-1/2 pr-4 border-r border-sky-200 dark:border-sky-700 overflow-y-auto max-h-[80vh]">
          <motion.h2
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-xl font-bold text-sky-900 dark:text-sky-100 mb-4"
          >
            React Movies App
          </motion.h2>
          <div
            className="hs-accordion-group"
            role="group"
            data-hs-accordion-always-open=""
          >
            {treeData.map((item) => (
              <TreeViewItem
                key={item.id}
                item={item}
                onSelect={setSelectedItem}
                selectedItem={selectedItem}
              />
            ))}
          </div>
        </div>

        {/* Right pane: Details/Content */}
        <div className="w-1/2 pl-6 overflow-y-auto max-h-[80vh]">
          <motion.h2
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="text-xl font-bold text-sky-900 dark:text-sky-100 mb-4"
          >
            Details
          </motion.h2>
          <AnimatePresence mode="wait">
            {selectedItem ? (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-gray-700 dark:text-neutral-300"
              >
                <h3 className="text-lg font-semibold text-sky-800 dark:text-sky-200 mb-2">
                  {/* Safely split the name for title, handling cases without ':' */}
                  {selectedItem.name.includes(":")
                    ? selectedItem.name.split(":")[0]
                    : selectedItem.name}
                </h3>
                <p className="text-sm">
                  {/* Display the description part if ':' exists, otherwise the full name */}
                  {selectedItem.name.includes(":")
                    ? selectedItem.name.split(": ")[1]
                    : selectedItem.name}
                </p>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sky-500 dark:text-sky-400 text-sm"
              >
                Select an item from the tree to see its details.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default App;
